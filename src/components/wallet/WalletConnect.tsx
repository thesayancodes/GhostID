"use client";

import React, { useState } from "react";
import { useMidnight } from "../../hooks/useMidnight";
import { Wallet, LogOut, CheckCircle, AlertCircle, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";

export function WalletConnect() {
  const { isConnected, isConnecting, walletAddress, isLaceInstalled, errorMessage, connect, disconnect, isDemoMode, activeNetwork } = useMidnight();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formatAddress = (addr: string | null) => {
    if (!addr) return "";
    if (addr.length <= 16) return addr;
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={connect}
          disabled={isConnecting}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-ghost-600 to-midnight-accent px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow-indigo transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
        >
          <Wallet className="h-3.5 w-3.5" />
          <span>{isConnecting ? "Connecting..." : isDemoMode ? "Connect Demo Wallet" : "Connect Lace Wallet"}</span>
        </button>

        {errorMessage && (
          <div className="absolute right-0 mt-2 w-64 rounded-lg border border-midnight-rose/30 bg-surface-lighter p-2.5 text-xs text-rose-300 shadow-glass z-50">
            <div className="flex items-center gap-1.5 font-semibold text-rose-400">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Connection Notice</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-300">{errorMessage}</p>
            {!isLaceInstalled && !isDemoMode && (
              <p className="mt-1 text-[10px] text-slate-400">
                Lace wallet not detected. Switch to Demo Sandbox or install Midnight Lace.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface-lighter/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-ghost-500/50 hover:bg-surface-lighter transition-all"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-ghost-600/30 text-ghost-300">
          <ShieldCheck className="h-3 w-3" />
        </div>
        <span className="font-mono text-slate-200">{formatAddress(walletAddress)}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-surface-border bg-surface p-3 shadow-glass backdrop-blur-2xl z-50">
          <div className="flex items-center justify-between border-b border-surface-border pb-2.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-midnight-emerald shadow-glow-emerald" />
              <span className="text-xs font-semibold text-white">
                {isDemoMode ? "Demo Sandbox Vault" : "Midnight Lace Connected"}
              </span>
            </div>
            <span className="rounded bg-ghost-500/20 px-1.5 py-0.5 text-[10px] font-mono text-ghost-300">
              {activeNetwork.toUpperCase()}
            </span>
          </div>

          <div className="mt-2.5 rounded-lg bg-surface-lighter p-2 font-mono text-[11px] text-slate-300 break-all">
            <div className="text-[10px] uppercase text-slate-400 font-sans font-medium">Public Address</div>
            <div className="mt-0.5 text-ghost-200">{walletAddress}</div>
          </div>

          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-midnight-emerald" />
            <span>Private keys held in local encrypted vault</span>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                disconnect();
                setDropdownOpen(false);
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-surface-border bg-surface-hover py-1.5 text-xs font-medium text-slate-300 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
