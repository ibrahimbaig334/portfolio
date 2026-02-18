import { useCallback } from "react";

export function useScrollToSection() {
  return useCallback((selector) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);
}
