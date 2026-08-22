"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Sparkles, CheckCircle2, ArrowRight, Lock, Key, Calendar, Building } from "lucide-react";
import { useGhostID } from "../../../hooks/useGhostID";
import { computeCommitment, generateSalt } from "../../../lib/crypto/commitments";
import { GhostCredential, CredentialType } from "../../../lib/types";

export default function AddCredentialPage() {
  const router = useRouter();
  const { addCredential, walletAddress } = useGhostID();

  const [selectedType, setSelectedType] = useState<CredentialType>("AGE");
  const [subjectName, setSubjectName] = useState("Alex Rivera (Demo)");
  const [birthYear, setBirthYear] = useState("2004");
  const [university, setUniversity] = useState("Acme Metropolitan University");
  const [studentId, setStudentId] = useState("AMU-2024-CS-9901");
  const [kycTier, setKycTier] = useState<number>(1);
  const [isIssuing, setIsIssuing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleIssueDemoCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsIssuing(true);

    try {
      const salt = generateSalt();
      let title = "Age Attestation (Over 18)";
      let issuerName = "GovTrust Authority (Simulated)";
      let issuerId = "0xissuer_govtrust_01";
      let safeSummaryFact = "Eligible for adult-restricted services";
      let privateClaims: Record<string, any> = {
        fullName: subjectName,
        birthYear: parseInt(birthYear, 10),
        ageCalculated: new Date().getFullYear() - parseInt(birthYear, 10),
      };

      if (selectedType === "STUDENT") {
        title = "University Student Status";
        issuerName = `${university} (Simulated)`;
        issuerId = "0xissuer_univ_02";
        safeSummaryFact = `Enrolled in ${university}`;
        privateClaims = {
          fullName: subjectName,
          university,
          studentId,
          isStudentActive: true,
        };
      } else if (selectedType === "KYC") {
        title = `KYC Compliance Tier ${kycTier}`;
        issuerName = "Apex Financial Bank (Simulated)";
        issuerId = "0xissuer_apex_bank_03";
        safeSummaryFact = `Anti-Money Laundering & KYC Tier ${kycTier} Verified`;
        privateClaims = {
          fullName: subjectName,
          kycTier,
          isCompliant: true,
        };
      }

      const commitmentHash = await computeCommitment(
        walletAddress || "0xuser_secret",
        issuerId,
        privateClaims,
        salt
      );

      const newCred: GhostCredential = {
        id: `cred_${selectedType.toLowerCase()}_${Date.now()}`,
        type: selectedType,
        title,
        issuerName,
        issuerId,
        isSimulated: true,
        subjectAddress: walletAddress || "mn_preprod1qz4a5v9x0w7u8l3k2j1h9g8f7e6d5c4b3a2s1",
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000 * 3).toISOString(), // 3 years
        status: "ACTIVE",
        commitmentHash,
        salt,
        safeSummary: {
          badgeText: `${selectedType} Verified`,
          verifiedFact: safeSummaryFact,
          trustScore: 98,
          jurisdiction: "International",
        },
        privateClaims,
      };

      await new Promise((r) => setTimeout(r, 600));
      addCredential(newCred);
      setSuccess(true);
      setTimeout(() => {
        router.push("/credentials");
      }, 1200);
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
          <Key className="h-3.5 w-3.5" />
          <span>Demo Credential Issuance</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">Receive New Credential</h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Simulate a trusted organization signing a zero-knowledge credential commitment for your wallet.
        </p>
      </div>

      <div className="rounded-2xl border border-surface-border bg-surface p-6 sm:p-8 shadow-glass">
        {/* Notice */}
        <div className="rounded-xl border border-midnight-amber/30 bg-midnight-amber/10 p-3.5 text-xs text-amber-300">
          <span className="font-semibold">Development Mode:</span> These credentials are simulated for testing the Zero-Knowledge selective disclosure pipeline and are clearly tagged as simulated attestations.
        </div>

        <form onSubmit={handleIssueDemoCredential} className="mt-6 space-y-6">
          {/* Credential Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Credential Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedType("AGE")}
                className={`rounded-xl border p-3.5 text-center transition-all ${
                  selectedType === "AGE"
                    ? "border-ghost-500 bg-ghost-600/20 text-white shadow-glow-indigo"
                    : "border-surface-border bg-surface-lighter text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-sm font-bold">Age Attestation</div>
                <div className="text-[10px] text-slate-400 mt-1">Age &ge; 18 / 21 Proofs</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType("STUDENT")}
                className={`rounded-xl border p-3.5 text-center transition-all ${
                  selectedType === "STUDENT"
                    ? "border-ghost-500 bg-ghost-600/20 text-white shadow-glow-indigo"
                    : "border-surface-border bg-surface-lighter text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-sm font-bold">Student Status</div>
                <div className="text-[10px] text-slate-400 mt-1">University Enrollment</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType("KYC")}
                className={`rounded-xl border p-3.5 text-center transition-all ${
                  selectedType === "KYC"
                    ? "border-ghost-500 bg-ghost-600/20 text-white shadow-glow-indigo"
                    : "border-surface-border bg-surface-lighter text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-sm font-bold">KYC Compliance</div>
                <div className="text-[10px] text-slate-400 mt-1">Tier 1 Identity Check</div>
              </button>
            </div>
          </div>

          {/* Form Dynamic Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Subject Name (Local Witness Only)</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-lighter px-3.5 py-2.5 text-xs text-white focus:border-ghost-500 focus:outline-none"
                required
              />
            </div>

            {selectedType === "AGE" && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Birth Year</label>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  min="1920"
                  max="2020"
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter px-3.5 py-2.5 text-xs text-white focus:border-ghost-500 focus:outline-none"
                  required
                />
              </div>
            )}

            {selectedType === "STUDENT" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">University / Institution</label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full rounded-xl border border-surface-border bg-surface-lighter px-3.5 py-2.5 text-xs text-white focus:border-ghost-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Student Registration ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full rounded-xl border border-surface-border bg-surface-lighter px-3.5 py-2.5 text-xs text-white focus:border-ghost-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            {selectedType === "KYC" && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">KYC Tier</label>
                <select
                  value={kycTier}
                  onChange={(e) => setKycTier(parseInt(e.target.value, 10))}
                  className="w-full rounded-xl border border-surface-border bg-surface-lighter px-3.5 py-2.5 text-xs text-white focus:border-ghost-500 focus:outline-none"
                >
                  <option value={1}>Tier 1 (Basic Identity & AML Verified)</option>
                  <option value={2}>Tier 2 (Enhanced Due Diligence & Address Verified)</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-surface-border flex items-center justify-between">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-ghost-400" />
              <span>Will be saved directly to client witness storage</span>
            </div>

            <button
              type="submit"
              disabled={isIssuing}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-ghost-600 via-midnight-accent to-midnight-cyan px-6 py-2.5 text-xs font-bold text-white shadow-glow-indigo hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {isIssuing ? (
                <span>Generating Commitment...</span>
              ) : success ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Credential Added!</span>
                </>
              ) : (
                <>
                  <span>Issue to Local Vault</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
