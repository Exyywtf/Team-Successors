import type { Metadata } from "next";
import { Montserrat, Orbitron } from "next/font/google";
import "@/app/globals.css";
import { normalizeBrandText } from "@/lib/brandText";
import { siteConfig } from "@/lib/siteConfig";

const headingFont = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-orbitron"
});

const bodyFont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Successors | F1 in Schools",
  icons: {
    icon: [{ url: "/brand/logo.svg", type: "image/svg+xml" }],
    shortcut: ["/brand/logo.svg"],
    apple: [{ url: "/brand/logo.svg" }]
  },
  description:
    normalizeBrandText(
      "Team Successors is an F1 in Schools team delivering precision engineering, sponsor value, and high-impact STEM outreach."
    ),
  keywords: [
    normalizeBrandText("Team Successors"),
    "F1 in Schools",
    "STEM",
    "Engineering",
    "Sponsorship",
    "Dubai"
  ],
  openGraph: {
    type: "website",
    title: siteConfig.siteName,
    description:
      normalizeBrandText(
        "Inheriting the Legacy. Defining the Future. Explore Team Successors engineering, team culture, and partnership opportunities."
      ),
    url: siteConfig.siteUrl,
    siteName: siteConfig.teamName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.teamName} OpenGraph preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description:
      normalizeBrandText(
        "Premium F1 in Schools presence for Team Successors: engineering, enterprise, and community impact."
      ),
    images: ["/og-image.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
    >
      <body className={`${bodyFont.className} relative isolate text-main`}>
        {children}
      </body>
    </html>
  );
}
