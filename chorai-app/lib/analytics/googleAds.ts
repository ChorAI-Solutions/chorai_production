type GtagReportConversionFunction = (url?: string) => boolean;

function getGtagReportConversionFunction(): GtagReportConversionFunction | null {
  if (typeof window === "undefined") return null;

  const windowWithReportConversion = window as Window & {
    gtag_report_conversion?: GtagReportConversionFunction;
  };

  if (typeof windowWithReportConversion.gtag_report_conversion !== "function") return null;

  return windowWithReportConversion.gtag_report_conversion;
}

function hasTrackedAnalyseAnfordernConversion(): boolean {
  if (typeof window === "undefined") return false;

  const windowWithFlag = window as Window & { choraiAnalyseAnfordernConversionTracked?: boolean };
  return windowWithFlag.choraiAnalyseAnfordernConversionTracked === true;
}

function markAnalyseAnfordernConversionTracked(): void {
  if (typeof window === "undefined") return;

  const windowWithFlag = window as Window & { choraiAnalyseAnfordernConversionTracked?: boolean };
  windowWithFlag.choraiAnalyseAnfordernConversionTracked = true;
}

export function trackAnalyseAnfordernConversion(url?: string): void {
  if (hasTrackedAnalyseAnfordernConversion()) return;

  const reportConversionFunction = getGtagReportConversionFunction();
  if (!reportConversionFunction) return;

  markAnalyseAnfordernConversionTracked();
  reportConversionFunction(url);
}


