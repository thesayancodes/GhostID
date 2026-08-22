"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Shield, Sparkles, CheckCircle2, ArrowRight, Lock, EyeOff, Cpu, RefreshCw } from "lucide-react";
import { useGhostID } from "../../hooks/useGhostID";
import { DisclosureDiff } from "../../components/proof/DisclosureDiff";
import { ProofProgressModal } from "../../components/proof/ProofProgressModal";

function ProofCenterContent() {
  const searchParams = useSearchParams();
  const preselectedCredId = searchParams?.get("credId");

  const { credentials, generateProofForClaim, isGeneratingProof, currentStep, stepMessage, proofError } = useGhostID();

  const [selectedCredId, setSelectedCredId] = useState<string>(preselectedCredId || credentials[0]?.id || "");
  const [selectedClaimKey, setSelectedClaimKey] = useState<string>("ageCalculated");
  const [predicate, setPredicate] = useState<">=" | "==" | "<=" | "truthy">(">=");
  const [targetValue, setTargetValue] = useState<string | number>("18");
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);

  const activeCred = credentials.find((c) => c.id === selectedCredId) || credentials[0];

  // Auto-adjust claim options when credential changes
  const handleCredentialChange = (id: string) => {
    setSelectedCredId(id);
    const cred = credentials.find((c) => c.id === id);
    if (!cred) return;

    if (cred.type === "AGE") {
      setSelectedClaimKey("ageCalculated");
      setPredicate(">=");
      setTargetValue(18);
    } else if (cred.type === "STUDENT") {
      setSelectedClaimKey("isStudentActive");
      setPredicate("==");
      setTargetValue("true");
    } else if (cred.type === "KYC") {
      setSelectedClaimKey("kycTier");
      setPredicate(">=");
      setTargetValue(1);
    }
  };

  const handleGenerateProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCred) return;

    const res = await generateProofForClaim(
      activeCred,
      selectedClaimKey,
      predicate,
      targetValue
    );

    if (res) {
      setGeneratedResult(res);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <Cpu className="h-3.5 w-3.5" />
          <span>Midnight Zero-Knowledge Engine</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Ghost Proof Center</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Generate cryptographic zero-knowledge attestations for specific predicates without revealing underlying personal data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: Select Credential & Claim */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-glass">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">1. Choose Credential</h3>

            <div className="space-y-2">
              {credentials.map((cred) => {
                const isSelected = cred.id === selectedCredId;
                return (
                  <button
                    key={cred.id}
                    type="button"
                    onClick={() => handleCredentialChange(cred.id)}
                    className={`flex w-full flex-col rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-ghost-500 bg-ghost-600/20 text-white shadow-glow-indigo"
                        : "border-surface-border bg-surface-lighter text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{cred.title}</span>
                      <span className="font-mono text-[10px] text-ghost-300">{cred.type}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1">{cred.issuerName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Claim Predicate Config */}
          {activeCred && (
            <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-glass space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Configure Claim</h3>

              {activeCred.type === "AGE" && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Age Requirement</label>
                    <select
                      value={targetValue}
                      onChange={(e) => setTargetValue(parseInt(e.target.value, 10))}
                      className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 text-white"
                    >
                      <option value={18}>Age &ge; 18 (Adult Services)</option>
                      <option value={21}>Age &ge; 21 (Regulated Venues / Gaming)</option>
                      <option value={25}>Age &ge; 25 (Car Rental / Insurance)</option>
                      <option value={60}>Age &ge; 60 (Senior Benefits)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeCred.type === "STUDENT" && (
                <div className="space-y-3 text-xs">
                  <div className="rounded-lg bg-surface-lighter p-3">
                    <span className="text-slate-400 block text-[10px]">VERIFIED CLAIM</span>
                    <span className="text-white font-semibold">Active Enrollment = TRUE</span>
                  </div>
                </div>
              )}

              {activeCred.type === "KYC" && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Required KYC Tier</label>
                    <select
                      value={targetValue}
                      onChange={(e) => setTargetValue(parseInt(e.target.value, 10))}
                      className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 text-white"
                    >
                      <option value={1}>Tier 1 (AML & Identity)</option>
                      <option value={2}>Tier 2 (Enhanced Due Diligence)</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerateProof}
                disabled={isGeneratingProof || activeCred.status === "REVOKED"}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan py-3 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isGeneratingProof ? "Building Proof..." : "Generate & Verify Proof"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Area: Selective Disclosure Preview & Result */}
        <div className="lg:col-span-2 space-y-6">
          {activeCred && (
            <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
                Selective Disclosure Preview
              </h3>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>PUBLICLY DISCLOSED</span>
                  </div>
                  <div className="text-white font-bold">
                    {activeCred.type === "AGE"
                      ? `Age >= ${targetValue}: TRUE`
                      : activeCred.type === "STUDENT"
                      ? "Student Status = Active: TRUE"
                      : `KYC Tier >= ${targetValue}: TRUE`}
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">
                    Computed via zero-knowledge proof without revealing underlying dates or IDs.
                  </p>
                </div>

                <div className="rounded-xl border border-surface-border bg-surface-lighter/50 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                    <EyeOff className="h-4 w-4 text-ghost-400" />
                    <span>KEPT 100% PRIVATE</span>
                  </div>
                  <div className="text-slate-300 space-y-1 text-[11px]">
                    <div>&bull; Name: [HIDDEN]</div>
                    <div>&bull; Date of Birth: [HIDDEN]</div>
                    <div>&bull; National ID / Passport: [HIDDEN]</div>
                    <div>&bull; Street Address: [HIDDEN]</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generated Result Output */}
          {generatedResult && (
            <DisclosureDiff
              appName="Ghost Proof Verification Engine"
              disclosedClaims={generatedResult.result.disclosedFacts.map((df: any) => ({
                label: df.claim,
                value: df.result,
                verified: df.verified,
              }))}
              hiddenFields={generatedResult.result.hiddenProtectedData}
              privacyScore={generatedResult.result.privacyScore}
              mode={generatedResult.proof.mode}
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

export default function ProofCenterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading Proof Center...</div>}>
      <ProofCenterContent />
    </Suspense>
  );
}
