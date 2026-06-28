import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = "G-FG0TEVP4HK";

/**
 * Tracks SPA route changes as GA4 page_view events and
 * captures CTA click events ([data-cta] elements) globally.
 */
export const Analytics = () => {
  const location = useLocation();

  // page_view on every route change
  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_ID,
    });
  }, [location.pathname, location.search]);

  // Global CTA click delegation
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      const label = el.dataset.cta || el.textContent?.trim() || "cta";
      const location = el.dataset.ctaLocation || "unknown";
      window.gtag?.("event", "cta_click", {
        cta_label: label,
        cta_location: location,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true } as EventListenerOptions);
  }, []);

  return null;
};

export default Analytics;
