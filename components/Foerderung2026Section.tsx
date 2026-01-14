"use client";

import { motion } from "framer-motion";
import { BadgePercent, Info } from "lucide-react";
import { trackAnalyseAnfordernConversion } from "@/lib/analytics/googleAds";

function scrollToKontakt(): void {
  const kontaktElement = document.getElementById("kontakt");
  if (!kontaktElement) return;
  kontaktElement.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Foerderung2026Section() {
  const handleCtaClick = () => {
    trackAnalyseAnfordernConversion();
    scrollToKontakt();
  };

  return (
    <section id="foerderung-2026" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-50 leading-tight break-words hyphens-none tracking-tight">
            Staatliche Förderung 2026 nutzen
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto break-words hyphens-none leading-relaxed">
            Förderprogramme ändern sich – wer vorbereitet ist, gewinnt Zeit und Zuschüsse.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 md:p-10 shadow-lg shadow-black/20 ring-1 ring-white/5"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-black/20">
              <BadgePercent className="w-6 h-6 text-[#3b82f6]" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3 tracking-tight">
                Förderung statt Preisschock
              </h3>
              <p className="text-slate-300/85 text-lg leading-relaxed">
                Wir helfen Ihnen bei den Anträgen. Für Betriebe in NRW (Kreis Minden-Lübbecke, Herford) nutzen wir das
                neue &quot;MID-Programm&quot; (Start 01.01.2026). Für Niedersachsen (Schaumburg, Hameln) prüfen wir
                tagesaktuell die Nachfolgeprogramme des Digitalbonus.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCtaClick}
                  className="bg-[#3b82f6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2563eb] transition-colors shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5"
                >
                  Förderfähigkeit in meiner Region prüfen
                </button>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Info className="w-4 h-4" />
                  Kostenlos & unverbindlich – wir melden uns zeitnah.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


