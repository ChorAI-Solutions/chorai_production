"use client";

import Link from "next/link";
import { type ReactElement, useEffect, useState } from "react";
import { injectGoogleAdsScripts } from "@/lib/analytics/injectGoogleAds";
import {
  type CookieConsentChoice,
  readCookieConsent,
  writeCookieConsent,
} from "@/lib/cookie-consent/storage";

export default function CookieConsentBanner(): ReactElement | null {
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<CookieConsentChoice>("pending");

  useEffect(() => {
    setHydrated(true);
    const stored = readCookieConsent();
    setConsent(stored);
    if (stored === "marketing") {
      injectGoogleAdsScripts();
    }
  }, []);

  function acceptEssentialOnly(): void {
    writeCookieConsent("essential");
    setConsent("essential");
  }

  function acceptMarketing(): void {
    writeCookieConsent("marketing");
    setConsent("marketing");
    injectGoogleAdsScripts();
  }

  if (!hydrated || consent !== "pending") {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-700 bg-[#0a1525]/98 px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm md:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1 text-sm text-slate-300">
          <p id="cookie-banner-title" className="font-semibold text-slate-100">
            Cookies &amp; Marketing
          </p>
          <p id="cookie-banner-desc" className="mt-1 leading-relaxed">
            Wir nutzen nur technisch notwendige Funktionen und – mit Ihrer Einwilligung – Google Ads zur
            Messung von Werbewirkung. Details in der{" "}
            <Link href="/datenschutz" className="text-[#60a5fa] underline hover:text-[#93c5fd]">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={acceptEssentialOnly}
            className="rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800/80"
          >
            Nur notwendig
          </button>
          <button
            type="button"
            onClick={acceptMarketing}
            className="rounded-lg bg-[#3b82f6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
          >
            Marketing zulassen
          </button>
        </div>
      </div>
    </div>
  );
}
