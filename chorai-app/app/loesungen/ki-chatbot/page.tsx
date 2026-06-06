import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionLandingPage from "@/components/SolutionLandingPage";
import ContactFormCompactSection from "@/components/ContactFormCompactSection";

export const metadata = {
  title: "KI-Chatbot | ChorAI",
  description: "KI-Chatbot für Ihre Website – beantwortet Fragen, sammelt Infos und qualifiziert Anfragen.",
};

export default function KiChatbotPage() {
  return (
    <>
      <Navbar />
      <SolutionLandingPage
        heroTitle="KI-Chatbot"
        heroSubtitle="Mehr Anfragen – weniger Unterbrechung: Ein Chatbot beantwortet Standardfragen und sammelt Infos, bevor"
        heroHighlight="Sie ans Telefon müssen"
        introTitlePrefix="Mehr Leads, weniger "
        introTitleHighlight="Unterbrechungen"
        introTitleSuffix="."
        introText={[
          "Viele Website-Anfragen scheitern an Kleinigkeiten: Öffnungszeiten, Anfahrt, Leistungen, „Was kostet das ungefähr?“. Ein Chatbot beantwortet diese Fragen sofort – auch abends.",
          "Wenn es konkret wird, fragt der Bot gezielt nach: Welche Leistung? Wo? Bis wann? Gibt es Fotos oder Maße? So bekommen Sie strukturierte Infos statt unvollständiger Nachrichten.",
          "Sie entscheiden, wann der Chatbot an einen Menschen übergibt – z.B. bei Sonderfällen oder wichtigen Bestandskunden.",
        ]}
        programTitle="Chatbot-Setup"
        programSteps={[
          { title: "Fragenkatalog", description: "Wir sammeln Ihre häufigsten Fragen und bauen klare Antworten in Ihrer Sprache." },
          {
            title: "Lead-Qualifizierung",
            description: "Der Bot stellt die richtigen Rückfragen, damit Sie sofort wissen, worum es geht.",
          },
          {
            title: "Übergabe & Tracking",
            description: "Anfragen landen da, wo Sie arbeiten: E-Mail, CRM oder Kalender – inklusive Protokoll.",
          },
        ]}
        benefitsTitle="Das verbessert sich"
        benefits={[
          { title: "Mehr Leads", description: "Besucher bekommen sofort Hilfe und bleiben eher dran." },
          { title: "Bessere Infos", description: "Strukturierte Daten statt Freitext-Chaos." },
          { title: "Weniger Unterbrechung", description: "Standardfragen laufen automatisch." },
          { title: "Klare Übergabe", description: "Wenn es wichtig wird, übernehmen Sie." },
        ]}
        imageSrc="/loesungen/ki-chatbot.svg"
        ctaLabel="Chatbot prüfen"
        ctaHref="#kontakt"
      />
      <ContactFormCompactSection />
      <Footer />
    </>
  );
}

