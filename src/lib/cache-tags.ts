import { revalidateTag } from "next/cache";
import type { PayloadRequest } from "payload";

/**
 * Etiquetas de caché compartidas entre la capa de datos y los hooks de Payload.
 *
 * Vive en su propio módulo, sin `server-only`, porque los hooks de las
 * configuraciones se cargan también desde la CLI de Payload (`payload migrate`,
 * `payload run`), donde `server-only` lanzaría al importarse.
 */
export const PROJECTS_CACHE_TAG = "projects";
export const RESUME_CACHE_TAG = "resume";

export function revalidatePayloadTag(
  req: PayloadRequest,
  tag: string,
  content: string,
): void {
  try {
    revalidateTag(tag, { expire: 0 });
  } catch (error) {
    req.payload.logger.warn({
      err: error,
      msg: `No se pudo revalidar la caché de ${content} fuera de una petición`,
    });
  }
}
