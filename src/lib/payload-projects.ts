import "server-only";

import { unstable_cache } from "next/cache";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Project as PayloadProject } from "@/payload-types";
import { PROJECTS_CACHE_TAG } from "@/lib/cache-tags";
import { projectSchema, type Project } from "@/lib/schemas";

type LocalizedText = {
  en?: null | string;
  es?: null | string;
};

type PayloadProjectWithAllLocales = Omit<PayloadProject, "alt" | "category"> & {
  alt: LocalizedText;
  category: LocalizedText;
};

/**
 * Reads the active Payload projects with both locales and adapts them to the
 * same validated shape currently consumed by the portfolio cards.
 */
export async function getPayloadProjects(): Promise<Project[]> {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "projects",
    fallbackLocale: false,
    locale: "all",
    overrideAccess: false,
    pagination: false,
    sort: "order",
  });

  const projects: Project[] = [];

  for (const project of result.docs as unknown as PayloadProjectWithAllLocales[]) {
    const parsed = projectSchema.safeParse({
      alt: project.alt,
      bg: project.bg ?? undefined,
      category: project.category,
      cover: project.cover ?? undefined,
      coverAspectRatio: project.coverAspectRatio,
      coverFit: project.coverFit,
      coverPosition: project.coverPosition,
      logo: project.logo ?? undefined,
      mockup: project.mockup ?? undefined,
      mockupHeight: project.mockupHeight,
      mockupWidth: project.mockupWidth,
      order: project.order,
      slug: project.slug,
      title: project.title,
      track: project.track,
      url: project.url ?? undefined,
    });

    if (!parsed.success) {
      payload.logger.warn({
        issues: parsed.error.issues.map(({ message, path }) => ({ message, path })),
        msg: "Skipping an invalid public Payload project",
        projectID: project.id,
        projectSlug: project.slug,
      });
      continue;
    }

    projects.push(parsed.data);
  }

  return projects;
}

/**
 * Versión cacheada de `getPayloadProjects` para la portada pública.
 *
 * La consulta es anónima (`overrideAccess: false` sin usuario), así que no
 * depende de la petición y puede compartirse entre visitas. La invalidan los
 * hooks de la colección al publicar un cambio; el `revalidate` es solo una red
 * de seguridad por si alguna invalidación no llega.
 */
export const getCachedPayloadProjects = unstable_cache(
  getPayloadProjects,
  ["payload-projects"],
  {
    revalidate: 3600,
    tags: [PROJECTS_CACHE_TAG],
  },
);
