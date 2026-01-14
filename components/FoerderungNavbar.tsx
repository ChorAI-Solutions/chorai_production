"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { trackAnalyseAnfordernConversion } from "@/lib/analytics/googleAds";

export default function FoerderungNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) return;

    sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFoerderCheckClick = () => {
    trackAnalyseAnfordernConversion();
    scrollToSection("kontakt");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a1525]/95 backdrop-blur-sm border-b border-slate-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-mono font-bold text-slate-300">
              CHOR
              <span className="text-[#3b82f6]">AI</span>
              <span className="cursor-blink text-[#3b82f6]">_</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("vergleich")}
              className="text-slate-300 hover:text-[#3b82f6] transition-colors"
            >
              Vergleich
            </button>
            <button
              onClick={() => scrollToSection("niedersachsen")}
              className="text-slate-300 hover:text-[#3b82f6] transition-colors"
            >
              Niedersachsen
            </button>
            <button
              onClick={() => scrollToSection("nrw")}
              className="text-slate-300 hover:text-[#3b82f6] transition-colors"
            >
              NRW
            </button>
            <button
              onClick={handleFoerderCheckClick}
              className="bg-[#3b82f6] text-white px-6 py-2 rounded-xl hover:bg-[#2563eb] transition-colors font-medium shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5"
            >
              Förder-Check
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={handleFoerderCheckClick}
              className="bg-[#3b82f6] text-white px-4 py-2 rounded-xl hover:bg-[#2563eb] transition-colors font-medium text-sm shadow-lg shadow-[#3b82f6]/20 ring-1 ring-white/5"
            >
              Förder-Check
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}



