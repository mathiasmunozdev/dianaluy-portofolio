import Image from "next/image";
import { AboutCopy } from "@/components/sections/AboutCopy";
import { ToolsBadges } from "@/components/sections/ToolsBadges";
import { profile } from "@/content/profile";

/* Sube las pills para acercarlas al párrafo (el diseño dejaba 174px de hueco).
   La sección se acorta lo mismo, así el aire por debajo no cambia. */
const TOOLS_SHIFT = 110;
const SECTION_HEIGHT = 1029 - TOOLS_SHIFT;

export function About() {
  return (
    <section
      id="sobre-mi"
      className="@container relative overflow-hidden"
      style={{ height: SECTION_HEIGHT }}
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

      <AboutCopy about={profile.about} />
      <Image
        src="/icons/sparkle-about.svg"
        alt=""
        width={28}
        height={28}
        className="absolute left-1/2 top-[290px] -translate-x-1/2"
      />
      <ToolsBadges tools={profile.tools} topShift={TOOLS_SHIFT} />
    </section>
  );
}
