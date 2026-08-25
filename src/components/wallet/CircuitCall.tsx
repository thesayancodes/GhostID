"use client";

import React, { useState } from "react";
import { useMidnight } from "../../hooks/useMidnight";
import { useGhostID } from "../../hooks/useGhostID";
import { Cpu, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Lock, EyeOff } from "lucide-react";
import { ProofProgressModal } from "../proof/ProofProgressModal";

interface CircuitCallProps {
  circuitName?: string;
  claimLabel?: string;
  onSuccess?: () => void;
}

export function CircuitCall({
  circuitName = "verifyAgeProof",
  claimLabel = "Age >= 18",
  onSuccess,
}: CircuitCallProps) {
  const { isConnected, isDemoMode, networkConfig } = useMidnight();
  const { credentials, generateProofForClaim, isGeneratingProof, currentStep, stepMessage, proofError } = useGhostID();
  const [executionResult, setExecutionResult] = useState<any | null>(null);

  const activeAgeCredential = credentials.find((c) => c.type === "AGE" && c.status === "ACTIVE") || credentials[0];

  const handleCallCircuit = async () => {
    if (!activeAgeCredential) return;

    const res = await generateProofForClaim(
      activeAgeCredential,
      "ageCalculated",
      ">=",
      18
    );

    if (res) {
      setExecutionResult(res);
      onSuccess?.();
    }
  };

  return (
    <div className="rounded-2xl border border-spectral-violet/25 bg-surface/90 p-6 sm:p-8 shadow-glass backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-spectral-violet/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-spectral-violet/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-spectral-violet border border-spectral-violet/30">
              Compact Circuit
            </span>
            <span className="font-mono text-xs text-fog-dim">contracts/ghostid.compact::{circuitName}</span>
          </div>
          <h3 className="mt-1 font-display text-xl font-bold text-fog">Interactive Zero-Knowledge Verification</h3>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-spectral-violet/20 bg-surface-raised px-3 py-1 text-xs">
          <div className="h-2 w-2 rounded-full bg-phantom-cyan shadow-[0_0_8px_rgba(94,234,212,0.5)]" />
          <span className="text-fog font-medium">Target: {networkConfig.name}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Private Witness State (Protected) */}
        <div className="rounded-xl border border-spectral-violet/15 bg-void/60 p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-fog">
            <div className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-spectral-violet" />
              <span>Private Off-Chain Witness</span>
            </div>
            <span className="rounded bg-surface-raised px-2 py-0.5 text-[10px] font-mono text-fog-dim border border-spectral-violet/20">
              Local Client Only
            </span>
          </div>
          <p className="mt-1 text-[11px] text-fog-dim leading-relaxed">
            Personal records are processed exclusively on your device. Never transmitted over the wire or stored on-chain.
          </p>

          <div className="mt-3 space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between rounded-lg bg-surface p-2.5 text-fog-dim border border-spectral-violet/10">
              <span>Date of Birth / Name:</span>
              <span className="flex items-center gap-1.5 text-phantom-cyan font-semibold">
                <EyeOff className="h-3.5 w-3.5" />
                <span>[DISSOLVED_WITNESS]</span>
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface p-2.5 text-fog-dim border border-spectral-violet/10">
              <span>Selected Credential:</span>
              <span className="text-fog font-sans font-medium">
                {activeAgeCredential ? activeAgeCredential.title : "No active credential"}
              </span>
            </div>
          </div>
        </div>

        {/* Public Disclosed Claim */}
        <div className="rounded-xl border border-spectral-violet/30 bg-spectral-violet/10 p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-fog">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-phantom-cyan" />
              <span>Public Verification Target</span>
            </div>
            <span className="rounded bg-phantom-cyan/20 px-2 py-0.5 text-[10px] font-mono font-bold text-phantom-cyan border border-phantom-cyan/30">
              Disclosed
            </span>
          </div>
          <p className="mt-1 text-[11px] text-fog-dim leading-relaxed">
            The verifier and smart contract receive strictly a cryptographic attestation of this predicate.
          </p>

          <div className="mt-3 rounded-lg border border-spectral-violet/30 bg-surface/90 p-3 text-center">
            <div className="text-[11px] uppercase tracking-wider text-fog-dim font-mono">Required Claim</div>
            <div className="mt-1 text-lg font-mono font-bold text-fog">{claimLabel}</div>
            <div className="mt-1 text-[10px] font-semibold text-phantom-cyan flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Proved without revealing your input</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-xs text-fog-dim font-mono">
          Contract: <code className="text-fog font-bold">{networkConfig.contractAddress.slice(0, 18)}...</code>
        </div>

        <button
          onClick={handleCallCircuit}
          disabled={isGeneratingProof || !activeAgeCredential}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-spectral-violet px-6 py-2.5 text-sm font-bold text-white shadow-glow-spectral transition-all hover:bg-spectral-violet/90 active:scale-[0.98] disabled:opacity-50"
        >
          <Cpu className="h-4 w-4" />
          <span>{isGeneratingProof ? "Executing ZK Circuit..." : "Generate Proof & Call Circuit"}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Execution Result Box */}
      {executionResult && (
        <div className="mt-5 rounded-xl border border-phantom-cyan/35 bg-phantom-cyan/10 p-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-phantom-cyan text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>Circuit Execution &amp; Verification Succeeded</span>
            </div>
            <span className="rounded-full bg-phantom-cyan/20 px-2.5 py-0.5 text-[11px] font-medium text-phantom-cyan border border-phantom-cyan/30">
              {executionResult.result.mode === "REAL_MIDNIGHT" ? "Verified on Midnight" : "Demo sandbox verified"}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
            <div className="rounded-lg bg-surface/90 p-2.5 border border-spectral-violet/15">
              <span className="text-fog-dim block text-[10px]">PROOF ID</span>
              <span className="text-fog">{executionResult.proof.proofId}</span>
            </div>
            <div className="rounded-lg bg-surface/90 p-2.5 border border-spectral-violet/15">
              <span className="text-fog-dim block text-[10px]">NULLIFIER HASH</span>
              <span className="text-fog">{executionResult.proof.nullifierHash.slice(0, 16)}...</span>
            </div>
            <div className="rounded-lg bg-surface/90 p-2.5 border border-spectral-violet/15">
              <span className="text-fog-dim block text-[10px]">DISCLOSED CLAIM</span>
              <span className="text-phantom-cyan font-bold">Age &gt;= 18: TRUE</span>
            </div>
          </div>
        </div>
      )}

      {/* Proof Progress Modal */}
      <ProofProgressModal
        isOpen={isGeneratingProof}
        currentStep={currentStep}
        stepMessage={stepMessage}
        error={proofError}
      />
    </div>
  );
}
