"use client";

import Image from "next/image";
import { useLocale } from "@/components/locale-provider";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import type { Profile } from "@/lib/schemas";

const toolPlacements = {
  Illustrator: { leftPct: 13.44, top: 826, rotate: -4.52, gap: 0.5 },
  Photoshop: { leftPct: 86.93, top: 790, rotate: 8.67, gap: 0.5 },
  Miro: { leftPct: 31.46, top: 713, rotate: 20.68, gap: 0.4 },
  Figma: { leftPct: 45.79, top: 902, rotate: -17.07, gap: 0.6 },
  Wordpress: { leftPct: 67.43, top: 771, rotate: 23.54, gap: 0.4 },
} as const;

const TOOL_REVEAL_ORDER = [
  "Illustrator",
  "Miro",
  "Figma",
  "Wordpress",
  "Photoshop",
] as const;

const TOOL_FONT = "calc(100cqw * 39.634 / 1920)";
const REVEAL_STEP_MS = 300;
const REVEAL_ZONE_LEAD_PX = 50;
const FIRST_TOOL_TOP = Math.min(
  ...Object.values(toolPlacements).map(({ top }) => top),
);

type Tool = Profile["tools"][number];
type ToolPlacement = (typeof toolPlacements)[keyof typeof toolPlacements];

type ToolBadgeProps = {
  tool: Tool;
  position: ToolPlacement;
  topShift: number;
  isRevealed: boolean;
  sequenceIndex: number;
};

function ToolBadge({
  tool,
  position,
  topShift,
  isRevealed,
  sequenceIndex,
}: ToolBadgeProps) {
  return (
    <li
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.leftPct}%`,
        top: position.top - topShift,
      }}
    >
      <div
        className={[
          "motion-safe:transition-[opacity,translate]",
          "motion-safe:duration-[600ms]",
          "motion-safe:ease-out",
          "motion-reduce:translate-y-0",
          "motion-reduce:opacity-100",
          "motion-reduce:transition-none",
          isRevealed
            ? "motion-safe:translate-y-0 motion-safe:opacity-100"
            : "motion-safe:-translate-y-[40px] motion-safe:opacity-0",
        ].join(" ")}
        style={{ transitionDelay: `${sequenceIndex * REVEAL_STEP_MS}ms` }}
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
  const { t } = useLocale();
  const { ref, isRevealed } = useRevealOnScroll<HTMLDivElement>({
    threshold: 0.3,
    requireScroll: true,
  });
  const toolsByName = new Map(tools.map((tool) => [tool.name, tool]));

  return (
    <>
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ top: FIRST_TOOL_TOP - topShift - REVEAL_ZONE_LEAD_PX }}
      />
      <ul aria-label={t.about.toolsLabel} className="absolute inset-0">
        {TOOL_REVEAL_ORDER.map((toolName, sequenceIndex) => {
          const tool = toolsByName.get(toolName);

          if (!tool) return null;

          return (
            <ToolBadge
              key={tool.name}
              tool={tool}
              position={toolPlacements[toolName]}
              topShift={topShift}
              isRevealed={isRevealed}
              sequenceIndex={sequenceIndex}
            />
          );
        })}
      </ul>
    </>
  );
}
