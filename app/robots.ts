import type { MetadataRoute } from "next";
import { SHOW_PARTNERSHIP_DECK } from "@/lib/featureFlags";
import { siteConfig } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const disallowDeckPaths = SHOW_PARTNERSHIP_DECK
    ? []
    : ["/deck.pdf", "/deck", "/partnership-deck", "/partners/deck"];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowDeckPaths
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`
  };
}
