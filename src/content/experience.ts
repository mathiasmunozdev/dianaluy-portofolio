import { experienceItemSchema, type ExperienceItem } from "@/lib/schemas";

export const experience: ExperienceItem[] = [
  {
    role: { es: "Diseñadora UX/UI", en: "UX/UI Designer" },
    company: "Agencia Plasma",
    period: { es: "Octubre 2025 - Actualidad", en: "October 2025 - Present" },
    bullets: {
      es: [
        "Analizo el brief, la presencia digital y los objetivos de cada empresa para definir la estructura y estrategia del sitio web.",
        "Diseño wireframes y prototipos de alta fidelidad en Figma para landing pages, sitios corporativos, e-commerce y catálogos, priorizando la usabilidad y la identidad de marca.",
        "Diseño piezas para campañas en redes sociales orientadas a dirigir tráfico hacia sitios web.",
      ],
      en: [
        "I analyze each company's brief, digital presence and goals to define the structure and strategy of its website.",
        "I design wireframes and high-fidelity prototypes in Figma for landing pages, corporate sites, e-commerce and catalogs, prioritizing usability and brand identity.",
        "I design assets for social media campaigns aimed at driving traffic to websites.",
      ],
    },
  },
  {
    role: { es: "Diseñadora UX/UI Freelance", en: "Freelance UX/UI Designer" },
    company: "Innova Parking",
    period: { es: "Enero 2024 - Marzo 2024", en: "January 2024 - March 2024" },
    bullets: {
      es: [
        "Investigué la empresa y estructuré la arquitectura de información del sitio web.",
        "Diseñé wireframes y prototipos de alta fidelidad en Figma.",
        "Implementé el sitio web en WordPress, manteniendo la coherencia con la identidad de marca.",
      ],
      en: [
        "I researched the company and structured the website's information architecture.",
        "I designed wireframes and high-fidelity prototypes in Figma.",
        "I built the website in WordPress, keeping it consistent with the brand identity.",
      ],
    },
  },
  {
    role: { es: "Diseñadora de Branding", en: "Branding Designer" },
    company: "Inspira Branding Studio",
    period: {
      es: "Diciembre 2022 - Septiembre 2025",
      en: "December 2022 - September 2025",
    },
    bullets: {
      es: [
        "Desarrollé identidades visuales alineadas con los objetivos de negocio de cada cliente.",
        "Creé aplicaciones de marca para medios impresos y digitales, garantizando consistencia visual.",
        "Mantenía una comunicación continua con clientes durante todo el proceso de diseño.",
      ],
      en: [
        "I developed visual identities aligned with each client's business goals.",
        "I created brand applications for print and digital media, ensuring visual consistency.",
        "I kept in continuous communication with clients throughout the design process.",
      ],
    },
  },
  {
    role: { es: "Diseñadora Gráfica", en: "Graphic Designer" },
    company: "Chozo Marketing",
    period: {
      es: "Septiembre 2022 - Noviembre 2022",
      en: "September 2022 - November 2022",
    },
    bullets: {
      es: [
        "Diseñé posts e historias para campañas digitales y comunicación de marca interna y externa.",
        "Adapté contenido gráfico para diferentes formatos y plataformas digitales.",
        "Desarrollé presentaciones y materiales visuales como brochures para clientes corporativos.",
      ],
      en: [
        "I designed posts and stories for digital campaigns and internal and external brand communication.",
        "I adapted graphic content for different formats and digital platforms.",
        "I developed presentations and visual materials such as brochures for corporate clients.",
      ],
    },
  },
  {
    role: { es: "Diseñadora Gráfica", en: "Graphic Designer" },
    company: "Maia Consultores",
    period: {
      es: "Septiembre 2022 - Noviembre 2022",
      en: "September 2022 - November 2022",
    },
    bullets: {
      es: [
        "Rediseñé su identidad visual y desarrollé de piezas gráficas alineada a la nueva línea gráfica.",
        "Diseñé contenido digital para redes sociales y piezas para comunicación corporativa.",
        "Diseñé su página web desde cero y elaboré el prototipo de alta fidelidad en Figma.",
      ],
      en: [
        "I redesigned their visual identity and produced graphic assets aligned with the new visual direction.",
        "I designed digital content for social media and assets for corporate communication.",
        "I designed their website from scratch and built the high-fidelity prototype in Figma.",
      ],
    },
  },
].map((item) => experienceItemSchema.parse(item));
