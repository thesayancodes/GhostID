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
    <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-ghost-600/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-ghost-300">
              Compact Circuit
            </span>
            <span className="font-mono text-xs text-slate-400">contracts/ghostid.compact::{circuitName}</span>
          </div>
          <h3 className="mt-1 text-lg font-bold text-white">Interactive Zero-Knowledge Verification</h3>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-surface-border bg-surface-lighter px-3 py-1 text-xs">
          <div className="h-2 w-2 rounded-full bg-midnight-cyan shadow-glow-cyan" />
          <span className="text-slate-300">Target: {networkConfig.name}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Private Witness State (Protected) */}
        <div className="rounded-xl border border-surface-border bg-surface-lighter/50 p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-ghost-400" />
              <span>Private Off-Chain Witness</span>
            </div>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">Local Only</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Personal records are processed exclusively on your device. Never transmitted over the wire or stored on-chain.
          </p>

          <div className="mt-3 space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between rounded-lg bg-surface p-2 text-slate-400">
              <span>Date of Birth / Name:</span>
              <span className="flex items-center gap-1 text-slate-500">
                <EyeOff className="h-3.5 w-3.5" />
                <span>[HIDDEN_WITNESS]</span>
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface p-2 text-slate-400">
              <span>Selected Credential:</span>
              <span className="text-ghost-300 font-sans font-medium">
                {activeAgeCredential ? activeAgeCredential.title : "No active credential"}
              </span>
            </div>
          </div>
        </div>

        {/* Public Disclosed Claim */}
        <div className="rounded-xl border border-ghost-500/20 bg-ghost-900/10 p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-ghost-300">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-midnight-cyan" />
              <span>Public Verification Target</span>
            </div>
            <span className="rounded bg-ghost-500/20 px-1.5 py-0.5 text-[10px] text-ghost-300">Disclosed</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            The verifier and smart contract receive strictly a cryptographic attestation of this predicate.
          </p>

          <div className="mt-3 rounded-lg border border-ghost-500/30 bg-surface p-3 text-center">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Required Claim</div>
            <div className="mt-1 text-lg font-mono font-bold text-ghost-200">{claimLabel}</div>
            <div className="mt-1 text-[10px] font-medium text-midnight-emerald flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Proved without revealing your input</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-400">
          Contract: <code className="font-mono text-slate-300">{networkConfig.contractAddress.slice(0, 18)}...</code>
        </div>

        <button
          onClick={handleCallCircuit}
          disabled={isGeneratingProof || !activeAgeCredential}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan px-6 py-2.5 text-sm font-bold text-white shadow-glow-indigo transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          <Cpu className="h-4 w-4" />
          <span>{isGeneratingProof ? "Executing ZK Circuit..." : "Generate Proof & Call Circuit"}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Execution Result Box */}
      {executionResult && (
        <div className="mt-5 rounded-xl border border-midnight-emerald/30 bg-midnight-emerald/5 p-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-emerald-400 text-sm">
              <CheckCircle2 className="h-4 w-4" />
              <span>Circuit Execution & Verification Succeeded</span>
            </div>
            <span className="rounded-full bg-midnight-emerald/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
              {executionResult.result.mode === "REAL_MIDNIGHT" ? "Verified on Midnight" : "Demo verification"}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
            <div className="rounded-lg bg-surface/80 p-2 border border-surface-border">
              <span className="text-slate-400 block text-[10px]">PROOF ID</span>
              <span className="text-slate-200">{executionResult.proof.proofId}</span>
            </div>
            <div className="rounded-lg bg-surface/80 p-2 border border-surface-border">
              <span className="text-slate-400 block text-[10px]">NULLIFIER HASH</span>
              <span className="text-slate-200">{executionResult.proof.nullifierHash.slice(0, 16)}...</span>
            </div>
            <div className="rounded-lg bg-surface/80 p-2 border border-surface-border">
              <span className="text-slate-400 block text-[10px]">DISCLOSED CLAIM</span>
              <span className="text-emerald-400 font-bold">Age &gt;= 18: TRUE</span>
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
