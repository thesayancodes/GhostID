"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, EyeOff, CheckCircle2, XCircle, Sparkles, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import { useGhostStore } from "../../../lib/store/ghostStore";
import { useGhostID } from "../../../hooks/useGhostID";
import { ProofProgressModal } from "../../../components/proof/ProofProgressModal";
import { DisclosureDiff } from "../../../components/proof/DisclosureDiff";

export default function RequestConsentPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params?.id as string;

  const { activeRequests } = useGhostStore();
  const { credentials, generateProofForClaim, isGeneratingProof, currentStep, stepMessage, proofError } = useGhostID();

  const [consentApproved, setConsentApproved] = useState(false);
  const [consentRejected, setConsentRejected] = useState(false);
  const [completedResult, setCompletedResult] = useState<any | null>(null);

  // Find request or fallback to demo request
  const request = activeRequests.find((r) => r.id === requestId) || activeRequests[0] || {
    id: "req_demo_age_18",
    verifierName: "Midnight DeFi Gateway",
    verifierAddress: "mn_verifier_0x918237918237",
    purpose: "Account Registration & Regulatory AML Compliance",
    requiredClaims: [
      {
        credentialType: "AGE",
        claimKey: "ageCalculated",
        description: "Must be at least 18 years old",
        predicate: ">=",
        requiredValue: 18,
      },
    ],
    unnecessaryFieldsNotRequested: [
      "Full Legal Name",
      "Exact Date of Birth",
      "Home Address",
      "National ID / Passport Number",
    ],
    privacyScore: 94,
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    nonce: "0xnonce_defi_918237",
    createdAt: new Date().toISOString(),
  };

  const handleApprove = async () => {
    const targetType = request.requiredClaims[0]?.credentialType || "AGE";
    const matchingCred = credentials.find((c) => c.type === targetType) || credentials[0];

    if (!matchingCred) {
      alert("No matching credential found in your private vault. Please add one first.");
      return;
    }

    const res = await generateProofForClaim(
      matchingCred,
      request.requiredClaims[0]?.claimKey || "ageCalculated",
      request.requiredClaims[0]?.predicate || ">=",
      request.requiredClaims[0]?.requiredValue || 18,
      request.nonce
    );

    if (res) {
      setCompletedResult(res);
      setConsentApproved(true);
    }
  };

  const handleReject = () => {
    setConsentRejected(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <ShieldCheck className="h-3.5 w-3.5 text-midnight-cyan" />
          <span>Zero-Knowledge Verification Request</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Identity Consent Screen</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Review what information is requested before generating a cryptographic attestation.
        </p>
      </div>

      {consentRejected ? (
        <div className="rounded-2xl border border-rose-500/30 bg-surface p-8 text-center shadow-glass space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
            <XCircle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Verification Request Rejected</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You declined to generate a proof for {request.verifierName}. No data or proofs were disclosed.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-surface-lighter px-5 py-2 text-xs font-semibold text-white hover:bg-surface-hover"
            >
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </div>
      ) : consentApproved && completedResult ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-midnight-emerald/40 bg-midnight-emerald/10 p-6 text-center shadow-glow-emerald">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-midnight-emerald text-black">
              <CheckCircle2 className="h-7 w-7 stroke-[2.5]" />
            </div>
            <h2 className="mt-3 text-xl font-bold text-white">Proof Disclosed Successfully</h2>
            <p className="text-xs text-emerald-300 mt-1">
              {request.verifierName} received only the verified claim. All other personal data remained hidden.
            </p>
          </div>

          <DisclosureDiff
            appName={request.verifierName}
            disclosedClaims={completedResult.result.disclosedFacts.map((df: any) => ({
              label: df.claim,
              value: df.result,
              verified: df.verified,
            }))}
            hiddenFields={completedResult.result.hiddenProtectedData}
            privacyScore={request.privacyScore}
            mode={completedResult.proof.mode}
          />

          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-xl bg-ghost-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-ghost-500 shadow-sm"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/activity"
              className="rounded-xl border border-surface-border bg-surface px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
            >
              View in Activity Log
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-surface-border bg-surface p-6 sm:p-8 shadow-glass space-y-6">
          {/* Header Request Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Requesting Application</div>
              <h2 className="text-xl font-bold text-white">{request.verifierName}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{request.purpose}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Privacy Rating</div>
                <div className="text-lg font-mono font-bold text-midnight-cyan">{request.privacyScore}/100</div>
              </div>
            </div>
          </div>

          {/* Side by side: Requested Claims vs What Stays Private */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Disclosed / Requested */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>REQUESTED CLAIM</span>
                </div>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  Will Disclose
                </span>
              </div>

              <div className="space-y-2">
                {request.requiredClaims.map((claim, idx) => (
                  <div key={idx} className="rounded-lg bg-surface p-3 border border-emerald-500/20">
                    <div className="text-xs font-bold text-white">{claim.description}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Type: {claim.credentialType} ({claim.predicate} {claim.requiredValue})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kept 100% Private */}
            <div className="rounded-xl border border-surface-border bg-surface-lighter/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <EyeOff className="h-4 w-4 text-ghost-400" />
                  <span>NOT REQUESTED / PROTECTED</span>
                </div>
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
                  Zero Disclosure
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400">
                {request.unnecessaryFieldsNotRequested.map((field, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg bg-surface/80 px-2.5 py-1.5 border border-surface-border">
                    <span>{field}</span>
                    <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      <span>PROTECTED</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-surface-border flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={handleReject}
              disabled={isGeneratingProof}
              className="w-full sm:w-auto rounded-xl border border-surface-border bg-surface px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
            >
              Reject Request
            </button>

            <button
              onClick={handleApprove}
              disabled={isGeneratingProof}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan px-7 py-2.5 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isGeneratingProof ? "Generating ZK Proof..." : "Approve & Generate Proof"}</span>
            </button>
          </div>
        </div>
      )}

      <ProofProgressModal
        isOpen={isGeneratingProof}
        currentStep={currentStep}
        stepMessage={stepMessage}
        error={proofError}
      />
    </div>
  );
}
