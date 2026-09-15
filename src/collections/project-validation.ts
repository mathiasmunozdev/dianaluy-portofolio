import type { NumberFieldSingleValidation, TextFieldSingleValidation } from "payload";

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const isBlank = (value: null | string | undefined): boolean =>
  typeof value !== "string" || value.trim().length === 0;

/** Converts a project title or manually entered identifier into a stable URL slug. */
export function createProjectSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const validateRequiredText: TextFieldSingleValidation = (value) =>
  !isBlank(value) || "Este campo no puede estar vacío.";

export const validateProjectSlug: TextFieldSingleValidation = (value) => {
  if (isBlank(value)) {
    return "El slug es obligatorio.";
  }

  return (
    SLUG_PATTERN.test(value as string) ||
    "Usa solo letras minúsculas, números y guiones, sin espacios."
  );
};

export const validateOptionalHttpUrl: TextFieldSingleValidation = (value) => {
  if (isBlank(value)) {
    return true;
  }

  try {
    const url = new URL(value as string);
    return (
      (url.protocol === "http:" || url.protocol === "https:") ||
      "La URL debe comenzar con http:// o https://."
    );
  } catch {
    return "Ingresa una URL válida, por ejemplo: https://ejemplo.com.";
  }
};

export const validateOptionalPublicPath: TextFieldSingleValidation = (value) => {
  if (isBlank(value)) {
    return true;
  }

  const path = value as string;
  const hasParentTraversal = path.split("/").includes("..");

  return (
    (path.startsWith("/") &&
      !path.startsWith("//") &&
      !path.includes("\\") &&
      !hasParentTraversal) ||
    "Usa una ruta interna válida que empiece con / y no contenga .. ni barras invertidas."
  );
};

export const validateOptionalHexColor: TextFieldSingleValidation = (value) =>
  isBlank(value) ||
  HEX_COLOR_PATTERN.test(value as string) ||
  "Usa un color hexadecimal de seis dígitos, por ejemplo: #6B4EFF.";

export const validatePositiveNumber: NumberFieldSingleValidation = (value) =>
  (typeof value === "number" && Number.isFinite(value) && value > 0) ||
  "Ingresa un número mayor que cero.";

export const validatePositiveInteger: NumberFieldSingleValidation = (value) =>
  (typeof value === "number" && Number.isInteger(value) && value > 0) ||
  "Ingresa un número entero mayor que cero.";

export function hasProjectVisual(data: {
  bg?: null | string;
  cover?: null | string;
  mockup?: null | string;
}): boolean {
  return [data.cover, data.mockup, data.bg].some((value) => !isBlank(value));
}
