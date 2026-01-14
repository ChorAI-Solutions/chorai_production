"use client";

import { motion } from "framer-motion";
import { BadgePercent, MapPin, ShieldCheck } from "lucide-react";
import { trackAnalyseAnfordernConversion } from "@/lib/analytics/googleAds";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden overflow-x-hidden pt-16 pb-20 sm:pb-24 w-full max-w-full min-w-0">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }} />
      </div>

      {/* Abstract Shapes */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-4xl mx-auto"
        >
          <h1 className="text-[clamp(1.75rem,6.5vw,3.25rem)] sm:text-5xl md:text-7xl font-extrabold mb-6 text-slate-50 leading-[1.05] break-words hyphens-none tracking-tight">
            SIND SIE NOCH GESCHÄFTSFÜHRER ODER SCHON SEKRETÄR?
          </h1>
          <p className="text-[clamp(1rem,3.8vw,1.2rem)] sm:text-lg md:text-2xl text-slate-300/90 mb-12 max-w-3xl mx-auto leading-relaxed break-words hyphens-none">
            Schluss mit Papierkram nach Feierabend. Wir digitalisieren Ihr Handwerksbüro – sicher auf Ihren eigenen
            Servern.
          </p>
          <ul className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
            <li className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-slate-800/80 text-slate-100 text-sm shadow-sm shadow-black/20">
              <MapPin className="w-4 h-4 text-[#3b82f6]" />
              Vor Ort im Schaumburger Land & Minden
            </li>
            <li className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-slate-800/80 text-slate-100 text-sm shadow-sm shadow-black/20">
              <ShieldCheck className="w-4 h-4 text-[#3b82f6]" />
              100% DSGVO & Eigene Server
            </li>
            <li className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-slate-800/80 text-slate-100 text-sm shadow-sm shadow-black/20">
              <BadgePercent className="w-4 h-4 text-[#3b82f6]" />
              Förderfähig (bis 50%)
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                trackAnalyseAnfordernConversion();
                scrollToContact();
              }}
              className="bg-[#3b82f6] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-[clamp(0.95rem,3.7vw,1.05rem)] sm:text-lg font-semibold hover:bg-[#2563eb] transition-colors shadow-lg shadow-[#3b82f6]/25 ring-1 ring-white/5 w-full sm:w-auto max-w-[70vw]"
            >
              Jetzt Potenzial prüfen
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("ablauf")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-[#3b82f6]/70 text-[#93c5fd] px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-[clamp(0.95rem,3.7vw,1.05rem)] sm:text-lg font-semibold hover:bg-[#3b82f6]/10 transition-colors ring-1 ring-white/5 w-full sm:w-auto max-w-[70vw]"
            >
              Ablauf ansehen
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          <span className="font-semibold">Prozessautomatisierung für KMU</span> in Schaumburg, Minden-Lübbecke & OWL
          – als <span className="font-semibold">IT-Service Kreis Schaumburg & Minden-Lübbecke</span> mit Fokus auf{" "}
          <span className="font-semibold">Büro Digitalisierung OWL</span> und{" "}
          <span className="font-semibold">Datenschutzkonforme KI</span>.
        </motion.p>
      </div>
    </section>
  );
}


