"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-mono font-bold mb-4 text-slate-100">
              CHOR<span className="text-[#3b82f6]">AI</span>
            </h3>
            <p className="text-slate-400 text-sm">
              Managed Automation auf Ihrer Infrastruktur.
              {" "}Datenschutzorientiert. 0% Cloud-Zwang.
            </p>
          </div>
          <div>
            <h4 className="text-slate-300 font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-slate-400 hover:text-[#3b82f6] transition-colors text-sm">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-slate-400 hover:text-[#3b82f6] transition-colors text-sm">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-slate-400 hover:text-[#3b82f6] transition-colors text-sm">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-300 font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Schulbrink 18</li>
              <li>31675 Bückeburg</li>
              <li>
                <a href="mailto:info@chorai.de" className="hover:text-[#3b82f6] transition-colors">
                  info@chorai.de
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} ChorAI - Margarita Chorow
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
          </p>
        </div>
      </div>
    </footer>
  );
}


