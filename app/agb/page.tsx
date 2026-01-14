import Link from "next/link";
import { AgbPreamble } from "./AgbPreamble";

export const metadata = {
  title: "Allgemeine Geschäftsbedingungen - ChorAI",
  description: "AGB der ChorAI",
};

export default function AGB() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-slate-100">Allgemeine Geschäftsbedingungen (AGB)</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
          <div className="mb-6">
            <p className="font-semibold text-slate-100">ChorAI</p>
            <p>Inh. Margarita Chorow</p>
            <p>Schulbrink 18, 31675 Bückeburg</p>
          </div>

          <AgbPreamble />

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">§ 1 Geltungsbereich &amp; Kleinunternehmerregelung</h2>
            <p className="mb-2">
              (1) Diese Geschäftsbedingungen gelten für alle Verträge zwischen ChorAI (nachfolgend &quot;Auftragnehmer&quot;) und dem Kunden (nachfolgend &quot;Auftraggeber&quot;).
            </p>
            <p>
              (2) Der Auftragnehmer erhebt als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG keine Umsatzsteuer und weist diese auch nicht aus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">§ 2 Leistungsgegenstand</h2>
            <p className="mb-2">
              (1) Der Auftragnehmer erbringt Dienstleistungen zur Einrichtung und Betreuung von IT-Infrastrukturen (Automatisierung, Chatbots, Schnittstellen) auf der Hardware des Auftraggebers.
            </p>
            <p className="mb-2">
              (2) <strong>Implementierung (Setup):</strong> Die einmalige Einrichtung der Software gilt als Werkvertrag. Die Abnahme erfolgt durch Inbetriebnahme.
            </p>
            <p>
              (3) <strong>Wartung (Service):</strong> Die laufende Betreuung gilt als Dienstvertrag. Geschuldet ist das Bemühen um Verfügbarkeit und Sicherheit, kein bestimmter Erfolg.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">§ 3 Infrastruktur &amp; Fremdkosten</h2>
            <p className="mb-2">
              (1) Der Auftraggeber stellt die erforderliche Server-Infrastruktur (z.B. VPS bei Hetzner) auf eigene Kosten zur Verfügung.
            </p>
            <p>
              (2) Kosten für Drittanbieter-Dienste (APIs wie OpenAI, Twilio, Brevo etc.) trägt der Auftraggeber direkt. Der Auftragnehmer tritt hierbei nur als technischer Administrator auf, nicht als Vertragspartner der Drittanbieter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">§ 4 Haftungsausschluss</h2>
            <p className="mb-2">
              (1) <strong>Updates:</strong> Sofern kein Wartungsvertrag besteht, haftet der Auftragnehmer nicht für Sicherheitslücken, die durch fehlende Updates entstehen.
            </p>
            <p className="mb-2">
              (2) <strong>KI-Halluzinationen:</strong> Der Auftragnehmer übernimmt keine Gewähr für die inhaltliche Richtigkeit von Ausgaben, die durch Künstliche Intelligenz (LLMs) generiert werden.
            </p>
            <p>
              (3) Der Auftragnehmer haftet unbeschränkt nur für Vorsatz und grobe Fahrlässigkeit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">§ 5 Schlussbestimmungen</h2>
            <p>
              Es gilt deutsches Recht. Gerichtsstand ist Bückeburg.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-[#3b82f6] hover:underline">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}


