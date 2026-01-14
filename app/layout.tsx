import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import DebugPing from "@/components/DebugPing";
import AutofillFix from "@/components/AutofillFix";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ChorAI",
  description: "IT-Dienstleistungen und Prozessautomatisierung",
  priceRange: "$$",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Schaumburg" },
    { "@type": "AdministrativeArea", name: "Minden-Lübbecke" },
    { "@type": "AdministrativeArea", name: "Ostwestfalen-Lippe" },
    { "@type": "AdministrativeArea", name: "Weserbergland" },
    { "@type": "AdministrativeArea", name: "Region Hannover" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Schulbrink 18",
    postalCode: "31675",
    addressLocality: "Bückeburg",
    addressCountry: "DE",
  },
  url: "https://chorai.de",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Prozessautomatisierung Handwerk & KMU | Schaumburg, Minden & OWL | ChorAI",
  description:
    "Wir automatisieren lästige Büroarbeit für Handwerker und KMUs im Landkreis Schaumburg, Minden-Lübbecke und Umgebung. Eigene Server, 100% DSGVO-konform, staatlich gefördert.",
  keywords:
    "Prozessautomatisierung für KMU, Prozessautomatisierung Handwerk, IT-Service Kreis Schaumburg & Minden-Lübbecke, Büro Digitalisierung OWL, Datenschutzkonforme KI, DSGVO, Automatisierung, Bückeburg, Minden, Schaumburg, Ostwestfalen-Lippe",
  authors: [{ name: "Margarita Chorow" }],
  metadataBase: new URL("https://chorai.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prozessautomatisierung Handwerk & KMU | ChorAI",
    description:
      "Wir automatisieren lästige Büroarbeit für Handwerker und KMUs im Landkreis Schaumburg, Minden-Lübbecke und Umgebung. Eigene Server, 100% DSGVO-konform, staatlich gefördert.",
    type: "website",
    url: "https://chorai.de",
    siteName: "ChorAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prozessautomatisierung Handwerk & KMU | ChorAI",
    description:
      "Wir automatisieren lästige Büroarbeit für Handwerker und KMUs im Landkreis Schaumburg, Minden-Lübbecke und Umgebung. Eigene Server, 100% DSGVO-konform, staatlich gefördert.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark overflow-x-hidden">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17808977886"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17808977886');
          `}
        </Script>
        <Script id="google-ads-gtag-report-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-17808977886/4i0QCNXEn9IbEN7f_atC',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
        <Script id="schema-localbusiness" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(localBusinessJsonLd)}
        </Script>
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased bg-[#0a1525] text-slate-300 overflow-x-hidden w-full max-w-full`}
      >
        <AutofillFix />
        <DebugPing />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
