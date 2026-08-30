"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { education } from "@/content/education";
import { experience } from "@/content/experience";

type ResumeView = "experience" | "education";

export function Experience() {
  const { locale, t } = useLocale();
  const [activeView, setActiveView] = useState<ResumeView>("experience");

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
            className="flex flex-wrap items-center gap-2 font-display text-sm"
            aria-label={t.experience.heading}
            role="tablist"
          >
            <button
              id="experience-tab"
              type="button"
              role="tab"
              aria-controls="resume-content"
              aria-selected={activeView === "experience"}
              className={`inline-flex h-8 min-w-[132px] items-center justify-center rounded-full border border-accent bg-transparent px-6 font-medium leading-none text-accent transition-[border-width] focus-visible:border-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30 ${
                activeView === "experience"
                  ? "border-2"
                  : "hover:border-2"
              }`}
              onClick={() => setActiveView("experience")}
            >
              {t.experience.tabs.experience}
            </button>
            <button
              id="education-tab"
              type="button"
              role="tab"
              aria-controls="resume-content"
              aria-selected={activeView === "education"}
              className={`inline-flex h-8 min-w-[116px] items-center justify-center rounded-full border border-accent bg-transparent px-6 font-medium leading-none text-accent transition-[border-width] focus-visible:border-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30 ${
                activeView === "education"
                  ? "border-2"
                  : "hover:border-2"
              }`}
              onClick={() => setActiveView("education")}
            >
              {t.experience.tabs.education}
            </button>
          </div>

          <div
            key={activeView}
            id="resume-content"
            role="tabpanel"
            aria-labelledby={`${activeView}-tab`}
            className="animate-projects-enter pt-8 sm:pt-9.5"
          >
            {activeView === "experience" ? (
              <ul className="font-body">
                {experience.map((item, i) => (
                  <li
                    key={`${item.company}-${i}`}
                    className={`border-b border-separator pb-8 sm:pb-10 ${i === 0 ? "pt-0" : "pt-7"} ${
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
              <div className="font-body">
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
