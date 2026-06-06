"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, MessageSquareText, PhoneCall, Sparkles, Workflow } from "lucide-react";

const solutionCards = [
  {
    icon: Sparkles,
    title: "KI-Beratung",
    description: "Verständlich starten: Use-Cases finden, Prioritäten setzen, Roadmap erstellen.",
    href: "/loesungen/ki-beratung",
  },
  {
    icon: Workflow,
    title: "Prozessautomatisierung",
    description: "Abläufe, die automatisch laufen – von Anfrage bis Rechnung, ohne Copy/Paste.",
    href: "/loesungen/prozessautomatisierung",
  },
  {
    icon: Bot,
    title: "KI-Agenten",
    description: "Digitale Helfer, die sortieren, nachfragen und den nächsten Schritt starten.",
    href: "/loesungen/ki-agenten",
  },
  {
    icon: MessageSquareText,
    title: "KI-Chatbot",
    description: "Fragen klären & Leads qualifizieren – 24/7 auf Ihrer Website.",
    href: "/loesungen/ki-chatbot",
  },
  {
    icon: PhoneCall,
    title: "KI-Telefonassistent",
    description: "Anrufe annehmen, Infos erfassen, sauber ans Team übergeben.",
    href: "/loesungen/ki-telefonassistent",
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
            Lösungen, die im Handwerk sofort helfen
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto break-words hyphens-none leading-relaxed">
            Wählen Sie den Einstieg, der zu Ihrem Betrieb passt – von Beratung bis Umsetzung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionCards.map((solutionCard, index) => {
            const Icon = solutionCard.icon;
            return (
              <motion.article
                key={solutionCard.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#3b82f6]/12 via-slate-900/40 to-slate-900/20 border border-[#3b82f6]/20 rounded-xl p-8 shadow-lg shadow-black/20 ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
              >
                <div className="w-16 h-16 bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-xl flex items-center justify-center mb-4 shadow-sm shadow-black/20">
                  <Icon className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-100 tracking-tight">{solutionCard.title}</h3>
                <p className="text-slate-300/80 leading-relaxed">{solutionCard.description}</p>
                <div className="mt-5">
                  <Link
                    href={solutionCard.href}
                    className="inline-flex items-center justify-center bg-[#3b82f6] text-white px-[22px] py-2 rounded-xl font-semibold hover:bg-[#2563eb] transition-colors shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5"
                  >
                    Mehr erfahren
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}


