import { profileSchema } from "@/lib/schemas";

export const profile = profileSchema.parse({
  name: "Diana Luy",
  kicker: { es: "Hola! Soy Diana Luy", en: "Hi! I'm Diana Luy" },
  headline: { es: "Diseñadora UX/UI", en: "UX/UI Designer" },
  about: {
    es: "Soy diseñadora UX/UI con experiencia en branding, diseño web y comunicación visual. Actualmente diseño interfaces web, landing pages y piezas visuales para campañas digitales, aplicando principios de UX para crear experiencias funcionales y consistentes.",
    en: "I'm a UX/UI designer with experience in branding, web design and visual communication. I currently design web interfaces, landing pages and visual assets for digital campaigns, applying UX principles to create functional, consistent experiences.",
  },
  heroTags: [
    { label: { es: "Diseño web", en: "Web design" }, tone: "violet" },
    { label: { es: "Wireframes", en: "Wireframes" }, tone: "red" },
    { label: { es: "Prototipos", en: "Prototyping" }, tone: "magenta" },
    { label: { es: "Diseño gráfico", en: "Graphic design" }, tone: "blue" },
  ],
  tools: [
    { name: "Illustrator", image: "/images/tools/illustrator.svg", width: 44, height: 36, flipY: true },
    { name: "Photoshop", image: "/images/tools/photoshop.svg", width: 43, height: 34 },
    { name: "Miro", image: "/images/tools/miro.png", width: 49, height: 49, rounded: true },
    { name: "Figma", image: "/images/tools/figma.png", width: 30, height: 45 },
    { name: "Wordpress", image: "/images/tools/wordpress.png", width: 46, height: 46 },
  ],
  cvUrl: "/cv-diana-luy.pdf",
  contact: {
    email: "dianaluy2907@gmail.com",
    phoneDisplay: "+51 972442006",
    whatsapp: "https://wa.me/51972442006",
    linkedinDisplay: "www.linkedin.com/in/dianaluy/",
    linkedin: "https://www.linkedin.com/in/dianaluy/",
  },
});
