"use client";

import React from "react";
import Link from "next/link";
import { Shield, Sparkles, CheckCircle2, XCircle, Clock, Trash2, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { useGhostStore } from "../../lib/store/ghostStore";

export default function ActivityHistoryPage() {
  const { activityLog, revokePermission } = useGhostStore();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
            <Clock className="h-3.5 w-3.5" />
            <span>Audit Trail</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Verification Activity</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Immutable log of all zero-knowledge proofs and selective disclosures created from this device.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-midnight-emerald" />
          <span>Zero raw identity documents were ever exposed</span>
        </div>
      </div>

      <div className="rounded-2xl border border-surface-border bg-surface shadow-glass overflow-hidden">
        <div className="divide-y divide-surface-border">
          {activityLog.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No verification activity recorded yet. Create a proof in the Proof Center to see it logged here.
            </div>
          ) : (
            activityLog.map((act) => {
              const isRevoked = act.status === "REVOKED";
              return (
                <div
                  key={act.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 gap-4 hover:bg-surface-lighter/50 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-white">{act.appName}</span>
                      <span className="rounded bg-ghost-600/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-ghost-300">
                        {act.claimProven}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          isRevoked
                            ? "bg-rose-500/20 text-rose-300"
                            : "bg-midnight-emerald/20 text-emerald-300"
                        }`}
                      >
                        {act.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">{act.purpose}</p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-mono pt-1">
                      <span>Proof Hash: {act.proofHash}</span>
                      <span>&bull;</span>
                      <span>Mode: {act.mode}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">TIMESTAMP</span>
                      <span className="font-mono text-slate-200">{new Date(act.timestamp).toLocaleString()}</span>
                    </div>

                    {act.canRevoke && (
                      <button
                        onClick={() => revokePermission(act.id)}
                        className="rounded-lg border border-surface-border bg-surface-lighter px-3 py-1.5 text-xs text-slate-300 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                      >
                        Revoke Access
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
