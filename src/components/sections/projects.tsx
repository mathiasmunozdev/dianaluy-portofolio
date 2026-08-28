"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/lib/schemas";

const CARD_ASPECT_RATIO = 530 / 560;
const CONTAIN_COVER_SIZES =
  "(max-width: 639px) calc(100vw - 40px), (max-width: 1279px) calc(50vw - 44px), (max-width: 1799px) calc(33vw - 48px), 530px";

/** `object-cover` puede hacer que una imagen horizontal ocupe más ancho que
 *  la tarjeta. `sizes` debe reflejar ese recorte para que no se amplíe una
 *  variante demasiado pequeña. */
function getCoverSizes(project: Project) {
  if (project.coverFit === "contain") return CONTAIN_COVER_SIZES;

  const scale = Math.max(1, project.coverAspectRatio / CARD_ASPECT_RATIO);
  const mobileWidth = Number((scale * 100).toFixed(2));
  const mobileGutter = Number((scale * 40).toFixed(2));
  const tabletWidth = Math.ceil(500 * Math.max(project.coverAspectRatio, CARD_ASPECT_RATIO));
  const desktopWidth = Math.ceil(560 * Math.max(project.coverAspectRatio, CARD_ASPECT_RATIO));

  return `(max-width: 639px) calc(${mobileWidth}vw - ${mobileGutter}px), (max-width: 1023px) ${tabletWidth}px, ${desktopWidth}px`;
}

function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <article className="min-w-0">
      <div
        className="relative aspect-[53/56] overflow-hidden rounded-sm sm:h-[500px] sm:aspect-auto lg:h-[560px]"
        style={project.bg ? { backgroundColor: project.bg } : undefined}
      >
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.alt[locale]}
            fill
            quality={90}
            sizes={getCoverSizes(project)}
            className={`${project.coverFit === "contain" ? "object-contain" : "object-cover"} ${
              project.coverPosition === "bottom" ? "object-bottom" : "object-center"
            }`}
          />
        )}
        {project.mockup && (
          <Image
            src={project.mockup}
            alt={project.alt[locale]}
            width={377}
            height={504}
            quality={90}
            sizes="(max-width: 639px) 72vw, (max-width: 1279px) 34vw, (max-width: 1799px) 24vw, 377px"
            className={`absolute left-1/2 h-auto w-[72%] -translate-x-1/2 rounded-t-sm object-cover object-top ${
              project.coverPosition === "bottom" ? "bottom-0" : "top-[10%]"
            }`}
          />
        )}
        {project.logo && (
          <Image
            src={project.logo}
            alt=""
            width={55}
            height={16}
            className="absolute left-1/2 top-[16%] h-auto w-[11%] -translate-x-1/2"
          />
        )}
      </div>
      <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5 xl:flex-row xl:justify-between xl:gap-4">
        <h3 className="font-display text-[24px] font-bold leading-8 lg:text-project">{project.title}</h3>
        <Badge
          variant="outline"
          className="h-8 rounded-full border-border bg-transparent px-5 text-sm font-medium text-muted-foreground lg:h-9 lg:px-8.5 lg:text-chip"
        >
          {project.category[locale]}
        </Badge>
      </div>
    </article>
  );
}

/* Orden de las pestañas del filtro, tal como aparecen en el diseño. */
const TRACKS = ["web", "branding", "posts"] as const;
type Track = (typeof TRACKS)[number];

/* Los proyectos se leen del disco en el servidor (`page.tsx`) y llegan como
   props: aquí solo se elige el idioma y la pestaña activa. */
export function Projects({ projects }: { projects: Project[] }) {
  const { locale, t } = useLocale();
  const [track, setTrack] = useState<Track>("web");

  const visible = projects.filter((project) => project.track === track);

  return (
    <section id="proyectos" className="pt-20 sm:pt-24 lg:pt-[110px]">
      <h2 className="px-5 text-center font-display text-[40px] font-bold leading-tight sm:text-[48px] lg:text-section">
        {t.projects.heading}
      </h2>

      <div
        role="group"
        aria-label={t.projects.heading}
        className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 text-base leading-8 text-muted-foreground sm:mt-7 sm:gap-x-[35px] lg:text-chip lg:leading-9"
      >
        {TRACKS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={track === option}
            onClick={() => setTrack(option)}
            className={`font-display transition-opacity ${
              track === option ? "font-bold" : "opacity-40 hover:opacity-70"
            }`}
          >
            {t.projects.filters[option]}
          </button>
        ))}
      </div>

      <div className="mx-5 mt-2 max-w-content border-t border-separator-strong sm:mx-8 lg:mx-10 min-[1730px]:mx-auto" />

      <div
        key={track}
        className="mx-auto mt-8 grid max-w-content animate-projects-enter grid-cols-1 gap-x-6 gap-y-10 px-5 sm:grid-cols-2 sm:px-8 lg:mt-9.5 lg:px-10 xl:grid-cols-3 xl:gap-x-7.5 min-[1800px]:px-0"
      >
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
