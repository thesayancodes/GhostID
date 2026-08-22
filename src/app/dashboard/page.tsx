"use client";

import Link from "next/link";
import { Shield, Sparkles, Plus, CheckCircle2, AlertTriangle, ArrowRight, EyeOff, Lock, Clock, ExternalLink, RefreshCw, Key, ShieldCheck, XCircle } from "lucide-react";
import { useGhostID } from "../../hooks/useGhostID";
import { useMidnight } from "../../hooks/useMidnight";
import { useState } from "react";
import { DisclosureDiff } from "../../components/proof/DisclosureDiff";

export default function DashboardPage() {
  const { credentials, activityLog, isDemoMode, resetToDemoCredentials, revokePermission } = useGhostID();
  const { activeNetwork, networkConfig } = useMidnight();
  const [selectedCredentialForInspect, setSelectedCredentialForInspect] = useState<any | null>(null);

  const activeCount = credentials.filter((c) => c.status === "ACTIVE").length;
  const verificationCount = activityLog.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner / Privacy Status Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-3xl border border-surface-border bg-gradient-to-r from-surface via-surface-lighter to-ghost-950/20 p-6 sm:p-8 shadow-glass">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-midnight-emerald shadow-glow-emerald" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ghost-300">
              Zero-Knowledge Vault Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome to Your <span className="gradient-text-indigo">GhostID</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            All private identity data is stored strictly in your local encrypted witness vault.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/credentials/add"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-ghost-600 to-midnight-accent px-4 py-2.5 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add Credential</span>
          </Link>

          <Link
            href="/proof"
            className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-surface-hover hover:border-ghost-500/40 transition-all"
          >
            <Sparkles className="h-4 w-4 text-midnight-cyan" />
            <span>Generate Proof</span>
          </Link>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Vault Privacy Score</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-midnight-cyan/10 text-midnight-cyan">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-white">98/100</span>
            <span className="text-[11px] font-semibold text-midnight-emerald">Optimal</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Zero unnecessary data leaks</p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Credentials</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ghost-600/10 text-ghost-400">
              <Key className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-white">{activeCount}</span>
            <span className="text-[11px] text-slate-400">of {credentials.length} total</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Age, Student & KYC ready</p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Verifications</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-midnight-accent/10 text-midnight-accent">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-white">{verificationCount}</span>
            <span className="text-[11px] font-semibold text-midnight-emerald">100% ZK</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">0 raw documents shared</p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Network</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-midnight-emerald/10 text-midnight-emerald">
              <Shield className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-bold font-mono text-white truncate">{networkConfig.name}</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Compact ZK circuit enabled</p>
        </div>
      </div>

      {/* Main Credentials Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Private Credentials Vault</h2>
            <p className="text-xs text-slate-400">Cryptographically verifiable attestations stored on your device</p>
          </div>
          <Link
            href="/credentials"
            className="text-xs font-semibold text-ghost-400 hover:text-ghost-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred) => {
            const isRevoked = cred.status === "REVOKED";
            return (
              <div
                key={cred.id}
                className={`relative flex flex-col justify-between rounded-2xl border bg-surface p-5 shadow-glass transition-all hover:border-ghost-500/40 ${
                  isRevoked ? "border-rose-500/30 opacity-70" : "border-surface-border"
                }`}
              >
                <div>
                  {/* Top Badge & Status */}
                  <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
                    <span className="rounded-md bg-ghost-600/20 px-2 py-0.5 font-mono text-[10px] font-bold text-ghost-300">
                      {cred.type}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        isRevoked
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-midnight-emerald/20 text-emerald-300"
                      }`}
                    >
                      {cred.status}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white">{cred.title}</h3>
                  <p className="mt-1 text-xs text-slate-400 font-medium">{cred.issuerName}</p>

                  {/* Privacy-Safe Attestation Summary */}
                  <div className="mt-4 rounded-xl border border-surface-border bg-surface-lighter/50 p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Verified Fact:</span>
                      <span className="font-semibold text-emerald-400 text-right">{cred.safeSummary.verifiedFact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Expires:</span>
                      <span className="font-mono text-slate-300">{new Date(cred.expiresAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Raw Data:</span>
                      <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                        <Lock className="h-3 w-3 text-ghost-400" />
                        <span>Encrypted (Local)</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-surface-border/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCredentialForInspect(cred)}
                    className="rounded-lg bg-surface-lighter px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-surface-hover"
                  >
                    Inspect
                  </button>

                  <Link
                    href={`/proof?credId=${cred.id}`}
                    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white ${
                      isRevoked
                        ? "bg-slate-800 opacity-50 cursor-not-allowed"
                        : "bg-gradient-to-r from-ghost-600 to-midnight-accent hover:opacity-90"
                    }`}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Use for Proof</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Verification Activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Verification History</h2>
            <p className="text-xs text-slate-400">Log of selective disclosures created from this device</p>
          </div>
          <Link
            href="/activity"
            className="text-xs font-semibold text-ghost-400 hover:text-ghost-300 flex items-center gap-1"
          >
            <span>Full History</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface overflow-hidden">
          <div className="divide-y divide-surface-border">
            {activityLog.slice(0, 3).map((act) => (
              <div key={act.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{act.appName}</span>
                    <span className="rounded bg-ghost-600/20 px-1.5 py-0.5 text-[10px] font-mono text-ghost-300">
                      {act.claimProven}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{act.purpose}</p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{act.status}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(act.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  {act.canRevoke && (
                    <button
                      onClick={() => revokePermission(act.id)}
                      className="rounded-lg border border-surface-border bg-surface-lighter px-2.5 py-1 text-[11px] text-slate-300 hover:text-rose-400 hover:border-rose-500/30"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Inspecting Credential Safe Metadata */}
      {selectedCredentialForInspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-surface-border bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h3 className="text-base font-bold text-white">Credential Inspection</h3>
              <button
                onClick={() => setSelectedCredentialForInspect(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="rounded-lg bg-surface-lighter p-3">
                <span className="text-slate-400 block text-[10px]">COMMITMENT HASH (ON-CHAIN)</span>
                <span className="text-ghost-200 break-all">{selectedCredentialForInspect.commitmentHash}</span>
              </div>
              <div className="rounded-lg bg-surface-lighter p-3">
                <span className="text-slate-400 block text-[10px]">ISSUER IDENTIFIER</span>
                <span className="text-slate-200">{selectedCredentialForInspect.issuerId}</span>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <span className="text-emerald-400 font-bold block text-[10px]">SAFE DISCLOSED FACT</span>
                <span className="text-white">{selectedCredentialForInspect.safeSummary.verifiedFact}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              <span className="font-semibold text-ghost-300">Privacy Guarantee:</span> Raw values (e.g. birth dates, registration IDs) are not readable by third parties.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCredentialForInspect(null)}
                className="rounded-lg bg-ghost-600 px-4 py-1.5 text-xs font-bold text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
