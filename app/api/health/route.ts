export async function GET() {
  // #region agent log
  fetch('http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'run1',hypothesisId:'H1',location:'app/api/health/route.ts:2',message:'Health endpoint hit',data:{path:'/api/health'},timestamp:Date.now()})}).catch(()=>{});
  // #endregion agent log

  // #region agent log
  // File-basiertes Logging, weil der Ingest-Server im Host nur an localhost gebunden ist (Container kann ihn nicht erreichen).
  try {
    const { logToDebugFile } = await import("@/lib/debug/logToDebugFile");
    logToDebugFile({
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "H1",
      location: "app/api/health/route.ts:9",
      message: "Health endpoint hit (file log)",
      data: { path: "/api/health" },
      timestamp: Date.now(),
    });
  } catch {
    // ignore
  }
  // #endregion agent log

  return Response.json({ status: "ok" });
}


