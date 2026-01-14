import type { Metadata } from "next";

import FoerderungNavbar from "@/components/FoerderungNavbar";
import FoerderungContent from "@/components/FoerderungContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Förderung sichern – ChorAI",
  description:
    "Bis zu 50% Förderung sichern: Digitalbonus Niedersachsen & MID NRW. Jetzt kostenlosen Förder-Check anfordern und keine Frist verpassen.",
  alternates: {
    canonical: "/foerderung",
  },
};

export default function FoerderungPage() {
  return (
    <>
      <FoerderungNavbar />
      <main className="overflow-x-hidden w-full max-w-full">
        <FoerderungContent />
      </main>
      <Footer />
    </>
  );
}






