import { ValidationError, type CollectionConfig } from "payload";
import { authenticated } from "../access/authenticated";
import {
  createProjectSlug,
  hasProjectVisual,
  validateOptionalHexColor,
  validateOptionalHttpUrl,
  validateOptionalPublicPath,
  validatePositiveInteger,
  validatePositiveNumber,
  validateProjectSlug,
  validateRequiredText,
} from "./project-validation";

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
  hooks: {
    beforeValidate: [
      ({ data, originalDoc, req }) => {
        const project = { ...originalDoc, ...data };

        if (!hasProjectVisual(project)) {
          throw new ValidationError({
            collection: "projects",
            errors: [
              {
                message: "Agrega una imagen principal, un mockup o un color de fondo.",
                path: "cover",
              },
            ],
            req,
          });
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
      validate: validateRequiredText,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      admin: {
        description:
          "Se genera desde el título si se deja vacío. Usa letras minúsculas, números y guiones.",
      },
      hooks: {
        beforeValidate: [
          ({ operation, previousValue, siblingData, value }) => {
            if (typeof value === "string" && value.trim()) {
              return createProjectSlug(value);
            }

            if (operation === "create" || !previousValue) {
              const title = siblingData.title;
              return typeof title === "string" ? createProjectSlug(title) : value;
            }

            return previousValue;
          },
        ],
      },
      index: true,
      required: true,
      unique: true,
      validate: validateProjectSlug,
    },
    {
      name: "category",
      type: "text",
      label: "Categoría",
      localized: true,
      required: true,
      validate: validateRequiredText,
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
      validate: validatePositiveInteger,
    },
    {
      name: "url",
      type: "text",
      label: "URL del proyecto",
      admin: {
        placeholder: "https://ejemplo.com",
      },
      validate: validateOptionalHttpUrl,
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
      validate: validateOptionalPublicPath,
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
      validate: validatePositiveNumber,
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
      validate: validateOptionalHexColor,
    },
    {
      name: "mockup",
      type: "text",
      label: "Ruta del mockup",
      validate: validateOptionalPublicPath,
    },
    {
      name: "mockupWidth",
      type: "number",
      label: "Ancho real del mockup",
      defaultValue: 377,
      min: 1,
      required: true,
      validate: validatePositiveInteger,
    },
    {
      name: "mockupHeight",
      type: "number",
      label: "Alto real del mockup",
      defaultValue: 504,
      min: 1,
      required: true,
      validate: validatePositiveInteger,
    },
    {
      name: "logo",
      type: "text",
      label: "Ruta del logo superpuesto",
      validate: validateOptionalPublicPath,
    },
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      localized: true,
      required: true,
      validate: validateRequiredText,
    },
  ],
  timestamps: true,
};
