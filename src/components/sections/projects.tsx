"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/lib/schemas";

function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <article>
      <div
        className="relative h-[560px] overflow-hidden"
        style={project.bg ? { backgroundColor: project.bg } : undefined}
      >
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.alt[locale]}
            width={530}
            height={560}
            className={`size-full object-cover ${
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
            className="absolute left-1/2 top-14 -translate-x-1/2 rounded-t-sm object-cover object-top"
          />
        )}
        {project.logo && (
          <Image
            src={project.logo}
            alt=""
            width={55}
            height={16}
            className="absolute left-[252px] top-[90px]"
          />
        )}
      </div>
      <div className="mt-5 flex items-start justify-between">
        <h3 className="font-display text-project font-bold">{project.title}</h3>
        <Badge
          variant="outline"
          className="h-9 rounded-full border-border bg-transparent px-8.5 text-chip font-medium text-muted-foreground"
        >
          {project.category[locale]}
        </Badge>
      </div>
    </article>
  );
}

/* Los proyectos se leen del disco en el servidor (`page.tsx`) y llegan como
   props: aquí solo se elige el idioma de cada texto. */
export function Projects({ projects }: { projects: Project[] }) {
  const { locale, t } = useLocale();

  return (
    <section id="proyectos" className="pt-[110px]">
      <h2 className="text-center font-display text-section font-bold">
        {t.projects.heading}
      </h2>

      {/* Filtros: visuales por ahora, solo existe el estado "Diseño web" */}
      <div className="mt-7 flex items-center justify-center gap-[35px] text-chip leading-9 text-muted-foreground">
        <p className="font-display font-bold">{t.projects.filters.web}</p>
        <p className="font-display opacity-40">{t.projects.filters.branding}</p>
        <p className="font-display opacity-40">{t.projects.filters.posts}</p>
      </div>

      <div className="mx-auto mt-2 max-w-content border-t px-0 border-separator-strong" />

      <div className="mx-auto mt-9.5 grid max-w-content grid-cols-3 px-10 min-[1800px]:px-0 gap-x-7.5 gap-y-10">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
