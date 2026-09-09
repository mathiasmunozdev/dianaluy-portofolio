"use client";

import { useLocale } from "@/components/locale-provider";

export function PayloadPreviewToolbar({ projectCount }: { projectCount: number }) {
  const { locale, t, toggleLocale } = useLocale();

  return (
    <header className="border-b border-separator-strong bg-muted/55 px-5 py-6 sm:px-8">
      <div className="mx-auto flex max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-primary-strong">
            Vista aislada
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold">Payload CMS</h1>
          <p className="mt-1 font-body text-sm text-muted-foreground" data-testid="payload-source">
            Origen: Payload · {projectCount} proyectos activos
          </p>
        </div>

        <button
          type="button"
          onClick={toggleLocale}
          aria-label={t.actions.switchLanguage.label}
          className="inline-flex h-10 w-fit items-center justify-center rounded-full border-2 border-accent px-5 font-display text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
        >
          {t.actions.switchLanguage.code}
          <span className="sr-only"> ({locale})</span>
        </button>
      </div>
    </header>
  );
}
