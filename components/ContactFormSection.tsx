"use client";

import { trackAnalyseAnfordernConversion } from "@/lib/analytics/googleAds";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";

const CompanySizeOptions = ["keine Mitarbeiter", "2-5", "6-10", "11-50", "51-200", "200+"] as const;
type CompanySizeOption = (typeof CompanySizeOptions)[number];

const MonthlyBudgetOptions = ["<500", "500-1500", "1500-5000", "5000+"] as const;
type MonthlyBudgetOption = (typeof MonthlyBudgetOptions)[number];

type SubmitStatus = { type: "success" | "error" | null; message: string };

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  roleInCompany: string;
  companySize: "" | CompanySizeOption;
  phoneCountryCode: string;
  phoneNumber: string;
  monthlyBudget: "" | MonthlyBudgetOption;
  projectDescription: string;
  honeypot: string;
};

const createInitialFormData = (): ContactFormData => ({
  name: "",
  email: "",
  company: "",
  roleInCompany: "",
  companySize: "",
  phoneCountryCode: "49",
  phoneNumber: "",
  monthlyBudget: "",
  projectDescription: "",
  honeypot: "",
});

const isNonEmptyString = (value: string) => value.trim().length > 0;

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const isValidPhoneNumber = (phoneNumber: string) => /^[0-9]{6,15}$/.test(phoneNumber.trim());

const isValidCountryCode = (countryCode: string) => /^[0-9]{1,4}$/.test(countryCode.trim());

const buildPhone = (phoneCountryCode: string, phoneNumber: string) => {
  const phoneNumberValue = phoneNumber.trim();
  if (phoneNumberValue.length === 0) return "";

  const phoneCountryCodeValue = phoneCountryCode.trim();
  return `+${phoneCountryCodeValue} ${phoneNumberValue}`;
};

type ContactFormSectionProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
};

export default function ContactFormSection({ title, subtitle, submitLabel }: ContactFormSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>(createInitialFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: "" });

  const isFormValid = useMemo(() => {
    const hasPhoneNumber = isNonEmptyString(formData.phoneNumber);
    const phoneValid = !hasPhoneNumber || isValidPhoneNumber(formData.phoneNumber);
    const countryCodeValid = !hasPhoneNumber || isValidCountryCode(formData.phoneCountryCode);

    return (
      isNonEmptyString(formData.name) &&
      isValidEmail(formData.email) &&
      isNonEmptyString(formData.company) &&
      isNonEmptyString(formData.roleInCompany) &&
      formData.companySize !== "" &&
      formData.monthlyBudget !== "" &&
      isNonEmptyString(formData.projectDescription) &&
      phoneValid &&
      countryCodeValid
    );
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    if (!consent) {
      setSubmitStatus({ type: "error", message: "Bitte akzeptieren Sie die Datenschutzbestimmungen." });
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
          ...formData,
          phone: buildPhone(formData.phoneCountryCode, formData.phoneNumber),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Fehler beim Senden der Nachricht");

      setSubmitStatus({
        type: "success",
        message: data.message || "Vielen Dank für Ihre Anfrage! Wir melden uns schnellstmöglich bei Ihnen.",
      });
      setFormData(createInitialFormData());
      setConsent(false);
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
    <section id="kontakt" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-50 leading-tight break-words hyphens-none tracking-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto break-words hyphens-none leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 shadow-lg shadow-black/20 ring-1 ring-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-slate-300 mb-2 font-medium">
                  Name *
                </label>
                <input
                  id="name"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  placeholder="Max Muster"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-300 mb-2 font-medium">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  placeholder="beispiel@gmail.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-slate-300 mb-2 font-medium">
                  Unternehmen *
                </label>
                <input
                  id="company"
                  required
                  disabled={isSubmitting}
                  value={formData.company}
                  placeholder="Name ihres Unternehmens"
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>

              <div>
                <label htmlFor="roleInCompany" className="block text-slate-300 mb-2 font-medium">
                  Ihre Rolle im Unternehmen *
                </label>
                <input
                  id="roleInCompany"
                  required
                  disabled={isSubmitting}
                  value={formData.roleInCompany}
                  placeholder="z.B. CTO, Projektmanager, etc."
                  onChange={(e) => setFormData({ ...formData, roleInCompany: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>

              <div>
                <label htmlFor="companySize" className="block text-slate-300 mb-2 font-medium">
                  Unternehmensgröße *
                </label>
                <select
                  id="companySize"
                  required
                  disabled={isSubmitting}
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value as ContactFormData["companySize"] })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  {CompanySizeOptions.map((companySizeOption) => (
                    <option key={companySizeOption} value={companySizeOption}>
                      {companySizeOption}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 font-medium">Telefonnummer (optional)</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <input
                      inputMode="numeric"
                      disabled={isSubmitting}
                      value={formData.phoneCountryCode}
                      placeholder="49"
                      onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                    />
                    <p className="mt-1 text-xs text-slate-400/80">Area Code</p>
                  </div>
                  <div className="col-span-2">
                    <input
                      inputMode="numeric"
                      disabled={isSubmitting}
                      value={formData.phoneNumber}
                      placeholder="123456789"
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                    />
                    <p className="mt-1 text-xs text-slate-400/80">Phone Number</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="monthlyBudget" className="block text-slate-300 mb-2 font-medium">
                  Monatliches Budget *
                </label>
                <select
                  id="monthlyBudget"
                  required
                  disabled={isSubmitting}
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value as ContactFormData["monthlyBudget"] })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  {MonthlyBudgetOptions.map((monthlyBudgetOption) => (
                    <option key={monthlyBudgetOption} value={monthlyBudgetOption}>
                      {monthlyBudgetOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="projectDescription" className="block text-slate-300 mb-2 font-medium">
                  Projektbeschreibung *
                </label>
                <textarea
                  id="projectDescription"
                  required
                  rows={5}
                  disabled={isSubmitting}
                  value={formData.projectDescription}
                  placeholder="Bitte geben Sie so viele Details wie möglich an. Somit können wir uns besser auf ein Erstgespräch vorbereiten."
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 resize-none disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
                />
              </div>
            </div>

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="honeypot">Leave this field empty</label>
              <input
                id="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            {/* DSGVO-Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={isSubmitting}
                className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-950/40 text-[#3b82f6] focus:ring-[#3b82f6] disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5"
              />
              <label htmlFor="consent" className="text-sm text-slate-400 leading-5">
                Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für Rückfragen dauerhaft gespeichert werden. Ich habe
                die{" "}
                <a href="/datenschutz" className="text-[#3b82f6] hover:underline">
                  Datenschutzerklärung
                </a>{" "}
                zur Kenntnis genommen.
              </label>
            </div>

            {/* Status-Meldung */}
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
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
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting || !consent || !isFormValid}
              className="w-full bg-[#3b82f6] text-white py-3 rounded-xl font-semibold hover:bg-[#2563eb] transition-colors shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Wird gesendet..." : submitLabel}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

