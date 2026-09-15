import assert from "node:assert/strict";
import test from "node:test";
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
} from "../src/collections/project-validation.ts";

test("genera y valida slugs estables", () => {
  assert.equal(createProjectSlug("Diseño Ágil 2026"), "diseno-agil-2026");
  assert.equal(validateProjectSlug("proyecto-2"), true);
  assert.equal(typeof validateProjectSlug("Proyecto inválido"), "string");
});

test("valida textos, URLs, rutas y colores", () => {
  assert.equal(validateRequiredText("Proyecto"), true);
  assert.equal(typeof validateRequiredText("   "), "string");
  assert.equal(validateOptionalHttpUrl("https://example.com"), true);
  assert.equal(typeof validateOptionalHttpUrl("javascript:alert(1)"), "string");
  assert.equal(validateOptionalPublicPath("/images/project.jpg"), true);
  assert.equal(typeof validateOptionalPublicPath("../secret.jpg"), "string");
  assert.equal(validateOptionalHexColor("#6B4EFF"), true);
  assert.equal(typeof validateOptionalHexColor("violet"), "string");
});

test("valida dimensiones y la presencia de un recurso visual", () => {
  assert.equal(validatePositiveInteger(2), true);
  assert.equal(typeof validatePositiveInteger(1.5), "string");
  assert.equal(validatePositiveNumber(0.5), true);
  assert.equal(typeof validatePositiveNumber(0), "string");
  assert.equal(hasProjectVisual({ cover: "/images/project.jpg" }), true);
  assert.equal(hasProjectVisual({ bg: "#6B4EFF" }), true);
  assert.equal(hasProjectVisual({}), false);
});
