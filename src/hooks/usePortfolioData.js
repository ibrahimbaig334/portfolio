import { useMemo } from "react";
import { portfolioData } from "../data/portfolioData";

/**
 * CRA-friendly replacement for portfolio-v2's SWR hook.
 * Returns hardcoded data so ported components can stay mostly unchanged.
 */
export function usePortfolioData() {
  const data = useMemo(() => portfolioData, []);
  return { data };
}
