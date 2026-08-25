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
    <div className="rounded-2xl border border-spectral-violet/25 bg-surface p-6 shadow-glass">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-spectral-violet/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-phantom-cyan/20 px-2 py-0.5 text-[10px] font-mono font-bold text-phantom-cyan border border-phantom-cyan/30">
              ZERO-KNOWLEDGE ATTESTATION
            </span>
            <span className="text-xs text-fog-dim">Recipient: {appName}</span>
          </div>
          <h3 className="mt-1 font-display text-lg font-bold text-fog">Selective Disclosure Breakdown</h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase text-fog-dim font-semibold font-mono">Privacy Score</div>
            <div className="text-base font-bold text-phantom-cyan font-mono">{privacyScore}/100</div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-mono font-medium ${
              mode === "REAL_MIDNIGHT"
                ? "bg-phantom-cyan/20 text-phantom-cyan border border-phantom-cyan/30"
                : "bg-ember/20 text-ember border border-ember/30"
            }`}
          >
            {mode === "REAL_MIDNIGHT" ? "Verified on Midnight" : "Demo sandbox verified"}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Disclosed Facts */}
        <div className="rounded-xl border border-phantom-cyan/35 bg-phantom-cyan/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-phantom-cyan font-display">
              <CheckCircle2 className="h-4 w-4" />
              <span>DISCLOSED TO VERIFIER (PUBLIC PROOF)</span>
            </div>
            <span className="rounded bg-phantom-cyan/20 px-2 py-0.5 text-[10px] font-mono font-bold text-phantom-cyan border border-phantom-cyan/30">
              Minimal Claim Only
            </span>
          </div>
          <p className="mt-1 text-[11px] text-fog-dim leading-relaxed">
            Only the cryptographic validation of this predicate was revealed to the verifier.
          </p>

          <div className="mt-4 space-y-2">
            {disclosedClaims.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-phantom-cyan/30 bg-surface-raised p-3 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-phantom-cyan" />
                  <span className="text-xs font-bold text-fog font-display">{item.label}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-bold text-phantom-cyan">
                  <span>{item.value}</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden Protected Data */}
        <div className="rounded-xl border border-spectral-violet/20 bg-void/60 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-fog-dim font-display">
              <EyeOff className="h-4 w-4 text-spectral-violet" />
              <span>WHAT WAS NOT REVEALED (PROTECTED)</span>
            </div>
            <span className="rounded bg-surface-raised px-2 py-0.5 text-[10px] font-mono font-bold text-fog-dim border border-spectral-violet/20">
              100% Confidential
            </span>
          </div>
          <p className="mt-1 text-[11px] text-fog-dim leading-relaxed">
            These raw personal fields remained strictly in your local encrypted vault and were never transmitted.
          </p>

          <div className="mt-4 space-y-1.5 font-mono text-xs">
            {hiddenFields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-surface/90 px-3 py-2 border border-spectral-violet/10"
              >
                <span className="text-fog-dim">{field}</span>
                <span className="flex items-center gap-1 font-semibold text-phantom-cyan bg-surface-raised px-2 py-0.5 rounded border border-phantom-cyan/25 text-[10px]">
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
