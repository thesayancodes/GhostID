"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Plus, Lock, CheckCircle2, XCircle, Sparkles, Trash2, ArrowRight, Eye, AlertCircle, Key } from "lucide-react";
import { useGhostID } from "../../hooks/useGhostID";

export default function CredentialsVaultPage() {
  const { credentials, revokeCredential, removeCredential, resetToDemoCredentials } = useGhostID();
  const [selectedCred, setSelectedCred] = useState<any | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
            <Lock className="h-3.5 w-3.5" />
            <span>Encrypted Witness Vault</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Private Credentials</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Cryptographic attestations stored exclusively in your local client environment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDemoCredentials}
            className="rounded-xl border border-surface-border bg-surface px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-surface-hover transition-colors"
          >
            Reset Demo Data
          </button>
          <Link
            href="/credentials/add"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-ghost-600 to-midnight-accent px-4 py-2 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Issue New</span>
          </Link>
        </div>
      </div>

      {/* Grid of Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.map((cred) => {
          const isRevoked = cred.status === "REVOKED";
          return (
            <div
              key={cred.id}
              className={`flex flex-col justify-between rounded-2xl border bg-surface p-6 shadow-glass transition-all hover:border-ghost-500/50 ${
                isRevoked ? "border-rose-500/30 opacity-75" : "border-surface-border"
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-surface-border pb-3">
                  <span className="rounded bg-ghost-600/20 px-2 py-0.5 font-mono text-[11px] font-bold text-ghost-300">
                    {cred.type}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      isRevoked
                        ? "bg-rose-500/20 text-rose-300"
                        : "bg-midnight-emerald/20 text-emerald-300"
                    }`}
                  >
                    {cred.status}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">{cred.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{cred.issuerName}</p>

                {cred.isSimulated && (
                  <span className="mt-2 inline-block rounded bg-midnight-amber/10 px-2 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-500/20">
                    Simulated Demo Issuer
                  </span>
                )}

                {/* Safe Summary Info */}
                <div className="mt-4 rounded-xl border border-surface-border bg-surface-lighter/50 p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Attestation:</span>
                    <span className="font-semibold text-emerald-400 text-right">{cred.safeSummary.verifiedFact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Trust Score:</span>
                    <span className="font-mono text-midnight-cyan font-bold">{cred.safeSummary.trustScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Expires:</span>
                    <span className="font-mono text-slate-300">{new Date(cred.expiresAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-surface-border/50 pt-2">
                    <span className="text-slate-400">Raw Data:</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Lock className="h-3 w-3 text-ghost-400" />
                      <span>Encrypted Locally</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Bottom Bar */}
              <div className="mt-6 border-t border-surface-border pt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedCred(cred)}
                    className="rounded-lg bg-surface-lighter p-2 text-slate-300 hover:text-white hover:bg-surface-hover text-xs font-medium"
                    title="Inspect Credential"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {!isRevoked && (
                    <button
                      onClick={() => revokeCredential(cred.id)}
                      className="rounded-lg bg-surface-lighter p-2 text-slate-400 hover:text-rose-400 hover:bg-surface-hover text-xs font-medium"
                      title="Simulate Revocation"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeCredential(cred.id)}
                    className="rounded-lg bg-surface-lighter p-2 text-slate-400 hover:text-rose-400 hover:bg-surface-hover text-xs font-medium"
                    title="Delete from Device"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <Link
                  href={`/proof?credId=${cred.id}`}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold text-white transition-all ${
                    isRevoked
                      ? "bg-slate-800 opacity-50 cursor-not-allowed"
                      : "bg-gradient-to-r from-ghost-600 to-midnight-accent hover:opacity-90 shadow-sm"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Use for Proof</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspect Modal */}
      {selectedCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-surface-border bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h3 className="text-base font-bold text-white">{selectedCred.title}</h3>
              <button onClick={() => setSelectedCred(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="rounded-lg bg-surface-lighter p-3">
                <span className="text-slate-400 block text-[10px]">CREDENTIAL ID</span>
                <span className="text-slate-200">{selectedCred.id}</span>
              </div>
              <div className="rounded-lg bg-surface-lighter p-3">
                <span className="text-slate-400 block text-[10px]">ON-CHAIN COMMITMENT</span>
                <span className="text-ghost-300 break-all">{selectedCred.commitmentHash}</span>
              </div>
              <div className="rounded-lg bg-surface-lighter p-3">
                <span className="text-slate-400 block text-[10px]">ISSUER KEY HASH</span>
                <span className="text-slate-300">{selectedCred.issuerId}</span>
              </div>
            </div>

            <div className="rounded-xl border border-ghost-500/20 bg-ghost-950/20 p-3.5">
              <div className="text-[11px] font-semibold text-ghost-300 mb-1">Local Private Claims:</div>
              <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto p-2 bg-surface rounded">
                {JSON.stringify(selectedCred.privateClaims, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCred(null)}
                className="rounded-lg bg-ghost-600 px-4 py-1.5 text-xs font-bold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
