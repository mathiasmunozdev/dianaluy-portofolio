import { z } from "zod";

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

/** Exige una versión del valor por cada idioma (ver `src/lib/i18n.ts`). */
export const localized = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({ es: schema, en: schema });

/** Atajo para el caso habitual: una cadena no vacía traducida. */
const localizedText = localized(z.string().min(1));

/** Frontmatter de cada proyecto en `src/content/projects/*.mdx`. */
export const projectFrontmatterSchema = z
  .object({
    /** Nombre de marca del proyecto: no se traduce. */
    title: z.string().min(1),
    category: localizedText,
    order: z.number().int().positive(),
    /** Imagen a sangre completa de la tarjeta (530×560). */
    cover: z.string().startsWith("/").optional(),
    /** Ajuste de encuadre de la cover (object-position). */
    coverPosition: z.enum(["center", "bottom"]).default("center"),
    /** Color de fondo de marca cuando no hay cover (es contenido, no token). */
    bg: hexColor.optional(),
    /** Mockup de pantalla (377×504) centrado sobre el fondo. */
    mockup: z.string().startsWith("/").optional(),
    /** Logo superpuesto sobre la cover (caso Depilaser). */
    logo: z.string().startsWith("/").optional(),
    alt: localizedText,
  })
  .refine((p) => p.cover !== undefined || p.bg !== undefined, {
    message: "Un proyecto necesita `cover` o `bg`",
  });

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type Project = ProjectFrontmatter & { slug: string };

export const experienceItemSchema = z.object({
  role: localizedText,
  /** Nombre de la empresa: no se traduce. */
  company: z.string().min(1),
  period: localizedText,
  bullets: localized(z.array(z.string().min(1)).min(1)),
});

export type ExperienceItem = z.infer<typeof experienceItemSchema>;

export const toolSchema = z.object({
  name: z.string().min(1),
  image: z.string().startsWith("/"),
  width: z.number().positive(),
  height: z.number().positive(),
  rounded: z.boolean().default(false),
  flipY: z.boolean().default(false),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  kicker: localizedText,
  headline: localizedText,
  about: localizedText,
  heroTags: z.array(
    z.object({
      label: localizedText,
      tone: z.enum(["violet", "red", "magenta", "blue"]),
    }),
  ),
  tools: z.array(toolSchema),
  cvUrl: z.string().min(1),
  contact: z.object({
    email: z.string().email(),
    phoneDisplay: z.string().min(1),
    whatsapp: z.string().url(),
    linkedinDisplay: z.string().min(1),
    linkedin: z.string().url(),
  }),
});

export type Profile = z.infer<typeof profileSchema>;

/**
 * Textos de interfaz que no pertenecen al perfil ni a los proyectos: títulos de
 * sección, etiquetas del navbar, pestañas y textos accesibles. El contenido vive
 * en `src/content/dictionary.ts`, con una copia por idioma.
 */
export const dictionarySchema = z.object({
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  nav: z.object({
    /** `aria-label` del <nav>. */
    label: z.string().min(1),
    items: z.object({
      home: z.string().min(1),
      about: z.string().min(1),
      projects: z.string().min(1),
      experience: z.string().min(1),
      contact: z.string().min(1),
    }),
  }),
  actions: z.object({
    downloadCv: z.string().min(1),
    /** Botón de idioma: muestra el código del idioma al que lleva. */
    switchLanguage: z.object({
      code: z.string().length(2),
      label: z.string().min(1),
    }),
  }),
  hero: z.object({
    portraitAlt: z.string().min(1),
  }),
  about: z.object({
    heading: z.string().min(1),
    toolsLabel: z.string().min(1),
  }),
  marquee: z.object({
    portfolio: z.string().min(1),
  }),
  projects: z.object({
    heading: z.string().min(1),
    filters: z.object({
      web: z.string().min(1),
      branding: z.string().min(1),
      posts: z.string().min(1),
    }),
  }),
  experience: z.object({
    heading: z.string().min(1),
    tabs: z.object({
      experience: z.string().min(1),
      education: z.string().min(1),
    }),
  }),
  footer: z.object({
    /** El diseño parte el agradecimiento en dos líneas. */
    thanksLine1: z.string().min(1),
    thanksLine2: z.string().min(1),
  }),
});

export type Dictionary = z.infer<typeof dictionarySchema>;
