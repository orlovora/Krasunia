"""Vercel serverless adapter for the Krasunya HTTP handler."""

from http.server import BaseHTTPRequestHandler

import server


# Vercel statically detects Python Functions from an explicit handler class.
# The actual route implementation stays in server.py so local and hosted
# requests share the same validation and persistence code.
server.init_db()


class handler(BaseHTTPRequestHandler):
    """Expose the shared backend methods through Vercel's Python runtime."""

    def do_GET(self):
        return server.Handler.do_GET(self)

    def do_POST(self):
        return server.Handler.do_POST(self)

    do_PATCH = server.Handler.do_PATCH
    do_PUT = server.Handler.do_PUT
    do_DELETE = server.Handler.do_DELETE
    mutate = server.Handler.mutate
    send_json = server.Handler.send_json
    read_json = server.Handler.read_json
    handle_api_error = server.Handler.handle_api_error
    log_message = server.Handler.log_message
