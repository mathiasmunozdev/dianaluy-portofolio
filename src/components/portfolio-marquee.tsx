"use client";

import { MarqueeBand } from "@/components/marquee-band";
import { useLocale } from "@/components/locale-provider";

/** Banda del intermedio: es la única cuyo texto cambia con el idioma. */
export function PortfolioMarquee() {
  const { t } = useLocale();

  return <MarqueeBand word={t.marquee.portfolio} />;
}
