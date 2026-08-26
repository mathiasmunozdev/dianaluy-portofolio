import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projectFrontmatterSchema, type Project } from "@/lib/schemas";

const projectsDir = path.join(process.cwd(), "src/content/projects");

/** Lee y valida todos los proyectos MDX, ordenados por `order`. */
export function getProjects(): Project[] {
  return fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data } = matter(raw);
      const frontmatter = projectFrontmatterSchema.parse(data);
      return { ...frontmatter, slug: file.replace(/\.mdx$/, "") };
    })
    .sort((a, b) => a.order - b.order);
}
