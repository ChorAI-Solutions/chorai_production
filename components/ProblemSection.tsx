"use client";

import { motion } from "framer-motion";
import { PhoneCall, ReceiptText, Users } from "lucide-react";

const problems = [
  {
    icon: PhoneCall,
    title: "Telefon klingelt ständig",
    description: "Jede Unterbrechung kostet Fokus – und am Ende bleibt die Büroarbeit trotzdem liegen.",
  },
  {
    icon: ReceiptText,
    title: "Rechnungen am Wochenende",
    description: "Papierkram nach Feierabend frisst Zeit, Energie und Familie – Woche für Woche.",
  },
  {
    icon: Users,
    title: "Fachkräftemangel im Büro",
    description: "Gute Leute sind schwer zu finden. Deshalb muss Ihr System Ihre Mitarbeiter entlasten.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-50 leading-tight break-words hyphens-none tracking-tight">
            Prozessautomatisierung Handwerk: Die 3 größten Zeitfresser
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto break-words hyphens-none leading-relaxed">
            Egal ob in Rinteln, Minden oder Stadthagen – das Problem ist überall gleich: Sie sind Experte auf der
            Baustelle, verschwenden aber Zeit im Büro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.article
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 shadow-lg shadow-black/25 ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
              >
                <div className="w-16 h-16 bg-red-500/15 border border-red-500/20 rounded-xl flex items-center justify-center mb-4 shadow-sm shadow-black/20">
                  <Icon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-100 tracking-tight">{problem.title}</h3>
                <p className="text-slate-300/80 leading-relaxed">{problem.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


