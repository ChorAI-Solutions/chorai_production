import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import Foerderung2026Section from "@/components/Foerderung2026Section";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full max-w-full">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <Foerderung2026Section />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
