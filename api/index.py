"""Vercel serverless adapter for the Krasunya HTTP handler."""

from http.server import BaseHTTPRequestHandler

import server


# Vercel statically detects Python Functions from an explicit handler class.
# The actual route implementation stays in server.py so local and hosted
# requests share the same validation and persistence code.
_initialization_error = None
try:
    server.init_db()
except Exception as error:  # Keep /api/health available for safe diagnostics.
    _initialization_error = f"{type(error).__name__}: {error}"
    print(f"Krasunya database initialization failed: {_initialization_error}")


class handler(BaseHTTPRequestHandler):
    """Expose the shared backend methods through Vercel's Python runtime."""

    def do_GET(self):
        if _initialization_error and self.path.split("?", 1)[0] == "/api/health":
            body = server.json.dumps({"ok": False, "error": _initialization_error}, ensure_ascii=False).encode("utf-8")
            self.send_response(500)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return server.Handler.do_GET(self)

    do_POST = server.Handler.do_POST
    do_PATCH = server.Handler.do_PATCH
    do_PUT = server.Handler.do_PUT
    do_DELETE = server.Handler.do_DELETE
    mutate = server.Handler.mutate
    send_json = server.Handler.send_json
    read_json = server.Handler.read_json
    handle_api_error = server.Handler.handle_api_error
    log_message = server.Handler.log_message
