import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
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
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <div className="min-h-screen bg-white text-slate-900 selection:bg-[#1B8C88] selection:text-white">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
