import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Epilogue } from "next/font/google";
import "@/styles/globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

/* El <title> lo renderiza <LocaleProvider> para que siga al idioma activo; si
   se fijara también aquí, Next lo reescribiría con el del servidor al hidratar. */
export const metadata: Metadata = {
  description:
    "Portfolio de Diana Luy, diseñadora UX/UI con experiencia en branding, diseño web y comunicación visual.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${epilogue.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
