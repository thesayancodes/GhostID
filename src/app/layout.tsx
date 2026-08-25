import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "GhostID — Prove Who You Are. Reveal Nothing You Don't Need To.",
  description:
    "Privacy-first decentralized identity & selective disclosure platform powered by Midnight zero-knowledge proofs and Compact smart contracts.",
  keywords: [
    "Midnight Network",
    "Zero-Knowledge Proofs",
    "Decentralized Identity",
    "Compact Smart Contracts",
    "Selective Disclosure",
    "Privacy-Preserving KYC",
    "GhostID",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="font-sans bg-void text-fog antialiased min-h-screen flex flex-col selection:bg-spectral-violet/30 selection:text-fog"
      >
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
