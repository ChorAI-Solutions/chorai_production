"use client";

import { trackAnalyseAnfordernConversion } from "@/lib/analytics/googleAds";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";

type SubmitStatus = { type: "success" | "error" | null; message: string };

type ContactFormCompactData = {
  name: string;
  email: string;
  company: string;
  message: string;
  honeypot: string;
};

const createInitialFormData = (): ContactFormCompactData => ({
  name: "",
  email: "",
  company: "",
  message: "",
  honeypot: "",
});

const isNonEmptyString = (value: string) => value.trim().length > 0;
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

type ContactFormCompactSectionProps = {
  title?: string;
  subtitle?: string;
  submitLabel?: string;
};

export default function ContactFormCompactSection({
  title = "Interessiert? Nehmen Sie mit uns Kontakt auf.",
  subtitle = "Kurze Nachricht reicht – wir melden uns zeitnah mit den nächsten Schritten.",
  submitLabel = "Absenden",
}: ContactFormCompactSectionProps) {
  const [formData, setFormData] = useState<ContactFormCompactData>(createInitialFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentTouched, setConsentTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: "" });

  const showConsentError = (consentTouched || submitAttempted) && !consent;

  const isFormValid = useMemo(() => {
    return (
      isNonEmptyString(formData.name) &&
      isValidEmail(formData.email) &&
      isNonEmptyString(formData.company) &&
      isNonEmptyString(formData.message)
    );
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    if (!consent) {
      setSubmitStatus({ type: "error", message: "Bitte akzeptieren Sie die Datenschutzerklärung." });
      setIsSubmitting(false);
      return;
    }

    if (!isFormValid) {
      setSubmitStatus({ type: "error", message: "Bitte füllen Sie alle Pflichtfelder korrekt aus." });
      setIsSubmitting(false);
      return;
    }

    trackAnalyseAnfordernConversion();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          // Compact -> API will map to projectDescription
          message: formData.message,
          // placeholders so backend can validate without asking user for extra fields:
          roleInCompany: "nicht angegeben",
          companySize: "nicht angegeben",
          monthlyBudget: "nicht angegeben",
          projectDescription: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Fehler beim Senden der Nachricht");

      setSubmitStatus({
        type: "success",
        message: "Vielen Dank! Wir melden uns schnellstmöglich bei Ihnen.",
      });
      setFormData(createInitialFormData());
      setConsent(false);
      setConsentTouched(false);
      setSubmitAttempted(false);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-slate-50 tracking-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        <div className="max-w-xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-5 bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 shadow-lg shadow-black/20 ring-1 ring-white/5"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="compactName" className="block text-slate-300 mb-2 font-medium">
                  Name *
                </label>
                <input
                  id="compactName"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  placeholder="Geben Sie Ihren Namen ein"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>

              <div>
                <label htmlFor="compactCompany" className="block text-slate-300 mb-2 font-medium">
                  Unternehmen *
                </label>
                <input
                  id="compactCompany"
                  required
                  disabled={isSubmitting}
                  value={formData.company}
                  placeholder="Ihr Unternehmen"
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>

              <div>
                <label htmlFor="compactEmail" className="block text-slate-300 mb-2 font-medium">
                  E-Mail *
                </label>
                <input
                  id="compactEmail"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>

              <div>
                <label htmlFor="compactMessage" className="block text-slate-300 mb-2 font-medium">
                  Nachricht *
                </label>
                <textarea
                  id="compactMessage"
                  required
                  rows={4}
                  disabled={isSubmitting}
                  value={formData.message}
                  placeholder="Worum geht es bei Ihnen? (z.B. Angebot erstellen, Rechnungen, Terminplanung ...)"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 resize-none disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>
            </div>

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="compactHoneypot">Leave this field empty</label>
              <input
                id="compactHoneypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            {/* DSGVO */}
            <div>
              <div className="flex items-start gap-3">
                <label htmlFor="compactConsent" className="flex items-start gap-3 cursor-pointer select-none">
                  <span className="relative mt-1 inline-flex h-5 w-5 items-center justify-center">
                    <input
                      id="compactConsent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setConsentTouched(true);
                      }}
                      onBlur={() => setConsentTouched(true)}
                      disabled={isSubmitting}
                      className="peer sr-only"
                    />
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        fill="transparent"
                        stroke={consent ? "#22c55e" : showConsentError ? "#ef4444" : "rgba(148, 163, 184, 0.7)"}
                        strokeWidth="2.5"
                        className={consent ? "chorai-consent-circle chorai-consent-circle--checked" : ""}
                      />
                      <path
                        d="M7 12.5l3.2 3.2L17.5 8.8"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={consent ? "chorai-consent-check chorai-consent-check--checked" : "opacity-0"}
                      />
                    </svg>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-1 rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-[#3b82f6]/60 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-900"
                    />
                  </span>
                  <span className="text-sm text-slate-400 leading-5">
                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden.{" "}
                    <a href="/datenschutz" className="text-[#3b82f6] hover:underline">
                      Datenschutzerklärung
                    </a>{" "}
                    *
                  </span>
                </label>
              </div>
              {showConsentError && <p className="mt-1 text-sm text-red-400 ml-7">Bitte akzeptieren Sie die Datenschutzerklärung.</p>}
            </div>

            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl flex items-start gap-3 ring-1 ring-white/5 ${
                  submitStatus.type === "success"
                    ? "bg-green-900/50 text-green-200 border border-green-700"
                    : "bg-red-900/50 text-red-200 border border-red-700"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <p className="flex-1">{submitStatus.message}</p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: isSubmitting || !consent || !isFormValid ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || !consent || !isFormValid ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting || !consent || !isFormValid}
              className={`w-full py-3 rounded-xl font-semibold transition-colors shadow-lg ring-1 ring-white/5 ${
                isSubmitting || !consent || !isFormValid
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-[#3b82f6]/20"
              }`}
            >
              {isSubmitting ? "Wird gesendet..." : submitLabel}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

