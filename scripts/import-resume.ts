import { sql } from "@payloadcms/db-postgres";
import {
  commitTransaction,
  createLocalReq,
  getPayload,
  initTransaction,
  killTransaction,
} from "payload";
import config from "../payload.config";
import { education } from "../src/content/education";
import { experience } from "../src/content/experience";

const write = process.argv.includes("--write") || process.argv[2] === "write";
const expectedBranchID = process.argv
  .find((argument) => argument.startsWith("--branch-id="))
  ?.slice("--branch-id=".length) ?? process.argv[3];

const payload = await getPayload({ config });
const current = await payload.findGlobal({
  slug: "resume",
  locale: "es",
  overrideAccess: true,
});
const populated = current.experience?.length > 0 || current.education?.length > 0;

console.log(`Resume: ${populated ? "already populated" : "empty"}`);

if (populated || !write) {
  if (!write) console.log("Dry run only. Add write <branch-id> to import.");
  await payload.destroy();
  process.exit(0);
}

const branchResult = await payload.db.drizzle.execute(
  sql`SELECT current_setting('neon.branch_id', true) AS branch_id`,
);
const branchID = String(branchResult.rows[0]?.branch_id ?? "unknown");

if (!expectedBranchID || expectedBranchID !== branchID) {
  await payload.destroy();
  throw new Error(`Branch guard failed: expected ${expectedBranchID ?? "none"}, got ${branchID}`);
}

const req = await createLocalReq({}, payload);
await initTransaction(req);

try {
  const spanish = await payload.updateGlobal({
    slug: "resume",
    locale: "es",
    overrideAccess: true,
    req,
    data: {
      experience: experience.map((item) => ({
        role: item.role.es,
        company: item.company,
        period: item.period.es,
        bullets: item.bullets.es,
      })),
      education: education.map((item) => ({
        title: item.title.es,
        institution: item.institution,
        period: item.period.es,
      })),
    },
  });

  await payload.updateGlobal({
    slug: "resume",
    locale: "en",
    overrideAccess: true,
    req,
    data: {
      experience: experience.map((item, index) => ({
        id: spanish.experience[index]?.id,
        role: item.role.en,
        company: item.company,
        period: item.period.en,
        bullets: item.bullets.en,
      })),
      education: education.map((item, index) => ({
        id: spanish.education[index]?.id,
        title: item.title.en,
        institution: item.institution,
        period: item.period.en,
      })),
    },
  });

  await commitTransaction(req);
  console.log("Imported resume.");
} catch (error) {
  await killTransaction(req);
  throw error;
} finally {
  await payload.destroy();
}
