import { experienceItemSchema, type ExperienceItem } from "@/lib/schemas";

export const experience: ExperienceItem[] = [
  {
    role: { es: "Diseñadora UX/UI", en: "UX/UI Designer" },
    company: "Agencia Plasma",
    period: { es: "Octubre 2025 - Actualidad", en: "October 2025 - Present" },
    bullets: {
      es: [
        "Analizo el brief y objetivos de cada empresa para definir la estructura y estrategia del sitio web.",
        "Diseño wireframes y prototipos de alta fidelidad en Figma para landing pages, sitios corporativos, e-commerce y catálogos, priorizando usabilidad, responsive design, identidad de marca y conversión.",
        "Diseño piezas gráficas para web y mobile, incluyendo banners y recursos para campañas digitales.",
        "Creo, mejoro y optimizo assets visuales mediante herramientas de IA generativa, desarrollando recursos personalizados para los proyectos web.",
      ],
      en: [
        "I analyze each company's brief and goals to define the structure and strategy of its website.",
        "I design wireframes and high-fidelity prototypes in Figma for landing pages, corporate sites, e-commerce and catalogs, prioritizing usability, responsive design, brand identity and conversion.",
        "I design graphic assets for web and mobile, including banners and resources for digital campaigns.",
        "I create, refine and optimize visual assets with generative AI tools, building custom resources for web projects.",
      ],
    },
  },
  {
    role: { es: "Diseñadora UX/UI Freelance", en: "Freelance UX/UI Designer" },
    company: "Innova Parking",
    period: { es: "Enero 2024 - Marzo 2024", en: "January 2024 - March 2024" },
    bullets: {
      es: [
        "Analicé los objetivos del negocio y las necesidades del público para definir una arquitectura de información clara y una estructura enfocada en facilitar la navegación.",
        "Definí el sistema de diseño a partir de la identidad visual de la marca y desarrollé el wireframe y prototipo de alta fidelidad en Figma, asegurando una experiencia visual coherente.",
        "Implementé el sitio en WordPress con Elementor, trasladando el diseño a desarrollo y adaptándolo a distintos dispositivos para mantener una experiencia responsive.",
      ],
      en: [
        "I analyzed the business goals and the audience's needs to define a clear information architecture and a structure focused on making navigation easier.",
        "I defined the design system from the brand's visual identity and built the wireframe and high-fidelity prototype in Figma, ensuring a coherent visual experience.",
        "I built the site in WordPress with Elementor, taking the design into development and adapting it to different devices to keep a responsive experience.",
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
        "Desarrollé identidades visuales para emprendedores y marcas internacionales, alineando cada propuesta con sus objetivos y público objetivo.",
        "Diseñé aplicaciones de marca para distintos formatos y canales, asegurando una identidad consistente y adaptable.",
        "Presenté propuestas y gestioné el proceso de diseño con clientes, incorporando feedback para responder a sus necesidades y objetivos.",
      ],
      en: [
        "I developed visual identities for entrepreneurs and international brands, aligning each proposal with their goals and target audience.",
        "I designed brand applications for different formats and channels, ensuring a consistent and adaptable identity.",
        "I presented proposals and managed the design process with clients, incorporating feedback to respond to their needs and goals.",
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
        "Diseñé contenido gráfico para campañas digitales y comunicación interna y externa, fortaleciendo la presencia y comunicación visual de la marca.",
        "Adapté piezas para distintos formatos y plataformas digitales, asegurando una comunicación clara y consistente en cada canal.",
        "Desarrollé presentaciones, brochures y materiales visuales para clientes corporativos, facilitando la presentación de propuestas y servicios.",
      ],
      en: [
        "I designed graphic content for digital campaigns and internal and external communication, strengthening the brand's presence and visual communication.",
        "I adapted assets for different formats and digital platforms, ensuring clear and consistent communication on every channel.",
        "I developed presentations, brochures and visual materials for corporate clients, making it easier to present proposals and services.",
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
        "Analicé la imagen corporativa de la empresa y, con el objetivo de mejorar su presencia digital, rediseñé su identidad visual incluyendo piezas gráficas de soporte para sus perfiles en redes sociales.",
        "Diseñé contenido promocional y orgánico para sus redes sociales, además de piezas para comunicación corporativa como papelería y plantillas de presentaciones.",
        "Elaboré desde cero su página web, definiendo la estructura, wireframe y diseñando el prototipo de alta fidelidad en Figma. Además, realicé la documentación necesaria para su implementación.",
      ],
      en: [
        "I analyzed the company's corporate image and, with the goal of improving its digital presence, redesigned its visual identity, including supporting graphic assets for its social media profiles.",
        "I designed promotional and organic content for their social media, as well as assets for corporate communication such as stationery and presentation templates.",
        "I built their website from scratch, defining the structure and wireframe and designing the high-fidelity prototype in Figma. I also produced the documentation needed for its implementation.",
      ],
    },
  },
].map((item) => experienceItemSchema.parse(item));
