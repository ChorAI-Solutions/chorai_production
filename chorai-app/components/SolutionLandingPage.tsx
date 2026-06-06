"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

type SolutionStep = {
  title: string;
  description: string;
};

type SolutionBenefit = {
  title: string;
  description: string;
};

type SolutionLandingPageProps = {
  heroTitle: string;
  heroSubtitle: string;
  heroHighlight: string;
  introTitlePrefix: string;
  introTitleHighlight: string;
  introTitleSuffix: string;
  introText: string[];
  programTitle: string;
  programSteps: SolutionStep[];
  benefitsTitle: string;
  benefits: SolutionBenefit[];
  imageSrc: string;
  ctaLabel: string;
  ctaHref?: string;
};

export default function SolutionLandingPage({
  heroTitle,
  heroSubtitle,
  heroHighlight,
  introTitlePrefix,
  introTitleHighlight,
  introTitleSuffix,
  introText,
  programTitle,
  programSteps,
  benefitsTitle,
  benefits,
  imageSrc,
  ctaLabel,
  ctaHref = "#kontakt",
}: SolutionLandingPageProps) {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0a1525]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-50 tracking-tight">
              {heroTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
              {heroSubtitle} <span className="font-semibold text-[#3b82f6]">{heroHighlight}</span>.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 shadow-lg shadow-black/20 ring-1 ring-white/5"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50">
                {introTitlePrefix}
                <span className="text-[#3b82f6]">{introTitleHighlight}</span>
                {introTitleSuffix}
              </h2>

              <div className="mt-5 space-y-4 text-base sm:text-lg leading-relaxed text-slate-300/90">
                {introText.map((paragraph, index) => (
                  <p key={`${index}-${paragraph.slice(0, 8)}`}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex justify-center lg:justify-start">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center bg-[#3b82f6] text-white px-[22px] py-3 rounded-xl font-semibold hover:bg-[#2563eb] transition-colors shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5"
                >
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg shadow-black/20 ring-1 ring-white/5"
            >
              <div className="bg-gradient-to-br from-[#3b82f6]/25 via-slate-900/40 to-slate-900/20 p-7 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/15 border border-[#3b82f6]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-50">{programTitle}</h3>
                </div>
              </div>

              <div className="p-7 space-y-6">
                {programSteps.map((step, index) => (
                  <div key={`${index}-${step.title}`} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-[#3b82f6]/15 border border-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-100 font-semibold">{step.title}</div>
                      <p className="text-slate-300/85 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 sm:p-8 shadow-lg shadow-black/20 ring-1 ring-white/5"
            >
              {/* Hinweis: Die aktuellen Bilder sind Platzhalter. Wenn du echte Fotos/Grafiken liefern willst, tauschen wir nur die Datei in /public/loesungen aus. */}
              <div className="aspect-video rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950/40">
                <Image
                  src={imageSrc}
                  alt={heroTitle}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority={false}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 shadow-lg shadow-black/20 ring-1 ring-white/5"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-50 tracking-tight">{benefitsTitle}</h3>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-100">{benefit.title}</div>
                        <p className="mt-1 text-slate-300/85 leading-relaxed text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

