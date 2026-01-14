"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, MapPinned } from "lucide-react";
import FoerderungContact from "@/components/FoerderungContact";
import { trackAnalyseAnfordernConversion } from "@/lib/analytics/googleAds";

function scrollToKontakt(): void {
  const kontaktElement = document.getElementById("kontakt");
  if (!kontaktElement) return;
  kontaktElement.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function FoerderungContent() {
  const handlePrimaryCtaClick = () => {
    trackAnalyseAnfordernConversion();
    scrollToKontakt();
  };

  return (
    <>
      <section
        id="problem"
        className="min-h-screen flex items-center justify-center relative overflow-hidden overflow-x-hidden pt-16 pb-20 sm:pb-24 w-full max-w-full min-w-0"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="absolute top-20 right-20 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-4xl mx-auto"
          >
            <h1 className="text-[clamp(1.6rem,6.2vw,3.1rem)] sm:text-4xl md:text-6xl font-extrabold mb-6 text-slate-50 leading-tight break-words hyphens-none tracking-tight">
              Bis zu <span className="text-[#3b82f6]">50%</span> vom Staat zurückholen.
            </h1>
            <p className="text-[clamp(1rem,3.6vw,1.15rem)] sm:text-lg md:text-2xl text-slate-300/90 mb-10 max-w-3xl mx-auto leading-relaxed break-words hyphens-none">
              Digitalisierung ist teuer. <span className="text-slate-200 font-semibold">Nichts tun ist teurer.</span>{" "}
              Wir sorgen dafür, dass der Staat Ihre Rechnung bezahlt.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrimaryCtaClick}
                className="bg-[#3b82f6] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-[clamp(0.95rem,3.8vw,1.05rem)] sm:text-lg font-semibold hover:bg-[#2563eb] transition-colors shadow-lg shadow-[#3b82f6]/25 ring-1 ring-white/5 w-full sm:w-auto max-w-[70vw]"
              >
                Förder-Check jetzt sichern
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("vergleich")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-[#3b82f6]/70 text-[#93c5fd] px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-[clamp(0.95rem,3.8vw,1.05rem)] sm:text-lg font-semibold hover:bg-[#3b82f6]/10 transition-colors ring-1 ring-white/5 w-full sm:w-auto max-w-[70vw]"
              >
                Förderprogramme vergleichen
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          >
            <div className="flex flex-col items-center text-center bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 shadow-lg shadow-black/20 ring-1 ring-white/5">
              <div className="w-14 h-14 bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-xl flex items-center justify-center mb-4 shadow-sm shadow-black/20">
                <MapPinned className="w-7 h-7 text-[#3b82f6]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-100">Regional passend</h3>
              <p className="text-slate-300/80 leading-relaxed">Niedersachsen oder NRW – wir wählen das richtige Programm.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 shadow-lg shadow-black/20 ring-1 ring-white/5">
              <div className="w-14 h-14 bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-xl flex items-center justify-center mb-4 shadow-sm shadow-black/20">
                <AlertTriangle className="w-7 h-7 text-[#3b82f6]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-100">Frist im Blick</h3>
              <p className="text-slate-300/80 leading-relaxed">Wir verhindern, dass Sie 2025 bares Geld liegen lassen.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 shadow-lg shadow-black/20 ring-1 ring-white/5">
              <div className="w-14 h-14 bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-xl flex items-center justify-center mb-4 shadow-sm shadow-black/20">
                <CheckCircle2 className="w-7 h-7 text-[#3b82f6]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-100">Schnell startklar</h3>
              <p className="text-slate-300/80 leading-relaxed">Planung heute – Antrag morgen. Ohne Zeitverlust.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="vergleich" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-50 leading-tight break-words hyphens-none tracking-tight">
              Der Vergleich
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto break-words hyphens-none leading-relaxed">
              Zwei Bundesländer, zwei Programme – der Unterschied entscheidet, wie viel Geld Sie zurückholen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 h-full shadow-lg shadow-black/20 ring-1 ring-white/5"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">Niedersachsen</h3>
                  <p className="text-slate-400 mt-1">z. B. Bückeburg, Rinteln</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Förderung</p>
                  <p className="text-slate-100 font-semibold">Digitalbonus</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/30 border border-slate-800/80 rounded-xl p-4 ring-1 ring-white/5">
                  <p className="text-slate-400 text-sm">Höhe</p>
                  <p className="text-slate-100 font-semibold">
                    Bis zu <span className="text-[#3b82f6]">35%</span> Zuschuss
                  </p>
                  <p className="text-slate-400 text-sm mt-1">max. 50.000€</p>
                </div>
                <div className="bg-slate-950/30 border border-slate-800/80 rounded-xl p-4 ring-1 ring-white/5">
                  <p className="text-slate-400 text-sm">Zielgruppe</p>
                  <p className="text-slate-100 font-semibold">Handwerk & KMU</p>
                  <p className="text-slate-400 text-sm mt-1">&lt; 50 MA</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 h-full shadow-lg shadow-black/20 ring-1 ring-white/5"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">NRW</h3>
                  <p className="text-slate-400 mt-1">z. B. Minden, Porta</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Förderung</p>
                  <p className="text-slate-100 font-semibold">Mittelstand Innovativ & Digital (MID)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/30 border border-slate-800/80 rounded-xl p-4 ring-1 ring-white/5">
                  <p className="text-slate-400 text-sm">Höhe</p>
                  <p className="text-slate-100 font-semibold">
                    Bis zu <span className="text-[#3b82f6]">50%</span> Zuschuss
                  </p>
                  <p className="text-slate-400 text-sm mt-1">max. 15.000€</p>
                </div>
                <div className="bg-slate-950/30 border border-slate-800/80 rounded-xl p-4 ring-1 ring-white/5">
                  <p className="text-slate-400 text-sm">Zielgruppe</p>
                  <p className="text-slate-100 font-semibold">Kleine Unternehmen</p>
                  <p className="text-slate-400 text-sm mt-1">&lt; 50 MA</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="niedersachsen" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-red-900/15 border border-red-700/70 rounded-xl p-8 md:p-10 shadow-lg shadow-black/20 ring-1 ring-white/5"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-900/30 border border-red-700/60 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-black/20">
                <AlertTriangle className="w-6 h-6 text-red-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-red-100 mb-3">
                  ⚠️ Alarmstufe Rot für Niedersachsen!
                </h3>
                <p className="text-red-200/90 text-lg leading-relaxed">
                  Achtung an alle Betriebe in Schaumburg und Umgebung: Der &quot;Digitalbonus.Niedersachsen&quot;
                  läuft in der aktuellen Form am <span className="font-semibold">31.12.2025</span> aus. Wer die{" "}
                  <span className="font-semibold">35%</span> sicher haben will, muss den Antrag noch{" "}
                  <span className="font-semibold">DIESES JAHR</span> stellen. Es gibt keine Garantie für ein
                  Nachfolgeprogramm im Januar. Sichern Sie sich den Topf jetzt, bevor er zu ist.
                </p>

                <div className="mt-6">
                  <button
                    onClick={handlePrimaryCtaClick}
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-500 transition-colors shadow-lg shadow-red-600/20 ring-1 ring-white/5"
                  >
                    Frist sichern – Förder-Check starten
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="nrw" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-green-900/15 border border-green-700/70 rounded-xl p-8 md:p-10 shadow-lg shadow-black/20 ring-1 ring-white/5"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-900/30 border border-green-700/60 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-black/20">
                <CheckCircle2 className="w-6 h-6 text-green-200" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-green-100 mb-3">
                  Grünes Licht für Minden & NRW
                </h3>
                <p className="text-green-200/90 text-lg leading-relaxed">
                  Gute Nachrichten für den Mühlenkreis: Das Förderprogramm MID startet ab dem{" "}
                  <span className="font-semibold">01.01.2026</span> mit neuer Richtlinie neu durch. Wir nehmen
                  jetzt schon Ihre Planung für <span className="font-semibold">Q1/2026</span> auf, damit Sie am
                  Stichtag direkt startklar sind.
                </p>

                <div className="mt-6">
                  <button
                    onClick={handlePrimaryCtaClick}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-500 transition-colors shadow-lg shadow-green-600/20 ring-1 ring-white/5"
                  >
                    Planung sichern – Förder-Check starten
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FoerderungContact />
    </>
  );
}



