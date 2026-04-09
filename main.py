from __future__ import annotations

import json
import mimetypes
import re
import sqlite3
import traceback
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs
import os

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "stewDec" / "dist"          # Frontend build output
DATA_DIR = Path(os.environ.get("DATA_DIR", "/tmp/dec_data"))
DATABASE_PATH = DATA_DIR / "database.sqlite"

CONSULTATION_PACKAGES = {"basic", "premium", "onsite"}
SQLITE_TIMEOUT_SECONDS = 30
SQLITE_BUSY_TIMEOUT_MS = 30_000


@dataclass
class HttpError(Exception):
    message: str
    status_code: int = 400


# ── Database ──────────────────────────────────────────────────────────────────

def ensure_database() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DATABASE_PATH, timeout=SQLITE_TIMEOUT_SECONDS) as connection:
        connection.execute(f"PRAGMA busy_timeout = {SQLITE_BUSY_TIMEOUT_MS};")
        connection.execute("PRAGMA journal_mode = WAL;")
        connection.execute("PRAGMA foreign_keys = ON;")
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS contact_requests (
                id TEXT PRIMARY KEY,
                created_at TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                event_type TEXT,
                event_date TEXT,
                budget TEXT,
                how_did_you_hear TEXT,
                message TEXT NOT NULL
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS consultations (
                id TEXT PRIMARY KEY,
                created_at TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                selected_package TEXT NOT NULL,
                selected_date TEXT NOT NULL,
                selected_time TEXT NOT NULL,
                selected_topics TEXT NOT NULL,
                selected_team_member TEXT,
                event_date TEXT,
                guest_count INTEGER,
                venue TEXT,
                message TEXT,
                UNIQUE (selected_date, selected_time)
            )
            """
        )
        connection.commit()


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH, timeout=SQLITE_TIMEOUT_SECONDS)
    connection.execute(f"PRAGMA busy_timeout = {SQLITE_BUSY_TIMEOUT_MS};")
    connection.row_factory = sqlite3.Row
    return connection


# ── Helpers ───────────────────────────────────────────────────────────────────

def normalize_text(value: Any) -> str:
    if not isinstance(value, str):
        return ""
    return value.strip()


def normalize_optional_number(value: Any) -> int | None:
    if value in ("", None):
        return None
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def get_date_string(value: Any) -> str:
    normalized = normalize_text(value)
    if not normalized:
        return ""
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", normalized):
        raise HttpError("Dates must use the YYYY-MM-DD format.")
    return normalized


def create_id(prefix: str) -> str:
    return f"{prefix}_{int(datetime.now(tz=timezone.utc).timestamp() * 1000)}_{uuid.uuid4().hex[:8]}"


def utc_now_iso() -> str:
    return datetime.now(tz=timezone.utc).isoformat()


def parse_json_body(raw_body: bytes) -> dict[str, Any]:
    if not raw_body:
        return {}
    try:
        return json.loads(raw_body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise HttpError("The request body must be valid JSON.") from exc


# ── Validation ────────────────────────────────────────────────────────────────

def validate_contact_request(payload: dict[str, Any]) -> dict[str, Any]:
    record = {
        "id": normalize_text(payload.get("id")) or create_id("contact"),
        "createdAt": normalize_text(payload.get("createdAt")) or utc_now_iso(),
        "name": normalize_text(payload.get("name")),
        "email": normalize_text(payload.get("email")),
        "phone": normalize_text(payload.get("phone")),
        "eventType": normalize_text(payload.get("eventType")),
        "eventDate": get_date_string(payload.get("eventDate")),
        "budget": normalize_text(payload.get("budget")),
        "howDidYouHear": normalize_text(payload.get("howDidYouHear")),
        "message": normalize_text(payload.get("message")),
    }
    if not record["name"] or not record["email"] or not record["phone"] or not record["message"]:
        raise HttpError("Name, email, phone, and message are required.")
    return record


def validate_consultation(payload: dict[str, Any]) -> dict[str, Any]:
    topics_source = payload.get("topics", payload.get("selectedTopics", []))
    topics = [normalize_text(t) for t in topics_source if normalize_text(t)]
    team_member = payload.get("selectedTeamMember")
    record = {
        "id": normalize_text(payload.get("id")) or create_id("consultation"),
        "createdAt": normalize_text(payload.get("createdAt")) or utc_now_iso(),
        "name": normalize_text(payload.get("name")),
        "email": normalize_text(payload.get("email")),
        "phone": normalize_text(payload.get("phone")),
        "selectedPackage": normalize_text(payload.get("selectedPackage")),
        "selectedDate": get_date_string(payload.get("selectedDate")),
        "selectedTime": normalize_text(payload.get("selectedTime")),
        "selectedTopics": topics,
        "selectedTeamMember": {
            "id": normalize_text(team_member.get("id")),
            "name": normalize_text(team_member.get("name")),
            "role": normalize_text(team_member.get("role")),
        } if isinstance(team_member, dict) else None,
        "eventDate": get_date_string(payload.get("eventDate")),
        "guestCount": normalize_optional_number(payload.get("guestCount")),
        "venue": normalize_text(payload.get("venue")),
        "message": normalize_text(payload.get("message")),
    }
    if not record["name"] or not record["email"] or not record["phone"]:
        raise HttpError("Name, email, and phone are required.")
    if record["selectedPackage"] not in CONSULTATION_PACKAGES:
        raise HttpError("Please choose a valid consultation package.")
    if not record["selectedDate"] or not record["selectedTime"]:
        raise HttpError("Please choose a consultation date and time.")
    if not record["selectedTopics"]:
        raise HttpError("Please choose at least one consultation topic.")
    return record


# ── Row mappers ───────────────────────────────────────────────────────────────

def map_contact_row(row: sqlite3.Row) -> dict[str, Any]:
    return {
        "id": row["id"],
        "createdAt": row["created_at"],
        "name": row["name"],
        "email": row["email"],
        "phone": row["phone"],
        "eventType": row["event_type"] or "",
        "eventDate": row["event_date"] or "",
        "budget": row["budget"] or "",
        "howDidYouHear": row["how_did_you_hear"] or "",
        "message": row["message"] or "",
    }


def parse_stored_json(value: str | None, fallback_value: Any) -> Any:
    if not value:
        return fallback_value
    try:
        return json.loads(value)
    except (TypeError, json.JSONDecodeError):
        return fallback_value


def map_consultation_row(row: sqlite3.Row) -> dict[str, Any]:
    return {
        "id": row["id"],
        "createdAt": row["created_at"],
        "name": row["name"],
        "email": row["email"],
        "phone": row["phone"],
        "selectedPackage": row["selected_package"],
        "selectedDate": row["selected_date"],
        "selectedTime": row["selected_time"],
        "selectedTopics": parse_stored_json(row["selected_topics"], []),
        "selectedTeamMember": parse_stored_json(row["selected_team_member"], None),
        "eventDate": row["event_date"] or "",
        "guestCount": row["guest_count"],
        "venue": row["venue"] or "",
        "message": row["message"] or "",
    }


# ── DB queries ────────────────────────────────────────────────────────────────

def list_contact_requests() -> list[dict[str, Any]]:
    with get_connection() as connection:
        rows = connection.execute(
            "SELECT * FROM contact_requests ORDER BY created_at DESC"
        ).fetchall()
    return [map_contact_row(row) for row in rows]


def list_consultations(selected_date: str = "") -> list[dict[str, Any]]:
    with get_connection() as connection:
        if selected_date:
            rows = connection.execute(
                "SELECT * FROM consultations WHERE selected_date = ? ORDER BY created_at DESC",
                (selected_date,),
            ).fetchall()
        else:
            rows = connection.execute(
                "SELECT * FROM consultations ORDER BY created_at DESC"
            ).fetchall()
    return [map_consultation_row(row) for row in rows]


def database_counts() -> dict[str, int]:
    with get_connection() as connection:
        contacts = connection.execute("SELECT COUNT(*) FROM contact_requests").fetchone()[0]
        consultations = connection.execute("SELECT COUNT(*) FROM consultations").fetchone()[0]
    return {"contactRequests": contacts, "consultations": consultations}


def checkpoint_database(connection: sqlite3.Connection) -> None:
    try:
        connection.execute("PRAGMA wal_checkpoint(TRUNCATE);")
    except sqlite3.DatabaseError:
        pass


def create_contact_request(payload: dict[str, Any]) -> dict[str, Any]:
    record = validate_contact_request(payload)
    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO contact_requests
                (id, created_at, name, email, phone, event_type, event_date, budget, how_did_you_hear, message)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                record["id"], record["createdAt"], record["name"], record["email"],
                record["phone"], record["eventType"] or None, record["eventDate"] or None,
                record["budget"] or None, record["howDidYouHear"] or None, record["message"],
            ),
        )
        connection.commit()
        checkpoint_database(connection)
    return record


def create_consultation(payload: dict[str, Any]) -> dict[str, Any]:
    record = validate_consultation(payload)
    try:
        with get_connection() as connection:
            connection.execute(
                """
                INSERT INTO consultations (
                    id, created_at, name, email, phone, selected_package, selected_date, selected_time,
                    selected_topics, selected_team_member, event_date, guest_count, venue, message
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    record["id"], record["createdAt"], record["name"], record["email"],
                    record["phone"], record["selectedPackage"], record["selectedDate"],
                    record["selectedTime"], json.dumps(record["selectedTopics"]),
                    json.dumps(record["selectedTeamMember"]) if record["selectedTeamMember"] else None,
                    record["eventDate"] or None, record["guestCount"],
                    record["venue"] or None, record["message"] or None,
                ),
            )
            connection.commit()
            checkpoint_database(connection)
    except sqlite3.IntegrityError as exc:
        if "selected_date" in str(exc) or "selected_time" in str(exc):
            raise HttpError(
                "That consultation slot has already been booked. Please choose another time.",
                status_code=409,
            ) from exc
        raise
    return record


# ── Static file serving ───────────────────────────────────────────────────────

def get_mime_type(path: Path) -> str:
    mime, _ = mimetypes.guess_type(str(path))
    return mime or "application/octet-stream"


async def serve_static(send, file_path: Path) -> None:
    content = file_path.read_bytes()
    mime = get_mime_type(file_path)
    cache = b"public, max-age=31536000" if file_path.suffix in {".js", ".css", ".png", ".jpg", ".ico", ".woff2"} else b"no-cache"
    await send({
        "type": "http.response.start",
        "status": 200,
        "headers": [
            (b"content-type", mime.encode()),
            (b"content-length", str(len(content)).encode()),
            (b"cache-control", cache),
        ],
    })
    await send({"type": "http.response.body", "body": content})


async def serve_index(send) -> None:
    index_file = DIST_DIR / "index.html"
    if not index_file.exists():
        await send_json(send, 404, {"message": "Frontend not found. Make sure stewDec/dist exists."})
        return
    await serve_static(send, index_file)


# ── ASGI helpers ──────────────────────────────────────────────────────────────

async def read_body(receive) -> bytes:
    chunks: list[bytes] = []
    while True:
        message = await receive()
        if message["type"] != "http.request":
            continue
        chunks.append(message.get("body", b""))
        if not message.get("more_body", False):
            break
    return b"".join(chunks)


async def send_json(send, status_code: int, payload: dict[str, Any] | None = None) -> None:
    body = b"" if payload is None else json.dumps(payload).encode("utf-8")
    headers = [
        (b"content-length", str(len(body)).encode("ascii")),
        (b"access-control-allow-origin", b"*"),
        (b"access-control-allow-methods", b"GET,POST,OPTIONS"),
        (b"access-control-allow-headers", b"Content-Type"),
    ]
    if payload is not None:
        headers.insert(0, (b"content-type", b"application/json; charset=utf-8"))
    await send({"type": "http.response.start", "status": status_code, "headers": headers})
    await send({"type": "http.response.body", "body": body})


# ── Boot ──────────────────────────────────────────────────────────────────────

ensure_database()


# ── ASGI app ──────────────────────────────────────────────────────────────────

async def app(scope, receive, send) -> None:
    if scope["type"] != "http":
        return

    method = scope["method"]
    path = scope["path"]
    query_params = parse_qs(scope.get("query_string", b"").decode("utf-8"))

    if method == "OPTIONS":
        await send_json(send, 204)
        return

    try:
        # ── API routes ────────────────────────────────────────────────────────
        if path.startswith("/api/"):

            if method == "GET" and path == "/api/health":
                await send_json(send, 200, {
                    "status": "ok",
                    "databaseType": "sqlite",
                    "databasePath": str(DATABASE_PATH),
                    "counts": database_counts(),
                })
                return

            if method == "GET" and path == "/api/contact-requests":
                await send_json(send, 200, {"items": list_contact_requests()})
                return

            if method == "POST" and path == "/api/contact-requests":
                payload = parse_json_body(await read_body(receive))
                record = create_contact_request(payload)
                await send_json(send, 201, {
                    "message": "Thank you for reaching out! We will get back to you within 24 hours.",
                    "item": record,
                })
                return

            if method == "GET" and path == "/api/consultations":
                selected_date = get_date_string(query_params.get("date", [""])[0])
                await send_json(send, 200, {"items": list_consultations(selected_date)})
                return

            if method == "POST" and path == "/api/consultations":
                payload = parse_json_body(await read_body(receive))
                record = create_consultation(payload)
                await send_json(send, 201, {
                    "message": "Your consultation has been booked successfully!",
                    "item": record,
                })
                return

            await send_json(send, 404, {"message": "API route not found."})
            return

        # ── Static files (JS, CSS, images, etc.) ─────────────────────────────
        if method == "GET":
            relative = path.lstrip("/")
            static_file = DIST_DIR / relative

            if relative and static_file.is_file():
                await serve_static(send, static_file)
                return

            # All other GET requests → serve index.html (React Router support)
            await serve_index(send)
            return

        await send_json(send, 404, {"message": "Route not found."})

    except HttpError as exc:
        await send_json(send, exc.status_code, {"message": exc.message})
    except sqlite3.OperationalError as exc:
        if "database is locked" in str(exc).lower():
            await send_json(send, 503, {"message": "The database is busy. Please try again in a moment."})
            return
        traceback.print_exc()
        await send_json(send, 500, {"message": "Something went wrong while processing the request."})
    except Exception:
        traceback.print_exc()
        await send_json(send, 500, {"message": "Something went wrong while processing the request."})
