const googleAdsConversionId = "AW-17808977886";
const googleAdsSendTo = "AW-17808977886/4i0QCNXEn9IbEN7f_atC";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export function injectGoogleAdsScripts(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById("chorai-gtag-script")) return;

  const externalScript = document.createElement("script");
  externalScript.id = "chorai-gtag-script";
  externalScript.async = true;
  externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsConversionId}`;

  externalScript.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]): void {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", googleAdsConversionId);

    window.gtag_report_conversion = function gtagReportConversion(url?: string): boolean {
      const callback = function (): void {
        if (typeof url !== "undefined") {
          window.location.href = url;
        }
      };
      gtag("event", "conversion", {
        send_to: googleAdsSendTo,
        event_callback: callback,
      });
      return false;
    };
  };

  document.head.appendChild(externalScript);
}
