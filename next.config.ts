import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    /** Las portadas incluyen texto y mockups; 90 evita artefactos visibles. */
    qualities: [75, 90],
  },
};

export default withPayload(nextConfig);
