#!/usr/bin/env python3
"""Local backend for the Krasunya salon booking MVP.

The server deliberately uses only the Python standard library so the project can
be run on a clean machine. It serves the existing frontend and exposes a small
SQLite-backed API. The conflict check is performed inside a write transaction,
so the browser preview is never the source of truth for a booking.
"""

from __future__ import annotations

import json
import hashlib
import os
import re
import secrets
import sqlite3
import uuid
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse


ROOT = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("KRASUNYA_DB", ROOT / "krasunya.sqlite3"))
SALON_START = "09:00"
SALON_END = "19:00"
TIME_RE = re.compile(r"^([01]\d|2[0-3]):([0-5]\d)$")
DEMO_PASSWORD = "demo123"
SESSIONS: dict[str, str] = {}


BRANCHES_SEED = [
    {"id": "branch-podil", "name": "Поділ", "city": "Київ", "address": "вул. Нижній Вал, 17", "phone": "+38 044 555 01 01", "hoursStart": "09:00", "hoursEnd": "19:00"},
    {"id": "branch-pechersk", "name": "Печерськ", "city": "Київ", "address": "вул. Басейна, 4", "phone": "+38 044 555 01 02", "hoursStart": "09:00", "hoursEnd": "20:00"},
]


def password_hash(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


USERS_SEED = [
    {"id": "admin-001", "name": "Ольга Коваль", "email": "olga@krasunya.local", "phone": "+38 067 000 00 01", "role": "admin", "masterName": "", "clientId": "", "branchId": "branch-podil", "initials": "ОК"},
    {"id": "master-001", "name": "Ірина Мельник", "email": "iryna@krasunya.local", "phone": "+38 067 000 00 02", "role": "master", "masterName": "Ірина Мельник", "clientId": "", "branchId": "branch-podil", "initials": "ІМ"},
    {"id": "client-001-user", "name": "Марина Соколова", "email": "marina@krasunya.local", "phone": "+38 067 420 18 64", "role": "client", "masterName": "", "clientId": "client-001", "branchId": "branch-podil", "initials": "МС"},
]


SEED = {
    "clients": [
        {"id": "client-001", "name": "Марина Соколова", "phone": "+38 067 420 18 64", "initials": "МС", "visits": 8, "total": 41200, "note": "Чутлива шкіра. Надає перевагу ранковим візитам.", "masterNames": ["Анна Левченко", "Ірина Мельник"]},
        {"id": "client-002", "name": "Софія Кравець", "phone": "+38 050 718 40 29", "initials": "СК", "visits": 3, "total": 6400, "note": "", "masterNames": ["Дар'я Пархоменко"]},
        {"id": "client-003", "name": "Олександра Поліщук", "phone": "+38 063 290 51 11", "initials": "ОП", "visits": 5, "total": 15900, "note": "", "masterNames": ["Ірина Мельник"]},
        {"id": "client-004", "name": "Олена Романенко", "phone": "+38 093 151 03 27", "initials": "ОР", "visits": 12, "total": 28600, "note": "", "masterNames": ["Дар'я Пархоменко"]},
        {"id": "client-005", "name": "Марія Бондар", "phone": "+38 097 806 42 91", "initials": "МБ", "visits": 2, "total": 1700, "note": "Новий клієнт", "masterNames": ["Анна Левченко"]},
    ],
    "masters": [
        {"name": "Анна Левченко", "role": "Косметологиня", "initials": "АЛ", "color": "peach", "schedule": "09:00–18:00", "focus": "Апаратна косметологія", "photo": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=82"},
        {"name": "Ірина Мельник", "role": "Косметологиня-естетистка", "initials": "ІМ", "color": "lilac", "schedule": "10:00–19:00", "focus": "LED і доглядові процедури", "photo": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&h=160&q=82"},
        {"name": "Дар'я Пархоменко", "role": "Естетистка", "initials": "ДП", "color": "sage", "schedule": "09:00–17:00", "focus": "Брови й нігті", "photo": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=82"},
    ],
    "rooms": [
        {"name": "Каб. 1", "type": "Апаратна косметологія", "status": "Вільний", "detail": "Pressotherapy P-02 · SkinScope"},
        {"name": "Каб. 2", "type": "Естетика й нігті", "status": "Вільний", "detail": "Brow station · Nail desk 02"},
        {"name": "Каб. 3", "type": "LED і догляд", "status": "До 10:20", "detail": "LED-маска Luma · Luma Pro"},
        {"name": "VIP-кімната", "type": "Комплексні сеанси", "status": "Вільний", "detail": "Масажна кушетка · тиха зона"},
    ],
    "equipment": [
        {"name": "Pressotherapy P-02", "type": "Пресотерапія", "room": "Каб. 1", "status": "Готове"},
        {"name": "LED-маска Luma", "type": "LED-терапія", "room": "Каб. 3", "status": "Готове"},
        {"name": "Luma Pro", "type": "Доглядове обладнання", "room": "Каб. 3", "status": "Готове"},
        {"name": "Brow station", "type": "Брови", "room": "Каб. 2", "status": "Готове"},
        {"name": "Nail desk 02", "type": "Нігті", "room": "Каб. 2", "status": "Готове"},
        {"name": "SkinScope", "type": "Діагностика", "room": "Каб. 1", "status": "Готове"},
    ],
    "procedures": [
        {"id": "glow", "name": "Glow Reset", "category": "Апаратна косметологія", "duration": "2 год 00 хв", "price": 6800, "stages": 2, "relation": "2 майстри · 2 кабінети", "resourcePlan": [{"name": "Лімфодренаж", "duration": 45, "master": "Анна Левченко", "room": "Каб. 1", "equipment": "Pressotherapy P-02", "gapAfter": 5}, {"name": "LED-відновлення", "duration": 70, "master": "Ірина Мельник", "room": "Каб. 3", "equipment": "LED-маска Luma"}]},
        {"id": "brows", "name": "Архітектура брів", "category": "Естетична косметологія", "duration": "1 год 00 хв", "price": 1200, "stages": 1, "relation": "1 майстер · 1 кабінет", "resourcePlan": [{"name": "Архітектура брів", "duration": 60, "master": "Дар'я Пархоменко", "room": "Каб. 2", "equipment": "Brow station"}]},
        {"id": "keratin", "name": "Кератиновий догляд", "category": "Доглядові процедури", "duration": "1 год 30 хв", "price": 2400, "stages": 1, "relation": "1 майстер · 1 кабінет", "resourcePlan": [{"name": "Кератиновий догляд", "duration": 90, "master": "Ірина Мельник", "room": "Каб. 3", "equipment": "Luma Pro"}]},
        {"id": "nails", "name": "Манікюр + догляд", "category": "Доглядові процедури", "duration": "1 год 30 хв", "price": 1900, "stages": 1, "relation": "1 майстер · 1 кабінет", "resourcePlan": [{"name": "Манікюр + догляд", "duration": 90, "master": "Дар'я Пархоменко", "room": "Каб. 2", "equipment": "Nail desk 02"}]},
    ],
    "unavailableSlots": [
        {"id": "unavailable-001", "date": "2026-09-04", "master": "Ірина Мельник", "start": "12:00", "end": "12:30", "reason": "Перерва", "createdBy": "admin"},
    ],
    "bookings": [
        {"id": "visit-001", "date": "2026-09-04", "clientId": "client-001", "client": "Марина Соколова", "phone": "+38 067 420 18 64", "service": "Glow Reset", "kind": "complex", "start": "09:30", "end": "11:30", "price": 6800, "status": "confirmed", "stages": [{"name": "Лімфодренаж", "start": "09:30", "end": "10:15", "master": "Анна Левченко", "room": "Каб. 1", "equipment": "Pressotherapy P-02", "procedureId": "glow", "procedureName": "Glow Reset", "stageIndex": 0}, {"name": "LED-відновлення", "start": "10:20", "end": "11:30", "master": "Ірина Мельник", "room": "Каб. 3", "equipment": "LED-маска Luma", "procedureId": "glow", "procedureName": "Glow Reset", "stageIndex": 1}]},
        {"id": "visit-002", "date": "2026-09-04", "clientId": "client-002", "client": "Софія Кравець", "phone": "+38 050 718 40 29", "service": "Архітектура брів", "kind": "single", "start": "11:00", "end": "12:00", "price": 1200, "status": "booked", "stages": [{"name": "Архітектура брів", "start": "11:00", "end": "12:00", "master": "Дар'я Пархоменко", "room": "Каб. 2", "equipment": "Brow station", "procedureId": "brows", "procedureName": "Архітектура брів", "stageIndex": 0}]},
        {"id": "visit-003", "date": "2026-09-04", "clientId": "client-003", "client": "Олександра Поліщук", "phone": "+38 063 290 51 11", "service": "Кератиновий догляд", "kind": "single", "start": "13:00", "end": "14:30", "price": 2400, "status": "confirmed", "stages": [{"name": "Кератиновий догляд", "start": "13:00", "end": "14:30", "master": "Ірина Мельник", "room": "Каб. 3", "equipment": "Luma Pro", "procedureId": "keratin", "procedureName": "Кератиновий догляд", "stageIndex": 0}]},
        {"id": "visit-004", "date": "2026-09-04", "clientId": "client-004", "client": "Олена Романенко", "phone": "+38 093 151 03 27", "service": "Манікюр + догляд", "kind": "single", "start": "15:30", "end": "17:00", "price": 1900, "status": "confirmed", "stages": [{"name": "Манікюр + догляд", "start": "15:30", "end": "17:00", "master": "Дар'я Пархоменко", "room": "Каб. 2", "equipment": "Nail desk 02", "procedureId": "nails", "procedureName": "Манікюр + догляд", "stageIndex": 0}]},
        {"id": "visit-005", "date": "2026-09-04", "clientId": "client-005", "client": "Марія Бондар", "phone": "+38 097 806 42 91", "service": "Консультація щодо шкіри", "kind": "single", "start": "18:00", "end": "18:45", "price": 850, "status": "booked", "stages": [{"name": "Консультація щодо шкіри", "start": "18:00", "end": "18:45", "master": "Анна Левченко", "room": "Каб. 1", "equipment": "SkinScope", "procedureId": "consultation", "procedureName": "Консультація щодо шкіри", "stageIndex": 0}]},
    ],
}


class ApiError(Exception):
    def __init__(self, message: str, status: int = 400, details: list[str] | None = None):
        super().__init__(message)
        self.message = message
        self.status = status
        self.details = details or []


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def parse_minutes(value: str) -> int:
    if not isinstance(value, str) or not TIME_RE.fullmatch(value):
        raise ApiError(f"Некоректний час: {value!r}.")
    hours, minutes = map(int, value.split(":"))
    return hours * 60 + minutes


def overlaps(start_a: str, end_a: str, start_b: str, end_b: str) -> bool:
    return parse_minutes(start_a) < parse_minutes(end_b) and parse_minutes(end_a) > parse_minutes(start_b)


def connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH, timeout=10)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def init_db() -> None:
    with connect() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS clients (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              phone TEXT NOT NULL,
              initials TEXT NOT NULL,
              visits INTEGER NOT NULL DEFAULT 0,
              total INTEGER NOT NULL DEFAULT 0,
              note TEXT NOT NULL DEFAULT '',
              master_names_json TEXT NOT NULL DEFAULT '[]'
            );
            CREATE TABLE IF NOT EXISTS branches (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              city TEXT NOT NULL,
              address TEXT NOT NULL,
              phone TEXT NOT NULL,
              hours_start TEXT NOT NULL,
              hours_end TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS users (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT NOT NULL UNIQUE,
              phone TEXT NOT NULL,
              role TEXT NOT NULL CHECK(role IN ('admin', 'master', 'client')),
              master_name TEXT NOT NULL DEFAULT '',
              client_id TEXT NOT NULL DEFAULT '',
              branch_id TEXT NOT NULL REFERENCES branches(id),
              initials TEXT NOT NULL,
              password_hash TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS masters (
              name TEXT PRIMARY KEY,
              role TEXT NOT NULL,
              initials TEXT NOT NULL,
              color TEXT NOT NULL,
              schedule TEXT NOT NULL,
              focus TEXT NOT NULL,
              photo TEXT NOT NULL DEFAULT ''
            );
            CREATE TABLE IF NOT EXISTS rooms (
              name TEXT PRIMARY KEY,
              type TEXT NOT NULL,
              status TEXT NOT NULL,
              detail TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS equipment (
              name TEXT PRIMARY KEY,
              type TEXT NOT NULL,
              room TEXT NOT NULL,
              status TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS procedures (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              category TEXT NOT NULL,
              duration TEXT NOT NULL,
              price INTEGER NOT NULL,
              stages INTEGER NOT NULL,
              relation TEXT NOT NULL,
              resource_plan_json TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS bookings (
              id TEXT PRIMARY KEY,
              date TEXT NOT NULL,
              branch_id TEXT NOT NULL DEFAULT 'branch-podil' REFERENCES branches(id),
              client_id TEXT NOT NULL REFERENCES clients(id),
              client TEXT NOT NULL,
              phone TEXT NOT NULL,
              service TEXT NOT NULL,
              kind TEXT NOT NULL,
              start TEXT NOT NULL,
              end TEXT NOT NULL,
              price INTEGER NOT NULL,
              status TEXT NOT NULL,
              stages_json TEXT NOT NULL,
              created_at TEXT NOT NULL,
              updated_at TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings(date);
            CREATE TABLE IF NOT EXISTS unavailable_slots (
              id TEXT PRIMARY KEY,
              date TEXT NOT NULL,
              branch_id TEXT NOT NULL DEFAULT 'branch-podil' REFERENCES branches(id),
              master TEXT NOT NULL REFERENCES masters(name),
              start TEXT NOT NULL,
              end TEXT NOT NULL,
              reason TEXT NOT NULL DEFAULT '',
              created_by TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS unavailable_date_master_idx ON unavailable_slots(date, master);
            """
        )
        booking_columns = {row[1] for row in connection.execute("PRAGMA table_info(bookings)")}
        if "branch_id" not in booking_columns:
            connection.execute("ALTER TABLE bookings ADD COLUMN branch_id TEXT NOT NULL DEFAULT 'branch-podil'")
        slot_columns = {row[1] for row in connection.execute("PRAGMA table_info(unavailable_slots)")}
        if "branch_id" not in slot_columns:
            connection.execute("ALTER TABLE unavailable_slots ADD COLUMN branch_id TEXT NOT NULL DEFAULT 'branch-podil'")
        for branch in BRANCHES_SEED:
            connection.execute("INSERT OR IGNORE INTO branches VALUES (?, ?, ?, ?, ?, ?, ?)", (branch["id"], branch["name"], branch["city"], branch["address"], branch["phone"], branch["hoursStart"], branch["hoursEnd"]))
        if connection.execute("SELECT COUNT(*) FROM clients").fetchone()[0] == 0:
            seed_db(connection)
        for equipment in SEED["equipment"]:
            connection.execute("INSERT OR IGNORE INTO equipment VALUES (?, ?, ?, ?)", tuple(equipment[key] for key in ("name", "type", "room", "status")))
        if connection.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 0:
            for user in USERS_SEED:
                connection.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (user["id"], user["name"], user["email"], user["phone"], user["role"], user["masterName"], user["clientId"], user["branchId"], user["initials"], password_hash(DEMO_PASSWORD)))


def seed_db(connection: sqlite3.Connection) -> None:
    for client in SEED["clients"]:
        connection.execute("INSERT INTO clients VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (client["id"], client["name"], client["phone"], client["initials"], client["visits"], client["total"], client["note"], json.dumps(client["masterNames"], ensure_ascii=False)))
    for master in SEED["masters"]:
        connection.execute("INSERT INTO masters VALUES (?, ?, ?, ?, ?, ?, ?)", tuple(master[key] for key in ("name", "role", "initials", "color", "schedule", "focus", "photo")))
    for room in SEED["rooms"]:
        connection.execute("INSERT INTO rooms VALUES (?, ?, ?, ?)", tuple(room[key] for key in ("name", "type", "status", "detail")))
    for equipment in SEED["equipment"]:
        connection.execute("INSERT INTO equipment VALUES (?, ?, ?, ?)", tuple(equipment[key] for key in ("name", "type", "room", "status")))
    for procedure in SEED["procedures"]:
        connection.execute("INSERT INTO procedures VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (procedure["id"], procedure["name"], procedure["category"], procedure["duration"], procedure["price"], procedure["stages"], procedure["relation"], json.dumps(procedure["resourcePlan"], ensure_ascii=False)))
    for slot in SEED["unavailableSlots"]:
        connection.execute("INSERT INTO unavailable_slots (id, date, branch_id, master, start, end, reason, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (slot["id"], slot["date"], "branch-podil", slot["master"], slot["start"], slot["end"], slot["reason"], slot["createdBy"]))
    timestamp = now_iso()
    for booking in SEED["bookings"]:
        connection.execute("INSERT INTO bookings (id, date, branch_id, client_id, client, phone, service, kind, start, end, price, status, stages_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (booking["id"], booking["date"], "branch-podil", booking["clientId"], booking["client"], booking["phone"], booking["service"], booking["kind"], booking["start"], booking["end"], booking["price"], booking["status"], json.dumps(booking["stages"], ensure_ascii=False), timestamp, timestamp))


def row_client(row: sqlite3.Row) -> dict[str, Any]:
    item = dict(row)
    item["masterNames"] = json.loads(item.pop("master_names_json"))
    return item


def row_booking(row: sqlite3.Row) -> dict[str, Any]:
    item = dict(row)
    item["branchId"] = item.pop("branch_id")
    item["clientId"] = item.pop("client_id")
    item["stages"] = json.loads(item.pop("stages_json"))
    item.pop("created_at", None)
    item.pop("updated_at", None)
    return item


def row_slot(row: sqlite3.Row) -> dict[str, Any]:
    item = dict(row)
    item["branchId"] = item.pop("branch_id")
    item["createdBy"] = item.pop("created_by")
    return item


def row_branch(row: sqlite3.Row) -> dict[str, Any]:
    item = dict(row)
    item["hoursStart"] = item.pop("hours_start")
    item["hoursEnd"] = item.pop("hours_end")
    return item


def row_user(row: sqlite3.Row) -> dict[str, Any]:
    item = dict(row)
    item["masterName"] = item.pop("master_name")
    item["clientId"] = item.pop("client_id")
    item["branchId"] = item.pop("branch_id")
    item.pop("password_hash", None)
    return item


def read_state(connection: sqlite3.Connection) -> dict[str, Any]:
    clients = [row_client(row) for row in connection.execute("SELECT * FROM clients ORDER BY id")]
    masters = [dict(row) for row in connection.execute("SELECT * FROM masters ORDER BY name")]
    rooms = [dict(row) for row in connection.execute("SELECT * FROM rooms ORDER BY name")]
    equipment = [dict(row) for row in connection.execute("SELECT * FROM equipment ORDER BY name")]
    procedures = []
    for row in connection.execute("SELECT * FROM procedures ORDER BY id"):
        item = dict(row)
        item["resourcePlan"] = json.loads(item.pop("resource_plan_json"))
        procedures.append(item)
    bookings = [row_booking(row) for row in connection.execute("SELECT * FROM bookings ORDER BY date, start")]
    slots = [row_slot(row) for row in connection.execute("SELECT * FROM unavailable_slots ORDER BY date, start")]
    branches = [row_branch(row) for row in connection.execute("SELECT * FROM branches ORDER BY city, name")]
    return {"salonHours": {"start": SALON_START, "end": SALON_END}, "clients": clients, "masters": masters, "rooms": rooms, "equipment": equipment, "procedures": procedures, "bookings": bookings, "unavailableSlots": slots, "branches": branches}


def user_payload(user: sqlite3.Row, branch_id: str | None = None) -> dict[str, Any]:
    item = row_user(user)
    item["branchId"] = branch_id or item["branchId"]
    return item


def user_from_request(handler: "Handler") -> tuple[sqlite3.Row | None, str | None]:
    cookie_header = handler.headers.get("Cookie", "")
    token = next((part.strip().split("=", 1)[1] for part in cookie_header.split(";") if part.strip().startswith("krasunya_session=")), None)
    user_id = SESSIONS.get(token) if token else None
    if not user_id:
        return None, None
    with connect() as connection:
        user = connection.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    return user, token


def require_user(handler: "Handler") -> tuple[sqlite3.Row, str, dict[str, Any]]:
    user, token = user_from_request(handler)
    if not user or not token:
        raise ApiError("Потрібно увійти в систему.", 401)
    branch_id = SESSIONS.get(token + ":branch") or user["branch_id"]
    return user, token, user_payload(user, branch_id)


def filter_state_for_user(state: dict[str, Any], user: dict[str, Any]) -> dict[str, Any]:
    branch_id = user["branchId"]
    state["branches"] = [branch for branch in state["branches"]]
    state["bookings"] = [booking for booking in state["bookings"] if booking["branchId"] == branch_id]
    state["unavailableSlots"] = [slot for slot in state["unavailableSlots"] if slot["branchId"] == branch_id]
    if user["role"] == "master":
        state["bookings"] = [booking for booking in state["bookings"] if any(stage.get("master") == user["masterName"] for stage in booking["stages"])]
        client_ids = {booking["clientId"] for booking in state["bookings"]}
        state["clients"] = [client for client in state["clients"] if client["id"] in client_ids]
        state["unavailableSlots"] = [slot for slot in state["unavailableSlots"] if slot["master"] == user["masterName"]]
    elif user["role"] == "client":
        state["bookings"] = [booking for booking in state["bookings"] if booking["clientId"] == user["clientId"]]
        state["clients"] = [client for client in state["clients"] if client["id"] == user["clientId"]]
        state["unavailableSlots"] = []
    return state


def branches_for(connection: sqlite3.Connection) -> list[dict[str, Any]]:
    return [row_branch(row) for row in connection.execute("SELECT * FROM branches ORDER BY city, name")]


def auth_session_payload(connection: sqlite3.Connection, user: sqlite3.Row | None, branch_id: str | None = None) -> dict[str, Any]:
    payload: dict[str, Any] = {"authenticated": bool(user), "branches": branches_for(connection)}
    if user:
        payload["user"] = user_payload(user, branch_id)
    return payload


def login_user(connection: sqlite3.Connection, payload: dict[str, Any]) -> tuple[str, dict[str, Any]]:
    user_id = str(payload.get("userId") or "")
    role = str(payload.get("role") or "")
    user = connection.execute("SELECT * FROM users WHERE id = ? AND role = ?", (user_id, role)).fetchone()
    if not user or user["password_hash"] != password_hash(str(payload.get("password") or "")):
        raise ApiError("Невірна роль, користувач або пароль.", 401)
    branch_id = str(payload.get("branchId") or user["branch_id"])
    if not connection.execute("SELECT 1 FROM branches WHERE id = ?", (branch_id,)).fetchone():
        raise ApiError("Оберіть існуючу філію.", 422)
    if role == "master" and branch_id != user["branch_id"]:
        raise ApiError("Майстер може увійти лише до своєї філії.", 403)
    token = secrets.token_urlsafe(32)
    SESSIONS[token] = user["id"]
    SESSIONS[token + ":branch"] = branch_id
    return token, user_payload(user, branch_id)


def create_branch(connection: sqlite3.Connection, payload: dict[str, Any]) -> dict[str, Any]:
    name = str(payload.get("name") or "").strip()
    city = str(payload.get("city") or "").strip()
    address = str(payload.get("address") or "").strip()
    phone = str(payload.get("phone") or "").strip()
    hours_start = str(payload.get("hoursStart") or SALON_START)
    hours_end = str(payload.get("hoursEnd") or SALON_END)
    if not name or not city or not address:
        raise ApiError("Заповніть назву, місто та адресу філії.", 422)
    parse_minutes(hours_start)
    parse_minutes(hours_end)
    if parse_minutes(hours_start) >= parse_minutes(hours_end):
        raise ApiError("Час завершення має бути пізніше початку.", 422)
    branch = {"id": f"branch-{uuid.uuid4().hex[:10]}", "name": name, "city": city, "address": address, "phone": phone, "hoursStart": hours_start, "hoursEnd": hours_end}
    connection.execute("INSERT INTO branches VALUES (?, ?, ?, ?, ?, ?, ?)", (branch["id"], branch["name"], branch["city"], branch["address"], branch["phone"], branch["hoursStart"], branch["hoursEnd"]))
    return branch


def update_profile(connection: sqlite3.Connection, user_id: str, payload: dict[str, Any]) -> dict[str, Any]:
    user = connection.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    if not user:
        raise ApiError("Користувача не знайдено.", 404)
    name = str(payload.get("name") or user["name"]).strip()
    phone = str(payload.get("phone") or user["phone"]).strip()
    if not name:
        raise ApiError("Ім'я не може бути порожнім.", 422)
    connection.execute("UPDATE users SET name = ?, phone = ?, initials = ? WHERE id = ?", (name, phone, "".join(part[0] for part in name.split()[:2]).upper(), user_id))
    return dict(connection.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone())


def resources_conflict(first: dict[str, Any], second: dict[str, Any]) -> str | None:
    if not overlaps(first["start"], first["end"], second["start"], second["end"]):
        return None
    for resource in ("master", "room", "equipment"):
        if first.get(resource) and first.get(resource) == second.get(resource):
            return f"{first.get('name', 'Етап')}: {resource} «{first[resource]}» зайнятий у {second['start']}—{second['end']}"
    return None


def validate_booking(connection: sqlite3.Connection, payload: dict[str, Any], excluded_id: str = "") -> dict[str, Any]:
    required = ("date", "clientId", "service", "price", "status", "stages")
    missing = [key for key in required if key not in payload]
    if missing:
        raise ApiError(f"Не вистачає полів: {', '.join(missing)}.")
    client_row = connection.execute("SELECT * FROM clients WHERE id = ?", (payload["clientId"],)).fetchone()
    if not client_row:
        raise ApiError("Клієнта не знайдено.", 404)
    branch_id = payload.get("branchId") or "branch-podil"
    if not connection.execute("SELECT 1 FROM branches WHERE id = ?", (branch_id,)).fetchone():
        raise ApiError("Філію не знайдено.", 404)
    stages = payload["stages"]
    if not isinstance(stages, list) or not stages:
        raise ApiError("Запис має містити хоча б один етап.")
    masters = {row["name"]: row["schedule"] for row in connection.execute("SELECT name, schedule FROM masters")}
    rooms = {row["name"] for row in connection.execute("SELECT name FROM rooms")}
    equipment = {row["name"] for row in connection.execute("SELECT name FROM equipment")}
    details: list[str] = []
    for stage in stages:
        if not isinstance(stage, dict):
            details.append("Некоректний етап маршруту.")
            continue
        for field in ("name", "start", "end", "master", "room", "equipment"):
            if not stage.get(field):
                details.append(f"В етапі відсутнє поле «{field}».")
        try:
            start = parse_minutes(stage.get("start", ""))
            end = parse_minutes(stage.get("end", ""))
            if start >= end:
                details.append(f"Етап «{stage.get('name', 'невідомий')}»: завершення має бути пізніше початку.")
            if start < parse_minutes(SALON_START) or end > parse_minutes(SALON_END):
                details.append(f"Етап «{stage.get('name', 'невідомий')}» виходить за межі роботи салону.")
        except ApiError as error:
            details.append(error.message)
        if stage.get("master") not in masters:
            details.append(f"Майстра «{stage.get('master')}» не знайдено.")
        else:
            schedule_start, schedule_end = masters[stage["master"]].split("–")
            if parse_minutes(stage.get("start", "00:00")) < parse_minutes(schedule_start) or parse_minutes(stage.get("end", "00:00")) > parse_minutes(schedule_end):
                details.append(f"{stage['master']}: робочі години {masters[stage['master']]}.")
        if stage.get("room") not in rooms:
            details.append(f"Кабінет «{stage.get('room')}» не знайдено.")
        if stage.get("equipment") not in equipment:
            details.append(f"Обладнання «{stage.get('equipment')}» не знайдено.")
    if details:
        raise ApiError("Запис не пройшов перевірку.", 422, sorted(set(details)))

    starts = [parse_minutes(stage["start"]) for stage in stages]
    ends = [parse_minutes(stage["end"]) for stage in stages]
    start = min(starts)
    end = max(ends)
    if "start" in payload and payload["start"] != to_time(start):
        raise ApiError("Загальний час запису не відповідає його етапам.", 422)
    if "end" in payload and payload["end"] != to_time(end):
        raise ApiError("Час завершення не відповідає його етапам.", 422)

    conflicts: list[str] = []
    for index, stage in enumerate(stages):
        for other in stages[index + 1:]:
            conflict = resources_conflict(stage, other)
            if conflict:
                conflicts.append("Етапи одного запису використовують один ресурс одночасно.")
        for slot in connection.execute("SELECT * FROM unavailable_slots WHERE date = ? AND branch_id = ? AND master = ?", (payload["date"], branch_id, stage["master"])).fetchall():
            if overlaps(stage["start"], stage["end"], slot["start"], slot["end"]):
                reason = f" ({slot['reason'].lower()})" if slot["reason"] else ""
                conflicts.append(f"{stage['master']}: неробочий час {slot['start']}—{slot['end']}{reason}")
    for row in connection.execute("SELECT * FROM bookings WHERE date = ? AND branch_id = ? AND id != ?", (payload["date"], branch_id, excluded_id)):
        existing = row_booking(row)
        for new_stage in stages:
            for old_stage in existing["stages"]:
                conflict = resources_conflict(new_stage, old_stage)
                if conflict:
                    conflicts.append(conflict)
    if conflicts:
        raise ApiError("Запис конфліктує з уже зарезервованим ресурсом.", 409, sorted(set(conflicts)))

    client = row_client(client_row)
    return {"id": payload.get("id") or f"visit-{uuid.uuid4().hex[:12]}", "date": payload["date"], "branchId": branch_id, "clientId": client["id"], "client": client["name"], "phone": client["phone"], "service": str(payload["service"]), "kind": "complex" if len(stages) > 1 else "single", "start": to_time(start), "end": to_time(end), "price": int(payload["price"]), "status": str(payload["status"]), "stages": stages}


def create_booking(connection: sqlite3.Connection, payload: dict[str, Any]) -> dict[str, Any]:
    connection.execute("BEGIN IMMEDIATE")
    try:
        booking = validate_booking(connection, payload)
        timestamp = now_iso()
        connection.execute("INSERT INTO bookings (id, date, branch_id, client_id, client, phone, service, kind, start, end, price, status, stages_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (booking["id"], booking["date"], booking["branchId"], booking["clientId"], booking["client"], booking["phone"], booking["service"], booking["kind"], booking["start"], booking["end"], booking["price"], booking["status"], json.dumps(booking["stages"], ensure_ascii=False), timestamp, timestamp))
        update_client_masters(connection, booking)
        connection.commit()
        return booking
    except Exception:
        connection.rollback()
        raise


def update_client_masters(connection: sqlite3.Connection, booking: dict[str, Any]) -> None:
    row = connection.execute("SELECT master_names_json FROM clients WHERE id = ?", (booking["clientId"],)).fetchone()
    names = set(json.loads(row["master_names_json"]))
    names.update(stage["master"] for stage in booking["stages"])
    connection.execute("UPDATE clients SET master_names_json = ? WHERE id = ?", (json.dumps(sorted(names), ensure_ascii=False), booking["clientId"]))


def update_booking(connection: sqlite3.Connection, booking_id: str, payload: dict[str, Any]) -> dict[str, Any]:
    connection.execute("BEGIN IMMEDIATE")
    try:
        current = connection.execute("SELECT * FROM bookings WHERE id = ?", (booking_id,)).fetchone()
        if not current:
            raise ApiError("Запис не знайдено.", 404)
        current_data = row_booking(current)
        merged = {**current_data, **payload, "id": booking_id}
        booking = validate_booking(connection, merged, excluded_id=booking_id)
        connection.execute("UPDATE bookings SET date=?, branch_id=?, client_id=?, client=?, phone=?, service=?, kind=?, start=?, end=?, price=?, status=?, stages_json=?, updated_at=? WHERE id=?", (booking["date"], booking["branchId"], booking["clientId"], booking["client"], booking["phone"], booking["service"], booking["kind"], booking["start"], booking["end"], booking["price"], booking["status"], json.dumps(booking["stages"], ensure_ascii=False), now_iso(), booking_id))
        update_client_masters(connection, booking)
        connection.commit()
        return booking
    except Exception:
        connection.rollback()
        raise


def validate_slot(connection: sqlite3.Connection, payload: dict[str, Any], excluded_id: str = "") -> dict[str, Any]:
    required = ("date", "master", "start", "end")
    missing = [key for key in required if not payload.get(key)]
    if missing:
        raise ApiError(f"Не вистачає полів: {', '.join(missing)}.")
    start = parse_minutes(payload["start"])
    end = parse_minutes(payload["end"])
    if start >= end:
        raise ApiError("Час завершення має бути пізніше початку.")
    if start < parse_minutes(SALON_START) or end > parse_minutes(SALON_END):
        raise ApiError(f"Інтервал має бути в межах {SALON_START}—{SALON_END}.")
    if not connection.execute("SELECT 1 FROM masters WHERE name = ?", (payload["master"],)).fetchone():
        raise ApiError("Майстра не знайдено.", 404)
    branch_id = payload.get("branchId") or "branch-podil"
    if not connection.execute("SELECT 1 FROM branches WHERE id = ?", (branch_id,)).fetchone():
        raise ApiError("Філію не знайдено.", 404)
    duplicate = connection.execute("SELECT * FROM unavailable_slots WHERE date=? AND branch_id=? AND master=? AND id != ?", (payload["date"], branch_id, payload["master"], excluded_id)).fetchall()
    if any(overlaps(payload["start"], payload["end"], row["start"], row["end"]) for row in duplicate):
        raise ApiError("Цей неробочий час уже перетинається з іншим інтервалом.", 409)
    for row in connection.execute("SELECT * FROM bookings WHERE date = ? AND branch_id = ?", (payload["date"], branch_id)):
        booking = row_booking(row)
        for stage in booking["stages"]:
            if stage["master"] == payload["master"] and overlaps(payload["start"], payload["end"], stage["start"], stage["end"]):
                raise ApiError(f"Неможливо заблокувати час: {booking['client']} має запис {stage['start']}—{stage['end']}.", 409)
    return {"id": payload.get("id") or f"unavailable-{uuid.uuid4().hex[:12]}", "date": payload["date"], "branchId": branch_id, "master": payload["master"], "start": payload["start"], "end": payload["end"], "reason": str(payload.get("reason") or ""), "createdBy": str(payload.get("createdBy") or "admin")}


def create_slot(connection: sqlite3.Connection, payload: dict[str, Any]) -> dict[str, Any]:
    connection.execute("BEGIN IMMEDIATE")
    try:
        slot = validate_slot(connection, payload)
        connection.execute("INSERT INTO unavailable_slots (id, date, branch_id, master, start, end, reason, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", tuple(slot[key] for key in ("id", "date", "branchId", "master", "start", "end", "reason", "createdBy")))
        connection.commit()
        return slot
    except Exception:
        connection.rollback()
        raise


def update_slot(connection: sqlite3.Connection, slot_id: str, payload: dict[str, Any]) -> dict[str, Any]:
    connection.execute("BEGIN IMMEDIATE")
    try:
        current = connection.execute("SELECT * FROM unavailable_slots WHERE id = ?", (slot_id,)).fetchone()
        if not current:
            raise ApiError("Неробочий інтервал не знайдено.", 404)
        merged = {**row_slot(current), **payload, "id": slot_id}
        slot = validate_slot(connection, merged, excluded_id=slot_id)
        connection.execute("UPDATE unavailable_slots SET date=?, branch_id=?, master=?, start=?, end=?, reason=?, created_by=? WHERE id=?", (slot["date"], slot["branchId"], slot["master"], slot["start"], slot["end"], slot["reason"], slot["createdBy"], slot_id))
        connection.commit()
        return slot
    except Exception:
        connection.rollback()
        raise


def delete_slot(connection: sqlite3.Connection, slot_id: str) -> None:
    connection.execute("BEGIN IMMEDIATE")
    try:
        result = connection.execute("DELETE FROM unavailable_slots WHERE id = ?", (slot_id,))
        if result.rowcount == 0:
            raise ApiError("Неробочий інтервал не знайдено.", 404)
        connection.commit()
    except Exception:
        connection.rollback()
        raise


def to_time(minutes: int) -> str:
    return f"{minutes // 60:02d}:{minutes % 60:02d}"


class Handler(SimpleHTTPRequestHandler):
    server_version = "KrasunyaBackend/0.1"

    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format: str, *args: Any) -> None:
        print(f"[{self.log_date_time_string()}] {self.address_string()} {format % args}")

    def send_json(self, status: int, data: dict[str, Any], set_cookie: str | None = None) -> None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        if set_cookie:
            self.send_header("Set-Cookie", set_cookie)
        self.end_headers()
        self.wfile.write(body)

    def read_json(self) -> dict[str, Any]:
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length > 2_000_000:
                raise ApiError("Запит надто великий.", 413)
            payload = json.loads(self.rfile.read(length) or b"{}")
            if not isinstance(payload, dict):
                raise ApiError("Тіло запиту має бути JSON-об'єктом.")
            return payload
        except json.JSONDecodeError as error:
            raise ApiError("Некоректний JSON.") from error

    def handle_api_error(self, error: Exception) -> None:
        if isinstance(error, ApiError):
            self.send_json(error.status, {"error": error.message, "details": error.details})
        else:
            print(f"API error: {error!r}")
            self.send_json(500, {"error": "Внутрішня помилка сервера."})

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if not parsed.path.startswith("/api/"):
            super().do_GET()
            return
        try:
            with connect() as connection:
                if parsed.path == "/api/health":
                    self.send_json(200, {"ok": True})
                elif parsed.path == "/api/auth/session":
                    user, token = user_from_request(self)
                    branch_id = SESSIONS.get(token + ":branch") if token else None
                    self.send_json(200, auth_session_payload(connection, user, branch_id))
                elif parsed.path == "/api/bootstrap":
                    user, _, user_data = require_user(self)
                    state = filter_state_for_user(read_state(connection), user_data)
                    state["session"] = user_data
                    self.send_json(200, state)
                elif parsed.path == "/api/bookings":
                    _, _, user_data = require_user(self)
                    date = parse_qs(parsed.query).get("date", [None])[0]
                    query = "SELECT * FROM bookings WHERE branch_id = ?"
                    args: tuple[Any, ...] = (user_data["branchId"],)
                    if date:
                        query += " AND date = ?"
                        args += (date,)
                    query += " ORDER BY date, start"
                    bookings = [row_booking(row) for row in connection.execute(query, args)]
                    if user_data["role"] == "master":
                        bookings = [booking for booking in bookings if any(stage.get("master") == user_data["masterName"] for stage in booking["stages"])]
                    elif user_data["role"] == "client":
                        bookings = [booking for booking in bookings if booking["clientId"] == user_data["clientId"]]
                    self.send_json(200, {"bookings": bookings})
                elif parsed.path == "/api/branches":
                    require_user(self)
                    self.send_json(200, {"branches": branches_for(connection)})
                else:
                    raise ApiError("Маршрут API не знайдено.", 404)
        except Exception as error:
            self.handle_api_error(error)

    def do_POST(self) -> None:
        self.mutate("POST")

    def do_PATCH(self) -> None:
        self.mutate("PATCH")

    def do_PUT(self) -> None:
        self.mutate("PUT")

    def do_DELETE(self) -> None:
        parsed = urlparse(self.path)
        try:
            parts = parsed.path.strip("/").split("/")
            if parts[:2] != ["api", "availability"] or len(parts) != 3:
                raise ApiError("Маршрут API не знайдено.", 404)
            _, _, user_data = require_user(self)
            if user_data["role"] == "client":
                raise ApiError("Клієнт не може змінювати неробочий час.", 403)
            with connect() as connection:
                delete_slot(connection, parts[2])
            self.send_json(200, {"ok": True})
        except Exception as error:
            self.handle_api_error(error)

    def mutate(self, method: str) -> None:
        parsed = urlparse(self.path)
        try:
            parts = parsed.path.strip("/").split("/")
            payload = self.read_json()
            with connect() as connection:
                if parts == ["api", "auth", "login"] and method == "POST":
                    token, user = login_user(connection, payload)
                    self.send_json(200, {"authenticated": True, "user": user, "branches": branches_for(connection)}, set_cookie=f"krasunya_session={token}; HttpOnly; SameSite=Lax; Path=/")
                elif parts == ["api", "auth", "logout"] and method == "POST":
                    _, token = user_from_request(self)
                    if token:
                        SESSIONS.pop(token, None)
                        SESSIONS.pop(token + ":branch", None)
                    self.send_json(200, {"authenticated": False}, set_cookie="krasunya_session=; Max-Age=0; HttpOnly; SameSite=Lax; Path=/")
                elif parts == ["api", "auth", "branch"] and method == "POST":
                    user, token, user_data = require_user(self)
                    if user_data["role"] == "master":
                        raise ApiError("Майстер не може змінювати філію.", 403)
                    branch_id = str(payload.get("branchId") or "")
                    if not connection.execute("SELECT 1 FROM branches WHERE id = ?", (branch_id,)).fetchone():
                        raise ApiError("Філію не знайдено.", 404)
                    SESSIONS[token + ":branch"] = branch_id
                    self.send_json(200, {"user": user_payload(user, branch_id)})
                elif parts == ["api", "auth", "profile"] and method == "PATCH":
                    user, token, _ = require_user(self)
                    update_profile(connection, user["id"], payload)
                    refreshed = connection.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
                    self.send_json(200, {"user": user_payload(refreshed, SESSIONS.get(token + ":branch") or refreshed["branch_id"])})
                elif parts == ["api", "branches"] and method == "POST":
                    _, _, user_data = require_user(self)
                    if user_data["role"] != "admin":
                        raise ApiError("Тільки адміністратор може створювати філії.", 403)
                    self.send_json(201, {"branch": create_branch(connection, payload)})
                elif parts == ["api", "bookings"] and method == "POST":
                    _, _, user_data = require_user(self)
                    if user_data["role"] == "client":
                        raise ApiError("Клієнт не може створювати запис через цей кабінет.", 403)
                    payload["branchId"] = user_data["branchId"]
                    self.send_json(201, {"booking": create_booking(connection, payload)})
                elif len(parts) == 3 and parts[:2] == ["api", "bookings"] and method == "PATCH":
                    _, _, user_data = require_user(self)
                    if user_data["role"] == "client":
                        raise ApiError("Клієнт не може змінювати запис.", 403)
                    payload["branchId"] = user_data["branchId"]
                    self.send_json(200, {"booking": update_booking(connection, parts[2], payload)})
                elif parts == ["api", "availability"] and method == "POST":
                    _, _, user_data = require_user(self)
                    if user_data["role"] == "client":
                        raise ApiError("Клієнт не може змінювати неробочий час.", 403)
                    payload["branchId"] = user_data["branchId"]
                    self.send_json(201, {"slot": create_slot(connection, payload)})
                elif len(parts) == 3 and parts[:2] == ["api", "availability"] and method in ("PATCH", "PUT"):
                    _, _, user_data = require_user(self)
                    if user_data["role"] == "client":
                        raise ApiError("Клієнт не може змінювати неробочий час.", 403)
                    payload["branchId"] = user_data["branchId"]
                    self.send_json(200, {"slot": update_slot(connection, parts[2], payload)})
                else:
                    raise ApiError("Маршрут API не знайдено.", 404)
        except Exception as error:
            self.handle_api_error(error)


def main() -> None:
    init_db()
    port = int(os.environ.get("PORT", "4173"))
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"Красуня backend: http://0.0.0.0:{port}")
    print(f"SQLite: {DB_PATH}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nЗупинено.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
