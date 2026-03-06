import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Datenschutzerklärung - ChorAI",
  description: "Datenschutzerklärung der ChorAI",
};

export default function Datenschutz() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full max-w-full">
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-slate-100">Datenschutzerklärung</h1>

            <div className="prose prose-invert max-w-none text-slate-300">
          <section>
            <h2>1. Datenschutz auf einen Blick</h2>
            <p>
              <strong>Allgemeine Hinweise</strong>
              <br />
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
              <br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:
            </p>
            <p>
              <strong>ChorAI</strong>
              <br />
              Inh. Margarita Chorow
              <br />
              Schulbrink 18
              <br />
              31675 Bückeburg
              <br />
              E-Mail: <a href="mailto:info@chorai.de" className="text-[#60a5fa] hover:underline">info@chorai.de</a>
            </p>
            <p>
              <strong>Wie erfassen wir Ihre Daten?</strong>
              <br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei handelt es sich z.&nbsp;B. um Daten, die Sie in unser Kontaktformular eingeben oder Nachrichten, die Sie an unseren KI-Chatbot senden. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z.&nbsp;B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
            <p>
              <strong>Wofür nutzen wir Ihre Daten?</strong>
              <br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden, um Ihre Kontaktanfragen zu beantworten oder um Ihre Chat-Nachrichten im KI-Chatbot zu verarbeiten.
            </p>
          </section>

          <section>
            <h2>2. Hosting</h2>
            <p>
              <strong>Hetzner</strong>
              <br />
              Wir hosten unsere Website bei der Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen (nachfolgend: Hetzner).
            </p>
            <p>
              Wenn Sie unsere Website besuchen, erfasst Hetzner verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie der Datenschutzerklärung von Hetzner:{" "}
              <a href="https://www.hetzner.com/de/rechtliches/datenschutz" target="_blank" rel="noopener noreferrer" className="text-[#60a5fa] hover:underline">
                https://www.hetzner.com/de/rechtliches/datenschutz
              </a>.
            </p>
            <p>
              Die Verwendung von Hetzner erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.
            </p>
            <p>
              <strong>Auftragsverarbeitung</strong>
              <br />
              Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit dem oben genannten Anbieter geschlossen.
            </p>
          </section>

          <section>
            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <p>
              <strong>Datenschutz</strong>
              <br />
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p>
              <strong>SSL- bzw. TLS-Verschlüsselung</strong>
              <br />
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung.
            </p>
          </section>

          <section>
            <h2>4. Datenerfassung auf dieser Website</h2>
            <p>
              <strong>Kontaktformular</strong>
              <br />
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen über unseren Workflow-Dienst (n8n) verarbeitet. Die Daten können zur Kundenverwaltung an Brevo weitergegeben werden. Diese Daten geben wir nicht ohne Ihre Einwilligung an weitere Dritte weiter.
            </p>
            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung Ihrer Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde.
            </p>
            <p>
              <strong>KI-Chatbot</strong>
              <br />
              Diese Website bietet einen KI-Chatbot an. Die von Ihnen eingegebenen Nachrichten werden zur Beantwortung Ihrer Fragen an unseren Workflow-Dienst (n8n) übermittelt und dort verarbeitet. Dabei kann zur Erstellung von Antworten ein KI-Sprachmodell (z.&nbsp;B. OpenAI) genutzt werden. Ihre Nachrichten werden nur für die unmittelbare Beantwortung verwendet; eine dauerhafte Speicherung zu Marketing- oder Profilierungszwecken erfolgt nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Kundenkommunikation).
            </p>
            <p>
              <strong>Anfrage per E-Mail oder Telefon</strong>
              <br />
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
            </p>
          </section>

          <section>
            <h2>5. Newsletter und CRM (Brevo)</h2>
            <p>
              Diese Website nutzt <strong>Brevo</strong> (ehemals Sendinblue) für den Versand von Newslettern und die Verwaltung von Kontaktanfragen. Anbieter ist die Sendinblue GmbH, Köpenicker Straße 126, 10179 Berlin, Deutschland.
            </p>
            <p>
              Brevo ist ein Dienst, mit dem der Newsletterversand und die Verwaltung von Kundenbeziehungen organisiert und analysiert werden kann. Die von Ihnen im Kontaktformular eingegebenen Daten (z.&nbsp;B. E-Mail-Adresse) werden auf den Servern von Brevo in Deutschland gespeichert.
            </p>
            <p>
              <strong>Rechtsgrundlage</strong>
              <br />
              Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie unseres berechtigten Interesses an einer professionellen Kundenverwaltung.
            </p>
            <p>
              <strong>Auftragsverarbeitung</strong>
              <br />
              Wir haben mit Brevo einen Vertrag zur Auftragsverarbeitung abgeschlossen, der sicherstellt, dass die Daten unserer Websitebesucher nur nach unseren Weisungen und DSGVO-konform verarbeitet werden.
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
      </main>
      <Footer />
    </>
  );
}
