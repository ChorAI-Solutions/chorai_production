"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { trackAnalyseAnfordernConversion } from "@/lib/analytics/googleAds";

type SolutionLink = { label: string; href: string };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const solutionsMenuContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isSolutionsMenuOpen) return;

    const handleDocumentPointerDown = (event: PointerEvent) => {
      const container = solutionsMenuContainerRef.current;
      if (!container) return;
      if (event.target instanceof Node && container.contains(event.target)) return;
      setIsSolutionsMenuOpen(false);
    };

    document.addEventListener("pointerdown", handleDocumentPointerDown);
    return () => document.removeEventListener("pointerdown", handleDocumentPointerDown);
  }, [isSolutionsMenuOpen]);

  const solutionLinks: SolutionLink[] = useMemo(
    () => [
      { label: "KI-Beratung", href: "/loesungen/ki-beratung" },
      { label: "Prozessautomatisierung", href: "/loesungen/prozessautomatisierung" },
      { label: "KI-Agenten", href: "/loesungen/ki-agenten" },
      { label: "KI-Chatbot", href: "/loesungen/ki-chatbot" },
      { label: "KI-Telefonassistent", href: "/loesungen/ki-telefonassistent" },
    ],
    [],
  );

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[90] bg-[#0a1525] md:hidden"
          aria-hidden
        />
      )}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isMobileMenuOpen ? "z-[110]" : "z-50"
        } ${
          scrolled || isMobileMenuOpen
            ? "border-b border-slate-800 bg-[#0a1525]"
            : "bg-transparent"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-mono font-bold text-slate-300">
              CHOR
              <span className="text-[#3b82f6]">AI</span>
              <span className="cursor-blink text-[#3b82f6]">_</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#problem" className="text-slate-300 hover:text-[#3b82f6] transition-colors">
              Problem
            </Link>

            <div ref={solutionsMenuContainerRef} className="relative">
              <button
                type="button"
                className="text-slate-300 hover:text-[#3b82f6] transition-colors"
                aria-haspopup="menu"
                aria-expanded={isSolutionsMenuOpen}
                onClick={() => setIsSolutionsMenuOpen((current) => !current)}
              >
                Lösungen
              </button>

              {isSolutionsMenuOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 z-50 mt-3 w-72 rounded-xl bg-white border border-slate-200 shadow-xl shadow-black/20 px-3 py-2"
                >
                  {solutionLinks.map((solutionLink) => (
                    <Link
                      key={solutionLink.href}
                      href={solutionLink.href}
                      role="menuitem"
                      className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 transition-colors text-sm"
                      onClick={() => setIsSolutionsMenuOpen(false)}
                    >
                      {solutionLink.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            <Link href="/#ablauf" className="text-slate-300 hover:text-[#3b82f6] transition-colors">
              Ablauf
            </Link>
            <Link href="/#foerderung-2026" className="text-slate-300 hover:text-[#3b82f6] transition-colors">
              Förderung 2026
            </Link>
            <button
              onClick={() => {
                trackAnalyseAnfordernConversion();
                window.location.href = "/#kontakt";
              }}
              className="bg-[#3b82f6] text-white px-6 py-2 rounded-xl hover:bg-[#2563eb] transition-colors font-medium shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5"
            >
              Potenzial prüfen
            </button>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="bg-[#3b82f6] text-white px-4 py-2 rounded-xl hover:bg-[#2563eb] transition-colors font-medium text-sm shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              Menü
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-slate-800 bg-[#0a1525] pb-4 pt-2 shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
          >
            <div className="space-y-1">
              <Link
                href="/#problem"
                className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/40"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Problem
              </Link>

              <div className="px-3 py-2 text-slate-200 font-semibold">Lösungen</div>
              <div className="pl-3 space-y-1">
                {solutionLinks.map((solutionLink) => (
                  <Link
                    key={solutionLink.href}
                    href={solutionLink.href}
                    className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {solutionLink.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/#ablauf"
                className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/40"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ablauf
              </Link>
              <Link
                href="/#foerderung-2026"
                className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/40"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Förderung 2026
              </Link>
              <button
                type="button"
                onClick={() => {
                  trackAnalyseAnfordernConversion();
                  setIsMobileMenuOpen(false);
                  window.location.href = "/#kontakt";
                }}
                className="w-full text-left mt-2 bg-[#3b82f6] text-white px-4 py-2 rounded-xl hover:bg-[#2563eb] transition-colors font-medium text-sm shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5"
              >
                Kontakt / Potenzial prüfen
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
    </>
  );
}

