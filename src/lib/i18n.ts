/** Idiomas del sitio. El primero es el que se sirve en el HTML inicial. */
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Un mismo valor con una versión por idioma. */
export type Localized<T> = Record<Locale, T>;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Idioma al que lleva el botón del navbar cuando está activo `locale`. */
export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

/** Clave de `localStorage` donde se recuerda la preferencia entre visitas. */
export const localeStorageKey = "portfolio-locale";
