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
        "flex h-[42px] items-center overflow-hidden bg-primary",
        className,
      )}
    >
      <div className="flex shrink-0 animate-marquee">
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="shrink-0 whitespace-pre text-nav font-bold tracking-marquee text-primary-foreground"
          >
            {track}
          </span>
        ))}
      </div>
    </div>
  );
}
