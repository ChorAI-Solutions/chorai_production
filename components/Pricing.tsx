"use client";

import { motion } from "framer-motion";
import { BadgePercent, ClipboardList, Headset } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Kostenlose Analyse",
    description: "Wir prüfen Ihre Abläufe und finden die größten Zeitfresser im Büro.",
    highlight: false,
  },
  {
    icon: BadgePercent,
    title: "Geförderte Umsetzung",
    description: "Wir holen Zuschüsse und richten alles sauber ein – ohne Cloud-Zwang.",
    highlight: true,
  },
  {
    icon: Headset,
    title: "Laufende Betreuung",
    description: "Wir warten das System, Sie arbeiten. Updates, Monitoring und Support inklusive.",
    highlight: false,
  },
];

export default function Pricing() {
  const scrollToContact = () => {
    const element = document.getElementById("kontakt");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="ablauf" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div id="preise" className="sr-only" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-50 leading-tight break-words hyphens-none tracking-tight">
            In 3 Schritten zur Freiheit
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto break-words hyphens-none leading-relaxed">
            Erst Klarheit, dann Förderung, dann Ruhe im Tagesgeschäft – damit Ihr Büro endlich mitzieht.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative rounded-xl p-8 h-full flex flex-col shadow-lg shadow-black/20 ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 ${
                step.highlight
                  ? "bg-gradient-to-br from-[#3b82f6]/22 to-[#3b82f6]/6 border border-[#3b82f6]/55 scale-105"
                  : "bg-slate-900/40 border border-slate-800/80"
              }`}
            >
              {step.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#3b82f6] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md shadow-black/20">
                  Wichtigster Schritt
                </div>
              )}
              <div className="w-16 h-16 bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-xl flex items-center justify-center mb-4 shadow-sm shadow-black/20">
                <Icon className="w-8 h-8 text-[#3b82f6]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-50 tracking-tight">{step.title}</h3>
              <p className="text-slate-300/80 mb-8 leading-relaxed">{step.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className={`w-full py-3 rounded-xl font-semibold transition-colors mt-auto ring-1 ring-white/10 ${
                  step.highlight
                    ? "bg-[#3b82f6] text-white hover:bg-[#2563eb]"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Kostenlos starten
              </motion.button>
            </motion.article>
          )})}
        </div>
      </div>
    </section>
  );
}


