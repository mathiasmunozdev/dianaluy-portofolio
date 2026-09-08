import { LocaleProvider } from "@/components/locale-provider";
import { PortfolioMarquee } from "@/components/portfolio-marquee";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { getProjects } from "@/lib/content";

export default function Home() {
  /* Los MDX se leen en build, en el servidor; el idioma se elige ya en cliente. */
  const projects = getProjects();

  return (
    <LocaleProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PortfolioMarquee />
        <Projects projects={projects} />
        <Experience />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
