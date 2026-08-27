"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/locale-provider";
import { experience } from "@/content/experience";

export function Experience() {
  const { locale, t } = useLocale();

  return (
    <section id="experiencia" className="relative mx-3 mt-16 overflow-hidden rounded-lg sm:mx-band lg:mt-[56px]">
      {/* Banda con gradiente que se funde en blanco */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-surface-tint via-white/90 to-white" />

      <div className="relative mx-auto grid max-w-content grid-cols-1 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 xl:grid-cols-[minmax(380px,530px)_1fr] xl:gap-x-[70px] xl:px-10 xl:pb-24 xl:pt-[22px] min-[1800px]:px-0">
        {/* Columna izquierda: título sticky */}
        <div className="self-start xl:sticky xl:top-0 xl:pt-16">
          <div className="relative h-[135px] sm:h-[150px] xl:h-[328px]">
            <h2 className="max-w-[520px] font-display text-[40px] font-bold leading-tight sm:text-[48px] xl:text-section">
              {t.experience.heading}
            </h2>
            <Image
              src="/icons/sparkle-experience.svg"
              alt=""
              width={40}
              height={40}
              className="absolute left-2 top-24 size-7 sm:left-5 sm:top-28 sm:size-9 xl:top-auto xl:size-10 xl:pt-10"
            />
          </div>
        </div>

        {/* Columna derecha: pestañas + entradas */}
        <div className="pt-3 xl:pt-16">
          {/* Toggle visual: el diseño no define contenido para "Educación" */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button className="h-11 rounded-full bg-accent px-6 text-base font-medium text-accent-foreground hover:bg-accent sm:h-[45px] sm:px-8 sm:text-nav">
              {t.experience.tabs.experience}
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-full border-2 border-accent bg-transparent px-6 text-base font-medium text-accent hover:bg-transparent hover:text-accent sm:h-[45px] sm:px-8 sm:text-nav"
            >
              {t.experience.tabs.education}
            </Button>
          </div>

          <ul className="font-body">
            {experience.map((item, i) => (
              <li
                key={`${item.company}-${i}`}
                className={`border-b border-separator pb-8 sm:pb-10 ${i === 0 ? "pt-10 sm:pt-15" : "pt-7"} ${
                  i === experience.length - 1 ? "border-b-0" : ""
                }`}
              >
                <h3 className="text-[25px] font-semibold leading-8 text-primary sm:text-[28px] sm:leading-9 lg:text-role lg:leading-[42px]">{item.role[locale]}</h3>
                <div className="mt-3 flex flex-col gap-1 text-base font-semibold text-muted-foreground sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 lg:mt-2 lg:text-nav">
                  <p>{item.company}</p>
                  <p>{item.period[locale]}</p>
                </div>
                <ul className="mt-5 list-disc space-y-1.5 ps-5 text-[15px] leading-6 text-muted-foreground sm:mt-7 sm:ps-7.5 sm:text-cv sm:leading-[27px]">
                  {item.bullets[locale].map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
