import { educationItemSchema, type EducationItem } from "@/lib/schemas";

export const education: EducationItem[] = [
  {
    title: {
      es: "Especialización en Diseño UX",
      en: "UX Design Specialization",
    },
    institution: "Netzun",
    period: {
      es: "Agosto 2026",
      en: "August 2026",
    },
  },
  {
    title: {
      es: "Diseño UX/UI",
      en: "UX/UI Design",
    },
    institution: "Udemy",
    period: {
      es: "Julio 2025 - Agosto 2025",
      en: "July 2025 - August 2025",
    },
  },
  {
    title: {
      es: "Bachiller en Diseño Estratégico e Innovación",
      en: "Bachelor's Degree in Strategic Design and Innovation",
    },
    institution: "Instituto San Ignacio de Loyola (ISIL)",
    period: {
      es: "Mar 2024 - Jul 2025",
      en: "March 2024 – July 2025",
    },
  },
  {
    title: {
      es: "Título Técnico en Diseño Gráfico",
      en: "Technical Degree in Graphic Design",
    },
    institution: "Instituto San Ignacio de Loyola (ISIL)",
    period: {
      es: "Mar 2020 - Dic 2023",
      en: "March 2020 – December 2023",
    },
  },
  {
    title: {
      es: "Programa de Inglés – Nivel Avanzado",
      en: "English Program – Advanced Level",
    },
    institution: "Instituto Cultural Peruano Norteamericano",
    period: { es: "2008-2020", en: "2008-2020" },
  },
].map((item) => educationItemSchema.parse(item));
