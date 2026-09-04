"""Vercel serverless adapter for the Krasunya HTTP handler."""

from http.server import BaseHTTPRequestHandler

import server
import re


# Vercel statically detects Python Functions from an explicit handler class.
# The actual route implementation stays in server.py so local and hosted
# requests share the same validation and persistence code.
_initialization_error = None
try:
    server.init_db()
except Exception as error:  # Keep /api/health available for safe diagnostics.
    _initialization_error = f"{type(error).__name__}: {error}"
    print(f"Krasunya database initialization failed: {_initialization_error}")


def _initialization_error_detail():
    """Return a short diagnostic without exposing connection credentials."""
    detail = (_initialization_error or "Неизвестная ошибка инициализации базы").splitlines()[0].strip()
    detail = re.sub(r"postgres(?:ql)?://\S+", "postgres://[redacted]", detail)
    return detail[:160]


class handler(BaseHTTPRequestHandler):
    """Expose the shared backend methods through Vercel's Python runtime."""

    def do_GET(self):
        if _initialization_error:
            self.send_json(500, {"error": "Внутрішня помилка сервера.", "details": [f"Діагностика: {_initialization_error_detail()}"]})
            return
        return server.Handler.do_GET(self)

    def do_POST(self):
        if _initialization_error:
            self.send_json(500, {"error": "Внутрішня помилка сервера.", "details": [f"Діагностика: {_initialization_error_detail()}"]})
            return
        return server.Handler.do_POST(self)

    do_PATCH = server.Handler.do_PATCH
    do_PUT = server.Handler.do_PUT
    do_DELETE = server.Handler.do_DELETE
    mutate = server.Handler.mutate
    send_json = server.Handler.send_json
    read_json = server.Handler.read_json
    handle_api_error = server.Handler.handle_api_error
    log_message = server.Handler.log_message
