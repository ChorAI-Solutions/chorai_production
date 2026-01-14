import fs from "node:fs";

type DebugLogPayload = {
  sessionId: string;
  runId: string;
  hypothesisId: string;
  location: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: number;
};

const DebugLogFilePath = "/var/www/Production/.cursor/debug.log";

export function logToDebugFile(payload: DebugLogPayload): void {
  try {
    fs.appendFileSync(DebugLogFilePath, `${JSON.stringify(payload)}\n`, "utf8");
  } catch {
    // Never break the app because of debug logging.
  }
}





