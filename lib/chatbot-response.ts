const CANDIDATE_KEYS = [
  "reply",
  "message",
  "text",
  "output",
  "response",
  "answer",
  "content",
];

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const extractReplyText = (payload: unknown): string | undefined => {
  if (payload === null || payload === undefined) {
    return undefined;
  }

  if (typeof payload === "string") {
    const trimmed = payload.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (typeof payload === "number" || typeof payload === "boolean") {
    return String(payload);
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const result = extractReplyText(item);
      if (result) return result;
    }
    return undefined;
  }

  if (isObject(payload)) {
    for (const key of CANDIDATE_KEYS) {
      if (key in payload) {
        const result = extractReplyText(payload[key]);
        if (result) return result;
      }
    }

    for (const value of Object.values(payload)) {
      const result = extractReplyText(value);
      if (result) return result;
    }
  }

  return undefined;
};






