"use client";

import React from "react";
import { Shield, Lock, EyeOff, CheckCircle2, AlertTriangle, Key, Cpu, FileCheck, Layers } from "lucide-react";

export default function SecurityCenterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <Shield className="h-3.5 w-3.5" />
          <span>Cryptographic Security & Transparency</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Security Center</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          How GhostID protects user sovereignty through Midnight zero-knowledge proofs and selective disclosure.
        </p>
      </div>

      {/* 6 Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ghost-600/20 text-ghost-300 mb-3">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Private Witness Model</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Raw personal data (DOB, national IDs, student numbers) exists solely inside local encrypted client storage and is never written to public blockchain state.
          </p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-midnight-cyan/20 text-midnight-cyan mb-3">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Zero-Knowledge Proofs</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Compact circuits compile zk-SNARK constraints that prove predicate satisfaction (e.g. Age &ge; 18) without disclosing the pre-image witness.
          </p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-midnight-emerald/20 text-midnight-emerald mb-3">
            <FileCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Explicit Disclose() Directive</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Compact enforces privacy-by-default. Witness-tainted variables cannot reach the public ledger without explicit, intentional developer disclosure.
          </p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-midnight-amber/20 text-midnight-amber mb-3">
            <Key className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Cryptographic Commitments</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Issuers sign Poseidon/Pedersen-style commitments with blinding salts. Compromising the public hash reveals zero information about user claims.
          </p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 mb-3">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Revocation Ledger</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Issuers can invalidate compromised credentials by publishing revocation commitment hashes to the Midnight smart contract in real time.
          </p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-midnight-accent/20 text-midnight-accent mb-3">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Anti-Replay Nullifiers</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every proof request includes a verifier nonce that computes unique ephemeral nullifiers, preventing third parties from replaying captured proofs.
          </p>
        </div>
      </div>

      {/* Honest Cryptographic Boundaries */}
      <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Security Boundaries & Honest Guarantees</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          GhostID does not claim to be &quot;unhackable&quot; or &quot;100% immune&quot;. The security of client-side credentials relies on local device hygiene, browser sandbox isolation, and secure key management.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
          <div className="rounded-lg bg-surface-lighter p-3">
            <span className="text-emerald-400 font-bold block text-[11px]">WHAT IS CRYPTOGRAPHICALLY GUARANTEED:</span>
            <span className="text-slate-300 text-[11px] font-sans">
              On-chain observers cannot reconstruct your private birth date, student ID, or national identity from public proof transactions.
            </span>
          </div>
          <div className="rounded-lg bg-surface-lighter p-3">
            <span className="text-amber-400 font-bold block text-[11px]">WHAT REQUIRES USER VIGILANCE:</span>
            <span className="text-slate-300 text-[11px] font-sans">
              Safeguarding your device against local malware and carefully reviewing consent prompts before approving verification requests.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
