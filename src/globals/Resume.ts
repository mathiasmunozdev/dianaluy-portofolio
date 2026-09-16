import type { GlobalAfterChangeHook, GlobalConfig } from "payload";
import { authenticated } from "../access/authenticated";
import { RESUME_CACHE_TAG, revalidatePayloadTag } from "../lib/cache-tags";

const revalidateAfterChange: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidatePayloadTag(req, RESUME_CACHE_TAG, "currículum");
  return doc;
};

export const Resume: GlobalConfig = {
  slug: "resume",
  label: "Currículum",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    description: "Experiencia y educación mostradas en la portada.",
  },
  hooks: {
    afterChange: [revalidateAfterChange],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Experiencia",
          fields: [
            {
              name: "experience",
              type: "array",
              label: "Experiencia",
              labels: { singular: "Experiencia", plural: "Experiencias" },
              minRows: 1,
              required: true,
              fields: [
                { name: "role", type: "text", label: "Cargo", localized: true, required: true },
                { name: "company", type: "text", label: "Empresa", required: true },
                {
                  name: "period",
                  type: "text",
                  label: "Periodo",
                  localized: true,
                  required: true,
                },
                {
                  name: "bullets",
                  type: "text",
                  label: "Funciones y logros",
                  hasMany: true,
                  localized: true,
                  minRows: 1,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Educación",
          fields: [
            {
              name: "education",
              type: "array",
              label: "Educación",
              minRows: 1,
              required: true,
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Título o programa",
                  localized: true,
                  required: true,
                },
                { name: "institution", type: "text", label: "Institución", required: true },
                {
                  name: "period",
                  type: "text",
                  label: "Periodo",
                  localized: true,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
