"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/locale-provider";
import { profile } from "@/content/profile";

/* El texto de cada enlace sale del diccionario; aquí solo vive el destino. */
const links = [
  { key: "home", href: "#inicio", active: true },
  { key: "about", href: "#sobre-mi", active: false },
  { key: "projects", href: "#proyectos", active: false },
  { key: "experience", href: "#experiencia", active: false },
  { key: "contact", href: "#contacto", active: false },
] as const;

export function Navbar() {
  const { locale, t, toggleLocale } = useLocale();
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hiddenRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (prefersReducedMotion || menuOpen) return;

    const previous = scrollY.getPrevious() ?? current;
    const shouldHide = current > previous && current > 150;

    if (shouldHide === hiddenRef.current) return;

    hiddenRef.current = shouldHide;
    setHidden(shouldHide);
  });

  const isHidden = !prefersReducedMotion && hidden;

  const revealNavbar = () => {
    hiddenRef.current = false;
    setHidden(false);
  };

  const closeMenu = () => setMenuOpen(false);
  const menuLabel = locale === "es"
    ? { open: "Abrir menú", close: "Cerrar menú" }
    : { open: "Open menu", close: "Close menu" };
  const currentMenuLabel = menuOpen ? menuLabel.close : menuLabel.open;

  return (
    <motion.header
      initial={false}
      animate={{
        y: isHidden ? "-100%" : "0%",
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onFocusCapture={revealNavbar}
      className="sticky top-0 z-50 flex h-header will-change-transform items-center justify-between bg-background/95 px-5 backdrop-blur-md sm:px-8 lg:px-10 min-[1800px]:px-gutter"
    >
      <p className="whitespace-nowrap font-display text-[24px] font-semibold tracking-[-0.72px] text-brand sm:text-[28px] lg:text-logo lg:tracking-[-0.9px]">
        {profile.name}
      </p>
      <nav aria-label={t.nav.label} className="hidden xl:block">
        <ul className="flex items-center gap-10 min-[1800px]:gap-25">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={
                  link.active
                    ? "text-nav font-bold text-foreground-strong underline"
                    : "text-nav font-medium text-nav-muted hover:text-foreground-strong"
                }
              >
                {t.nav.items[link.key]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden items-center gap-3 xl:flex">
        <Button
          asChild
          className="h-[45px] w-[195px] rounded-full bg-primary text-nav font-medium text-primary-foreground hover:bg-primary-strong"
        >
          <a href={profile.cvUrl} download>
            {t.actions.downloadCv}
          </a>
        </Button>
        {/* Muestra el idioma al que lleva, no el que está activo. */}
        <button
          type="button"
          onClick={toggleLocale}
          aria-label={t.actions.switchLanguage.label}
          className="flex h-[45px] w-20 cursor-pointer items-center justify-center gap-1 rounded-full border-2 border-primary transition-colors hover:bg-primary/10"
        >
          <Image src="/icons/globe.svg" alt="" width={20} height={20} />
          <span className="text-nav font-bold text-primary">
            {t.actions.switchLanguage.code}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2 xl:hidden">
        <button
          type="button"
          onClick={toggleLocale}
          aria-label={t.actions.switchLanguage.label}
          className="flex h-10 items-center justify-center gap-1 rounded-full border-2 border-primary px-3 transition-colors hover:bg-primary/10"
        >
          <Image src="/icons/globe.svg" alt="" width={18} height={18} />
          <span className="text-sm font-bold text-primary">
            {t.actions.switchLanguage.code}
          </span>
        </button>
        <button
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={currentMenuLabel}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative flex size-10 items-center justify-center rounded-full border-2 border-primary text-primary"
        >
          <span className="sr-only">{currentMenuLabel}</span>
          <span
            aria-hidden
            className={`absolute h-0.5 w-4 bg-current transition-transform ${
              menuOpen ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            aria-hidden
            className={`absolute h-0.5 w-4 bg-current transition-opacity ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            aria-hidden
            className={`absolute h-0.5 w-4 bg-current transition-transform ${
              menuOpen ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label={t.nav.label}
          className="absolute inset-x-0 top-full border-t border-border bg-background/98 px-5 py-5 shadow-lg backdrop-blur-md sm:px-8 xl:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-xl px-3 py-3 font-display text-lg font-semibold text-foreground-strong transition-colors hover:bg-primary/10"
                >
                  {t.nav.items[link.key]}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.cvUrl}
            download
            onClick={closeMenu}
            className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground"
          >
            {t.actions.downloadCv}
          </a>
        </nav>
      ) : null}
    </motion.header>
  );
}
