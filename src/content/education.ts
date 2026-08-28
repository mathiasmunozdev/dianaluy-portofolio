import { educationItemSchema, type EducationItem } from "@/lib/schemas";

export const education: EducationItem[] = [
  {
    title: {
      es: "Bachiller en Diseño Estratégico e Innovación",
      en: "Bachelor's Degree in Strategic Design and Innovation",
    },
    institution: "Instituto San Ignacio de Loyola (ISIL)",
    period: {
      es: "Marzo 2024 – Julio 2025",
      en: "March 2024 – July 2025",
    },
  },
  {
    title: {
      es: "Técnico en Diseño Gráfico",
      en: "Technical Degree in Graphic Design",
    },
    institution: "Instituto San Ignacio de Loyola (ISIL)",
    period: {
      es: "Marzo 2020 – Diciembre 2023",
      en: "March 2020 – December 2023",
    },
  },
  {
    title: {
      es: "Programa de Inglés – Nivel Avanzado",
      en: "English Program – Advanced Level",
    },
    institution: "Instituto Cultural Peruano Norteamericano",
    period: { es: "2008–2020", en: "2008–2020" },
  },
].map((item) => educationItemSchema.parse(item));
