import "server-only";

import { getProjects } from "@/lib/content";
import { getCachedPayloadProjects } from "@/lib/payload-projects";
import type { Project } from "@/lib/schemas";

/**
 * Fuente de proyectos de la portada pública.
 *
 * Payload es la fuente de verdad. Los MDX se conservan como respaldo: si Neon
 * está suspendido o caído, el portafolio sigue publicándose con el último
 * contenido versionado en el repo en vez de devolver un 500.
 */
export async function getPublicProjects(): Promise<Project[]> {
  try {
    return await getCachedPayloadProjects();
  } catch (error) {
    console.error("Payload no disponible, usando los proyectos MDX de respaldo", error);
  }

  try {
    return getProjects();
  } catch (error) {
    console.error("Tampoco se pudieron leer los proyectos MDX de respaldo", error);
    return [];
  }
}
