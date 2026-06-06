import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionLandingPage from "@/components/SolutionLandingPage";
import ContactFormCompactSection from "@/components/ContactFormCompactSection";

export const metadata = {
  title: "Prozessautomatisierung | ChorAI",
  description: "Prozessautomatisierung für Handwerk & KMU – weniger Büro, mehr Zeit fürs Kerngeschäft.",
};

export default function ProzessautomatisierungPage() {
  return (
    <>
      <Navbar />
      <SolutionLandingPage
        heroTitle="Prozessautomatisierung"
        heroSubtitle="Weniger Copy/Paste, weniger Rückfragen: Wir bauen Abläufe, die automatisch laufen – von Anfrage bis Rechnung, optional mit"
        heroHighlight="KI-Unterstützung"
        introTitlePrefix="Ihr Büro wird schneller – "
        introTitleHighlight="ohne zusätzliches Personal"
        introTitleSuffix="."
        introText={[
          "Wenn Anfragen, Angebote, Terminabsprachen und Rechnungen ständig manuell hin- und hergeschoben werden, kostet das jeden Tag Fokus. Automatisierung heißt: einmal sauber bauen – dann läuft es zuverlässig im Hintergrund.",
          "Wir verbinden Ihre bestehenden Systeme (E-Mail, Kalender, CRM/ERP, Handwerker-Software). Daten werden automatisch übernommen, geprüft und an die nächste Stelle weitergegeben.",
          "So entsteht ein klarer Ablauf: weniger Doppelarbeit, weniger Zahlendreher, weniger vergessene Schritte – und jederzeit nachvollziehbar, was passiert ist.",
        ]}
        programTitle="Unser Vorgehen"
        programSteps={[
          {
            title: "Workflow auswählen",
            description:
              "Wir starten mit 1–2 Abläufen, die sofort Wirkung zeigen (z.B. Anfrage → Angebot → Auftrag → Rechnung).",
          },
          {
            title: "Umsetzen & integrieren",
            description:
              "Wir bauen den Ablauf mit klaren Regeln: Daten holen, prüfen, weiterleiten, dokumentieren – passend zu Ihren Tools.",
          },
          {
            title: "Testen & stabilisieren",
            description:
              "Sie testen mit echten Fällen. Danach optimieren wir Details, bis es im Alltag zuverlässig läuft.",
          },
        ]}
        benefitsTitle="Was Sie typischerweise gewinnen"
        benefits={[
          { title: "Weniger Tipp-Arbeit", description: "Daten werden einmal erfasst und automatisch weitergenutzt." },
          { title: "Weniger Fehler", description: "Validierung verhindert Zahlendreher und vergessene Schritte." },
          { title: "Schnellere Reaktion", description: "Kunden bekommen schneller Rückmeldung und Termine." },
          { title: "Mehr Überblick", description: "Protokolle/Logs sorgen dafür, dass nichts untergeht." },
        ]}
        imageSrc="/loesungen/prozessautomatisierung.svg"
        ctaLabel="Workflow-Idee prüfen"
        ctaHref="#kontakt"
      />
      <ContactFormCompactSection />
      <Footer />
    </>
  );
}

