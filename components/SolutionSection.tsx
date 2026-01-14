"use client";

import { motion } from "framer-motion";
import { Bot, HardDrive, Lock, Wrench } from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "Ihr digitaler Mitarbeiter (24/7)",
    description: "Er wird nie krank, arbeitet 24/7 und kostet weniger als ein Minijobber.",
  },
  {
    icon: HardDrive,
    title: "Managed Self-Hosting",
    description: "Alles läuft sicher auf Ihren eigenen Servern in Deutschland – Sie behalten die volle Datenhoheit.",
  },
  {
    icon: Lock,
    title: "Datenschutzkonforme KI",
    description: "DSGVO-konform, ohne Cloud-Zwang. Ideal für sensible Betriebsdaten im Handwerk.",
  },
  {
    icon: Wrench,
    title: "Mitarbeiter entlasten",
    description: "Weniger Chaos im Büro, mehr Zeit für Baustelle und Kunden – wir übernehmen Setup, Wartung und Updates.",
  },
];

export default function SolutionSection() {
  return (
    <section id="loesung" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-50 leading-tight break-words hyphens-none tracking-tight">
            Datenschutzkonforme KI, die Mitarbeiter entlastet
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto break-words hyphens-none leading-relaxed">
            Büro Digitalisierung Minden: Wir bauen Ihren digitalen Mitarbeiter so, dass er im Alltag wirklich hilft –
            nicht in PowerPoints, sondern im Büro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.article
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#3b82f6]/12 via-slate-900/40 to-slate-900/20 border border-[#3b82f6]/20 rounded-xl p-8 shadow-lg shadow-black/20 ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
              >
                <div className="w-16 h-16 bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-xl flex items-center justify-center mb-4 shadow-sm shadow-black/20">
                  <Icon className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-100 tracking-tight">{solution.title}</h3>
                <p className="text-slate-300/80 leading-relaxed">{solution.description}</p>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate-300 max-w-3xl mx-auto">
          Technische Basis: <span className="font-semibold">Docker</span> & <span className="font-semibold">n8n</span> – als
          Managed Service betrieben.
        </p>
      </div>
    </section>
  );
}


