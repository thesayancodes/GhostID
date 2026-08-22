"use client";

import React from "react";
import { ShieldCheck, EyeOff, Lock, CheckCircle2, XCircle, Sparkles, ArrowRight } from "lucide-react";

interface DisclosureDiffProps {
  appName?: string;
  disclosedClaims: {
    label: string;
    value: string;
    verified?: boolean;
  }[];
  hiddenFields?: string[];
  privacyScore?: number;
  mode?: "REAL_MIDNIGHT" | "SIMULATED_DEMO";
}

export function DisclosureDiff({
  appName = "Verifier Application",
  disclosedClaims,
  hiddenFields = [
    "Full Legal Name (Alex Rivera)",
    "Exact Date of Birth (2004-06-12)",
    "National ID / Passport Number (IN-XXXX-9104)",
    "Residential Street Address & Postal Code",
    "Biometric & Photo Identity Metadata",
  ],
  privacyScore = 95,
  mode = "SIMULATED_DEMO",
}: DisclosureDiffProps) {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
              ZERO-KNOWLEDGE ATTESTATION
            </span>
            <span className="text-xs text-slate-400">Recipient: {appName}</span>
          </div>
          <h3 className="mt-1 text-lg font-bold text-white">Selective Disclosure Breakdown</h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Privacy Score</div>
            <div className="text-base font-bold text-midnight-cyan font-mono">{privacyScore}/100</div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              mode === "REAL_MIDNIGHT"
                ? "bg-midnight-emerald/20 text-emerald-300 border border-emerald-500/30"
                : "bg-midnight-amber/20 text-amber-300 border border-amber-500/30"
            }`}
          >
            {mode === "REAL_MIDNIGHT" ? "Verified on Midnight" : "Demo verification"}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Disclosed Facts */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>DISCLOSED TO VERIFIER (PUBLIC PROOF)</span>
            </div>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
              Minimal Claim Only
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Only the cryptographic validation of this predicate was revealed to the verifier.
          </p>

          <div className="mt-4 space-y-2">
            {disclosedClaims.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-surface p-3"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white">{item.label}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-400">
                  <span>{item.value}</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden Protected Data */}
        <div className="rounded-xl border border-surface-border bg-surface-lighter/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <EyeOff className="h-4 w-4 text-ghost-400" />
              <span>WHAT WAS NOT REVEALED (PROTECTED)</span>
            </div>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
              100% Confidential
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            These raw personal fields remained strictly in your local encrypted vault and were never transmitted.
          </p>

          <div className="mt-4 space-y-1.5">
            {hiddenFields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-surface/80 px-3 py-2 text-xs border border-surface-border"
              >
                <span className="text-slate-400">{field}</span>
                <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-rose-400/90">
                  <Lock className="h-3 w-3" />
                  <span>HIDDEN</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
