"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Sparkles, Cpu, Lock, ChevronDown, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { useMidnight } from "../../hooks/useMidnight";
import { WalletConnect } from "../wallet/WalletConnect";
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
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-ghost-600 via-midnight-accent to-midnight-cyan p-[1px] shadow-glow-indigo transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-background">
                <Shield className="h-5 w-5 text-ghost-400 transition-colors group-hover:text-midnight-cyan" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-lg font-bold tracking-wider text-white">
                GHOST<span className="text-ghost-400">ID</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-ghost-300/60 font-medium">
                Midnight ZK Identity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-white bg-surface-lighter border border-surface-border shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-surface/60"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 rounded bg-ghost-500/20 px-1 py-0.2 text-[9px] font-semibold text-ghost-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Network Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNetworkMenuOpen(!networkMenuOpen)}
              className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-surface-lighter hover:border-ghost-500/40 transition-all"
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  isDemoMode ? "bg-midnight-amber animate-pulse" : "bg-midnight-emerald shadow-glow-emerald"
                }`}
              />
              <span className="hidden sm:inline">
                {isDemoMode ? "Demo Sandbox" : activeNetwork === "preprod" ? "Midnight Preprod" : "Midnight Preview"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {networkMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-surface-border bg-surface p-2 shadow-glass backdrop-blur-2xl z-50">
                <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Target Environment
                </div>
                <button
                  onClick={() => {
                    switchNetwork("demo");
                    setNetworkMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-left ${
                    isDemoMode ? "bg-surface-lighter text-ghost-300 font-semibold" : "text-slate-300 hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-midnight-amber" />
                    <span>Demo Sandbox</span>
                  </div>
                  {isDemoMode && <CheckCircle2 className="h-3.5 w-3.5 text-ghost-400" />}
                </button>
                <button
                  onClick={() => {
                    switchNetwork("preprod");
                    setNetworkMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-left ${
                    !isDemoMode && activeNetwork === "preprod"
                      ? "bg-surface-lighter text-midnight-emerald font-semibold"
                      : "text-slate-300 hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-midnight-emerald" />
                    <span>Midnight Preprod</span>
                  </div>
                  {!isDemoMode && activeNetwork === "preprod" && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-midnight-emerald" />
                  )}
                </button>
                <button
                  onClick={() => {
                    switchNetwork("preview");
                    setNetworkMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-left ${
                    !isDemoMode && activeNetwork === "preview"
                      ? "bg-surface-lighter text-midnight-cyan font-semibold"
                      : "text-slate-300 hover:bg-surface-hover"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-midnight-cyan" />
                    <span>Midnight Preview</span>
                  </div>
                  {!isDemoMode && activeNetwork === "preview" && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-midnight-cyan" />
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
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-surface text-slate-400 hover:text-white hover:bg-surface-lighter transition-colors"
            title="Settings"
          >
            <Lock className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Navigation */}
      <div className="flex xl:hidden overflow-x-auto border-t border-surface-border/50 bg-surface/50 px-4 py-2 scrollbar-none gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-ghost-600/30 text-ghost-200 border border-ghost-500/40"
                  : "text-slate-400 hover:text-slate-200"
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
