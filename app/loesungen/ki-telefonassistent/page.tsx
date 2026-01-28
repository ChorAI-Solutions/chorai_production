import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionLandingPage from "@/components/SolutionLandingPage";
import ContactFormCompactSection from "@/components/ContactFormCompactSection";

export const metadata = {
  title: "KI-Telefonassistent | ChorAI",
  description: "KI-Telefonassistent – Anrufe annehmen, Anliegen sortieren, Termine vorbereiten.",
};

export default function KiTelefonassistentPage() {
  return (
    <>
      <Navbar />
      <SolutionLandingPage
        heroTitle="KI-Telefonassistent"
        heroSubtitle="Nie wieder verpasste Anrufe: Der Assistent nimmt Gespräche an, stellt Rückfragen und"
        heroHighlight="fasst alles sauber zusammen"
        introTitlePrefix="Sie bleiben "
        introTitleHighlight="im Flow"
        introTitleSuffix=" – das Telefon trotzdem unter Kontrolle."
        introText={[
          "Wenn im Betrieb gerade gearbeitet wird, klingelt das Telefon oft „nebenbei“. Genau dann gehen Anrufe verloren oder Infos fehlen später.",
          "Ein Telefonassistent kann Anrufe annehmen, das Anliegen erfassen (z.B. Wartung, Störung, Angebot), Rückfragen stellen und alles strukturiert an Sie weitergeben.",
          "Sie bekommen am Ende nicht nur „Bitte zurückrufen“, sondern: Name, Adresse, Problem, gewünschtes Zeitfenster – plus eine saubere Zusammenfassung fürs Team.",
        ]}
        programTitle="Telefon-Flow"
        programSteps={[
          {
            title: "Anliegen-Kategorien",
            description: "Wir definieren typische Gründe für Anrufe und die passenden Rückfragen dazu.",
          },
          {
            title: "Übergabe-Regeln",
            description: "Bei Notfällen sofort zu Ihnen – sonst sauber als Ticket/Anfrage mit allen Details.",
          },
          {
            title: "Kalender & Nacharbeit",
            description: "Optional: Terminvorschläge, Erinnerungen und Zusammenfassung fürs Team.",
          },
        ]}
        benefitsTitle="Das bringt’s"
        benefits={[
          { title: "Keine verpassten Anrufe", description: "Auch außerhalb der Stoßzeiten wird aufgenommen." },
          { title: "Bessere Vorbereitung", description: "Sie wissen vorab, worum es geht und was gebraucht wird." },
          { title: "Weniger Stress", description: "Telefon stört weniger – Infos sind trotzdem da." },
          { title: "Saubere Doku", description: "Jeder Anruf landet als strukturierte Notiz/Ticket." },
        ]}
        imageSrc="/loesungen/ki-telefonassistent.svg"
        ctaLabel="Telefonassistent planen"
        ctaHref="#kontakt"
      />
      <ContactFormCompactSection />
      <Footer />
    </>
  );
}

