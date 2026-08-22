import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GhostID — Prove Who You Are. Reveal Nothing You Don't Need To.",
  description:
    "Privacy-first decentralized identity and credential verification platform powered by Midnight zero-knowledge proofs and Compact smart contracts.",
  keywords: [
    "Midnight Network",
    "Zero-Knowledge Proofs",
    "Decentralized Identity",
    "Compact Smart Contracts",
    "Selective Disclosure",
    "Privacy-Preserving KYC",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased min-h-screen flex flex-col selection:bg-ghost-500/30 selection:text-ghost-200`}
      >
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
