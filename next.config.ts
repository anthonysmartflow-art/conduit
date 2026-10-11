import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...[
        "booking",
        "thought",
        "university",
        "terms",
        "privacy-policy",
        "participant-notices",
      ].map((p) => ({
        source: `/${p}.html`,
        destination: `/${p}`,
        permanent: true,
      })),
      {
        source: "/thought/10k-hours/index.html",
        destination: "/thought/10k-hours",
        permanent: true,
      },
      ...["cancel", "consentform", "login", "logout", "participants"].map(
        (p) => ({
          source: `/${p}`,
          destination: `https://condu.it/${p}`,
          permanent: false,
        }),
      ),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
