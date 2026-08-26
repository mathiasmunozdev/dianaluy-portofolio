"use client";

import { useLocale } from "@/components/locale-provider";
import type { Profile } from "@/lib/schemas";

type AboutCopyProps = {
  about: Profile["about"];
};

export function AboutCopy({ about }: AboutCopyProps) {
  const { locale, t } = useLocale();

  return (
    <>
      <h2 className="absolute left-1/2 top-[187px] -translate-x-1/2 whitespace-nowrap text-center font-display text-section font-bold">
        {t.about.heading}
      </h2>
      <p className="absolute left-1/2 top-[337px] w-[870px] max-w-[90%] -translate-x-1/2 text-center font-display text-lead font-light text-muted-foreground">
        {about[locale]}
      </p>
    </>
  );
}
