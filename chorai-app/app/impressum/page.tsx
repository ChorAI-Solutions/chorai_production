import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Impressum - ChorAI",
  description: "Impressum der ChorAI",
};

export default function Impressum() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full max-w-full">
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-slate-100">Impressum</h1>
            
            <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-slate-100">Angaben gemäß § 5 DDG</h2>
                <p>
                  <strong>ChorAI</strong>
                  <br />
                  Einzelunternehmen
                  <br />
                  Inhaberin: Margarita Chorow
                  <br />
                  Schulbrink 18
                  <br />
                  31675 Bückeburg
                </p>
              </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">Kontakt</h2>
            <p>
              E-Mail: <a href="mailto:info@chorai.de" className="text-[#3b82f6] hover:underline">info@chorai.de</a>
              <br />
              Web: <a href="https://www.chorai.de" className="text-[#3b82f6] hover:underline">www.chorai.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">Umsatzsteuer-ID</h2>
            <p>
              Wir sind Kleinunternehmer gemäß § 19 Abs. 1 UStG.
              <br />
              <br />
              Es wird keine Umsatzsteuer berechnet und auch keine Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz ausgewiesen.
              <br />
              <br />
              Steuernummer beim Finanzamt Stadthagen 44/108/08663
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">Redaktionell verantwortlich</h2>
            <p>
              Margarita Chorow
              <br />
              Schulbrink 18
              <br />
              31675 Bückeburg
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-100">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
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


