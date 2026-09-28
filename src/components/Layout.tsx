"use client";

import React, { ReactNode } from "react";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-void text-fog selection:bg-spectral-violet selection:text-white font-sans antialiased">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
