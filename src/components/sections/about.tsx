import Image from "next/image";
import { AboutCopy } from "@/components/sections/AboutCopy";
import { ToolsBadges } from "@/components/sections/ToolsBadges";
import { profile } from "@/content/profile";

const TOOLS_SHIFT = 110;

export function About() {
  return (
    <section
      id="sobre-mi"
      className="@container relative min-h-[690px] overflow-hidden px-5 py-20 sm:min-h-[720px] sm:px-8 sm:py-24 xl:h-[919px] xl:min-h-0 xl:px-0 xl:py-0"
    >
      {/* Textura de fondo al 10% */}
      <Image
        src="/images/decor/about-texture.png"
        alt=""
        width={1932}
        height={1020}
        sizes="100vw"
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
        className="absolute left-1/2 top-[148px] -translate-x-1/2 sm:top-[174px] xl:top-[290px]"
      />

      <ToolsBadges tools={profile.tools} topShift={TOOLS_SHIFT} />
    </section>
  );
}
