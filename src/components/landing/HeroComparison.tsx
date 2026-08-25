"use client";

import React, { useState } from "react";
import { Shield, Lock, EyeOff, CheckCircle2, XCircle, Sparkles, ArrowRight, Zap, RefreshCw, Cpu, AlertTriangle, Fingerprint } from "lucide-react";
import { ParticleResolve } from "../proof/ParticleResolve";

export function HeroComparison() {
  const [activeStep, setActiveStep] = useState<"idle" | "dissolving" | "resolving" | "verified">("verified");
  const [selectedDemoClaim, setSelectedDemoClaim] = useState<"AGE" | "STUDENT" | "KYC">("AGE");
  const [isGlitching, setIsGlitching] = useState(false);

  const runHeroProof = () => {
    setActiveStep("dissolving");
    setIsGlitching(true);

    setTimeout(() => {
      setActiveStep("resolving");
    }, 450);

    setTimeout(() => {
      setActiveStep("verified");
      setIsGlitching(false);
    }, 1100);
  };

  const handleClaimChange = (claim: "AGE" | "STUDENT" | "KYC") => {
    setSelectedDemoClaim(claim);
    runHeroProof();
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-spectral-violet/25 bg-surface/90 p-6 sm:p-8 lg:p-10 shadow-glass backdrop-blur-2xl transition-all">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-spectral-violet/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-phantom-cyan/10 blur-[100px] pointer-events-none" />

      {/* Top Header & Claim Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-spectral-violet/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-spectral-violet/30 bg-spectral-violet/10 px-3.5 py-1 text-xs font-semibold text-spectral-violet shadow-[0_0_15px_rgba(124,111,242,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-phantom-cyan" />
            <span className="tracking-wide">Interactive Spectral Proof Simulation</span>
          </div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-fog tracking-tight">
            Why Reveal Everything to Prove One Fact?
          </h2>
          <p className="mt-1 text-sm text-fog-dim max-w-xl">
            Watch raw personal records dissolve into private witness commitments while only the verified truth resolves.
          </p>
        </div>

        {/* Claim Selector & Trigger */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex rounded-xl border border-spectral-violet/20 bg-void/60 p-1">
            <button
              onClick={() => handleClaimChange("AGE")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedDemoClaim === "AGE"
                  ? "bg-spectral-violet text-white shadow-[0_0_15px_rgba(124,111,242,0.4)]"
                  : "text-fog-dim hover:text-fog"
              }`}
            >
              Age &ge; 18
            </button>
            <button
              onClick={() => handleClaimChange("STUDENT")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedDemoClaim === "STUDENT"
                  ? "bg-spectral-violet text-white shadow-[0_0_15px_rgba(124,111,242,0.4)]"
                  : "text-fog-dim hover:text-fog"
              }`}
            >
              Student Status
            </button>
            <button
              onClick={() => handleClaimChange("KYC")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedDemoClaim === "KYC"
                  ? "bg-spectral-violet text-white shadow-[0_0_15px_rgba(124,111,242,0.4)]"
                  : "text-fog-dim hover:text-fog"
              }`}
            >
              KYC Tier 1
            </button>
          </div>

          <button
            onClick={runHeroProof}
            disabled={activeStep === "dissolving" || activeStep === "resolving"}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-spectral-violet to-phantom-cyan px-4 py-2 text-xs font-bold text-void shadow-glow-spectral hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
          >
            {activeStep === "dissolving" || activeStep === "resolving" ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-void" />
                <span className="text-void font-bold">Proving Circuit...</span>
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 text-void fill-void" />
                <span className="text-void font-bold">Dissolve &amp; Prove</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Panels */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* ========================================================================= */}
        {/* LEFT: Traditional Verification (UNSAFE / DATA LEAK) */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl border border-danger-glitch/35 bg-gradient-to-b from-danger-glitch/10 via-surface to-surface p-6 overflow-hidden">
          {/* Subtle warning backdrop line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-danger-glitch to-transparent opacity-70" />

          <div className="flex items-center justify-between border-b border-danger-glitch/20 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-danger-glitch">
              <XCircle className="h-5 w-5 shrink-0" />
              <span className="tracking-wide">TRADITIONAL VERIFICATION (UNSAFE)</span>
            </div>
            <span className="rounded bg-danger-glitch/20 px-2 py-0.5 text-[10px] font-mono font-bold text-danger-glitch border border-danger-glitch/30 animate-pulse">
              DATA LEAKAGE
            </span>
          </div>

          <p className="mt-3 text-xs text-fog-dim leading-relaxed">
            Centralized servers demand the full unredacted document, exposing private records to interception, breaches, and perpetual surveillance.
          </p>

          <div className="mt-5 space-y-2.5 font-mono text-xs">
            {/* Leaking Field 1 */}
            <div className="relative flex items-center justify-between rounded-lg bg-void/80 p-3 border border-danger-glitch/30 overflow-hidden">
              <div className="flex items-center gap-2 text-fog-dim">
                <Fingerprint className="h-3.5 w-3.5 text-danger-glitch/70" />
                <span>Full Legal Name:</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-danger-glitch">
                <span className={isGlitching ? "animate-data-leak" : ""}>Alex Rivera</span>
                <span className="text-[10px] uppercase font-bold bg-danger-glitch/25 px-1.5 py-0.5 rounded text-danger-glitch">
                  EXPOSED
                </span>
              </div>
            </div>

            {/* Leaking Field 2 */}
            <div className="relative flex items-center justify-between rounded-lg bg-void/80 p-3 border border-danger-glitch/30 overflow-hidden">
              <div className="flex items-center gap-2 text-fog-dim">
                <Fingerprint className="h-3.5 w-3.5 text-danger-glitch/70" />
                <span>Exact Date of Birth:</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-danger-glitch">
                <span className={isGlitching ? "animate-data-leak" : ""}>2004-06-12</span>
                <span className="text-[10px] uppercase font-bold bg-danger-glitch/25 px-1.5 py-0.5 rounded text-danger-glitch">
                  EXPOSED
                </span>
              </div>
            </div>

            {/* Leaking Field 3 */}
            <div className="relative flex items-center justify-between rounded-lg bg-void/80 p-3 border border-danger-glitch/30 overflow-hidden">
              <div className="flex items-center gap-2 text-fog-dim">
                <Fingerprint className="h-3.5 w-3.5 text-danger-glitch/70" />
                <span>Government ID / SSN:</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-danger-glitch">
                <span className={isGlitching ? "animate-data-leak" : ""}>IN-8921-9104</span>
                <span className="text-[10px] uppercase font-bold bg-danger-glitch/25 px-1.5 py-0.5 rounded text-danger-glitch">
                  EXPOSED
                </span>
              </div>
            </div>

            {/* Leaking Field 4 */}
            <div className="relative flex items-center justify-between rounded-lg bg-void/80 p-3 border border-danger-glitch/30 overflow-hidden">
              <div className="flex items-center gap-2 text-fog-dim">
                <Fingerprint className="h-3.5 w-3.5 text-danger-glitch/70" />
                <span>Physical Home Address:</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-danger-glitch">
                <span className={isGlitching ? "animate-data-leak" : ""}>42 Skyline St, Metro</span>
                <span className="text-[10px] uppercase font-bold bg-danger-glitch/25 px-1.5 py-0.5 rounded text-danger-glitch">
                  EXPOSED
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-danger-glitch/30 bg-danger-glitch/10 p-3 text-center">
            <span className="text-xs font-semibold text-danger-glitch flex items-center justify-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Vulnerability: 100% Data Breach &amp; Identity Theft Risk</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: GhostID Zero-Knowledge Proof (SPECTRAL RESOLVE) */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl border border-spectral-violet/40 bg-gradient-to-b from-spectral-violet/10 via-surface to-surface-raised p-6 shadow-glow-spectral overflow-hidden">
          {/* Top highlight beam */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-spectral-violet to-transparent opacity-80" />

          <div className="flex items-center justify-between border-b border-spectral-violet/25 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-fog">
              <Shield className="h-5 w-5 text-phantom-cyan" />
              <span className="font-display tracking-wide">GHOSTID (SPECTRAL ZK PROOF)</span>
            </div>
            <span className="rounded bg-phantom-cyan/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-phantom-cyan border border-phantom-cyan/30">
              ZERO RAW DATA
            </span>
          </div>

          <p className="mt-3 text-xs text-fog-dim leading-relaxed">
            Midnight Compact circuit evaluates the mathematical constraint locally in client memory. Raw data dissolves; only the attestation is published.
          </p>

          <div className="mt-5 space-y-2.5 font-mono text-xs">
            {/* THE DISCLOSED HERO FACT (Glows & Pulses) */}
            <div className="relative flex items-center justify-between rounded-xl bg-surface-raised p-3.5 border border-spectral-violet animate-hero-proof-glow transition-all">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-phantom-cyan" />
                <span className="font-bold text-fog text-sm">
                  {selectedDemoClaim === "AGE"
                    ? "Age >= 18:"
                    : selectedDemoClaim === "STUDENT"
                    ? "Student Status = Active:"
                    : "KYC Tier 1 Compliance:"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-extrabold text-phantom-cyan bg-phantom-cyan/15 px-3 py-1 rounded-lg border border-phantom-cyan/40 shadow-[0_0_15px_rgba(94,234,212,0.3)]">
                <CheckCircle2 className="h-4 w-4 text-phantom-cyan" />
                <span>TRUE (VERIFIED)</span>
              </div>
            </div>

            {/* Hidden Field 1 */}
            <div className="flex items-center justify-between rounded-lg bg-void/70 p-3 border border-spectral-violet/15 text-fog-dim transition-all">
              <span className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-phantom-cyan/70" />
                <span>Full Legal Name:</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-phantom-cyan bg-surface px-2.5 py-0.5 rounded border border-phantom-cyan/25 animate-resolve-hidden">
                <EyeOff className="h-3 w-3 text-phantom-cyan" />
                <span className="tracking-wider text-[11px]">HIDDEN</span>
              </span>
            </div>

            {/* Hidden Field 2 */}
            <div className="flex items-center justify-between rounded-lg bg-void/70 p-3 border border-spectral-violet/15 text-fog-dim transition-all">
              <span className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-phantom-cyan/70" />
                <span>Exact Date of Birth:</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-phantom-cyan bg-surface px-2.5 py-0.5 rounded border border-phantom-cyan/25 animate-resolve-hidden">
                <EyeOff className="h-3 w-3 text-phantom-cyan" />
                <span className="tracking-wider text-[11px]">HIDDEN</span>
              </span>
            </div>

            {/* Hidden Field 3 */}
            <div className="flex items-center justify-between rounded-lg bg-void/70 p-3 border border-spectral-violet/15 text-fog-dim transition-all">
              <span className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-phantom-cyan/70" />
                <span>Government ID / SSN:</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-phantom-cyan bg-surface px-2.5 py-0.5 rounded border border-phantom-cyan/25 animate-resolve-hidden">
                <EyeOff className="h-3 w-3 text-phantom-cyan" />
                <span className="tracking-wider text-[11px]">HIDDEN</span>
              </span>
            </div>

            {/* Hidden Field 4 */}
            <div className="flex items-center justify-between rounded-lg bg-void/70 p-3 border border-spectral-violet/15 text-fog-dim transition-all">
              <span className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-phantom-cyan/70" />
                <span>Physical Home Address:</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-phantom-cyan bg-surface px-2.5 py-0.5 rounded border border-phantom-cyan/25 animate-resolve-hidden">
                <EyeOff className="h-3 w-3 text-phantom-cyan" />
                <span className="tracking-wider text-[11px]">HIDDEN</span>
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-phantom-cyan/30 bg-phantom-cyan/10 p-3 text-center">
            <span className="text-xs font-bold text-phantom-cyan flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-phantom-cyan" />
              <span className="tracking-wide">PROVED THE FACT &bull; DISSOLVED THE SENSITIVE DATA</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
