"""Vercel serverless adapter for the Krasunya HTTP handler."""

from pathlib import Path

import server


# Vercel's deployment filesystem is read-only. The backend uses the managed
# PostgreSQL URL when it is configured and keeps SQLite only as a local/demo
# fallback for development.
server.DB_PATH = Path("/tmp/krasunya.sqlite3")
server.init_db()

# Vercel discovers Python functions through a lowercase `handler` class.
handler = server.Handler
