import "server-only";

import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { RESUME_CACHE_TAG } from "@/lib/cache-tags";
import { resumeSchema, type Resume } from "@/lib/schemas";

async function getPayloadResume(): Promise<Resume> {
  const payload = await getPayload({ config: configPromise });
  const resume = await payload.findGlobal({
    slug: "resume",
    fallbackLocale: false,
    locale: "all",
    overrideAccess: false,
  });
  const parsed = resumeSchema.safeParse(resume);

  if (!parsed.success) {
    throw new Error("El currículum de Payload está vacío o no es válido");
  }

  return parsed.data;
}

const getCachedPayloadResume = unstable_cache(getPayloadResume, ["payload-resume"], {
  revalidate: 3600,
  tags: [RESUME_CACHE_TAG],
});

export async function getPublicResume(): Promise<Resume> {
  try {
    return await getCachedPayloadResume();
  } catch (error) {
    console.error("Payload no disponible, usando el currículum local de respaldo", error);
    return { education, experience };
  }
}
