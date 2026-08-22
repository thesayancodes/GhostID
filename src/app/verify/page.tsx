"use client";

import React, { useState } from "react";
import { Shield, Sparkles, CheckCircle2, XCircle, Search, QrCode, ArrowRight, ExternalLink, Lock, EyeOff, ShieldCheck } from "lucide-react";
import { useMidnight } from "../../hooks/useMidnight";
import { midnightService } from "../../lib/midnight/midnightService";
import { VerificationResult, ZKProofPayload } from "../../lib/types";
import { DisclosureDiff } from "../../components/proof/DisclosureDiff";

export default function VerifierPortalPage() {
  const { networkConfig, isDemoMode } = useMidnight();

  const [inputProofId, setInputProofId] = useState("zkp_age_demo_99214");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleVerifyProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const mockPayload: ZKProofPayload = {
        proofId: inputProofId,
        requestId: "req_manual_" + Date.now(),
        timestamp: new Date().toISOString(),
        circuit: "verifyAgeProof",
        commitmentHash: "0x8fa402b8d910c2e3914a827b501c82e091b4",
        nullifierHash: "0xnull_918237198273918273",
        publicInputs: {
          minAge: 18,
          nonce: "0xnonce_verifier_gate_01",
          verified: true,
        },
        proofString: "zk-snark-midnight-compact-attestation-valid",
        mode: isDemoMode ? "SIMULATED_DEMO" : "REAL_MIDNIGHT",
        contractAddress: networkConfig.contractAddress,
        txHash: isDemoMode ? undefined : "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      };

      const res = await midnightService.verifyProof(mockPayload);
      setVerificationResult(res);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <ShieldCheck className="h-3.5 w-3.5 text-midnight-cyan" />
          <span>Verifier Gateway</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Ghost Verify</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Validate incoming zero-knowledge proofs against the Midnight blockchain ledger and revocation registry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
              Verify Proof Identifier
            </h3>

            <form onSubmit={handleVerifyProof} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Proof ID or Receipt Hash</label>
                <input
                  type="text"
                  value={inputProofId}
                  onChange={(e) => setInputProofId(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 font-mono text-white focus:border-ghost-500 focus:outline-none"
                  placeholder="zkp_..."
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Smart Contract</label>
                <div className="rounded-lg bg-surface-lighter p-2 font-mono text-[11px] text-slate-300 break-all">
                  {networkConfig.contractAddress.slice(0, 32)}...
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan py-3 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 active:scale-95 disabled:opacity-50"
              >
                <Search className="h-4 w-4" />
                <span>{isVerifying ? "Querying Midnight Ledger..." : "Verify Proof on Ledger"}</span>
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-surface-border bg-surface/60 p-5 text-xs text-slate-400 space-y-2">
            <div className="text-white font-semibold flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-ghost-400" />
              <span>Verifier Cryptographic Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Verifiers obtain mathematical certainty that the user meets the claim requirements without storing raw user identity documents.
            </p>
          </div>
        </div>

        {/* Verification Result Output */}
        <div className="lg:col-span-2 space-y-6">
          {verificationResult ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="rounded-2xl border border-midnight-emerald/40 bg-midnight-emerald/10 p-6 flex items-center justify-between shadow-glow-emerald">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-midnight-emerald text-black">
                    <CheckCircle2 className="h-7 w-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Cryptographic Proof Valid</h3>
                    <p className="text-xs text-emerald-300">
                      Verified on {verificationResult.mode === "REAL_MIDNIGHT" ? "Midnight Preprod" : "Demo Sandbox"}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-midnight-emerald/20 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
                  PASSED
                </span>
              </div>

              <DisclosureDiff
                appName="Verifier Gateway"
                disclosedClaims={verificationResult.disclosedFacts.map((df) => ({
                  label: df.claim,
                  value: df.result,
                  verified: df.verified,
                }))}
                hiddenFields={verificationResult.hiddenProtectedData}
                privacyScore={verificationResult.privacyScore}
                mode={verificationResult.mode}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-surface-border bg-surface p-12 text-center text-slate-400 space-y-3">
              <Shield className="mx-auto h-12 w-12 text-ghost-500/40" />
              <h3 className="text-base font-semibold text-white">Awaiting Proof Query</h3>
              <p className="text-xs max-w-sm mx-auto">
                Enter a proof ID or generate a proof from the Proof Center to inspect the selective disclosure breakdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
