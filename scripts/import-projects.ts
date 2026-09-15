import { sql } from "@payloadcms/db-postgres";
import {
  commitTransaction,
  createLocalReq,
  getPayload,
  initTransaction,
  killTransaction,
  type RequiredDataFromCollectionSlug,
} from "payload";
import config from "../payload.config";
import { getProjects } from "../src/lib/content";
import type { Project } from "../src/lib/schemas";

const write = process.argv.includes("--write") || process.argv[2] === "write";
const expectedBranchID = process.argv
  .find((argument) => argument.startsWith("--branch-id="))
  ?.slice("--branch-id=".length) ?? process.argv[3];

const payload = await getPayload({ config });
const branchResult = await payload.db.drizzle.execute(
  sql`SELECT current_setting('neon.branch_id', true) AS branch_id`,
);
const branchID = String(branchResult.rows[0]?.branch_id ?? "unknown");
const sourceProjects = getProjects();
const existing = await payload.find({
  collection: "projects",
  limit: 100,
  overrideAccess: true,
  pagination: false,
  select: { slug: true },
});
const existingSlugs = new Set(existing.docs.map(({ slug }) => slug));
const missing = sourceProjects.filter(({ slug }) => !existingSlugs.has(slug));

console.log(`Neon branch: ${branchID}`);
console.log(`Projects: ${existing.docs.length} existing, ${missing.length} missing`);
console.log(missing.map(({ slug }) => `- ${slug}`).join("\n"));

if (!write) {
  console.log("Dry run only. Add write <branch-id> to import.");
  await payload.destroy();
  process.exit(0);
}

if (!expectedBranchID || expectedBranchID !== branchID) {
  await payload.destroy();
  throw new Error(`Branch guard failed: expected ${expectedBranchID ?? "none"}, got ${branchID}`);
}

const req = await createLocalReq({}, payload);
await initTransaction(req);

try {
  for (const project of missing) {
    const created = await payload.create({
      collection: "projects",
      data: projectData(project, "es"),
      locale: "es",
      overrideAccess: true,
      req,
    });

    await payload.update({
      collection: "projects",
      data: {
        alt: project.alt.en,
        category: project.category.en,
      },
      id: created.id,
      locale: "en",
      overrideAccess: true,
      req,
    });
  }

  await commitTransaction(req);
  console.log(`Imported ${missing.length} projects.`);
} catch (error) {
  await killTransaction(req);
  throw error;
} finally {
  await payload.destroy();
}

function projectData(
  project: Project,
  locale: "en" | "es",
): RequiredDataFromCollectionSlug<"projects"> {
  return {
    active: true,
    alt: project.alt[locale],
    bg: project.bg,
    category: project.category[locale],
    cover: project.cover,
    coverAspectRatio: project.coverAspectRatio,
    coverFit: project.coverFit,
    coverPosition: project.coverPosition,
    logo: project.logo,
    mockup: project.mockup,
    mockupHeight: project.mockupHeight,
    mockupWidth: project.mockupWidth,
    order: project.order,
    slug: project.slug,
    title: project.title,
    track: project.track,
    url: project.url,
  };
}
