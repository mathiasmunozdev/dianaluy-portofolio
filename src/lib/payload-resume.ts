import "server-only";

import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { RESUME_CACHE_TAG } from "@/lib/cache-tags";
import { combineResumeLocales } from "@/lib/resume-locales";
import { resumeSchema, type Resume } from "@/lib/schemas";

async function getPayloadResume(): Promise<Resume> {
  const payload = await getPayload({ config: configPromise });
  const [spanish, english] = await Promise.all(
    (["es", "en"] as const).map((locale) =>
      payload.findGlobal({
        slug: "resume",
        fallbackLocale: locale === "en" ? "es" : false,
        locale,
        overrideAccess: false,
      }),
    ),
  );
  const parsed = resumeSchema.safeParse(combineResumeLocales(spanish, english));

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
