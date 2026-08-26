"use client";

import Image from "next/image";
import { useLocale } from "@/components/locale-provider";
import { profile } from "@/content/profile";

/* Centro, rotación y separación icono-texto de cada pill, tomados del diseño
   (frame de 1920 de ancho; la sección arranca en y=850). El centro va en % para
   que las 5 pills se repartan por todo el ancho sea cual sea el viewport. */
const toolPlacements = [
  { leftPct: 13.44, top: 826, rotate: -4.52, gap: 0.5 } /* Illustrator */,
  { leftPct: 86.93, top: 790, rotate: 8.67, gap: 0.5 } /* Photoshop   */,
  { leftPct: 31.46, top: 713, rotate: 20.68, gap: 0.4 } /* Miro        */,
  { leftPct: 45.79, top: 902, rotate: -17.07, gap: 0.6 } /* Figma       */,
  { leftPct: 67.43, top: 771, rotate: 23.54, gap: 0.4 } /* Wordpress   */,
];

/* Las pills escalan con el ancho de la sección (39.634px de texto a 1920) para
   que ninguna se salga del recorte en pantallas más estrechas. El resto de
   medidas de la pill van en `em`, así siguen al tamaño de fuente. */
const TOOL_FONT = "calc(100cqw * 39.634 / 1920)";

export function About() {
  const { locale, t } = useLocale();

  return (
    <section
      id="sobre-mi"
      className="@container relative h-[1029px] overflow-hidden"
    >
      {/* Textura de fondo al 10% */}
      <Image
        src="/images/decor/about-texture.png"
        alt=""
        width={1932}
        height={1020}
        className="absolute inset-0 size-full object-cover opacity-10"
      />
      {/* Halo blanco difuminado tras el texto */}
      <Image
        src="/images/decor/about-halo.svg"
        alt=""
        width={1835}
        height={1293}
        className="absolute left-1/2 top-[-264px] max-w-none -translate-x-1/2"
      />

      <h2 className="absolute left-1/2 top-[187px] -translate-x-1/2 whitespace-nowrap text-center font-display text-section font-bold">
        {t.about.heading}
      </h2>
      <Image
        src="/icons/sparkle-about.svg"
        alt=""
        width={28}
        height={28}
        className="absolute left-1/2 top-[290px] -translate-x-1/2"
      />
      <p className="absolute left-1/2 top-[337px] w-[870px] max-w-[90%] -translate-x-1/2 text-center font-display text-lead font-light text-muted-foreground">
        {profile.about[locale]}
      </p>

      {/* Pills de herramientas, rotadas como en el diseño */}
      <ul aria-label={t.about.toolsLabel}>
        {profile.tools.map((tool, i) => {
          const pos = toolPlacements[i];
          return (
            <li
              key={tool.name}
              className="absolute flex items-center justify-center whitespace-nowrap rounded-full border border-border-accent bg-card px-[1.5em] py-[0.4em] font-display font-medium text-muted-foreground shadow-glow"
              style={{
                left: `${pos.leftPct}%`,
                top: pos.top,
                fontSize: TOOL_FONT,
                gap: `${pos.gap}em`,
                lineHeight: 1.7,
                transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
              }}
            >
              <Image
                src={tool.image}
                alt=""
                width={tool.width}
                height={tool.height}
                className={`${tool.rounded ? "rounded-[0.3em]" : ""} ${tool.flipY ? "-scale-y-100" : ""}`}
                style={{
                  width: `${tool.width / 39.634}em`,
                  height: `${tool.height / 39.634}em`,
                }}
              />
              {tool.name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
