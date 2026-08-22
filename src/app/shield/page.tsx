"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Sparkles, AlertTriangle, CheckCircle2, XCircle, ArrowRight, EyeOff, Lock, RefreshCw, Layers } from "lucide-react";
import { calculatePrivacyScore } from "../../lib/crypto/commitments";
import { PrivacyAnalysisResult } from "../../lib/types";

export default function GhostShieldPage() {
  const [appName, setAppName] = useState("Example Exchange");
  const [appPurpose, setAppPurpose] = useState("Account Registration & Adult Verification");
  const [inputRequestedFields, setInputRequestedFields] = useState("Full Name, Date of Birth, Home Address, National ID Number");
  const [isZkEnabled, setIsZkEnabled] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PrivacyAnalysisResult | null>({
    privacyScore: 55,
    riskLevel: "HIGH",
    unnecessaryFields: ["Date of Birth", "Home Address", "National ID Number"],
    justifiedFields: ["Proof of Age >= 18"],
    recommendation: "The application requires only adult eligibility. GhostID recommends using an Age >= 18 Zero-Knowledge Proof instead of collecting raw identity documents.",
    suggestedZkProof: "Compact::verifyAgeProof(minAge: 18)",
    heuristicBreakdown: [
      { factor: "Raw Date of Birth Requested", score: -25, weight: "High Sensitivity" },
      { factor: "National ID / Passport Number", score: -25, weight: "Identity Theft Risk" },
      { factor: "Physical Home Address", score: -15, weight: "Physical Safety" },
      { factor: "Zero-Knowledge Mode Active", score: 0, weight: "Baseline" },
    ],
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();

    const fields = inputRequestedFields
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const unnecessary: string[] = [];
    const justified: string[] = [];

    fields.forEach((f) => {
      const lower = f.toLowerCase();
      if (lower.includes("dob") || lower.includes("birth") || lower.includes("address") || lower.includes("id") || lower.includes("passport") || lower.includes("ssn")) {
        unnecessary.push(f);
      } else {
        justified.push(f);
      }
    });

    const { score, riskLevel } = calculatePrivacyScore(fields, unnecessary, isZkEnabled);

    setAnalysisResult({
      privacyScore: score,
      riskLevel,
      unnecessaryFields: unnecessary,
      justifiedFields: justified.length > 0 ? justified : ["Age >= 18 Proof"],
      recommendation: isZkEnabled
        ? "Optimal privacy achieved. All unnecessary raw personal fields are isolated using Midnight Zero-Knowledge proofs."
        : "Over-collection detected. Replace raw document collection with an Age or KYC Zero-Knowledge predicate.",
      suggestedZkProof: "Compact::verifyAgeProof(minAge: 18)",
      heuristicBreakdown: [
        { factor: "Sensitive Fields Requested", score: -10 * unnecessary.length, weight: "Data Minimization" },
        { factor: "ZK Attestation Mode", score: isZkEnabled ? 45 : 0, weight: "Midnight Circuit" },
      ],
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-ghost-500/30 bg-gradient-to-r from-surface via-surface-lighter to-ghost-950/40 p-6 sm:p-8 shadow-glass">
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <Shield className="h-3.5 w-3.5 text-midnight-cyan" />
          <span>GhostShield Intelligence</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
          Know What You&apos;re Giving Away.
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl">
          GhostShield inspects data requests, detects unnecessary personal field over-collection, and automatically generates minimal zero-knowledge proof recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Config */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
              Analyze Verification Request
            </h3>

            <form onSubmit={handleAnalyze} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Application</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Stated Purpose</label>
                <input
                  type="text"
                  value={appPurpose}
                  onChange={(e) => setAppPurpose(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Requested Data Fields (Comma-separated)</label>
                <textarea
                  value={inputRequestedFields}
                  onChange={(e) => setInputRequestedFields(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter p-2.5 text-white focus:border-ghost-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="zkToggle"
                  checked={isZkEnabled}
                  onChange={(e) => setIsZkEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-surface-border bg-surface-lighter text-ghost-500 focus:ring-ghost-500"
                />
                <label htmlFor="zkToggle" className="text-xs text-slate-300">
                  Simulate with GhostID ZK Proof
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan py-3 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 transition-all"
              >
                Run Privacy Analysis
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface/50 p-4 text-[11px] text-slate-400">
            <span className="font-semibold text-ghost-300">Disclaimer:</span> GhostShield scores are application-level heuristic recommendations based on data minimization principles, not formal legal compliance certifications.
          </div>
        </div>

        {/* Analysis Output Results */}
        <div className="lg:col-span-2 space-y-6">
          {analysisResult && (
            <div className="space-y-6">
              {/* Score Header Card */}
              <div
                className={`rounded-2xl border p-6 shadow-glass ${
                  analysisResult.riskLevel === "LOW"
                    ? "border-midnight-emerald/40 bg-midnight-emerald/5"
                    : analysisResult.riskLevel === "MEDIUM"
                    ? "border-midnight-amber/40 bg-midnight-amber/5"
                    : "border-rose-500/40 bg-rose-500/5"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-slate-400">Heuristic Privacy Score</div>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="text-4xl font-extrabold font-mono text-white">
                        {analysisResult.privacyScore}/100
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          analysisResult.riskLevel === "LOW"
                            ? "bg-midnight-emerald/20 text-emerald-300"
                            : analysisResult.riskLevel === "MEDIUM"
                            ? "bg-midnight-amber/20 text-amber-300"
                            : "bg-rose-500/20 text-rose-300"
                        }`}
                      >
                        {analysisResult.riskLevel} RISK
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-400">
                    <div>Evaluation Target:</div>
                    <div className="font-bold text-white">{appName}</div>
                  </div>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-surface-border pb-3">
                  GhostShield Recommendation
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">{analysisResult.recommendation}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px]">
                      <XCircle className="h-4 w-4" />
                      <span>UNNECESSARY FIELDS DETECTED</span>
                    </div>
                    {analysisResult.unnecessaryFields.map((f, i) => (
                      <div key={i} className="text-slate-300 text-[11px]">&bull; {f}</div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>RECOMMENDED ZK ATTESTATION</span>
                    </div>
                    <div className="text-emerald-300 font-bold text-[11px]">{analysisResult.suggestedZkProof}</div>
                    <p className="text-[10px] text-slate-400 font-sans">
                      Satisfies purpose without exposing unnecessary personal documents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/proof"
                  className="flex items-center gap-2 rounded-xl bg-ghost-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-ghost-500 shadow-sm"
                >
                  <span>Generate Recommended ZK Proof</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
