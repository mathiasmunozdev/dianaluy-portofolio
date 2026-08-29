"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/locale-provider";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { cn } from "@/lib/utils";

type ResumeView = "experience" | "education";

const toggleButtonClassName =
  "h-11 rounded-full border-2 border-accent px-6 text-base font-medium sm:h-[45px] sm:px-8 sm:text-nav";

export function Experience() {
  const { locale, t } = useLocale();
  const [activeView, setActiveView] = useState<ResumeView>("experience");

  const getToggleClassName = (view: ResumeView) =>
    cn(
      toggleButtonClassName,
      activeView === view
        ? "bg-accent text-accent-foreground hover:bg-accent"
        : "bg-transparent text-accent hover:bg-accent hover:text-accent-foreground",
    );

  return (
    <section id="experiencia" className="relative mx-3 mt-16 rounded-lg sm:mx-band lg:mt-[56px]">
      {/* Banda con gradiente que se funde en blanco */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-surface-tint via-white/90 to-white" />

      <div className="relative mx-auto grid max-w-content grid-cols-1 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 xl:grid-cols-[minmax(380px,530px)_1fr] xl:gap-x-[70px] xl:px-10 xl:pb-24 xl:pt-[22px] min-[1800px]:px-0">
        {/* Columna izquierda: título sticky */}
        <div className="self-start xl:sticky xl:top-24 xl:pt-16">
          <div>
            <h2 className="max-w-[520px] font-display text-[40px] font-bold leading-tight sm:text-[48px] xl:text-section">
              {t.experience.heading}
            </h2>
            <Image
              src="/icons/sparkle-experience.svg"
              alt=""
              width={40}
              height={40}
              className="mt-2 size-7 sm:mt-3 sm:size-9 xl:mt-4 xl:size-10"
            />
          </div>
        </div>

        {/* Columna derecha: pestañas + entradas */}
        <div className="pt-3 xl:pt-16">
          <div
            className="flex flex-wrap items-center gap-3 sm:gap-4"
            aria-label={t.experience.heading}
            role="group"
          >
            <Button
              type="button"
              aria-controls="resume-content"
              aria-pressed={activeView === "experience"}
              className={getToggleClassName("experience")}
              onClick={() => setActiveView("experience")}
            >
              {t.experience.tabs.experience}
            </Button>
            <Button
              type="button"
              aria-controls="resume-content"
              aria-pressed={activeView === "education"}
              className={getToggleClassName("education")}
              onClick={() => setActiveView("education")}
            >
              {t.experience.tabs.education}
            </Button>
          </div>

          <div id="resume-content">
            {activeView === "experience" ? (
              <ul className="font-body">
                {experience.map((item, i) => (
                  <li
                    key={`${item.company}-${i}`}
                    className={`border-b border-separator pb-8 sm:pb-10 ${i === 0 ? "pt-10 sm:pt-15" : "pt-7"} ${
                      i === experience.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <h3 className="text-[25px] font-semibold leading-8 text-primary sm:text-[28px] sm:leading-9 lg:text-role lg:leading-[42px]">
                      {item.role[locale]}
                    </h3>
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
            ) : (
              <div className="pt-10 font-body sm:pt-15">
                <ul>
                  {education.map((item, index) => (
                    <li
                      key={item.title.es}
                      className={`border-b border-separator py-5 sm:py-6 ${
                        index === 0 ? "pt-0" : ""
                      } ${index === education.length - 1 ? "border-b-0 pb-0" : ""}`}
                    >
                      <h4 className="text-[22px] font-semibold leading-8 text-primary sm:text-[25px] sm:leading-9">
                        {item.title[locale]}
                      </h4>
                      <div className="mt-1 flex flex-col gap-1 text-[15px] leading-6 text-muted-foreground sm:flex-row sm:items-baseline sm:justify-between sm:gap-5 sm:text-base">
                        <p>{item.institution}</p>
                        <p className="shrink-0 font-semibold">{item.period[locale]}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
