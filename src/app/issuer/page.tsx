"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building, Shield, Key, Plus, CheckCircle2, XCircle, Users, BarChart3, ArrowRight, AlertTriangle } from "lucide-react";
import { useGhostID } from "../../hooks/useGhostID";

export default function IssuerPortalPage() {
  const { credentials, revokeCredential } = useGhostID();
  const [selectedIssuer, setSelectedIssuer] = useState("all");

  const issuers = [
    { id: "0xissuer_govtrust_authority_01", name: "GovTrust Authority (Simulated)", type: "Government / Identity", count: 12 },
    { id: "0xissuer_acme_university_02", name: "Acme Metropolitan University (Simulated)", type: "Higher Education", count: 8 },
    { id: "0xissuer_apex_financial_03", name: "Apex Financial Bank (Simulated)", type: "Financial Institution", count: 15 },
  ];

  const totalIssued = 35;
  const activeCount = credentials.filter((c) => c.status === "ACTIVE").length + 29;
  const revokedCount = credentials.filter((c) => c.status === "REVOKED").length + 3;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
            <Building className="h-3.5 w-3.5" />
            <span>Issuer Authority Dashboard</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">GhostIssuer Portal</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Issue cryptographically committed credentials and maintain on-chain revocation registries.
          </p>
        </div>

        <Link
          href="/credentials/add"
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-ghost-600 to-midnight-accent px-4 py-2 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Issue Credential</span>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-glass">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Credentials Issued</span>
            <Users className="h-4 w-4 text-ghost-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-white">{totalIssued}</div>
          <p className="mt-1 text-[11px] text-slate-400">Signed with Midnight cryptographic keys</p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-glass">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Commitments</span>
            <CheckCircle2 className="h-4 w-4 text-midnight-emerald" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-400">{activeCount}</div>
          <p className="mt-1 text-[11px] text-slate-400">Valid and verifiable on-chain</p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-glass">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Revoked Credentials</span>
            <XCircle className="h-4 w-4 text-rose-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-400">{revokedCount}</div>
          <p className="mt-1 text-[11px] text-slate-400">Listed on Midnight revocation map</p>
        </div>
      </div>

      {/* Organizations & Credentials List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Registered Organizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {issuers.map((org) => (
            <div key={org.id} className="rounded-2xl border border-surface-border bg-surface p-5 shadow-glass space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ghost-600/20 text-ghost-300">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{org.name}</h3>
                  <p className="text-[10px] text-slate-400">{org.type}</p>
                </div>
              </div>

              <div className="rounded-lg bg-surface-lighter p-2.5 font-mono text-[10px] text-slate-300 space-y-1">
                <div>Public Key Hash: {org.id.slice(0, 18)}...</div>
                <div>Active Registry: Compact v0.16</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revocation Management Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Issuer Credential Lifecycle & Revocation</h2>
        <div className="rounded-2xl border border-surface-border bg-surface shadow-glass overflow-hidden">
          <div className="divide-y divide-surface-border">
            {credentials.map((cred) => {
              const isRevoked = cred.status === "REVOKED";
              return (
                <div key={cred.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{cred.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">ID: {cred.id}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          isRevoked ? "bg-rose-500/20 text-rose-300" : "bg-midnight-emerald/20 text-emerald-300"
                        }`}
                      >
                        {cred.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{cred.issuerName}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    {!isRevoked && (
                      <button
                        onClick={() => revokeCredential(cred.id)}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
                      >
                        Revoke on Midnight
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
