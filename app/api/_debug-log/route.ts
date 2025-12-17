import { appendFile, mkdir } from "fs/promises";
import path from "path";

const LOG_PATH = "/var/www/Production/.cursor/debug.log";
const LOG_DIR = path.dirname(LOG_PATH);
const INGEST_URL =
  "http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const payload = {
    ...body,
    timestamp: Date.now(),
  };

  // Write locally
  try {
    await mkdir(LOG_DIR, { recursive: true });
    await appendFile(LOG_PATH, JSON.stringify(payload) + "\n", "utf8");
  } catch {
    // ignore logging errors
  }

  // Forward to ingest server
  try {
    await fetch(INGEST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // ignore forwarding errors
  }

  return new Response(null, { status: 204 });
}





