import { Buffer } from "node:buffer";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, "data");
const sqlitePath = path.join(dataDirectory, "database.sqlite");
const legacyJsonPath = path.join(dataDirectory, "database.json");
const consultationPackages = new Set(["basic", "premium", "onsite"]);

const ensureDataDirectory = () => {
  mkdirSync(dataDirectory, { recursive: true });
};

ensureDataDirectory();

const database = new DatabaseSync(sqlitePath);

database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 30000;
    PRAGMA foreign_keys = ON;

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
    );

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
    );
`);

const checkpointDatabase = () => {
  try {
    database.exec("PRAGMA wal_checkpoint(TRUNCATE);");
  } catch {
    // Some SQLite viewers keep the WAL busy; the write is already committed.
  }
};

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
};

const createId = (prefix) => {
  const randomChunk = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now()}_${randomChunk}`;
};

const normalizeText = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
};

const normalizeOptionalNumber = (value) => {
  if (value === "" || value === null || typeof value === "undefined") {
    return null;
  }
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const createValidationError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const parseRequestBody = async (request) => {
  const bodyChunks = [];
  for await (const chunk of request) {
    bodyChunks.push(chunk);
  }
  if (!bodyChunks.length) {
    return {};
  }
  try {
    return JSON.parse(Buffer.concat(bodyChunks).toString("utf8"));
  } catch {
    throw createValidationError("The request body must be valid JSON.");
  }
};

const getDateString = (value) => {
  const normalizedValue = normalizeText(value);
  if (!normalizedValue) {
    return "";
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    throw createValidationError("Dates must use the YYYY-MM-DD format.");
  }
  return normalizedValue;
};

const parseStoredJson = (value, fallbackValue) => {
  if (!value) {
    return fallbackValue;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallbackValue;
  }
};

const validateContactRequest = (payload) => {
  const record = {
    id: normalizeText(payload.id) || createId("contact"),
    createdAt: normalizeText(payload.createdAt) || new Date().toISOString(),
    name: normalizeText(payload.name),
    email: normalizeText(payload.email),
    phone: normalizeText(payload.phone),
    eventType: normalizeText(payload.eventType),
    eventDate: getDateString(payload.eventDate),
    budget: normalizeText(payload.budget),
    howDidYouHear: normalizeText(payload.howDidYouHear),
    message: normalizeText(payload.message),
  };

  if (!record.name || !record.email || !record.phone || !record.message) {
    throw createValidationError(
      "Name, email, phone, and message are required.",
    );
  }

  return record;
};

const validateConsultation = (payload) => {
  const topics = Array.isArray(payload.topics ?? payload.selectedTopics)
    ? (payload.topics ?? payload.selectedTopics)
        .map((topic) => normalizeText(topic))
        .filter(Boolean)
    : [];

  const teamMemberSource = payload.selectedTeamMember;
  const record = {
    id: normalizeText(payload.id) || createId("consultation"),
    createdAt: normalizeText(payload.createdAt) || new Date().toISOString(),
    name: normalizeText(payload.name),
    email: normalizeText(payload.email),
    phone: normalizeText(payload.phone),
    selectedPackage: normalizeText(payload.selectedPackage),
    selectedDate: getDateString(payload.selectedDate),
    selectedTime: normalizeText(payload.selectedTime),
    selectedTopics: topics,
    selectedTeamMember: teamMemberSource
      ? {
          id: normalizeText(teamMemberSource.id),
          name: normalizeText(teamMemberSource.name),
          role: normalizeText(teamMemberSource.role),
        }
      : null,
    eventDate: getDateString(payload.eventDate),
    guestCount: normalizeOptionalNumber(payload.guestCount),
    venue: normalizeText(payload.venue),
    message: normalizeText(payload.message),
  };

  if (!record.name || !record.email || !record.phone) {
    throw createValidationError("Name, email, and phone are required.");
  }

  if (!consultationPackages.has(record.selectedPackage)) {
    throw createValidationError("Please choose a valid consultation package.");
  }

  if (!record.selectedDate || !record.selectedTime) {
    throw createValidationError("Please choose a consultation date and time.");
  }

  if (!record.selectedTopics.length) {
    throw createValidationError(
      "Please choose at least one consultation topic.",
    );
  }

  return record;
};

const mapContactRequestRow = (row) => ({
  id: row.id,
  createdAt: row.created_at,
  name: row.name,
  email: row.email,
  phone: row.phone,
  eventType: row.event_type || "",
  eventDate: row.event_date || "",
  budget: row.budget || "",
  howDidYouHear: row.how_did_you_hear || "",
  message: row.message || "",
});

const mapConsultationRow = (row) => ({
  id: row.id,
  createdAt: row.created_at,
  name: row.name,
  email: row.email,
  phone: row.phone,
  selectedPackage: row.selected_package,
  selectedDate: row.selected_date,
  selectedTime: row.selected_time,
  selectedTopics: parseStoredJson(row.selected_topics, []),
  selectedTeamMember: parseStoredJson(row.selected_team_member, null),
  eventDate: row.event_date || "",
  guestCount: row.guest_count,
  venue: row.venue || "",
  message: row.message || "",
});

const insertContactRequest = (record, options = {}) => {
  const statement = database.prepare(`
        INSERT ${options.ignoreConflicts ? "OR IGNORE " : ""}INTO contact_requests (
            id,
            created_at,
            name,
            email,
            phone,
            event_type,
            event_date,
            budget,
            how_did_you_hear,
            message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

  const result = statement.run(
    record.id,
    record.createdAt,
    record.name,
    record.email,
    record.phone,
    record.eventType || null,
    record.eventDate || null,
    record.budget || null,
    record.howDidYouHear || null,
    record.message,
  );

  checkpointDatabase();
  return result;
};

const insertConsultation = (record, options = {}) => {
  const statement = database.prepare(`
        INSERT ${options.ignoreConflicts ? "OR IGNORE " : ""}INTO consultations (
            id,
            created_at,
            name,
            email,
            phone,
            selected_package,
            selected_date,
            selected_time,
            selected_topics,
            selected_team_member,
            event_date,
            guest_count,
            venue,
            message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

  try {
    const result = statement.run(
      record.id,
      record.createdAt,
      record.name,
      record.email,
      record.phone,
      record.selectedPackage,
      record.selectedDate,
      record.selectedTime,
      JSON.stringify(record.selectedTopics),
      record.selectedTeamMember
        ? JSON.stringify(record.selectedTeamMember)
        : null,
      record.eventDate || null,
      record.guestCount,
      record.venue || null,
      record.message || null,
    );

    checkpointDatabase();
    return result;
  } catch (error) {
    if (
      !options.ignoreConflicts &&
      typeof error.message === "string" &&
      error.message.includes(
        "UNIQUE constraint failed: consultations.selected_date, consultations.selected_time",
      )
    ) {
      throw createValidationError(
        "That consultation slot has already been booked. Please choose another time.",
        409,
      );
    }
    throw error;
  }
};

const listContactRequests = () =>
  database
    .prepare(
      `
            SELECT
                id,
                created_at,
                name,
                email,
                phone,
                event_type,
                event_date,
                budget,
                how_did_you_hear,
                message
            FROM contact_requests
            ORDER BY created_at DESC
        `,
    )
    .all()
    .map(mapContactRequestRow);

const listConsultations = (selectedDate = "") => {
  const query = selectedDate
    ? database.prepare(`
            SELECT
                id,
                created_at,
                name,
                email,
                phone,
                selected_package,
                selected_date,
                selected_time,
                selected_topics,
                selected_team_member,
                event_date,
                guest_count,
                venue,
                message
            FROM consultations
            WHERE selected_date = ?
            ORDER BY created_at DESC
        `)
    : database.prepare(`
            SELECT
                id,
                created_at,
                name,
                email,
                phone,
                selected_package,
                selected_date,
                selected_time,
                selected_topics,
                selected_team_member,
                event_date,
                guest_count,
                venue,
                message
            FROM consultations
            ORDER BY created_at DESC
        `);

  const rows = selectedDate ? query.all(selectedDate) : query.all();
  return rows.map(mapConsultationRow);
};

const getDatabaseCounts = () => ({
  contactRequests: database
    .prepare("SELECT COUNT(*) AS count FROM contact_requests")
    .get().count,
  consultations: database
    .prepare("SELECT COUNT(*) AS count FROM consultations")
    .get().count,
});

const migrateLegacyJsonData = () => {
  if (!existsSync(legacyJsonPath)) {
    return;
  }

  try {
    const rawLegacyData = readFileSync(legacyJsonPath, "utf8");
    const parsedLegacyData = JSON.parse(rawLegacyData);
    const contacts = Array.isArray(parsedLegacyData.contactRequests)
      ? parsedLegacyData.contactRequests
      : [];
    const consultations = Array.isArray(parsedLegacyData.consultations)
      ? parsedLegacyData.consultations
      : [];

    let migratedContacts = 0;
    let migratedConsultations = 0;

    for (const contact of contacts) {
      try {
        const result = insertContactRequest(validateContactRequest(contact), {
          ignoreConflicts: true,
        });
        migratedContacts += result.changes;
      } catch {
        // Ignore malformed legacy rows so the server can still boot.
      }
    }

    for (const consultation of consultations) {
      try {
        const result = insertConsultation(validateConsultation(consultation), {
          ignoreConflicts: true,
        });
        migratedConsultations += result.changes;
      } catch {
        // Ignore malformed legacy rows so the server can still boot.
      }
    }

    if (migratedContacts || migratedConsultations) {
      console.log(
        `Migrated ${migratedContacts} contact requests and ${migratedConsultations} consultations from legacy JSON storage.`,
      );
    }
  } catch (error) {
    console.warn(
      "Legacy JSON migration was skipped because the file could not be read.",
    );
    console.warn(error);
  }
};

migrateLegacyJsonData();

process.on("exit", () => {
  database.close();
});

const saveContactRequest = (payload) => {
  const record = validateContactRequest(payload);
  insertContactRequest(record);
  return record;
};

const saveConsultation = (payload) => {
  const record = validateConsultation(payload);
  insertConsultation(record);
  return record;
};

// MIME type map for serving static frontend files
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
};

const serveStaticFile = async (response, urlPathname) => {
  const distDir = path.join(__dirname, "../dist");

  // For paths with no file extension, serve index.html (SPA routing)
  const hasExtension = path.extname(urlPathname) !== "";
  const filePath = hasExtension
    ? path.join(distDir, urlPathname)
    : path.join(distDir, "index.html");

  try {
    const fileContent = await readFile(filePath);
    const ext = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
    });
    response.end(fileContent);
    return true;
  } catch {
    // Try falling back to index.html for unknown paths
    try {
      const indexContent = await readFile(path.join(distDir, "index.html"));
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(indexContent);
      return true;
    } catch {
      return false;
    }
  }
};

const startServer = async () => {
  const server = createServer(async (request, response) => {
    if (!request.url) {
      sendJson(response, 400, { message: "The request URL is missing." });
      return;
    }

    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      });
      response.end();
      return;
    }

    const port = Number(process.env.PORT) || 8010;
    const url = new URL(
      request.url,
      `https://dec-main-14or.onrender.com/${port}`,
    );

    try {
      if (request.method === "GET" && url.pathname === "/api/health") {
        sendJson(response, 200, {
          status: "ok",
          databaseType: "sqlite",
          databasePath: sqlitePath,
          counts: getDatabaseCounts(),
        });
        return;
      }

      if (
        request.method === "GET" &&
        url.pathname === "/api/contact-requests"
      ) {
        sendJson(response, 200, {
          items: listContactRequests(),
        });
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/consultations") {
        const requestedDate = getDateString(url.searchParams.get("date"));
        sendJson(response, 200, {
          items: listConsultations(requestedDate),
        });
        return;
      }

      if (
        request.method === "POST" &&
        url.pathname === "/api/contact-requests"
      ) {
        const payload = await parseRequestBody(request);
        const record = saveContactRequest(payload);

        sendJson(response, 201, {
          message:
            "Thank you for reaching out! We've saved your message and will get back to you within 24 hours.",
          item: record,
        });
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/consultations") {
        const payload = await parseRequestBody(request);
        const record = saveConsultation(payload);

        sendJson(response, 201, {
          message:
            "Your consultation has been booked successfully! We've saved your details and reserved the selected slot.",
          item: record,
        });
        return;
      }

      // Serve frontend static files for all non-API routes
      const served = await serveStaticFile(response, url.pathname);
      if (!served) {
        sendJson(response, 404, {
          message: "Frontend not found. Make sure stewDec/dist exists.",
        });
      }
    } catch (error) {
      if (
        typeof error.message === "string" &&
        error.message.toLowerCase().includes("database is locked")
      ) {
        sendJson(response, 503, {
          message: "The database is busy. Please try again in a moment.",
        });
        return;
      }

      const statusCode = error.statusCode ?? 500;
      sendJson(response, statusCode, {
        message:
          error.message || "Something went wrong while processing the request.",
      });
    }
  });

  const port = Number(process.env.PORT) || 8010;

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Stop the old backend process and run the command again.`,
      );
      process.exit(1);
      return;
    }
    console.error("The backend server failed to start.");
    console.error(error);
    process.exit(1);
  });

  // ✅ FIXED: Listen on 0.0.0.0 so Render can route traffic to the server
  server.listen(port, "0.0.0.0", () => {
    console.log(`Backend database server running on http://0.0.0.0:${port}`);
    console.log(`SQLite database file: ${sqlitePath}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start backend database server.");
  console.error(error);
  process.exitCode = 1;
});
