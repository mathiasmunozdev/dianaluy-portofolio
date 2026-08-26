"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/locale-provider";
import { experience } from "@/content/experience";

export function Experience() {
  const { locale, t } = useLocale();

  return (
    <section id="experiencia" className="relative mx-band mt-[56px]">
      {/* Banda con gradiente que se funde en blanco */}
      <div className="absolute inset-x-0 top-0 h-[944px] rounded-lg bg-gradient-to-b from-surface-tint to-white" />

      <div className="relative mx-auto grid max-w-content grid-cols-[530px_1fr] gap-x-[70px] px-10 pt-[22px] pb-24 min-[1800px]:px-0">
        {/* Columna izquierda: título sticky */}
        <div className="self-start pt-16 lg:sticky lg:top-0">
          <div className="relative h-[328px]">
            <h2 className="font-display text-section font-bold">
              {t.experience.heading}
            </h2>
            <Image
              src="/icons/sparkle-experience.svg"
              alt=""
              width={40}
              height={40}
              className="absolute pt-10 left-5"
            />
          </div>
        </div>

        {/* Columna derecha: pestañas + entradas */}
        <div className="pt-16">
          {/* Toggle visual: el diseño no define contenido para "Educación" */}
          <div className="flex items-center gap-4">
            <Button className="h-[45px] rounded-full bg-accent px-8 text-nav font-medium text-accent-foreground hover:bg-accent">
              {t.experience.tabs.experience}
            </Button>
            <Button
              variant="outline"
              className="h-[45px] rounded-full border-2 border-accent bg-transparent px-8 text-nav font-medium text-accent hover:bg-transparent hover:text-accent"
            >
              {t.experience.tabs.education}
            </Button>
          </div>

          <ul className="font-body">
            {experience.map((item, i) => (
              <li
                key={`${item.company}-${i}`}
                className={`border-b border-separator pb-10 ${i === 0 ? "pt-15" : "pt-7"} ${
                  i === experience.length - 1 ? "border-b-0" : ""
                }`}
              >
                <h3 className="text-role font-semibold text-primary">{item.role[locale]}</h3>
                <div className="mt-2 flex items-baseline justify-between text-nav font-semibold text-muted-foreground">
                  <p>{item.company}</p>
                  <p>{item.period[locale]}</p>
                </div>
                <ul className="mt-7 list-disc ps-7.5 text-cv text-muted-foreground">
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
