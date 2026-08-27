"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/components/locale-provider";
import type { Profile } from "@/lib/schemas";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const toolPlacements = {
  Illustrator: { leftPct: 13.44, top: 826, rotate: -4.52, gap: 0.5 },
  Photoshop: { leftPct: 86.93, top: 790, rotate: 8.67, gap: 0.5 },
  Miro: { leftPct: 31.46, top: 713, rotate: 20.68, gap: 0.4 },
  Figma: { leftPct: 45.79, top: 902, rotate: -17.07, gap: 0.6 },
  Wordpress: { leftPct: 67.43, top: 771, rotate: 23.54, gap: 0.4 },
} as const;

const TOOL_DISPLAY_ORDER = [
  "Illustrator",
  "Miro",
  "Figma",
  "Wordpress",
  "Photoshop",
] as const;

const TOOL_FONT = "calc(100cqw * 39.634 / 1920)";
const PIN_DISTANCE_IN_VIEWPORTS = 1.5;
const MIN_PIN_DISTANCE_PX = 1350;
const TOOL_ENTRY_MARGIN_PX = 120;
const TOOL_LAYER_TRAVEL_RATIO = 0.22;
const MIN_TOOL_LAYER_TRAVEL_PX = 180;
const TOOL_SEQUENCE_DURATION = TOOL_DISPLAY_ORDER.length;

/* Interruptor de reversión: en `false` la grilla móvil permanece visible y
   estática, sin afectar el responsive ni la animación de escritorio. */
const MOBILE_TOOLS_ANIMATION_ENABLED = true;
const MOBILE_TOOL_ROTATIONS = [-4, 3, -3, 4, 0] as const;

type Tool = Profile["tools"][number];
type ToolPlacement = (typeof toolPlacements)[keyof typeof toolPlacements];

type ToolBadgeProps = {
  tool: Tool;
  position: ToolPlacement;
  topShift: number;
};

function ToolBadge({ tool, position, topShift }: ToolBadgeProps) {
  return (
    <li
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.leftPct}%`,
        top: position.top - topShift,
      }}
    >
      <div
        data-about-tool=""
        className="opacity-0 motion-reduce:opacity-100"
      >
        <div
          className="flex items-center justify-center whitespace-nowrap rounded-full border border-border-accent bg-card px-[1.5em] py-[0.4em] font-display font-medium text-muted-foreground shadow-glow"
          style={{
            fontSize: TOOL_FONT,
            gap: `${position.gap}em`,
            lineHeight: 1.7,
            transform: `rotate(${position.rotate}deg)`,
          }}
        >
          <Image
            src={tool.image}
            alt=""
            width={tool.width}
            height={tool.height}
            className={[
              tool.rounded ? "rounded-[0.3em]" : "",
              tool.flipY ? "-scale-y-100" : "",
            ].join(" ")}
            style={{
              width: `${tool.width / 39.634}em`,
              height: `${tool.height / 39.634}em`,
            }}
          />
          {tool.name}
        </div>
      </div>
    </li>
  );
}

type ToolsBadgesProps = {
  tools: Profile["tools"];
  topShift?: number;
};

export function ToolsBadges({ tools, topShift = 0 }: ToolsBadgesProps) {
  const mobileContainerRef = useRef<HTMLUListElement>(null);
  const desktopContainerRef = useRef<HTMLUListElement>(null);
  const { t } = useLocale();
  const toolsByName = new Map(tools.map((tool) => [tool.name, tool]));

  useGSAP(
    () => {
      const container = mobileContainerRef.current;

      if (!MOBILE_TOOLS_ANIMATION_ENABLED || !container) return;

      const badges = gsap.utils.toArray<HTMLElement>(
        "[data-mobile-about-tool]",
        container,
      );
      const media = gsap.matchMedia();

      media.add(
        "(max-width: 1279px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tween = gsap.fromTo(
            badges,
            {
              autoAlpha: 0,
              y: 28,
              scale: 0.96,
              rotate: (index) => MOBILE_TOOL_ROTATIONS[index] ?? 0,
              willChange: "transform, opacity",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              duration: 0.6,
              stagger: 0.09,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 84%",
                once: true,
              },
              onComplete: () => {
                gsap.set(badges, {
                  clearProps: "transform,opacity,visibility,willChange",
                });
              },
            },
          );

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      );

      media.add(
        "(max-width: 1279px) and (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(badges, { clearProps: "all" });
        },
      );

      return () => media.revert();
    },
    { scope: mobileContainerRef },
  );

  useGSAP(
    () => {
      const container = desktopContainerRef.current;
      const section = container?.closest("section");

      if (!container || !section) return;

      const badges = gsap.utils.toArray<HTMLElement>(
        "[data-about-tool]",
        container,
      );
      const media = gsap.matchMedia();

      media.add("(min-width: 1280px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(
                window.innerHeight * PIN_DISTANCE_IN_VIEWPORTS,
                MIN_PIN_DISTANCE_PX,
              )}`,
            pin: section,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          container,
          {
            y: () =>
              -Math.max(
                section.clientHeight * TOOL_LAYER_TRAVEL_RATIO,
                MIN_TOOL_LAYER_TRAVEL_PX,
              ),
            duration: TOOL_SEQUENCE_DURATION,
          },
          0,
        );

        timeline.fromTo(
          badges,
          {
            autoAlpha: 0,
            y: (_index, badge) => {
              const element = badge as HTMLElement;
              const sectionRect = section.getBoundingClientRect();
              const badgeRect = element.getBoundingClientRect();

              return Math.max(
                sectionRect.bottom - badgeRect.top + TOOL_ENTRY_MARGIN_PX,
                320,
              );
            },
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 1,
          },
          0,
        );
      });

      media.add("(min-width: 1280px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set(container, { y: 0 });
        gsap.set(badges, { autoAlpha: 1, y: 0 });
      });

      return () => media.revert();
    },
    { scope: desktopContainerRef },
  );

  return (
    <>
      <ul
        ref={mobileContainerRef}
        aria-label={t.about.toolsLabel}
        className="relative z-10 mx-auto mt-12 grid max-w-[620px] grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 xl:hidden"
      >
        {tools.map((tool, index) => (
          <MobileToolBadge
            key={tool.name}
            tool={tool}
            isLast={tools.length % 2 === 1 && index === tools.length - 1}
          />
        ))}
      </ul>

      <ul
        ref={desktopContainerRef}
        aria-label={t.about.toolsLabel}
        className="absolute inset-0 hidden xl:block"
      >
        {TOOL_DISPLAY_ORDER.map((toolName) => {
          const tool = toolsByName.get(toolName);

          if (!tool) return null;

          return (
            <ToolBadge
              key={tool.name}
              tool={tool}
              position={toolPlacements[toolName]}
              topShift={topShift}
            />
          );
        })}
      </ul>
    </>
  );
}

function MobileToolBadge({
  tool,
  isLast,
}: {
  tool: Tool;
  isLast: boolean;
}) {
  return (
    <li
      data-mobile-about-tool=""
      className={`flex min-h-14 items-center justify-center gap-2 rounded-full border border-border-accent bg-card px-4 py-3 font-display text-[15px] font-medium text-muted-foreground shadow-glow sm:text-base ${
        isLast
          ? "col-span-2 mx-auto w-full max-w-[200px] sm:col-span-1 sm:max-w-none"
          : ""
      }`}
    >
      <Image
        src={tool.image}
        alt=""
        width={tool.width}
        height={tool.height}
        className={`${tool.rounded ? "rounded-sm" : ""} ${
          tool.flipY ? "-scale-y-100" : ""
        } h-7 w-auto`}
      />
      {tool.name}
    </li>
  );
}
