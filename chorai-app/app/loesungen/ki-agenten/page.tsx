import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionLandingPage from "@/components/SolutionLandingPage";
import ContactFormCompactSection from "@/components/ContactFormCompactSection";

export const metadata = {
  title: "KI-Agenten | ChorAI",
  description: "KI-Agenten für Handwerk & KMU – wiederkehrende Aufgaben automatisch erledigen lassen.",
};

export default function KiAgentenPage() {
  return (
    <>
      <Navbar />
      <SolutionLandingPage
        heroTitle="KI-Agenten"
        heroSubtitle="Digitale Helfer, die Anfragen sortieren, fehlende Infos nachholen und"
        heroHighlight="den nächsten Schritt starten"
        introTitlePrefix="Ein Assistent, der "
        introTitleHighlight="mitdenkt"
        introTitleSuffix=" – aber nach Ihren Regeln."
        introText={[
          "Ein KI-Agent ist wie ein sehr fleißiger Kollege im Hintergrund: Er liest eingehende Anfragen, erkennt das Anliegen und startet die passenden Schritte.",
          "Beispiel aus dem Handwerk: Eine Anfrage kommt per E-Mail oder Formular rein. Der Agent prüft, ob Adresse, Fotos und gewünschter Termin enthalten sind – wenn nicht, fragt er automatisch nach.",
          "Das Ergebnis: weniger Ping-Pong, weniger „Bitte nochmal schicken“, und ein deutlich schnellerer Weg vom Erstkontakt bis zum Auftrag.",
        ]}
        programTitle="Agenten-Setup"
        programSteps={[
          {
            title: "Aufgaben & Grenzen",
            description:
              "Wir legen fest, was der Agent darf (und was nicht): z.B. Infos sammeln, Rückfragen stellen, Terminfenster vorschlagen.",
          },
          {
            title: "Wissen & Regeln einbauen",
            description:
              "Wir hinterlegen Ihre Regeln (Anfahrtsgebiet, Leistungen, Zeiten) und bauen sichere Abgrenzungen.",
          },
          {
            title: "Integration",
            description:
              "Der Agent arbeitet direkt in Ihren Kanälen: E-Mail, Formular, CRM, Kalender – je nach Setup.",
          },
        ]}
        benefitsTitle="Vorteile im Alltag"
        benefits={[
          { title: "Schnellere Reaktion", description: "Anfragen werden sofort vorsortiert und beantwortet." },
          { title: "Weniger Rückfragen", description: "Fehlende Infos werden automatisch nachgeholt." },
          { title: "Entlastung im Büro", description: "Routine wird abgefangen – Sie behalten den Überblick." },
          { title: "Klare Grenzen", description: "Der Agent handelt nur innerhalb Ihrer Regeln." },
        ]}
        imageSrc="/loesungen/ki-agenten.svg"
        ctaLabel="Use-Case besprechen"
        ctaHref="#kontakt"
      />
      <ContactFormCompactSection />
      <Footer />
    </>
  );
}

