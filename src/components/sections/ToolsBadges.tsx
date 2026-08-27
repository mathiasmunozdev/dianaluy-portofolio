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
const PIN_DISTANCE_IN_VIEWPORTS = 2;
const MIN_PIN_DISTANCE_PX = 1800;
const TOOL_ENTRY_MARGIN_PX = 120;
const TOOL_LAYER_TRAVEL_RATIO = 0.35;
const MIN_TOOL_LAYER_TRAVEL_PX = 260;
const TOOL_SEQUENCE_DURATION = TOOL_DISPLAY_ORDER.length;

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
  const containerRef = useRef<HTMLUListElement>(null);
  const { t } = useLocale();
  const toolsByName = new Map(tools.map((tool) => [tool.name, tool]));

  useGSAP(
    () => {
      const container = containerRef.current;
      const section = container?.closest("section");

      if (!container || !section) return;

      const badges = gsap.utils.toArray<HTMLElement>(
        "[data-about-tool]",
        container,
      );
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
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

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(container, { y: 0 });
        gsap.set(badges, { autoAlpha: 1, y: 0 });
      });

      return () => media.revert();
    },
    { scope: containerRef },
  );

  return (
    <ul
      ref={containerRef}
      aria-label={t.about.toolsLabel}
      className="absolute inset-0"
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
  );
}
