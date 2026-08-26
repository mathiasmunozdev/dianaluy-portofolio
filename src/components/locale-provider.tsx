"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { dictionary } from "@/content/dictionary";
import type { Dictionary } from "@/lib/schemas";
import {
  defaultLocale,
  isLocale,
  localeStorageKey,
  otherLocale,
  type Locale,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  /** Diccionario de interfaz del idioma activo. */
  t: Dictionary;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const localeListeners = new Set<() => void>();
let fallbackLocale: Locale | null = null;

/** `localStorage` lanza en la navegación privada de algunos navegadores. */
function readSavedLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(localeStorageKey);
    return isLocale(saved) ? saved : (fallbackLocale ?? defaultLocale);
  } catch {
    return fallbackLocale ?? defaultLocale;
  }
}

function saveLocale(locale: Locale) {
  fallbackLocale = locale;

  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    /* Sin persistencia: el idioma dura solo lo que la visita. */
  }

  localeListeners.forEach((listener) => listener());
}

function subscribeToLocale(listener: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key !== localeStorageKey && event.key !== null) return;

    fallbackLocale = isLocale(event.newValue) ? event.newValue : null;
    listener();
  }

  localeListeners.add(listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    localeListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getServerLocale(): Locale {
  return defaultLocale;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  /* El snapshot del servidor coincide con el HTML inicial. React consulta
     `localStorage` después de hidratar y actualiza solo si hay una preferencia. */
  const locale = useSyncExternalStore(
    subscribeToLocale,
    readSavedLocale,
    getServerLocale,
  );

  /* `lang` vive en el <html> que pinta el layout, fuera de este árbol, así que
     hay que sincronizarlo a mano. */
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    saveLocale(otherLocale(locale));
  }, [locale]);

  const value = useMemo(
    () => ({ locale, t: dictionary[locale], toggleLocale }),
    [locale, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>
      {/* React iza este <title> al <head>; es el único del documento. */}
      <title>{value.t.meta.title}</title>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale() necesita un <LocaleProvider> por encima.");
  }
  return context;
}
