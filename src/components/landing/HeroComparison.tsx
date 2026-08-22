"use client";

import React, { useState } from "react";
import { Shield, Lock, EyeOff, CheckCircle2, XCircle, Sparkles, ArrowRight, Zap, RefreshCw, Cpu, Layers } from "lucide-react";

export function HeroComparison() {
  const [activeStep, setActiveStep] = useState<"idle" | "proving" | "verified">("verified");
  const [selectedDemoClaim, setSelectedDemoClaim] = useState<"AGE" | "STUDENT" | "KYC">("AGE");

  const runHeroProof = () => {
    setActiveStep("proving");
    setTimeout(() => {
      setActiveStep("verified");
    }, 1200);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-surface-border bg-surface/90 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-ghost-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-midnight-cyan/15 blur-3xl pointer-events-none" />

      {/* Top Header & Claim Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
            <Sparkles className="h-3.5 w-3.5 text-midnight-cyan" />
            <span>Interactive Zero-Knowledge Demonstration</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
            Why Reveal Everything to Prove One Fact?
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Compare traditional identity disclosure with GhostID&apos;s zero-knowledge attestation.
          </p>
        </div>

        {/* Claim Selector & Trigger */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-surface-border bg-surface-lighter p-1">
            <button
              onClick={() => setSelectedDemoClaim("AGE")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedDemoClaim === "AGE" ? "bg-ghost-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Age &ge; 18
            </button>
            <button
              onClick={() => setSelectedDemoClaim("STUDENT")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedDemoClaim === "STUDENT" ? "bg-ghost-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Student Status
            </button>
            <button
              onClick={() => setSelectedDemoClaim("KYC")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedDemoClaim === "KYC" ? "bg-ghost-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              KYC Compliance
            </button>
          </div>

          <button
            onClick={runHeroProof}
            disabled={activeStep === "proving"}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan px-4 py-2 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            {activeStep === "proving" ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Computing Circuit...</span>
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5" />
                <span>Simulate ZK Proof</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Panels */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* LEFT: Traditional Verification */}
        <div className="relative rounded-2xl border border-rose-500/20 bg-gradient-to-b from-rose-950/20 to-surface-lighter/40 p-6">
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
              <XCircle className="h-5 w-5" />
              <span>TRADITIONAL VERIFICATION (UNSAFE)</span>
            </div>
            <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
              Full Data Exposure
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            User uploads raw ID. The third party server stores, inspects, and exposes all identity fields.
          </p>

          <div className="mt-5 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-rose-500/20">
              <span className="text-slate-400">Full Legal Name:</span>
              <span className="text-rose-300 font-semibold">Alex Rivera (EXPOSED)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-rose-500/20">
              <span className="text-slate-400">Exact Date of Birth:</span>
              <span className="text-rose-300 font-semibold">2004-06-12 (EXPOSED)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-rose-500/20">
              <span className="text-slate-400">National ID / Passport:</span>
              <span className="text-rose-300 font-semibold">IN-8921-9104 (EXPOSED)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-rose-500/20">
              <span className="text-slate-400">Residential Address:</span>
              <span className="text-rose-300 font-semibold">42 Skyline St, Metro (EXPOSED)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-rose-500/20">
              <span className="text-slate-400">Biometric / Photo ID:</span>
              <span className="text-rose-300 font-semibold">Stored on 3rd-party DB (HIGH RISK)</span>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-center">
            <span className="text-xs font-semibold text-rose-300">
              Privacy Risk: Severe Data Breach & Surveillance Vulnerability
            </span>
          </div>
        </div>

        {/* RIGHT: GhostID Zero-Knowledge Proof */}
        <div className="relative rounded-2xl border border-ghost-500/40 bg-gradient-to-b from-ghost-950/40 via-surface to-surface-lighter/60 p-6 shadow-glow-indigo">
          <div className="flex items-center justify-between border-b border-ghost-500/30 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-ghost-300">
              <Shield className="h-5 w-5 text-midnight-cyan" />
              <span>GHOSTID (MIDNIGHT ZERO-KNOWLEDGE)</span>
            </div>
            <span className="rounded bg-ghost-500/20 px-2 py-0.5 text-[10px] font-bold text-ghost-300">
              Selective Disclosure
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-300">
            Local Compact circuit proves the predicate without revealing personal identity credentials.
          </p>

          <div className="mt-5 space-y-2.5 font-mono text-xs">
            {/* The Disclosed Fact */}
            <div className="flex items-center justify-between rounded-lg bg-ghost-600/20 p-2.5 border border-ghost-500/40 shadow-sm">
              <span className="text-ghost-200 font-bold">
                {selectedDemoClaim === "AGE"
                  ? "Age >= 18:"
                  : selectedDemoClaim === "STUDENT"
                  ? "Student Status = Active:"
                  : "KYC Tier 1 Verified:"}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-midnight-emerald">
                <CheckCircle2 className="h-4 w-4" />
                <span>TRUE (VERIFIED)</span>
              </span>
            </div>

            {/* The Hidden Protected Fields */}
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-surface-border text-slate-400">
              <span>Full Legal Name:</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                <span className="text-slate-400 font-semibold">HIDDEN</span>
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-surface-border text-slate-400">
              <span>Exact Date of Birth:</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                <span className="text-slate-400 font-semibold">HIDDEN</span>
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-surface-border text-slate-400">
              <span>National ID / Passport:</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                <span className="text-slate-400 font-semibold">HIDDEN</span>
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface/90 p-2.5 border border-surface-border text-slate-400">
              <span>Residential Address:</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                <span className="text-slate-400 font-semibold">HIDDEN</span>
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-midnight-emerald/40 bg-midnight-emerald/10 p-3 text-center">
            <span className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-midnight-emerald" />
              <span>PROVED THE FACT. PROTECTED THE PERSON.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
