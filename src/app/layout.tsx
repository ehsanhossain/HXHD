import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

/**
 * Single type system for the whole site. Space Grotesk is a proportional
 * derivative of a monospace, which gives the site an engineered, technical
 * voice appropriate to a chemical manufacturer — and keeps figures even
 * enough for datasheet tables.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  // Resolves canonical and relative OG/Twitter URLs. This must be THIS site's
  // own domain: the workflow never sets NEXT_PUBLIC_SITE_URL, so the fallback
  // is what production actually ships, and pointing it at the group's other
  // domain published every canonical on hxhdbd.com as hxhdchemical.com.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hxhdbd.com"
  ),
  title: {
    default: "HXHD | Polymer Emulsions, Waterproofing & Functional Chemical Solutions",
    template: "%s | HXHD",
  },
  description:
    "Hongxing Hongda (BD) Two Win Technology Co., Ltd. (HXHD) — R&D-driven manufacturer of polymer emulsions, waterproofing systems, architectural coatings, and functional chemical additives with multi-base production in China and Bangladesh.",
  applicationName: "HXHD New Materials",
  keywords: [
    "polymer emulsion",
    "acrylic emulsion",
    "waterproof emulsion",
    "textile emulsion",
    "coating additives",
    "construction chemicals",
    "ceramic tile adhesive",
    "waterborne polyurethane",
    "rust converter",
    "Hongxing Hongda",
    "HXHD Bangladesh",
    "BEPZA Mirsharai plant",
    "Hongxing Hongda BD",
    "Two Win Technology",
  ],
  authors: [{ name: "Hongxing Hongda (BD) Two Win Technology Co., Ltd." }],
  creator: "HXHD",
  publisher: "Hongxing Hongda (BD) Two Win Technology Co., Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "HXHD — Hongxing Hongda New Materials",
    title: "HXHD | Emulsion & Functional Chemical Solutions That Perform",
    description:
      "R&D-driven manufacturer of polymer emulsions, waterproofing systems, coating emulsions, and functional chemical additives with production bases in China and Bangladesh.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HXHD — Hongxing Hongda (BD) Two Win Technology Co., Ltd.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HXHD | Emulsion & Functional Chemical Solutions That Perform",
    description:
      "R&D-driven manufacturer of polymer emulsions, waterproofing systems, coating emulsions, and functional chemical additives.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <LanguageProvider>
          <SmoothScrollProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--brand-red)] focus:px-5 focus:py-3 focus:text-white focus:font-bold"
            >
              Skip to content
            </a>
            <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--brand-teal)] selection:text-white">
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </div>
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
