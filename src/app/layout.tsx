import type { Metadata } from "next";
import { Montserrat, Orbitron } from "next/font/google";
import "@/app/globals.css";
import { normalizeBrandText } from "@/lib/brandText";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Orbitron (Display Font): Used for headings and numeric data.
 * Loaded with variable definition for Tailwind usage via `font-heading`.
 */
const headingFont = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-orbitron",
});

/**
 * Montserrat (Body Font): Used for standard copy and UI text.
 * Loaded with variable definition for Tailwind usage via `font-sans`.
 */
const bodyFont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Team Successors | F1 in Schools",
    template: "%s | Team Successors",
  },
  icons: {
    icon: [{ url: "/brand/logo.svg", type: "image/svg+xml" }],
    shortcut: ["/brand/logo.svg"],
    apple: [{ url: "/brand/logo.svg" }],
  },
  description:
    "Official website of Team Successors, a premiere F1 in Schools team from Dubai, UAE. We combine advanced engineering, strategic enterprise, and community outreach to compete at the highest level of STEM competition.",
  keywords: [
    "F1 in Schools",
    "F1 in Schools Dubai",
    "Team Successors",
    "STEM Education",
    "Student Engineering",
    "UAE F1 in Schools",
    "Formula 1 in Schools",
    "Project Management",
    "Aerodynamics",
    "Car Design",
    "Sponsorship",
    "Dubai",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: siteConfig.siteName,
    description:
      "Official website of Team Successors, a premiere F1 in Schools team from Dubai, UAE. Join our journey to the World Finals.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.teamName,
    images: [
      {
        url: "/og-image.jpg", // Placeholder for when image is available
        width: 1200,
        height: 630,
        alt: "Team Successors - F1 in Schools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description:
      "Official website of Team Successors, a premiere F1 in Schools team from Dubai, UAE. Join our journey to the World Finals.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.teamName,
        url: siteConfig.siteUrl,
        sameAs: siteConfig.socialLinks.map((link) => link.href),
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.siteUrl}/brand/logo.svg`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.siteName,
        publisher: {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${bodyFont.className} relative isolate text-main`}>
        {children}
      </body>
    </html>
  );
}
