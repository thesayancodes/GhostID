"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Sparkles, QrCode, Link as LinkIcon, Plus, ArrowRight, CheckCircle2, Copy, ExternalLink, Calendar } from "lucide-react";
import { useGhostStore } from "../../lib/store/ghostStore";
import { VerificationRequest, CredentialType } from "../../lib/types";

export default function VerificationRequestsPage() {
  const { activeRequests, createVerificationRequest } = useGhostStore();

  const [verifierName, setVerifierName] = useState("Midnight DeFi Exchange");
  const [purpose, setPurpose] = useState("Account Registration & AML Eligibility");
  const [reqType, setReqType] = useState<CredentialType>("AGE");
  const [createdReq, setCreatedReq] = useState<VerificationRequest | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();

    let requiredClaims = [
      {
        credentialType: reqType,
        claimKey: reqType === "AGE" ? "ageCalculated" : reqType === "STUDENT" ? "isStudentActive" : "kycTier",
        description: reqType === "AGE" ? "Age >= 18" : reqType === "STUDENT" ? "Student = Active" : "KYC Tier >= 1",
        predicate: reqType === "AGE" ? (">=" as const) : reqType === "STUDENT" ? ("==" as const) : (">=" as const),
        requiredValue: reqType === "AGE" ? 18 : reqType === "STUDENT" ? "true" : 1,
      },
    ];

    const req = createVerificationRequest({
      verifierName,
      purpose,
      requiredClaims,
      unnecessaryFieldsNotRequested: [
        "Full Legal Name",
        "Exact Date of Birth",
        "Physical Home Address",
        "National ID / Passport Number",
      ],
      privacyScore: 94,
    });

    setCreatedReq(req);
  };

  const copyDeepLink = (id: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/requests/${id}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <QrCode className="h-3.5 w-3.5" />
          <span>Verifier Challenge Generator</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Verification Requests</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Create QR codes, deep links, and cryptographic proof challenges for users to satisfy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Request Creation Form */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
              Create Proof Request
            </h3>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Verifier / App Name</label>
                <input
                  type="text"
                  value={verifierName}
                  onChange={(e) => setVerifierName(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Verification Purpose</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Required Attestation</label>
                <select
                  value={reqType}
                  onChange={(e) => setReqType(e.target.value as CredentialType)}
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 text-white"
                >
                  <option value="AGE">Age &ge; 18 (Adult Verification)</option>
                  <option value="STUDENT">Active Student Status</option>
                  <option value="KYC">KYC Tier 1 Compliance</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan py-3 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 transition-all"
              >
                Generate Challenge & QR
              </button>
            </form>
          </div>
        </div>

        {/* Right: Active / Generated Requests */}
        <div className="lg:col-span-2 space-y-6">
          {createdReq && (
            <div className="rounded-2xl border border-midnight-cyan/40 bg-midnight-cyan/5 p-6 shadow-glow-cyan">
              <div className="flex items-center justify-between border-b border-midnight-cyan/20 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-midnight-cyan">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Challenge Created Successfully</span>
                </div>
                <span className="font-mono text-xs text-slate-400">ID: {createdReq.id}</span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="rounded-xl bg-surface/80 p-4 border border-surface-border space-y-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">APPLICATION</span>
                    <span className="text-white font-bold">{createdReq.verifierName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PURPOSE</span>
                    <span className="text-slate-300 font-sans text-[11px]">{createdReq.purpose}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">REQUIRED CLAIM</span>
                    <span className="text-emerald-400 font-bold">{createdReq.requiredClaims[0]?.description}</span>
                  </div>
                </div>

                {/* Simulated QR Visualizer */}
                <div className="flex flex-col items-center justify-center rounded-xl bg-surface/80 p-4 border border-surface-border text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-white p-2">
                    <QrCode className="h-20 w-20 text-black" />
                  </div>
                  <span className="mt-2 text-[10px] text-slate-400">Scan with Ghost Wallet</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  onClick={() => copyDeepLink(createdReq.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copiedLink ? "Link Copied!" : "Copy Deep Link"}</span>
                </button>

                <Link
                  href={`/requests/${createdReq.id}`}
                  className="flex items-center gap-1.5 rounded-lg bg-ghost-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-ghost-500 shadow-sm"
                >
                  <span>Open User Consent Screen</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* List of Existing Active Requests */}
          <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
              Active Verification Requests ({activeRequests.length})
            </h3>

            <div className="divide-y divide-surface-border">
              {activeRequests.map((req) => (
                <div key={req.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3.5 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{req.verifierName}</span>
                      <span className="rounded bg-ghost-600/20 px-1.5 py-0.5 text-[10px] font-mono text-ghost-300">
                        {req.requiredClaims[0]?.description}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{req.purpose}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyDeepLink(req.id)}
                      className="rounded-lg bg-surface-lighter p-1.5 text-slate-400 hover:text-white"
                      title="Copy Link"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <Link
                      href={`/requests/${req.id}`}
                      className="flex items-center gap-1 rounded-lg bg-ghost-600/20 border border-ghost-500/30 px-3 py-1 text-xs font-semibold text-ghost-200 hover:bg-ghost-600/40"
                    >
                      <span>Simulate User Flow</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
