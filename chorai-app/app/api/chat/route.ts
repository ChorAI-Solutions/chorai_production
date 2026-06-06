import { extractReplyText } from "@/lib/chatbot-response";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const LOG_PATH = "/var/www/Production/.cursor/debug.log";
const LOG_DIR = path.dirname(LOG_PATH);
const logToFile = async (payload: Record<string, unknown>) => {
  try {
    await mkdir(LOG_DIR, { recursive: true });
    await appendFile(LOG_PATH, JSON.stringify(payload) + "\n", "utf8");
  } catch {
    // ignore logging errors
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { message, sessionId, metadata } = body;

    // #region agent log
    fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "run2",
        hypothesisId: "H0",
        location: "app/api/chat/route.ts:entry",
        message: "Route invoked",
        data: { hasBody: !!body },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    await logToFile({
      sessionId: "debug-session",
      runId: "run2",
      hypothesisId: "H0",
      location: "app/api/chat/route.ts:entry",
      message: "Route invoked",
      data: { hasBody: !!body },
      timestamp: Date.now(),
    });
    // #endregion

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!sessionId || typeof sessionId !== "string") {
      return Response.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_CHATBOT_WEBHOOK_URL;
    if (!webhookUrl) {
      return Response.json(
        { error: "Webhook URL not configured on server" },
        { status: 500 }
      );
    }

    const payload = {
      chatInput: message,
      action: "sendMessage",
      sessionId,
      metadata: typeof metadata === "object" && metadata ? metadata : undefined,
    };

    // #region agent log
    fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "run2",
        hypothesisId: "H1",
        location: "app/api/chat/route.ts:payload",
        message: "Outgoing payload to n8n",
        data: { hasMessage: !!message, hasSessionId: !!sessionId },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    await logToFile({
      sessionId: "debug-session",
      runId: "run2",
      hypothesisId: "H1",
      location: "app/api/chat/route.ts:payload",
      message: "Outgoing payload to n8n",
      data: { hasMessage: !!message, hasSessionId: !!sessionId },
      timestamp: Date.now(),
    });
    // #endregion

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // #region agent log
    fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "run2",
        hypothesisId: "H2",
        location: "app/api/chat/route.ts:responseStatus",
        message: "n8n response status",
        data: { status: res.status },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    await logToFile({
      sessionId: "debug-session",
      runId: "run2",
      hypothesisId: "H2",
      location: "app/api/chat/route.ts:responseStatus",
      message: "n8n response status",
      data: { status: res.status },
      timestamp: Date.now(),
    });
    // #endregion

    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");

      if (errorText.includes("<html")) {
        return Response.json(
          {
            error:
              "n8n workflow error - check n8n workflow configuration",
            details: "Received HTML error page",
          },
          { status: res.status }
        );
      }

      return Response.json(
        { error: "Failed to get response from chatbot", details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json().catch(() => ({}));
    const reply =
      extractReplyText(data) ||
      "Entschuldigung, ich konnte keine Antwort generieren.";

    // #region agent log
    fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "run2",
        hypothesisId: "H3",
        location: "app/api/chat/route.ts:reply",
        message: "Parsed reply from n8n",
        data: {
          replyPresent: !!reply,
          topLevelKeys:
            data && typeof data === "object"
              ? Object.keys(data as Record<string, unknown>).slice(0, 6)
              : [],
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    await logToFile({
      sessionId: "debug-session",
      runId: "run2",
      hypothesisId: "H3",
      location: "app/api/chat/route.ts:reply",
      message: "Parsed reply from n8n",
      data: {
        replyPresent: !!reply,
        topLevelKeys:
          data && typeof data === "object"
            ? Object.keys(data as Record<string, unknown>).slice(0, 6)
            : [],
      },
      timestamp: Date.now(),
    });
    // #endregion

    return Response.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
