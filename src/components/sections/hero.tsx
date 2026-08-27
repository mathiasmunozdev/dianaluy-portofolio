"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useLocale } from "@/components/locale-provider";
import { profile } from "@/content/profile";

const tagTone: Record<string, string> = {
  violet: "bg-accent",
  red: "bg-accent-red",
  magenta: "bg-accent-magenta",
  blue: "bg-primary",
};

/* Ancho de la banda en el diseño (1878×756, banda recortada a 716). Las posiciones horizontales se
   expresan en % de ese ancho para que los pins se repartan por toda la banda
   sea cual sea el viewport; las verticales van en px porque el alto es fijo. */
const DESIGN_WIDTH = 1878;
const pct = (x: number) => `${(x / DESIGN_WIDTH) * 100}%`;

/* Clases literales: Tailwind escanea el fuente buscando el nombre completo, así
   que una plantilla `animate-float-${drift}` no generaría el CSS. */
const driftAnimation = {
  "up-right": "animate-float-up-right",
  "up-left": "animate-float-up-left",
  "down-right": "animate-float-down-right",
  "down-left": "animate-float-down-left",
} as const;

/* Cada flecha deriva en diagonal hacia el margen que tiene más cerca, de modo
   que las cuatro se alejan del centro (titular y retrato) y ninguna se acerca a
   ellos al animarse. Las duraciones no son múltiplos entre sí y cada una arranca
   con un `delay` distinto, así los ciclos nunca vuelven a coincidir. */
const tagPositions = [
  { pin: "/icons/pin-diseno-web.svg", left: 1514, top: 138, mobileLeft: "52%", mobileTop: "258px", tabletLeft: "72%", tabletTop: "175px", chipWidth: 100, drift: "up-right", duration: 4.3, delay: 0 },
  { pin: "/icons/pin-wireframes.svg", left: 348, top: 283, mobileLeft: "8%", mobileTop: "310px", tabletLeft: "16%", tabletTop: "285px", chipWidth: 104, drift: "up-left", duration: 5.2, delay: 0.7 },
  { pin: "/icons/pin-prototipos.svg", left: 1414, top: 482, mobileLeft: "59%", mobileTop: "430px", tabletLeft: "70%", tabletTop: "475px", chipWidth: 100, drift: "down-right", duration: 3.9, delay: 1.2 },
  { pin: "/icons/pin-diseno-grafico.svg", left: 138, top: 469, mobileLeft: "9%", mobileTop: "466px", tabletLeft: "10%", tabletTop: "465px", chipWidth: 125, drift: "down-left", duration: 4.8, delay: 0.3 },
] as const;

export function Hero() {
  const { locale, t } = useLocale();

  return (
    // "Inicio" vuelve al tope real de la página: el ancla descuenta la cabecera,
    // que es lo único que queda por encima del hero.
    <section
      id="inicio"
      className="relative mx-3 h-[640px] scroll-mt-header overflow-hidden rounded-lg bg-secondary sm:mx-band sm:h-[680px] lg:h-[716px]"
    >
      {/* Blobs azules difuminados de fondo (exportados de Figma) */}
      <Image
        src="/images/decor/band-blobs-hero.svg"
        alt=""
        width={1878}
        height={756}
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 size-full object-cover"
      />

      <p className="absolute left-1/2 top-[66px] -translate-x-1/2 whitespace-nowrap text-center font-display text-[clamp(1.75rem,7vw,3.4375rem)] font-medium tracking-[-0.55px] sm:top-[76px] lg:top-[83px]">
        {profile.kicker[locale]}
      </p>
      <h1 className="absolute left-1/2 top-[118px] -translate-x-1/2 whitespace-nowrap text-center font-display text-[clamp(2.45rem,10.5vw,4.6875rem)] font-bold leading-[0.98] tracking-[-0.957px] sm:top-[140px] lg:top-[151px]">
        {profile.headline[locale]}
      </h1>

      {/* Retrato principal (incluye paneles decorativos integrados) */}
      <Image
        src="/images/dianita.png"
        alt={t.hero.portraitAlt}
        width={1167}
        height={732}
        loading="eager"
        sizes="(max-width: 639px) 115vw, (max-width: 1023px) 82vw, 680px"
        className="absolute bottom-0 left-1/2 h-auto w-[115%] max-w-[680px] -translate-x-1/2 sm:w-[82%] lg:w-[680px]"
        style={{ height: "auto" }}
      />

      {/* Destellos decorativos */}
      <Image
        src="/icons/sparkle-hero-1.svg"
        alt=""
        width={18}
        height={18}
        className="absolute top-[350px] lg:top-[363px]"
        style={{ left: pct(1073) }}
      />
      <Image
        src="/icons/sparkle-hero-2.svg"
        alt=""
        width={20}
        height={20}
        className="absolute top-[335px] lg:top-[348px]"
        style={{ left: pct(773) }}
      />

      {/* Pins con etiquetas de especialidad */}
      {profile.heroTags.map((tag, i) => {
        const pos = tagPositions[i];
        return (
          /* El contenedor va absoluto (fuera del flujo) y es el que se anima:
             la flecha y su chip flotan juntos sin mover nada del layout. */
          <div
            key={tag.label.es}
            aria-hidden
            className={`absolute left-[var(--tag-mobile-left)] top-[var(--tag-mobile-top)] md:left-[var(--tag-tablet-left)] md:top-[var(--tag-tablet-top)] lg:left-[var(--tag-desktop-left)] lg:top-[var(--tag-desktop-top)] ${driftAnimation[pos.drift]}`}
            style={{
              "--tag-mobile-left": pos.mobileLeft,
              "--tag-mobile-top": pos.mobileTop,
              "--tag-tablet-left": pos.tabletLeft,
              "--tag-tablet-top": pos.tabletTop,
              "--tag-desktop-left": pct(pos.left),
              "--tag-desktop-top": `${pos.top}px`,
              animationDuration: `${pos.duration}s`,
              animationDelay: `${pos.delay}s`,
            } as CSSProperties}
          >
            <Image
              src={pos.pin}
              alt=""
              width={33}
              height={36}
              className="block"
              style={{ width: 23, height: "auto" }}
            />
            <span
              className={`absolute flex h-7 items-center justify-center whitespace-nowrap rounded-sm rounded-tl-none px-2 text-[13px] font-medium text-primary-foreground sm:h-[29px] sm:px-2.5 sm:text-tag ${tagTone[tag.tone]}`}
              style={{ left: 20, top: 27, minWidth: pos.chipWidth }}
            >
              {tag.label[locale]}
            </span>
          </div>
        );
      })}
    </section>
  );
}
