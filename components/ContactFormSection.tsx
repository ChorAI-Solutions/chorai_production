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

type TouchedFields = {
  name: boolean;
  email: boolean;
  company: boolean;
  roleInCompany: boolean;
  companySize: boolean;
  phoneCountryCode: boolean;
  phoneNumber: boolean;
  monthlyBudget: boolean;
  projectDescription: boolean;
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

// #region agent log
const sendDebugLog = (payload: {
  runId: string;
  hypothesisId: string;
  location: string;
  message: string;
  data?: Record<string, unknown>;
}) => {
  fetch("http://localhost:7242/ingest/cde80c10-4bbf-49dd-9871-235c903f9938", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "debug-session",
      runId: payload.runId,
      hypothesisId: payload.hypothesisId,
      location: payload.location,
      message: payload.message,
      data: payload.data ?? {},
      timestamp: Date.now(),
    }),
  }).catch(() => {});
};
// #endregion agent log

type ContactFormSectionProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
};

const getFieldError = (field: keyof ContactFormData, formData: ContactFormData): string => {
  switch (field) {
    case "name":
      return !isNonEmptyString(formData.name) ? "Dieses Feld ist erforderlich." : "";
    case "email":
      if (!isNonEmptyString(formData.email)) return "Dieses Feld ist erforderlich.";
      if (!isValidEmail(formData.email)) return "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      return "";
    case "company":
      return !isNonEmptyString(formData.company) ? "Dieses Feld ist erforderlich." : "";
    case "roleInCompany":
      return !isNonEmptyString(formData.roleInCompany) ? "Dieses Feld ist erforderlich." : "";
    case "companySize":
      return formData.companySize === "" ? "Bitte wählen Sie eine Option aus." : "";
    case "monthlyBudget":
      return formData.monthlyBudget === "" ? "Bitte wählen Sie eine Option aus." : "";
    case "projectDescription":
      return !isNonEmptyString(formData.projectDescription) ? "Dieses Feld ist erforderlich." : "";
    case "phoneNumber":
      if (isNonEmptyString(formData.phoneNumber)) {
        if (!isValidPhoneNumber(formData.phoneNumber)) {
          return "Bitte geben Sie eine gültige Telefonnummer ein (6-15 Ziffern).";
        }
        if (!isValidCountryCode(formData.phoneCountryCode)) {
          return "Bitte geben Sie einen gültigen Ländercode ein.";
        }
      }
      return "";
    default:
      return "";
  }
};

export default function ContactFormSection({ title, subtitle, submitLabel }: ContactFormSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>(createInitialFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: "" });
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    company: false,
    roleInCompany: false,
    companySize: false,
    phoneCountryCode: false,
    phoneNumber: false,
    monthlyBudget: false,
    projectDescription: false,
  });
  const [consentTouched, setConsentTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const showConsentError = (consentTouched || submitAttempted) && !consent;
  const clientRequestId = useMemo(() => {
    if (typeof globalThis.crypto?.randomUUID === "function") return globalThis.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }, []);

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

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    // #region agent log
    sendDebugLog({
      runId: "chrome-repro",
      hypothesisId: "H1",
      location: "components/ContactFormSection.tsx:handleSubmit",
      message: "submit_clicked",
      data: {
        clientRequestId,
        consent,
        isFormValid,
        isSubmitting,
        hasCompanySize: formData.companySize !== "",
        hasMonthlyBudget: formData.monthlyBudget !== "",
        hasProjectDescription: isNonEmptyString(formData.projectDescription),
        hasPhoneNumber: isNonEmptyString(formData.phoneNumber),
      },
    });
    // #endregion agent log

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      company: true,
      roleInCompany: true,
      companySize: true,
      phoneCountryCode: true,
      phoneNumber: true,
      monthlyBudget: true,
      projectDescription: true,
    });
    setConsentTouched(true);

    if (!consent) {
      setSubmitStatus({ type: "error", message: "Bitte akzeptieren Sie die Datenschutzbestimmungen." });
      // #region agent log
      sendDebugLog({
        runId: "chrome-repro",
        hypothesisId: "H1",
        location: "components/ContactFormSection.tsx:handleSubmit",
        message: "blocked_missing_consent",
        data: { clientRequestId },
      });
      // #endregion agent log
      setIsSubmitting(false);
      return;
    }

    if (!isFormValid) {
      setSubmitStatus({ type: "error", message: "Bitte füllen Sie alle Pflichtfelder korrekt aus." });
      // #region agent log
      sendDebugLog({
        runId: "chrome-repro",
        hypothesisId: "H1",
        location: "components/ContactFormSection.tsx:handleSubmit",
        message: "blocked_invalid_form",
        data: { clientRequestId },
      });
      // #endregion agent log
      setIsSubmitting(false);
      return;
    }

    trackAnalyseAnfordernConversion();

    try {
      // #region agent log
      sendDebugLog({
        runId: "chrome-repro",
        hypothesisId: "H2",
        location: "components/ContactFormSection.tsx:handleSubmit",
        message: "fetch_api_contact_start",
        data: { clientRequestId },
      });
      // #endregion agent log
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: buildPhone(formData.phoneCountryCode, formData.phoneNumber),
          clientRequestId,
        }),
      });

      const data = await response.json().catch(() => ({}));
      // #region agent log
      sendDebugLog({
        runId: "chrome-repro",
        hypothesisId: "H2",
        location: "components/ContactFormSection.tsx:handleSubmit",
        message: "fetch_api_contact_done",
        data: {
          clientRequestId,
          httpStatus: response.status,
          ok: response.ok,
          responseKeys: data && typeof data === "object" ? Object.keys(data) : [],
        },
      });
      // #endregion agent log
      if (!response.ok) throw new Error(data.error || "Fehler beim Senden der Nachricht");

      setSubmitStatus({
        type: "success",
        message: data.message || "Vielen Dank für Ihre Anfrage! Wir melden uns schnellstmöglich bei Ihnen.",
      });
      setFormData(createInitialFormData());
      setConsent(false);
      setTouched({
        name: false,
        email: false,
        company: false,
        roleInCompany: false,
        companySize: false,
        phoneCountryCode: false,
        phoneNumber: false,
        monthlyBudget: false,
        projectDescription: false,
      });
      setConsentTouched(false);
      setSubmitAttempted(false);
    } catch (error) {
      // #region agent log
      sendDebugLog({
        runId: "chrome-repro",
        hypothesisId: "H2",
        location: "components/ContactFormSection.tsx:handleSubmit",
        message: "fetch_api_contact_failed",
        data: {
          clientRequestId,
          errorMessage: error instanceof Error ? error.message : String(error),
        },
      });
      // #endregion agent log
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
                  onBlur={() => handleBlur("name")}
                  className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                    (touched.name || submitAttempted) && getFieldError("name", formData)
                      ? "border-red-500/50"
                      : "border-slate-800"
                  }`}
                />
                {(touched.name || submitAttempted) && getFieldError("name", formData) && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("name", formData)}</p>
                )}
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
                  onBlur={() => handleBlur("email")}
                  className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                    (touched.email || submitAttempted) && getFieldError("email", formData)
                      ? "border-red-500/50"
                      : "border-slate-800"
                  }`}
                />
                {(touched.email || submitAttempted) && getFieldError("email", formData) && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("email", formData)}</p>
                )}
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
                  onBlur={() => handleBlur("company")}
                  className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                    (touched.company || submitAttempted) && getFieldError("company", formData)
                      ? "border-red-500/50"
                      : "border-slate-800"
                  }`}
                />
                {(touched.company || submitAttempted) && getFieldError("company", formData) && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("company", formData)}</p>
                )}
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
                  onBlur={() => handleBlur("roleInCompany")}
                  className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                    (touched.roleInCompany || submitAttempted) && getFieldError("roleInCompany", formData)
                      ? "border-red-500/50"
                      : "border-slate-800"
                  }`}
                />
                {(touched.roleInCompany || submitAttempted) && getFieldError("roleInCompany", formData) && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("roleInCompany", formData)}</p>
                )}
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
                  onBlur={() => handleBlur("companySize")}
                  className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                    (touched.companySize || submitAttempted) && getFieldError("companySize", formData)
                      ? "border-red-500/50"
                      : "border-slate-800"
                  }`}
                >
                  <option value="" disabled>
                    Bitte auswählen
                  </option>
                  {CompanySizeOptions.map((companySizeOption) => (
                    <option key={companySizeOption} value={companySizeOption}>
                      {companySizeOption}
                    </option>
                  ))}
                </select>
                {(touched.companySize || submitAttempted) && getFieldError("companySize", formData) && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("companySize", formData)}</p>
                )}
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
                      onBlur={() => handleBlur("phoneCountryCode")}
                      className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                        (touched.phoneCountryCode || submitAttempted) &&
                        isNonEmptyString(formData.phoneNumber) &&
                        !isValidCountryCode(formData.phoneCountryCode)
                          ? "border-red-500/50"
                          : "border-slate-800"
                      }`}
                    />
                    <p className="mt-1 text-xs text-slate-400/80">Ländercode</p>
                    {(touched.phoneCountryCode || submitAttempted) &&
                      isNonEmptyString(formData.phoneNumber) &&
                      !isValidCountryCode(formData.phoneCountryCode) && (
                        <p className="mt-1 text-xs text-red-400">Bitte geben Sie einen gültigen Ländercode ein.</p>
                      )}
                  </div>
                  <div className="col-span-2">
                    <input
                      inputMode="numeric"
                      disabled={isSubmitting}
                      value={formData.phoneNumber}
                      placeholder="123456789"
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      onBlur={() => handleBlur("phoneNumber")}
                      className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                        (touched.phoneNumber || submitAttempted) && getFieldError("phoneNumber", formData)
                          ? "border-red-500/50"
                          : "border-slate-800"
                      }`}
                    />
                    <p className="mt-1 text-xs text-slate-400/80">Telefonnummer</p>
                    {(touched.phoneNumber || submitAttempted) && getFieldError("phoneNumber", formData) && (
                      <p className="mt-1 text-xs text-red-400">{getFieldError("phoneNumber", formData)}</p>
                    )}
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
                  onBlur={() => handleBlur("monthlyBudget")}
                  className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                    (touched.monthlyBudget || submitAttempted) && getFieldError("monthlyBudget", formData)
                      ? "border-red-500/50"
                      : "border-slate-800"
                  }`}
                >
                  <option value="" disabled>
                    Bitte auswählen
                  </option>
                  {MonthlyBudgetOptions.map((monthlyBudgetOption) => (
                    <option key={monthlyBudgetOption} value={monthlyBudgetOption}>
                      {monthlyBudgetOption}
                    </option>
                  ))}
                </select>
                {(touched.monthlyBudget || submitAttempted) && getFieldError("monthlyBudget", formData) && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("monthlyBudget", formData)}</p>
                )}
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
                  onBlur={() => handleBlur("projectDescription")}
                  className={`w-full px-4 py-3 bg-slate-950/40 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/60 focus:border-[#3b82f6]/40 resize-none disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/5 ${
                    (touched.projectDescription || submitAttempted) && getFieldError("projectDescription", formData)
                      ? "border-red-500/50"
                      : "border-slate-800"
                  }`}
                />
                {(touched.projectDescription || submitAttempted) && getFieldError("projectDescription", formData) && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError("projectDescription", formData)}</p>
                )}
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
            <div>
              <div className="flex items-start gap-3">
                <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer select-none">
                  <span className="relative mt-1 inline-flex h-5 w-5 items-center justify-center">
                    <input
                      id="consent"
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
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
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
                  Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für Rückfragen dauerhaft gespeichert werden. Ich habe
                  die{" "}
                  <a href="/datenschutz" className="text-[#3b82f6] hover:underline">
                    Datenschutzerklärung
                  </a>{" "}
                  zur Kenntnis genommen. *
                  </span>
                </label>
              </div>
              {showConsentError && (
                <p className="mt-1 text-sm text-red-400 ml-7">Bitte akzeptieren Sie die Datenschutzerklärung.</p>
              )}
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

