"use client";

import { useEffect } from "react";

// Use concrete color values instead of CSS variables for maximum compatibility
const darkBackground = "#0a1525";
const darkForeground = "#cbd5e1";

function applyAutofillInlineStyles(htmlElement: HTMLElement) {
  // Force dark theme colors with !important via inline styles
  htmlElement.style.setProperty("background-color", darkBackground, "important");
  htmlElement.style.setProperty("color", darkForeground, "important");
  htmlElement.style.setProperty("caret-color", darkForeground, "important");
  htmlElement.style.setProperty("box-shadow", `0 0 0px 1000px ${darkBackground} inset`, "important");
  htmlElement.style.setProperty("-webkit-box-shadow", `0 0 0px 1000px ${darkBackground} inset`, "important");
  htmlElement.style.setProperty("background-image", "none", "important");
  htmlElement.style.setProperty("filter", "none", "important");
  
  // WebKit-specific text fill color
  const style = htmlElement.style as unknown as Record<string, string>;
  style.webkitTextFillColor = darkForeground;
  // Also try via setProperty on the actual style object
  htmlElement.style.setProperty("-webkit-text-fill-color", darkForeground, "important");
}

function isAutofillTarget(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select";
}

function forceDarkStylesOnElement(element: HTMLElement) {
  if (!isAutofillTarget(element)) return;
  
  // Check if element has value (might be autofilled)
  const hasValue = 
    (element instanceof HTMLInputElement && element.value.length > 0) ||
    (element instanceof HTMLTextAreaElement && element.value.length > 0) ||
    (element instanceof HTMLSelectElement && element.value.length > 0);
  
  // Check if element is focused or has value
  const isFocused = document.activeElement === element;
  
  if (hasValue || isFocused) {
    applyAutofillInlineStyles(element);
  }
}

export default function AutofillFix() {
  useEffect(() => {
    // Aggressive fix: apply styles on multiple events
    const handleInputEvent = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLElement && isAutofillTarget(target)) {
        applyAutofillInlineStyles(target);
      }
    };

    const handleFocusEvent = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLElement && isAutofillTarget(target)) {
        // Small delay to catch autofill that happens after focus
        setTimeout(() => {
          if (target instanceof HTMLElement) {
            applyAutofillInlineStyles(target);
          }
        }, 10);
        applyAutofillInlineStyles(target);
      }
    };

    const handleChangeEvent = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLElement && isAutofillTarget(target)) {
        applyAutofillInlineStyles(target);
      }
    };

    // Periodic check to force styles on all inputs (catches autofill that happens without events)
    const intervalId = setInterval(() => {
      const allInputs = document.querySelectorAll<HTMLElement>("input, textarea, select");
      allInputs.forEach(forceDarkStylesOnElement);
    }, 100);

    // Event listeners
    document.addEventListener("input", handleInputEvent, true);
    document.addEventListener("focus", handleFocusEvent, true);
    document.addEventListener("change", handleChangeEvent, true);
    document.addEventListener("focusin", handleFocusEvent, true);

    // Also check immediately on mount
    setTimeout(() => {
      const allInputs = document.querySelectorAll<HTMLElement>("input, textarea, select");
      allInputs.forEach(forceDarkStylesOnElement);
    }, 100);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("input", handleInputEvent, true);
      document.removeEventListener("focus", handleFocusEvent, true);
      document.removeEventListener("change", handleChangeEvent, true);
      document.removeEventListener("focusin", handleFocusEvent, true);
    };
  }, []);

  return null;
}

