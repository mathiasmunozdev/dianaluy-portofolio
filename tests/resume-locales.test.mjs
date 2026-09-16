import assert from "node:assert/strict";
import test from "node:test";
import { combineResumeLocales } from "../src/lib/resume-locales.ts";
import { resumeSchema } from "../src/lib/schemas.ts";

test("conserva traducciones existentes y acepta una experiencia nueva con respaldo español", () => {
  const spanish = {
    experience: [
      { company: "Plasma", role: "Diseñadora", period: "2025", bullets: ["Diseño"] },
      { company: "Indra", role: "Desarrolladora web", period: "Mayo 2026", bullets: ["Prueba"] },
    ],
    education: [{ institution: "Instituto", title: "Diseño", period: "2024" }],
  };
  const english = {
    experience: [
      { company: "Plasma", role: "Designer", period: "2025", bullets: ["Design"] },
      { company: "Indra", role: "Desarrolladora web", period: "Mayo 2026", bullets: ["Prueba"] },
    ],
    education: [{ institution: "Instituto", title: "Design", period: "2024" }],
  };

  const result = resumeSchema.parse(combineResumeLocales(spanish, english));
  assert.equal(result.experience[0].role.en, "Designer");
  assert.equal(result.experience[1].role.es, "Desarrolladora web");
  assert.equal(result.experience[1].role.en, "Desarrolladora web");
  assert.deepEqual(result.experience[1].bullets.en, ["Prueba"]);
  assert.equal(result.education[0].title.en, "Design");
});
