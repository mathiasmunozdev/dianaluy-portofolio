import type { Resume as PayloadResume } from "@/payload-types";

export function combineResumeLocales(spanish: PayloadResume, english: PayloadResume) {
  return {
    experience: spanish.experience?.map((item, index) => ({
      company: item.company,
      role: { es: item.role, en: english.experience?.[index]?.role },
      period: { es: item.period, en: english.experience?.[index]?.period },
      bullets: { es: item.bullets, en: english.experience?.[index]?.bullets },
    })),
    education: spanish.education?.map((item, index) => ({
      institution: item.institution,
      title: { es: item.title, en: english.education?.[index]?.title },
      period: { es: item.period, en: english.education?.[index]?.period },
    })),
  };
}
