import type { CollectionConfig } from "payload";
import { authenticated } from "../access/authenticated";

/** Administrators who can sign in to the Payload panel. */
export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Usuario",
    plural: "Usuarios",
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre",
      required: true,
    },
  ],
  timestamps: true,
};
