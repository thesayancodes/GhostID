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
          className="flex items-center gap-2 rounded-lg bg-spectral-violet px-3.5 py-1.5 text-xs font-bold text-white shadow-glow-spectral transition-all hover:bg-spectral-violet/90 active:scale-95 disabled:opacity-50"
        >
          <Wallet className="h-3.5 w-3.5" />
          <span>{isConnecting ? "Connecting..." : isDemoMode ? "Connect Demo Vault" : "Connect Lace Wallet"}</span>
        </button>

        {errorMessage && (
          <div className="absolute right-0 mt-2 w-64 rounded-lg border border-danger-glitch/30 bg-surface-raised p-2.5 text-xs text-danger-glitch shadow-glass z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-1.5 font-semibold text-danger-glitch">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Connection Notice</span>
            </div>
            <p className="mt-1 text-[11px] text-fog-dim">{errorMessage}</p>
            {!isLaceInstalled && !isDemoMode && (
              <p className="mt-1 text-[10px] text-fog-dim/70">
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
        className="flex items-center gap-2 rounded-lg border border-spectral-violet/25 bg-surface px-3 py-1.5 text-xs font-medium text-fog hover:border-spectral-violet/50 hover:bg-surface-raised transition-all"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-spectral-violet/20 text-phantom-cyan">
          <ShieldCheck className="h-3 w-3" />
        </div>
        <span className="font-mono text-fog">{formatAddress(walletAddress)}</span>
        <ChevronDown className="h-3.5 w-3.5 text-fog-dim" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-spectral-violet/30 bg-surface p-3.5 shadow-glass backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-spectral-violet/15 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-phantom-cyan shadow-[0_0_8px_rgba(94,234,212,0.5)]" />
              <span className="text-xs font-semibold text-fog font-display">
                {isDemoMode ? "Demo Sandbox Vault" : "Midnight Lace Connected"}
              </span>
            </div>
            <span className="rounded bg-spectral-violet/20 px-1.5 py-0.5 text-[10px] font-mono text-spectral-violet">
              {activeNetwork.toUpperCase()}
            </span>
          </div>

          <div className="mt-2.5 rounded-lg bg-void/80 p-2.5 font-mono text-[11px] text-fog-dim break-all border border-spectral-violet/10">
            <div className="text-[10px] uppercase text-fog-dim/70 font-sans font-medium">Public Address</div>
            <div className="mt-0.5 text-fog">{walletAddress}</div>
          </div>

          <div className="mt-2 text-[11px] text-fog-dim flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-phantom-cyan" />
            <span>Private keys held in local encrypted vault</span>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                disconnect();
                setDropdownOpen(false);
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-danger-glitch/20 bg-surface-raised py-1.5 text-xs font-medium text-fog-dim hover:text-danger-glitch hover:border-danger-glitch/40 transition-colors"
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
