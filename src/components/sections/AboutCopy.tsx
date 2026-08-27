"use client";

import { useLocale } from "@/components/locale-provider";
import type { Profile } from "@/lib/schemas";

type AboutCopyProps = {
  about: Profile["about"];
};

export function AboutCopy({ about }: AboutCopyProps) {
  const { locale, t } = useLocale();

  return (
    <div className="relative z-10 mx-auto flex max-w-[870px] flex-col items-center text-center xl:contents">
      <h2 className="font-display text-[40px] font-bold leading-tight sm:text-[48px] xl:absolute xl:left-1/2 xl:top-[187px] xl:-translate-x-1/2 xl:whitespace-nowrap xl:text-section">
        {t.about.heading}
      </h2>
      <p className="mt-14 max-w-[680px] font-display text-[18px] font-light leading-8 text-muted-foreground sm:mt-16 sm:text-[21px] sm:leading-9 xl:absolute xl:left-1/2 xl:top-[337px] xl:mt-0 xl:w-[870px] xl:max-w-[90%] xl:-translate-x-1/2 xl:text-lead">
        {about[locale]}
      </p>
    </div>
  );
}
