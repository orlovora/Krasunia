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
        server.delete_branch(self.connection, empty_branch["id"])
        self.assertIsNone(self.connection.execute("SELECT 1 FROM branches WHERE id = ?", (empty_branch["id"],)).fetchone())
        with self.assertRaises(server.ApiError) as context:
            server.delete_branch(self.connection, "branch-podil")
        self.assertEqual(context.exception.status, 409)

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
