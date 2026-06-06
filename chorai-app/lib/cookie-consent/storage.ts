export const cookieConsentStorageKey = "chorai_cookie_consent_v1";

export type CookieConsentChoice = "pending" | "essential" | "marketing";

export function readCookieConsent(): CookieConsentChoice {
  if (typeof window === "undefined") return "pending";
  try {
    const raw = window.localStorage.getItem(cookieConsentStorageKey);
    if (!raw) return "pending";
    const parsed = JSON.parse(raw) as { marketing?: boolean };
    if (parsed.marketing === true) return "marketing";
    return "essential";
  } catch {
    return "pending";
  }
}

export function writeCookieConsent(choice: "essential" | "marketing"): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    cookieConsentStorageKey,
    JSON.stringify({ marketing: choice === "marketing", savedAt: Date.now() }),
  );
}

export function hasMarketingConsent(): boolean {
  return readCookieConsent() === "marketing";
}
