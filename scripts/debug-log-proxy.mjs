import http from "node:http";

const ListenPort = 7242;
const ForwardBaseUrl = "http://host.docker.internal:7242";

function sendLog(payload) {
  // #region agent log
  fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
  // #endregion agent log
}

const server = http.createServer((request, response) => {
  // Only proxy POST (what we use for ingest). Everything else: 404.
  if (!request.url || request.method !== "POST") {
    response.statusCode = 404;
    response.end("not found");
    return;
  }

  const forwardUrl = new URL(request.url, ForwardBaseUrl).toString();

  let body = "";
  request.on("data", (chunk) => {
    body += chunk.toString("utf8");
    if (body.length > 1_000_000) request.destroy(); // basic safety limit
  });

  request.on("end", async () => {
    try {
      const forwardResponse = await fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      response.statusCode = forwardResponse.status;
      response.end();
    } catch (error) {
      // Never break the app because of debug logging.
      response.statusCode = 502;
      response.end();

      sendLog({
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "H3",
        location: "scripts/debug-log-proxy.mjs:46",
        message: "debug log proxy forward failed",
        data: { error: String(error) },
        timestamp: Date.now(),
      });
    }
  });
});

server.listen(ListenPort, "127.0.0.1");





