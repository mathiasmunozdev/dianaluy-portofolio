/**
 * Etiquetas de caché compartidas entre la capa de datos y los hooks de Payload.
 *
 * Vive en su propio módulo, sin `server-only`, porque los hooks de las
 * colecciones se cargan también desde la CLI de Payload (`payload migrate`,
 * `payload run`), donde `server-only` lanzaría al importarse.
 */
export const PROJECTS_CACHE_TAG = "projects";
