import tempfile
import unittest
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

    def test_admin_can_create_branch(self):
        branch = server.create_branch(self.connection, {"name": "Центр", "city": "Київ", "address": "вул. Хрещатик, 1", "phone": "+38 044 555 01 03", "hoursStart": "10:00", "hoursEnd": "20:00"})
        self.assertEqual(branch["city"], "Київ")
        self.assertIsNotNone(self.connection.execute("SELECT 1 FROM branches WHERE id = ?", (branch["id"],)).fetchone())


if __name__ == "__main__":
    unittest.main()
