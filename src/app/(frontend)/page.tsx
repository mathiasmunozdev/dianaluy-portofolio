import { connection } from "next/server";
import { LocaleProvider } from "@/components/locale-provider";
import { PortfolioMarquee } from "@/components/portfolio-marquee";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { getPayloadProjects } from "@/lib/payload-projects";

export default async function Home() {
  await connection();
  const projects = await getPayloadProjects();

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
