import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionLandingPage from "@/components/SolutionLandingPage";
import ContactFormCompactSection from "@/components/ContactFormCompactSection";

export const metadata = {
  title: "KI-Beratung | ChorAI",
  description: "KI-Beratung für Handwerk & KMU – verständlich, praxisnah, ohne Buzzwords.",
};

export default function KiBeratungPage() {
  return (
    <>
      <Navbar />
      <SolutionLandingPage
        heroTitle="KI-Beratung"
        heroSubtitle="Wir zeigen Ihnen verständlich und praxisnah, wo"
        heroHighlight="KI im Handwerk"
        introTitlePrefix="Wir finden Ihr "
        introTitleHighlight="KI-Potenzial"
        introTitleSuffix=" – ohne Buzzwords."
        introText={[
          "Viele Betriebe hören überall „KI“ – aber im Alltag zählt nur, ob es Ihnen Zeit spart. Wir starten deshalb nicht mit Technik, sondern mit Ihren echten Abläufen: Anfrage, Angebot, Termin, Rechnung, Nachkalkulation.",
          "Gemeinsam finden wir 2–3 Use-Cases, die schnell Wirkung zeigen. Typisch sind z.B. automatische Vorqualifizierung von Anfragen, Zusammenfassen von Kundeninfos oder das Erstellen von Texten aus Stichpunkten (ohne Copy/Paste).",
          "Sie erhalten einen klaren Fahrplan: Was wir zuerst umsetzen, welche Daten dafür nötig sind, welche Risiken es gibt (DSGVO) – und wie Sie intern das Thema sauber betreiben.",
        ]}
        programTitle="So läuft die Beratung ab"
        programSteps={[
          {
            title: "Kurz-Interview (Ist-Zustand)",
            description:
              "Wir klären Ziele, vorhandene Tools (E-Mail, Telefon, Kalender, Handwerker-Software) und die größten Zeitfresser im Büro.",
          },
          {
            title: "Prozess- & Datencheck",
            description:
              "Wir prüfen: Welche Informationen fehlen oft? Wo entstehen Rückfragen? Welche Daten sind sauber erfasst – und was sollte zuerst verbessert werden?",
          },
          {
            title: "Konzept mit Quick Wins",
            description:
              "Sie bekommen Prioritäten, Aufwand/Nutzen und den nächsten konkreten Schritt. Optional planen wir direkt die Umsetzung (inkl. Förderung).",
          },
        ]}
        benefitsTitle="Was Sie am Ende in der Hand haben"
        benefits={[
          { title: "Konkrete Use-Cases", description: "2–3 Ideen, die zu Ihrem Betrieb passen – mit klarer Priorität." },
          { title: "Realistische Roadmap", description: "Was zuerst, was später – inkl. Aufwand und grobem Kostenrahmen." },
          { title: "DSGVO-Check", description: "Saubere Rollen, Datenquellen und Grenzen – damit es sicher bleibt." },
          { title: "Nächster Schritt", description: "Sie wissen genau, was als Nächstes zu tun ist – ohne Rätselraten." },
        ]}
        imageSrc="/loesungen/ki-beratung.svg"
        ctaLabel="Jetzt starten"
        ctaHref="#kontakt"
      />
      <ContactFormCompactSection />
      <Footer />
    </>
  );
}

