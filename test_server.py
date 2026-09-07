import tempfile
import unittest
import sqlite3
from pathlib import Path

import server


class BackendTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        server.DB_PATH = Path(self.temp_dir.name) / "test.sqlite3"
        server.init_db()
        self.connection = server.connect()

    def tearDown(self):
        self.connection.close()
        self.temp_dir.cleanup()

    def payload(self, *, date="2026-09-05", start="10:00", end="11:00", master="Дар'я Пархоменко", room="Каб. 2", equipment="Brow station"):
        return {
            "id": "test-booking",
            "date": date,
            "clientId": "client-002",
            "service": "Тестова процедура",
            "price": 1000,
            "status": "booked",
            "start": start,
            "end": end,
            "stages": [{"name": "Тестова процедура", "start": start, "end": end, "master": master, "room": room, "equipment": equipment}],
        }

    def test_create_booking_is_persisted(self):
        booking = server.create_booking(self.connection, self.payload())
        self.assertEqual(booking["id"], "test-booking")
        row = self.connection.execute("SELECT id FROM bookings WHERE id = ?", (booking["id"],)).fetchone()
        self.assertIsNotNone(row)

    def test_master_room_and_equipment_conflict_is_rejected(self):
        payload = self.payload(date="2026-09-04", start="09:45", end="10:30", master="Анна Левченко", room="Каб. 1", equipment="Pressotherapy P-02")
        with self.assertRaises(server.ApiError) as context:
            server.create_booking(self.connection, payload)
        self.assertEqual(context.exception.status, 409)

    def test_unavailable_master_time_is_rejected(self):
        payload = self.payload(date="2026-09-04", start="12:00", end="12:30", master="Ірина Мельник", room="Каб. 3", equipment="Luma Pro")
        with self.assertRaises(server.ApiError) as context:
            server.create_booking(self.connection, payload)
        self.assertEqual(context.exception.status, 409)
        self.assertIn("неробочий час", " ".join(context.exception.details))

    def test_reschedule_excludes_the_booking_being_updated(self):
        original = self.connection.execute("SELECT * FROM bookings WHERE id = 'visit-002'").fetchone()
        candidate = server.row_booking(original)
        candidate["date"] = "2026-09-05"
        candidate["start"] = "10:00"
        candidate["end"] = "11:00"
        candidate["stages"] = [dict(candidate["stages"][0], start="10:00", end="11:00")]
        updated = server.update_booking(self.connection, "visit-002", candidate)
        self.assertEqual(updated["date"], "2026-09-05")
        self.assertEqual(updated["start"], "10:00")

    def test_cancel_booking_releases_its_resources(self):
        cancelled = server.cancel_booking(self.connection, "visit-002", "branch-podil")
        self.assertEqual(cancelled["status"], "cancelled")
        self.assertEqual(self.connection.execute("SELECT status FROM bookings WHERE id = 'visit-002'").fetchone()[0], "cancelled")

        replacement = self.payload(date="2026-09-04", start="11:00", end="12:00")
        created = server.create_booking(self.connection, replacement)
        self.assertEqual(created["start"], "11:00")

    def test_cancelled_booking_does_not_block_unavailable_time(self):
        server.cancel_booking(self.connection, "visit-003", "branch-podil")
        slot = server.create_slot(self.connection, {"date": "2026-09-04", "master": "Ірина Мельник", "start": "13:00", "end": "14:00", "reason": "Перерва", "createdBy": "admin"})
        self.assertEqual(slot["start"], "13:00")

    def test_blocking_time_with_existing_booking_is_rejected(self):
        payload = {"date": "2026-09-04", "master": "Анна Левченко", "start": "09:30", "end": "10:00", "reason": "Перерва", "createdBy": "admin"}
        with self.assertRaises(server.ApiError) as context:
            server.create_slot(self.connection, payload)
        self.assertEqual(context.exception.status, 409)

    def test_role_login_returns_a_scoped_user(self):
        token, user = server.login_user(self.connection, {"role": "client", "userId": "client-001-user", "password": server.DEMO_PASSWORD, "branchId": "branch-pechersk"})
        self.assertTrue(token)
        self.assertEqual(user["role"], "client")
        self.assertEqual(user["branchId"], "branch-pechersk")

    def test_wrong_password_is_rejected(self):
        with self.assertRaises(server.ApiError) as context:
            server.login_user(self.connection, {"role": "admin", "userId": "admin-001", "password": "wrong", "branchId": "branch-podil"})
        self.assertEqual(context.exception.status, 401)

    def test_legacy_admin_name_is_migrated(self):
        self.connection.execute("UPDATE users SET name = ?, initials = ? WHERE id = ?", ("Ольга Коваль", "ОК", "admin-001"))
        self.connection.commit()
        server.init_db()
        admin = self.connection.execute("SELECT name, initials FROM users WHERE id = 'admin-001'").fetchone()
        self.assertEqual(dict(admin), {"name": "Ольга Чернова", "initials": "ОЧ"})

    def test_admin_can_create_branch(self):
        branch = server.create_branch(self.connection, {"name": "Центр", "city": "Київ", "address": "вул. Хрещатик, 1", "phone": "+38 044 555 01 03", "hoursStart": "10:00", "hoursEnd": "20:00"})
        self.assertEqual(branch["city"], "Київ")
        self.assertIsNotNone(self.connection.execute("SELECT 1 FROM branches WHERE id = ?", (branch["id"],)).fetchone())

    def test_login_session_includes_created_branch(self):
        branch = server.create_branch(self.connection, {"name": "Центр", "city": "Київ", "address": "вул. Хрещатик, 1"})
        session = server.auth_session_payload(self.connection, None)
        self.assertIn(branch["id"], [item["id"] for item in session["branches"]])

    def test_admin_can_create_and_delete_another_admin(self):
        admin = server.create_admin(self.connection, {"name": "Марія Бондар", "email": "maria@krasunya.local", "phone": "+38 067 000 00 10", "branchId": "branch-pechersk", "password": "secret1"}, "branch-podil")
        self.assertEqual(admin["role"], "admin")
        token, logged_in = server.login_user(self.connection, {"role": "admin", "userId": admin["id"], "password": "secret1", "branchId": "branch-pechersk"})
        self.assertTrue(token)
        self.assertEqual(logged_in["branchId"], "branch-pechersk")
        server.delete_admin(self.connection, admin["id"], "admin-001")
        self.assertIsNone(self.connection.execute("SELECT 1 FROM users WHERE id = ?", (admin["id"],)).fetchone())
        self.assertIsNone(self.connection.execute("SELECT 1 FROM sessions WHERE user_id = ?", (admin["id"],)).fetchone())

    def test_admin_and_branch_deletion_guards(self):
        with self.assertRaises(server.ApiError) as context:
            server.delete_admin(self.connection, "admin-001", "admin-001")
        self.assertEqual(context.exception.status, 409)
        empty_branch = server.create_branch(self.connection, {"name": "Центр", "city": "Київ", "address": "вул. Хрещатик, 1"})
        self.connection.execute("INSERT INTO sessions (token, user_id, branch_id, created_at) VALUES (?, ?, ?, ?)", ("stale-branch-session", "admin-001", empty_branch["id"], server.now_iso()))
        server.delete_branch(self.connection, empty_branch["id"])
        self.assertIsNone(self.connection.execute("SELECT 1 FROM branches WHERE id = ?", (empty_branch["id"],)).fetchone())
        self.assertIsNone(self.connection.execute("SELECT 1 FROM sessions WHERE token = ?", ("stale-branch-session",)).fetchone())
        with self.assertRaises(server.ApiError) as context:
            server.delete_branch(self.connection, "branch-podil")
        self.assertEqual(context.exception.status, 409)

    def test_directory_resources_are_scoped_to_the_current_branch(self):
        branch = server.create_branch(self.connection, {"name": "Центр", "city": "Київ", "address": "вул. Хрещатик, 1"})
        master = server.create_master(self.connection, {"name": "Майстриня Центру", "role": "Естетистка", "focus": "Догляд", "schedule": "10:00–18:00", "color": "sage", "email": "center-master@krasunya.local", "password": "secret1"}, branch["id"])
        room = server.create_room(self.connection, {"name": "Центр · Каб. 1", "type": "Догляд", "status": "Вільний", "detail": "Лампа"}, branch["id"])
        equipment = server.create_equipment(self.connection, {"name": "Центр · LED", "type": "LED-терапія", "room": room["name"], "status": "Готове"}, branch["id"])
        procedure = server.create_procedure(self.connection, {"name": "Центр · Glow", "category": "Догляд", "price": 900, "resourcePlan": [{"name": "LED", "duration": 30, "master": master["name"], "room": room["name"], "equipment": equipment["name"]}]}, branch["id"])

        center_state = server.filter_state_for_user(server.read_state(self.connection), {"branchId": branch["id"], "role": "admin"})
        podil_state = server.filter_state_for_user(server.read_state(self.connection), {"branchId": "branch-podil", "role": "admin"})
        self.assertEqual([item["name"] for item in center_state["masters"]], [master["name"]])
        self.assertEqual([item["name"] for item in center_state["rooms"]], [room["name"]])
        self.assertEqual([item["name"] for item in center_state["equipment"]], [equipment["name"]])
        self.assertEqual([item["id"] for item in center_state["procedures"]], [procedure["id"]])
        self.assertNotIn(master["name"], [item["name"] for item in podil_state["masters"]])
        self.assertNotIn(room["name"], [item["name"] for item in podil_state["rooms"]])

    def test_krasunya_one_has_catalog_and_universal_resource_options(self):
        branch = self.connection.execute("SELECT * FROM branches WHERE id = ?", (server.KRASUNYA_ONE_BRANCH_ID,)).fetchone()
        self.assertEqual(branch["name"], "Красуня 1")
        self.assertEqual(branch["city"], "Харків")
        masters = self.connection.execute("SELECT name FROM masters WHERE branch_id = ? ORDER BY name", (server.KRASUNYA_ONE_BRANCH_ID,)).fetchall()
        rooms = self.connection.execute("SELECT name FROM rooms WHERE branch_id = ? ORDER BY name", (server.KRASUNYA_ONE_BRANCH_ID,)).fetchall()
        procedures = self.connection.execute("SELECT * FROM procedures WHERE branch_id = ?", (server.KRASUNYA_ONE_BRANCH_ID,)).fetchall()
        self.assertEqual(len(masters), 3)
        self.assertEqual(len(rooms), 3)
        self.assertEqual(len(procedures), len(server.KRASUNYA_ONE_PROCEDURES))
        for procedure in procedures:
            stage = server.json.loads(procedure["resource_plan_json"])[0]
            self.assertCountEqual(stage["masterOptions"], [row["name"] for row in masters])
            self.assertCountEqual(stage["roomOptions"], [row["name"] for row in rooms])
            self.assertEqual(procedure["relation"], "3 майстри · 3 кабінети")

    def test_current_branch_can_be_deleted_after_records_are_removed(self):
        branch = server.create_branch(self.connection, {"name": "Тимчасова", "city": "Київ", "address": "вул. Тестова, 1"})
        token, user = server.login_user(self.connection, {"role": "admin", "userId": "admin-001", "password": server.DEMO_PASSWORD, "branchId": branch["id"]})
        fallback = self.connection.execute("SELECT id FROM branches WHERE id != ? ORDER BY city, name LIMIT 1", (branch["id"],)).fetchone()["id"]
        server.delete_branch(self.connection, branch["id"], branch["id"], "admin-001")
        session = self.connection.execute("SELECT branch_id FROM sessions WHERE token = ?", (token,)).fetchone()
        self.assertEqual(session["branch_id"], fallback)
        self.assertIsNone(self.connection.execute("SELECT 1 FROM branches WHERE id = ?", (branch["id"],)).fetchone())

    def test_closing_branch_archives_operational_data_and_blocks_new_work(self):
        branch = server.create_branch(self.connection, {"name": "Закриття", "city": "Київ", "address": "вул. Архівна, 1"})
        master = server.create_master(self.connection, {"name": "Майстриня Архіву", "role": "Естетистка", "focus": "Догляд", "schedule": "10:00–18:00", "color": "sage", "email": "archive-master@krasunya.local", "password": "secret1"}, branch["id"])
        room = server.create_room(self.connection, {"name": "Архів · Каб. 1", "type": "Догляд", "status": "Вільний", "detail": "Лампа"}, branch["id"])
        equipment = server.create_equipment(self.connection, {"name": "Архів · LED", "type": "LED-терапія", "room": room["name"], "status": "Готове"}, branch["id"])
        procedure = server.create_procedure(self.connection, {"name": "Архів · Glow", "category": "Догляд", "price": 900, "resourcePlan": [{"name": "LED", "duration": 30, "master": master["name"], "room": room["name"], "equipment": equipment["name"]}]}, branch["id"])
        self.connection.commit()
        booking = server.create_booking(self.connection, {**self.payload(date="2026-09-06", start="10:00", end="10:30", master=master["name"], room=room["name"], equipment=equipment["name"]), "branchId": branch["id"], "service": procedure["name"]})
        slot = server.create_slot(self.connection, {"date": "2026-09-06", "branchId": branch["id"], "master": master["name"], "start": "12:00", "end": "12:30", "reason": "Перерва", "createdBy": "admin"})
        admin_token, _ = server.login_user(self.connection, {"role": "admin", "userId": "admin-001", "password": server.DEMO_PASSWORD, "branchId": branch["id"]})
        client_token, _ = server.login_user(self.connection, {"role": "client", "userId": "client-001-user", "password": server.DEMO_PASSWORD, "branchId": branch["id"]})
        closed = server.close_branch(self.connection, branch["id"])
        self.assertTrue(closed["isClosed"])
        self.assertEqual(closed["status"], server.CLOSED_BRANCH_STATUS)
        self.assertTrue(self.connection.execute("SELECT archived FROM bookings WHERE id = ?", (booking["id"],)).fetchone()[0])
        self.assertTrue(self.connection.execute("SELECT archived FROM rooms WHERE name = ? AND branch_id = ?", (room["name"], branch["id"])).fetchone()[0])
        self.assertTrue(self.connection.execute("SELECT archived FROM equipment WHERE name = ? AND branch_id = ?", (equipment["name"], branch["id"])).fetchone()[0])
        self.assertTrue(self.connection.execute("SELECT archived FROM unavailable_slots WHERE id = ?", (slot["id"],)).fetchone()[0])
        self.assertIsNotNone(self.connection.execute("SELECT 1 FROM sessions WHERE token = ?", (admin_token,)).fetchone())
        self.assertIsNone(self.connection.execute("SELECT 1 FROM sessions WHERE token = ?", (client_token,)).fetchone())
        with self.assertRaises(server.ApiError) as context:
            server.create_room(self.connection, {"name": "Новий кабінет", "type": "Догляд"}, branch["id"])
        self.assertEqual(context.exception.status, 409)
        with self.assertRaises(server.ApiError) as context:
            server.login_user(self.connection, {"role": "client", "userId": "client-001-user", "password": server.DEMO_PASSWORD, "branchId": branch["id"]})
        self.assertEqual(context.exception.status, 403)
        with self.assertRaises(server.ApiError) as context:
            server.delete_branch(self.connection, branch["id"])
        self.assertEqual(context.exception.status, 409)
        self.assertIn("архів", context.exception.message)

    def test_legacy_resource_tables_are_migrated_to_branch_scoped_keys(self):
        legacy_path = Path(self.temp_dir.name) / "legacy.sqlite3"
        legacy_connection = sqlite3.connect(legacy_path)
        self.connection.backup(legacy_connection)
        legacy_connection.execute("PRAGMA foreign_keys = OFF")
        legacy_connection.executescript(
            """
            CREATE TABLE unavailable_slots_legacy AS SELECT id, date, master, start, "end", reason, created_by FROM unavailable_slots;
            DROP TABLE unavailable_slots;
            CREATE TABLE masters_legacy AS SELECT name, role, initials, color, schedule, focus, photo FROM masters;
            DROP TABLE masters;
            ALTER TABLE masters_legacy RENAME TO masters;
            CREATE TABLE rooms_legacy AS SELECT name, type, status, detail FROM rooms;
            DROP TABLE rooms;
            ALTER TABLE rooms_legacy RENAME TO rooms;
            CREATE TABLE equipment_legacy AS SELECT name, type, room, status FROM equipment;
            DROP TABLE equipment;
            ALTER TABLE equipment_legacy RENAME TO equipment;
            ALTER TABLE unavailable_slots_legacy RENAME TO unavailable_slots;
            """
        )
        legacy_connection.close()

        original_db_path = server.DB_PATH
        server.DB_PATH = legacy_path
        try:
            server.init_db()
            migrated = server.connect()
            try:
                for table in ("masters", "rooms", "equipment"):
                    primary = [row[1] for row in migrated.execute(f"PRAGMA table_info({table})") if row[5]]
                    self.assertEqual(primary, ["name", "branch_id"])
                self.assertEqual(migrated.execute("SELECT branch_id FROM unavailable_slots WHERE id = 'unavailable-001'").fetchone()[0], "branch-podil")
                branch = server.create_branch(migrated, {"name": "Міграція", "city": "Київ", "address": "вул. Тестова, 2"})
                duplicate_name = server.create_master(migrated, {"name": "Ірина Мельник", "role": "Косметологиня", "focus": "Догляд", "schedule": "10:00–19:00", "color": "lilac", "email": "migration-master@krasunya.local", "password": "secret1"}, branch["id"])
                self.assertEqual(duplicate_name["branchId"], branch["id"])
            finally:
                migrated.close()
        finally:
            server.DB_PATH = original_db_path

    def test_uploaded_photo_is_validated_and_kept_as_data_url(self):
        photo = "data:image/jpeg;base64,ZmFrZQ=="
        master = server.create_master(self.connection, {"name": "Фото Майстриня", "role": "Естетистка", "focus": "Догляд", "schedule": "10:00–18:00", "color": "sage", "email": "photo@krasunya.local", "password": "secret1", "photo": photo}, "branch-podil")
        self.assertEqual(master["photo"], photo)
        with self.assertRaises(server.ApiError):
            server.create_master(self.connection, {"name": "Погане Фото", "role": "Естетистка", "focus": "Догляд", "schedule": "10:00–18:00", "color": "sage", "email": "bad-photo@krasunya.local", "password": "secret1", "photo": "data:text/html;base64,ZmFrZQ=="}, "branch-podil")

    def test_admin_can_create_master_with_login(self):
        master = server.create_master(self.connection, {"name": "Нова Майстриня", "role": "Естетистка", "focus": "Догляд", "schedule": "10:00–18:00", "color": "sage", "email": "new-master@krasunya.local", "phone": "+38 067 000 00 09", "password": "secret1"}, "branch-podil")
        self.assertEqual(master["name"], "Нова Майстриня")
        token, user = server.login_user(self.connection, {"role": "master", "userId": self.connection.execute("SELECT id FROM users WHERE email = ?", ("new-master@krasunya.local",)).fetchone()[0], "password": "secret1", "branchId": "branch-podil"})
        self.assertTrue(token)
        self.assertEqual(user["masterName"], "Нова Майстриня")

    def test_master_cannot_be_deleted_while_referenced(self):
        with self.assertRaises(server.ApiError) as context:
            server.delete_master(self.connection, "Ірина Мельник")
        self.assertEqual(context.exception.status, 409)

    def test_directory_crud_and_password_change(self):
        room = server.create_room(self.connection, {"name": "Каб. Тест", "type": "Тестова зона", "status": "Вільний", "detail": "Лампа"})
        equipment = server.create_equipment(self.connection, {"name": "Обладнання Тест", "type": "Діагностика", "room": room["name"], "status": "Готове"})
        procedure = server.create_procedure(self.connection, {"name": "Процедура Тест", "category": "Тести", "price": 500, "resourcePlan": [{"name": "Етап тест", "duration": 30, "master": "Ірина Мельник", "room": room["name"], "equipment": equipment["name"]}]})
        self.assertEqual(procedure["duration"], "0 год 30 хв")
        server.update_procedure(self.connection, procedure["id"], {"name": "Процедура Тест 2", "category": "Тести", "price": 600, "resourcePlan": procedure["resourcePlan"]})
        server.delete_procedure(self.connection, procedure["id"])
        server.delete_equipment(self.connection, equipment["name"])
        server.delete_room(self.connection, room["name"])
        token, user = server.login_user(self.connection, {"role": "admin", "userId": "admin-001", "password": server.DEMO_PASSWORD, "branchId": "branch-podil"})
        server.change_password(self.connection, user["id"], token, {"currentPassword": server.DEMO_PASSWORD, "newPassword": "new-demo", "confirmPassword": "new-demo"})
        server.login_user(self.connection, {"role": "admin", "userId": "admin-001", "password": "new-demo", "branchId": "branch-podil"})


if __name__ == "__main__":
    unittest.main()
