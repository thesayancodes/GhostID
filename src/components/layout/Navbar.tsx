"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Sparkles, Cpu, Lock, ChevronDown, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { useMidnight } from "../../hooks/useMidnight";
import { WalletConnect } from "../wallet/WalletConnect";
import { GhostLogo } from "./GhostLogo";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { isDemoMode, activeNetwork, switchNetwork } = useMidnight();
  const [networkMenuOpen, setNetworkMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Vault", href: "/credentials" },
    { name: "Proof Center", href: "/proof" },
    { name: "Composer", href: "/proof/composer" },
    { name: "Verify", href: "/verify" },
    { name: "Requests", href: "/requests" },
    { name: "GhostShield", href: "/shield", badge: "AI" },
    { name: "GhostAI", href: "/ai", badge: "AI" },
    { name: "Issuer", href: "/issuer" },
    { name: "Developers", href: "/developers" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-spectral-violet/15 bg-void/90 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand Animated Logo */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center">
            <GhostLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                    isActive
                      ? "text-white bg-surface-raised border border-spectral-violet/40 shadow-[0_0_15px_rgba(124,111,242,0.2)] font-semibold"
                      : "text-fog-dim hover:text-white hover:bg-surface/80"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 rounded bg-spectral-violet/25 px-1 py-0.2 text-[9px] font-bold text-phantom-cyan">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Network Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNetworkMenuOpen(!networkMenuOpen)}
              className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-spectral-violet/20 bg-surface px-2 sm:px-2.5 py-1.5 text-xs font-medium text-fog-dim hover:text-white hover:bg-surface-raised hover:border-spectral-violet/40 transition-all"
              title="Select Network"
            >
              <div
                className={`h-2 w-2 rounded-full shrink-0 ${
                  isDemoMode ? "bg-ember animate-pulse" : "bg-phantom-cyan shadow-[0_0_8px_rgba(94,234,212,0.6)]"
                }`}
              />
              <span className="hidden md:inline font-mono text-[11px]">
                {isDemoMode ? "Demo Sandbox" : activeNetwork === "preprod" ? "Midnight Preprod" : "Midnight Preview"}
              </span>
              <ChevronDown className="h-3 w-3 text-fog-dim shrink-0" />
            </button>

            {networkMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-spectral-violet/25 bg-surface p-2 shadow-glass backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-fog-dim/70 font-mono">
                  Target Environment
                </div>
                <button
                  onClick={() => {
                    switchNetwork("demo");
                    setNetworkMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-left transition-colors ${
                    isDemoMode ? "bg-surface-raised text-ember font-semibold" : "text-fog-dim hover:bg-surface-raised hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-ember" />
                    <span>Demo Sandbox</span>
                  </div>
                  {isDemoMode && <CheckCircle2 className="h-3.5 w-3.5 text-ember" />}
                </button>
                <button
                  onClick={() => {
                    switchNetwork("preprod");
                    setNetworkMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-left transition-colors ${
                    !isDemoMode && activeNetwork === "preprod"
                      ? "bg-surface-raised text-phantom-cyan font-semibold"
                      : "text-fog-dim hover:bg-surface-raised hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-phantom-cyan" />
                    <span>Midnight Preprod</span>
                  </div>
                  {!isDemoMode && activeNetwork === "preprod" && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-phantom-cyan" />
                  )}
                </button>
                <button
                  onClick={() => {
                    switchNetwork("preview");
                    setNetworkMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-left transition-colors ${
                    !isDemoMode && activeNetwork === "preview"
                      ? "bg-surface-raised text-spectral-violet font-semibold"
                      : "text-fog-dim hover:bg-surface-raised hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-spectral-violet" />
                    <span>Midnight Preview</span>
                  </div>
                  {!isDemoMode && activeNetwork === "preview" && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-spectral-violet" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Wallet Connect Component */}
          <WalletConnect />

          {/* Settings Link */}
          <Link
            href="/settings"
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-spectral-violet/20 bg-surface text-fog-dim hover:text-white hover:bg-surface-raised hover:border-spectral-violet/40 transition-all"
            title="Settings"
          >
            <Lock className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Navigation */}
      <div className="flex xl:hidden overflow-x-auto border-t border-spectral-violet/15 bg-surface/70 px-4 py-2 scrollbar-none gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-spectral-violet/25 text-white border border-spectral-violet/50 shadow-sm font-semibold"
                  : "text-fog-dim hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
