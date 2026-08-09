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
  // Resolves relative OG/Twitter image URLs. Override via NEXT_PUBLIC_SITE_URL
  // when deploying to the production domain.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hxhdchemical.com"
  ),
  title: "HXHD | Emulsion & Functional Chemical Solutions That Perform",
  description:
    "HXHD is an R&D-driven manufacturer of polymer emulsions, waterproofing systems, coating emulsions, and functional additives—engineered for consistent formulation performance and export-ready supply.",
  icons: {
    icon: "/images/favicon.png",
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
