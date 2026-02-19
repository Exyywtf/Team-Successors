import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

const routes = [
  "",
  "/team",
  "/engineering",
  "/enterprise",
  "/sponsors",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
