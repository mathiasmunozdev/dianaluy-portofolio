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
  const { t, toggleLocale } = useLocale();
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const hiddenRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (prefersReducedMotion) return;

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

  return (
    <motion.header
      initial={false}
      animate={{
        y: isHidden ? "-100%" : "0%",
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onFocusCapture={revealNavbar}
      className="sticky top-0 z-50 flex h-header will-change-transform items-center justify-between bg-background/95 px-10 backdrop-blur-md min-[1800px]:px-gutter"
    >
      <p className="whitespace-nowrap font-display text-logo font-semibold text-brand">
        {profile.name}
      </p>
      <nav aria-label={t.nav.label}>
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
      <div className="flex items-center gap-3">
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
    </motion.header>
  );
}
