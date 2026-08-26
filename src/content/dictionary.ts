import { dictionarySchema, localized } from "@/lib/schemas";

/**
 * Textos de interfaz en cada idioma. El botón de idioma de cada diccionario
 * apunta al otro: estando en español ofrece "EN", y al revés.
 */
export const dictionary = localized(dictionarySchema).parse({
  es: {
    meta: {
      title: "Diana Luy — Diseñadora UX/UI",
      description:
        "Portfolio de Diana Luy, diseñadora UX/UI con experiencia en branding, diseño web y comunicación visual.",
    },
    nav: {
      label: "Principal",
      items: {
        home: "Inicio",
        about: "Sobre mí",
        projects: "Proyectos",
        experience: "Experiencia",
        contact: "Contacto",
      },
    },
    actions: {
      downloadCv: "Descargar CV",
      switchLanguage: { code: "EN", label: "Ver el sitio en inglés" },
    },
    hero: {
      portraitAlt: "Retrato de Diana Luy",
    },
    about: {
      heading: "Sobre mí",
      toolsLabel: "Herramientas",
    },
    marquee: {
      portfolio: "PORTAFOLIO",
    },
    projects: {
      heading: "Proyectos Destacados",
      filters: {
        web: "Diseño web",
        branding: "Branding",
        posts: "Diseño de post",
      },
    },
    experience: {
      heading: "Mi experiencia y educación",
      tabs: { experience: "Experiencia", education: "Educación" },
    },
    footer: {
      thanksLine1: "¡Muchas gracias",
      thanksLine2: "por ver!",
    },
  },
  en: {
    meta: {
      title: "Diana Luy — UX/UI Designer",
      description:
        "Portfolio of Diana Luy, a UX/UI designer with experience in branding, web design and visual communication.",
    },
    nav: {
      label: "Main",
      items: {
        home: "Home",
        about: "About",
        projects: "Projects",
        experience: "Experience",
        contact: "Contact",
      },
    },
    actions: {
      downloadCv: "Download CV",
      switchLanguage: { code: "ES", label: "View the site in Spanish" },
    },
    hero: {
      portraitAlt: "Portrait of Diana Luy",
    },
    about: {
      heading: "About me",
      toolsLabel: "Tools",
    },
    marquee: {
      portfolio: "PORTFOLIO",
    },
    projects: {
      heading: "Featured Projects",
      filters: {
        web: "Web design",
        branding: "Branding",
        posts: "Social posts",
      },
    },
    experience: {
      heading: "My experience and education",
      tabs: { experience: "Experience", education: "Education" },
    },
    footer: {
      thanksLine1: "Thanks so much",
      thanksLine2: "for visiting!",
    },
  },
});
