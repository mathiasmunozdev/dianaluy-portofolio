import type { Metadata } from "next";
import { connection } from "next/server";
import { LocaleProvider } from "@/components/locale-provider";
import { PayloadPreviewToolbar } from "@/components/payload-preview-toolbar";
import { Projects } from "@/components/sections/projects";
import { getPayloadProjects } from "@/lib/payload-projects";

export const metadata: Metadata = {
  description: "Vista aislada para validar proyectos administrados con Payload CMS.",
  robots: {
    follow: false,
    index: false,
  },
};

async function loadPayloadProjects() {
  try {
    return { projects: await getPayloadProjects(), success: true } as const;
  } catch (error) {
    console.error("Unable to load Payload projects preview", error);
    return { success: false } as const;
  }
}

export default async function PayloadPreviewPage() {
  await connection();
  const result = await loadPayloadProjects();

  if (!result.success) {
    return (
      <main className="grid min-h-screen place-items-center px-5">
        <section className="max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-glow">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-destructive">
            Payload no disponible
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold">No se pudo cargar la vista aislada</h1>
          <p className="mt-3 font-body text-muted-foreground">
            El portafolio público continúa funcionando con sus archivos MDX. Revisa la conexión con
            PostgreSQL e inténtalo nuevamente.
          </p>
        </section>
      </main>
    );
  }

  return (
    <LocaleProvider>
      <main className="min-h-screen pb-24" data-content-source="payload">
        <PayloadPreviewToolbar projectCount={result.projects.length} />
        <Projects projects={result.projects} eagerImageCount={2} />
      </main>
    </LocaleProvider>
  );
}
