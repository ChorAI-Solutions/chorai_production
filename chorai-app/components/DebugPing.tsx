"use client";

import { useEffect } from "react";

export default function DebugPing() {
  useEffect(() => {
    // #region agent log
    fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "H2",
        location: "components/DebugPing.tsx:11",
        message: "Client page loaded (reachability ping)",
        data: { pathname: typeof window !== "undefined" ? window.location.pathname : "unknown" },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log
  }, []);

  return null;
}





