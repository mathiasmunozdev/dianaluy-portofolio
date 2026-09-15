"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import type { Dictionary, Project } from "@/lib/schemas";

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

function ProjectArtwork({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <div
      className="relative aspect-[53/56] overflow-hidden rounded-sm sm:h-[500px] sm:aspect-auto lg:h-[560px]"
      style={project.bg ? { backgroundColor: project.bg } : undefined}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/preview:scale-[1.045] group-focus-visible/preview:scale-[1.045]">
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
            width={project.mockupWidth}
            height={project.mockupHeight}
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
    </div>
  );
}

function ProjectPreview({
  project,
  locale,
  copy,
}: {
  project: Project;
  locale: Locale;
  copy: Dictionary["projects"];
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#171717]/75 backdrop-blur-[3px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in motion-reduce:animate-none" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] flex h-[min(92dvh,920px)] w-[min(calc(100vw-24px),1120px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[22px] bg-background shadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 motion-reduce:animate-none sm:w-[min(calc(100vw-48px),1120px)] sm:rounded-[28px]">
        <header className="flex min-h-18 shrink-0 items-center gap-3 border-b border-separator-strong px-5 pr-16 sm:min-h-20 sm:px-7 sm:pr-20">
          <Dialog.Title className="min-w-0 truncate font-display text-[22px] font-bold leading-8 sm:text-[27px]">
            {project.title}
          </Dialog.Title>
          <Badge
            variant="outline"
            className="hidden h-8 shrink-0 rounded-full border-border bg-transparent px-5 text-sm font-medium text-muted-foreground sm:inline-flex"
          >
            {project.category[locale]}
          </Badge>
          <Dialog.Description className="sr-only">
            {copy.previewLabel} {project.title}
          </Dialog.Description>
        </header>

        <div className="min-h-0 flex-1 bg-muted/60">
          {project.mockup ? (
            <div
              className="h-full overflow-y-auto overscroll-contain p-4 sm:p-8"
              style={project.bg ? { backgroundColor: project.bg } : undefined}
            >
              <Image
                src={project.mockup}
                alt={project.alt[locale]}
                width={project.mockupWidth}
                height={project.mockupHeight}
                quality={90}
                sizes="(max-width: 1199px) calc(100vw - 56px), 1056px"
                className="mx-auto h-auto w-full max-w-[960px] rounded-sm object-contain shadow-xl"
              />
            </div>
          ) : (
            <div
              className="relative h-full w-full p-4 sm:p-8"
              style={project.bg ? { backgroundColor: project.bg } : undefined}
            >
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt={project.alt[locale]}
                  fill
                  quality={90}
                  sizes="(max-width: 1199px) calc(100vw - 56px), 1056px"
                  className="object-contain p-4 sm:p-8"
                />
              ) : null}
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt=""
                  width={110}
                  height={32}
                  className="absolute left-1/2 top-[12%] h-auto w-[12%] -translate-x-1/2"
                />
              ) : null}
            </div>
          )}
        </div>

        <Dialog.Close
          aria-label={copy.closePreview}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 motion-reduce:transition-none sm:right-5 sm:top-5"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function ProjectCard({
  project,
  locale,
  copy,
}: {
  project: Project;
  locale: Locale;
  copy: Dictionary["projects"];
}) {
  const projectDetails = (
    <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5 xl:flex-row xl:justify-between xl:gap-4">
      <h3 className="font-display text-[24px] font-bold leading-8 transition-transform duration-300 group-hover/card:translate-x-1 group-focus-within/card:translate-x-1 motion-reduce:transition-none lg:text-project">
        {project.title}
      </h3>
      <Badge
        variant="outline"
        className="h-8 rounded-full border-border bg-transparent px-5 text-sm font-medium text-muted-foreground lg:h-9 lg:px-8.5 lg:text-chip"
      >
        {project.category[locale]}
      </Badge>
    </div>
  );

  if (project.track === "web") {
    return (
      <article className="group/card min-w-0">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.viewProject}: ${project.title}`}
            className="group/preview relative block overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
          >
            <ProjectArtwork project={project} locale={locale} />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 p-4 opacity-0 transition-opacity duration-300 group-focus-visible/preview:opacity-100 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover/preview:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-base font-bold text-foreground shadow-lg">
                {copy.viewProject}
                <span aria-hidden="true" className="text-lg leading-none">
                  ↗
                </span>
              </span>
            </span>
          </a>
        ) : (
          <div className="relative overflow-hidden rounded-sm">
            <ProjectArtwork project={project} locale={locale} />
          </div>
        )}
        {projectDetails}
      </article>
    );
  }

  return (
    <Dialog.Root>
      <article className="group/card min-w-0">
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label={`${copy.viewProject}: ${project.title}`}
            className="group/preview relative block w-full cursor-zoom-in overflow-hidden rounded-sm text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/35"
          >
            <ProjectArtwork project={project} locale={locale} />
          </button>
        </Dialog.Trigger>
        {projectDetails}
      </article>
      <ProjectPreview project={project} locale={locale} copy={copy} />
    </Dialog.Root>
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
        className="mt-6 flex flex-wrap items-center justify-center gap-2 px-5 font-display text-sm sm:mt-7"
      >
        {TRACKS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={track === option}
            onClick={() => setTrack(option)}
            className={`inline-flex h-8 min-w-[116px] items-center justify-center rounded-full border border-accent bg-transparent px-6 font-medium leading-none text-accent transition-[border-width] focus-visible:border-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30 ${
              track === option
                ? "border-2"
                : "hover:border-2"
            }`}
          >
            {t.projects.filters[option]}
          </button>
        ))}
      </div>

      <div
        key={track}
        className="mx-auto mt-8 grid max-w-content animate-projects-enter grid-cols-1 gap-x-6 gap-y-10 px-5 sm:grid-cols-2 sm:px-8 lg:mt-9.5 lg:px-10 xl:grid-cols-3 xl:gap-x-7.5 min-[1800px]:px-0"
      >
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} copy={t.projects} />
        ))}
      </div>
    </section>
  );
}
