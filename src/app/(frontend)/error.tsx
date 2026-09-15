"use client";

import { useEffect } from "react";

/**
 * Último recurso del portafolio público: si algo falla fuera del respaldo MDX
 * de los proyectos, se muestra esta pantalla en vez de la de error de Next.
 */
export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error no controlado en el portafolio público", error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <section className="max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-glow">
        <p className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-destructive">
          Algo salió mal
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold">No pudimos cargar el portafolio</h1>
        <p className="mt-3 font-body text-muted-foreground">
          Es un problema temporal. Vuelve a intentarlo en unos segundos.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border-2 border-accent px-6 font-display text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
        >
          Reintentar
        </button>
      </section>
    </main>
  );
}
