import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Las portadas incluyen texto y mockups; 90 evita artefactos visibles. */
    qualities: [75, 90],
  },
};

export default nextConfig;
