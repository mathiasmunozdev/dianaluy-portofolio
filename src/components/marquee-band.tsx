import { cn } from "@/lib/utils";

/** Banda azul con texto en scroll infinito ("PORTAFOLIO +", "DIANA LUY +").
 *  Decorativa: el track se duplica para que el bucle no tenga costura. */
export function MarqueeBand({
  word,
  className,
}: {
  word: string;
  className?: string;
}) {
  const track = Array.from({ length: 11 }, () => `${word} + `).join("");

  return (
    <div
      aria-hidden
      className={cn(
        "flex h-9 items-center overflow-hidden bg-primary sm:h-[42px]",
        className,
      )}
    >
      <div className="flex shrink-0 animate-marquee">
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="shrink-0 whitespace-pre text-sm font-bold tracking-[3px] text-primary-foreground sm:text-nav sm:tracking-marquee"
          >
            {track}
          </span>
        ))}
      </div>
    </div>
  );
}
