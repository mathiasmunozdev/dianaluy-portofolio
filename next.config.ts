import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /** El respaldo MDX de la portada lee `src/content/projects` también en
   *  runtime, durante una revalidación: hay que incluirlo en el bundle. */
  outputFileTracingIncludes: {
    "/": ["./src/content/projects/**/*.mdx"],
  },
  images: {
    /** Las portadas incluyen texto y mockups; 90 evita artefactos visibles. */
    qualities: [75, 90],
  },
};

export default withPayload(nextConfig);
