import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { Projects } from "./src/collections/Projects";
import { Users } from "./src/collections/Users";
import { Resume } from "./src/globals/Resume";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const databaseUrl = (process.env.DATABASE_URL ?? "").replace(
  /([?&])sslmode=(?:prefer|require|verify-ca)(?=&|$)/i,
  "$1sslmode=verify-full",
);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: dirname,
      importMapFile: path.resolve(dirname, "src/app/(payload)/admin/importMap.js"),
    },
    user: Users.slug,
  },
  collections: [Users, Projects],
  globals: [Resume],
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
  }),
  localization: {
    defaultLocale: "es",
    fallback: true,
    locales: [
      { code: "es", label: "Español" },
      { code: "en", label: "English" },
    ],
  },
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
