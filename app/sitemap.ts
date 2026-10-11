import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/booking",
    "/thought",
    "/thought/10k-hours",
    "/university",
    "/terms",
    "/privacy-policy",
    "/participant-notices",
  ].map((path) => ({
    url: `https://conduit-redesign-hngr.vercel.app${path}`,
    changeFrequency: path === "/booking" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
