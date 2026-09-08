import type { CollectionConfig } from "payload";
import { authenticated } from "../access/authenticated";

/** Portfolio projects managed from the Payload admin panel. */
export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Proyecto",
    plural: "Proyectos",
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: ({ req: { user } }) =>
      user
        ? true
        : {
            active: {
              equals: true,
            },
          },
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "track", "category", "order", "active"],
    description:
      "Proyectos del portafolio. En esta fase todavía no sustituyen a los archivos MDX.",
    useAsTitle: "title",
  },
  defaultSort: "order",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      admin: {
        description: "Identificador único para la URL, por ejemplo: opexlean.",
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: "category",
      type: "text",
      label: "Categoría",
      localized: true,
      required: true,
    },
    {
      name: "track",
      type: "select",
      label: "Sección",
      defaultValue: "web",
      options: [
        { label: "Web", value: "web" },
        { label: "Branding", value: "branding" },
        { label: "Posts", value: "posts" },
      ],
      required: true,
    },
    {
      name: "order",
      type: "number",
      label: "Orden",
      admin: {
        description: "Posición del proyecto dentro de su sección.",
        step: 1,
      },
      defaultValue: 1,
      min: 1,
      required: true,
    },
    {
      name: "url",
      type: "text",
      label: "URL del proyecto",
      admin: {
        placeholder: "https://ejemplo.com",
      },
    },
    {
      name: "active",
      type: "checkbox",
      label: "Visible públicamente",
      admin: {
        description:
          "Los proyectos desactivados solo pueden ser consultados por administradores.",
      },
      defaultValue: true,
    },
    {
      name: "cover",
      type: "text",
      label: "Ruta de la imagen principal",
      admin: {
        description:
          "Ruta de una imagen que ya existe en public, por ejemplo: /images/projects/cover.jpg.",
      },
    },
    {
      name: "coverAspectRatio",
      type: "number",
      label: "Proporción de la imagen principal",
      admin: {
        step: 0.01,
      },
      defaultValue: 530 / 560,
      min: 0.01,
      required: true,
    },
    {
      name: "coverPosition",
      type: "select",
      label: "Posición de la imagen principal",
      defaultValue: "center",
      options: [
        { label: "Centro", value: "center" },
        { label: "Abajo", value: "bottom" },
      ],
      required: true,
    },
    {
      name: "coverFit",
      type: "select",
      label: "Ajuste de la imagen principal",
      defaultValue: "cover",
      options: [
        { label: "Cubrir", value: "cover" },
        { label: "Contener", value: "contain" },
      ],
      required: true,
    },
    {
      name: "bg",
      type: "text",
      label: "Color de fondo",
      admin: {
        description: "Color hexadecimal de seis dígitos, por ejemplo: #6B4EFF.",
        placeholder: "#000000",
      },
    },
    {
      name: "mockup",
      type: "text",
      label: "Ruta del mockup",
    },
    {
      name: "mockupWidth",
      type: "number",
      label: "Ancho real del mockup",
      defaultValue: 377,
      min: 1,
      required: true,
    },
    {
      name: "mockupHeight",
      type: "number",
      label: "Alto real del mockup",
      defaultValue: 504,
      min: 1,
      required: true,
    },
    {
      name: "logo",
      type: "text",
      label: "Ruta del logo superpuesto",
    },
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      localized: true,
      required: true,
    },
  ],
  timestamps: true,
};
