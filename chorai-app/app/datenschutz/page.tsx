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
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten (Server-Logs). Wir verarbeiten darüber hinaus Angaben, die Sie aktiv übermitteln (Kontaktformular, Chat), und nutzen – sofern Sie eingewilligt haben oder es gesetzlich zulässig ist – Conversion-Maßnahmen von Google Ads (siehe Abschnitt 6).
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

          <section>
            <h2>6. Online-Marketing und Conversion-Messung (Google Ads)</h2>
            <p>
              Diese Website verwendet <strong>Google Ads</strong> mit Conversion-Tracking. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“). Über eingebundene Skripte von <code className="text-slate-400">googletagmanager.com</code> / <strong>gtag.js</strong> können Cookies oder ähnliche Kennungen gesetzt und Nutzungsereignisse (z.&nbsp;B. Conversions bei Anfragen) an Google übermittelt werden.
            </p>
            <p>
              Zweck ist die Auswertung von Werbemaßnahmen und Conversion-Messung. Details zu Datenschutz bei Google:{" "}
              <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-[#60a5fa] hover:underline">
                https://policies.google.com/privacy
              </a>{" "}
              sowie{" "}
              <a href="https://business.safety.google/adsservices/" target="_blank" rel="noopener noreferrer" className="text-[#60a5fa] hover:underline">
                Google Ads &amp; Datenschutz
              </a>.
            </p>
            <p>
              <strong>Einwilligung per Banner:</strong> Beim ersten Besuch können Sie über unser Cookie-Banner auswählen, ob Marketing-Cookies und das Google-Ads-Messungsskript geladen werden dürfen. Ohne Zustimmung unter „Marketing zulassen“ werden diese Technologien nicht eingebunden.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Mit Ihrer Einwilligung über das Banner (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 TTDSG) werden die beschriebenen Marketing-Maßnahmen aktiviert. Ohne Einwilligung findet keine entsprechende Verarbeitung durch Google Ads statt.
            </p>
            <p>
              Sie können der interessenbezogenen Werbung bei Google widersprechen oder die Cookie-Einstellungen Ihres Browsers anpassen. Einstellungen zur personalisierten Werbung:{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#60a5fa] hover:underline">
                https://adssettings.google.com
              </a>.
            </p>
          </section>

          <section>
            <h2>7. Ihre Rechte und Beschwerdemöglichkeit</h2>
            <p>
              Sie haben das Recht auf <strong>Auskunft</strong> über die Sie betreffenden personenbezogenen Daten (Art. 15 DSGVO), <strong>Berichtigung</strong> (Art. 16 DSGVO), <strong>Löschung</strong> (Art. 17 DSGVO), <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO), <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) sowie <strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO), soweit die gesetzlichen Voraussetzungen vorliegen.
            </p>
            <p>
              Sofern die Verarbeitung auf Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
            </p>
            <p>
              Sie haben zudem das Recht, sich bei einer <strong>Datenschutz-Aufsichtsbehörde</strong> zu beschweren. Zuständig ist insbesondere die Landesbeauftragte für den Datenschutz Niedersachsen (
              <a href="https://www.lfd.niedersachsen.de" target="_blank" rel="noopener noreferrer" className="text-[#60a5fa] hover:underline">
                www.lfd.niedersachsen.de
              </a>
              ), sofern Sie sich in Niedersachsen aufhalten oder der Vorfall einen Bezug hierher hat.
            </p>
          </section>

          <section>
            <p className="text-sm text-slate-400">
              <strong>Stand dieser Datenschutzerklärung:</strong> März 2026
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
