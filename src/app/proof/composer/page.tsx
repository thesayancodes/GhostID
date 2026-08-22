"use client";

import React, { useState } from "react";
import { Shield, Sparkles, Layers, CheckCircle2, Lock, EyeOff, Plus, ArrowRight, CheckSquare, Square } from "lucide-react";
import { useGhostID } from "../../../hooks/useGhostID";
import { DisclosureDiff } from "../../../components/proof/DisclosureDiff";
import { ProofProgressModal } from "../../../components/proof/ProofProgressModal";

export default function ProofComposerPage() {
  const { credentials, generateCompoundProof, isGeneratingProof, currentStep, stepMessage, proofError } = useGhostID();

  const [selectedAge, setSelectedAge] = useState(true);
  const [selectedKyc, setSelectedKyc] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(true);
  const [compoundResult, setCompoundResult] = useState<any | null>(null);

  const selectedCount = [selectedAge, selectedKyc, selectedStudent].filter(Boolean).length;

  const handleComposeProof = async () => {
    const activeCreds = [];
    const claims = [];

    if (selectedAge) {
      const ageCred = credentials.find((c) => c.type === "AGE");
      if (ageCred) activeCreds.push(ageCred);
      claims.push("Age >= 18");
    }

    if (selectedKyc) {
      const kycCred = credentials.find((c) => c.type === "KYC");
      if (kycCred) activeCreds.push(kycCred);
      claims.push("KYC Tier >= 1 Verified");
    }

    if (selectedStudent) {
      const studentCred = credentials.find((c) => c.type === "STUDENT");
      if (studentCred) activeCreds.push(studentCred);
      claims.push("University Student = Active");
    }

    const res = await generateCompoundProof(activeCreds, claims);
    if (res) {
      setCompoundResult(res);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-ghost-500/30 bg-gradient-to-r from-surface via-surface-lighter to-ghost-950/40 p-6 sm:p-8 shadow-glass">
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <Layers className="h-3.5 w-3.5" />
          <span>Ghost Proof Composer</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
          Combine Multiple Claims. Reveal Only The Result.
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl">
          Merge heterogeneous credentials (e.g. Age, KYC, and Student status) into a single unified Zero-Knowledge proof. The verifier receives a single cryptographic YES/NO attestation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Composer Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
              Select Proof Requirements
            </h3>

            {/* Checkbox 1: Age */}
            <button
              type="button"
              onClick={() => setSelectedAge(!selectedAge)}
              className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                selectedAge
                  ? "border-ghost-500 bg-ghost-600/20 text-white shadow-sm"
                  : "border-surface-border bg-surface-lighter text-slate-400"
              }`}
            >
              <div className="mt-0.5">
                {selectedAge ? <CheckSquare className="h-4 w-4 text-ghost-300" /> : <Square className="h-4 w-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">Age &ge; 18 Attestation</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Prove adult eligibility without date of birth</div>
              </div>
            </button>

            {/* Checkbox 2: KYC */}
            <button
              type="button"
              onClick={() => setSelectedKyc(!selectedKyc)}
              className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                selectedKyc
                  ? "border-ghost-500 bg-ghost-600/20 text-white shadow-sm"
                  : "border-surface-border bg-surface-lighter text-slate-400"
              }`}
            >
              <div className="mt-0.5">
                {selectedKyc ? <CheckSquare className="h-4 w-4 text-ghost-300" /> : <Square className="h-4 w-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">KYC Tier 1 Compliance</div>
                <div className="text-[10px] text-slate-400 mt-0.5">AML & Identity verified by registered bank</div>
              </div>
            </button>

            {/* Checkbox 3: Student */}
            <button
              type="button"
              onClick={() => setSelectedStudent(!selectedStudent)}
              className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                selectedStudent
                  ? "border-ghost-500 bg-ghost-600/20 text-white shadow-sm"
                  : "border-surface-border bg-surface-lighter text-slate-400"
              }`}
            >
              <div className="mt-0.5">
                {selectedStudent ? <CheckSquare className="h-4 w-4 text-ghost-300" /> : <Square className="h-4 w-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">Active Student Status</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Degree program enrollment verification</div>
              </div>
            </button>

            <div className="pt-2">
              <div className="rounded-lg bg-surface-lighter p-3 text-center text-xs font-mono">
                <span className="text-slate-400">{selectedCount} requirements selected</span>
                <div className="mt-1 font-bold text-midnight-cyan">&rarr; 1 Single ZK Proof Generated</div>
              </div>
            </div>

            <button
              onClick={handleComposeProof}
              disabled={selectedCount === 0 || isGeneratingProof}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan py-3 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isGeneratingProof ? "Synthesizing Circuit..." : "Generate Compound Proof"}</span>
            </button>
          </div>
        </div>

        {/* Right Output Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
              Mathematical Circuit Synthesis
            </h3>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              When you combine requirements, GhostID compiles a compound circuit:
            </p>

            <div className="mt-4 rounded-xl border border-ghost-500/20 bg-ghost-950/30 p-4 font-mono text-xs text-ghost-200">
              <code>
                circuit compound_verification(witness_1, witness_2, witness_3) &#123; <br />
                &nbsp;&nbsp;assert(witness_1.age &gt;= 18); <br />
                &nbsp;&nbsp;assert(witness_2.kyc_tier &gt;= 1); <br />
                &nbsp;&nbsp;assert(witness_3.is_student == true); <br />
                &nbsp;&nbsp;return disclose(true); <br />
                &#125;
              </code>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="rounded-lg bg-surface-lighter p-3 border border-surface-border">
                <span className="text-slate-400 block text-[10px]">TOTAL DISCLOSED FIELDS</span>
                <span className="text-emerald-400 font-bold">1 Boolean Result</span>
              </div>
              <div className="rounded-lg bg-surface-lighter p-3 border border-surface-border">
                <span className="text-slate-400 block text-[10px]">PROTECTED SENSITIVE FIELDS</span>
                <span className="text-rose-400 font-bold">100% Isolated</span>
              </div>
            </div>
          </div>

          {compoundResult && (
            <DisclosureDiff
              appName="Compound Verification Gateway"
              disclosedClaims={compoundResult.result.disclosedFacts.map((df: any) => ({
                label: df.claim,
                value: df.result,
                verified: df.verified,
              }))}
              hiddenFields={compoundResult.result.hiddenProtectedData}
              privacyScore={compoundResult.result.privacyScore}
              mode={compoundResult.proof.mode}
            />
          )}
        </div>
      </div>

      <ProofProgressModal
        isOpen={isGeneratingProof}
        currentStep={currentStep}
        stepMessage={stepMessage}
        error={proofError}
      />
    </div>
  );
}
