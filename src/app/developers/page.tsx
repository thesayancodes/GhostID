"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Code2, Copy, CheckCircle2, ExternalLink, Sparkles, BookOpen, Key, Cpu } from "lucide-react";

export default function DevelopersPortalPage() {
  const [activeTab, setActiveTab] = useState<"ts" | "rest" | "compact">("ts");
  const [copiedCode, setCopiedCode] = useState(false);

  const tsExample = `import { GhostIDClient } from "@ghostid/sdk";

// 1. Initialize client connected to Midnight Preprod
const ghostID = new GhostIDClient({
  network: "preprod",
  contractAddress: "020062520f7d9da26bbb79a002ca2078a195999b911d5385ae250a59d3aa594f06e6"
});

// 2. Request a selective disclosure proof
const challenge = await ghostID.createProofRequest({
  requirement: "AGE_OVER_18",
  purpose: "Adult Service Compliance",
  expiresIn: "1h"
});

// 3. Verify incoming Zero-Knowledge proof
const result = await ghostID.verifyProof(userProofPayload);

if (result.verified) {
  console.log("User verified! Disclosed facts:", result.disclosedFacts);
  // Zero raw personal data (DOB, Name) was ever exposed
}`;

  const restExample = `// POST /api/v1/verify
// Request Payload:
{
  "proofId": "zkp_918237198273",
  "circuit": "verifyAgeProof",
  "publicInputs": {
    "minAge": 18,
    "nonce": "0xnonce_defi_918237",
    "verified": true
  },
  "nullifierHash": "0xnull_918237198273",
  "proofString": "zk-snark-midnight-compact-proof-..."
}

// Response:
{
  "success": true,
  "verified": true,
  "disclosedClaims": [{ "claim": "Age >= 18", "result": "TRUE" }],
  "privacyScore": 96,
  "mode": "REAL_MIDNIGHT"
}`;

  const compactExample = `pragma language_version >= 0.16.0;

import CompactStandardLibrary;

export ledger totalVerifications: Counter;
export ledger revokedCommitments: Map<Bytes<32>, Boolean>;

witness getPrivateIdentity(): PrivateIdentityWitness;

export circuit verifyAgeProof(
  minRequiredAge: Uint<16>,
  currentYear: Uint<16>,
  verifierNonce: Bytes<32>
): Boolean {
  const priv = getPrivateIdentity();
  assert(priv.credentialType == 1, "Expected AGE credential");
  
  const calculatedAge = currentYear - (priv.claimNumericValue as Uint<16>);
  const satisfiesClaim = calculatedAge >= minRequiredAge;
  
  totalVerifications.increment(1);
  return disclose(satisfiesClaim);
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ghost-500/30 bg-ghost-500/10 px-3 py-1 text-xs font-semibold text-ghost-300">
            <Terminal className="h-3.5 w-3.5" />
            <span>Developer Ecosystem</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">GhostID Developer Portal</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Integrate privacy-first Zero-Knowledge verification into any web application or DApp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://docs.midnight.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-surface-hover"
          >
            <span>Midnight Docs</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Quick Start Installation Card */}
      <div className="rounded-2xl border border-surface-border bg-surface p-6 shadow-glass space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-ghost-300">
            <Code2 className="h-4 w-4" />
            <span>INSTALLATION (NPM)</span>
          </div>
          <button
            onClick={() => copyToClipboard("npm install @ghostid/sdk @midnight-ntwrk/dapp-connector-api")}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
          >
            <Copy className="h-3 w-3" />
            <span>Copy</span>
          </button>
        </div>

        <pre className="rounded-xl bg-surface-lighter p-3 font-mono text-xs text-ghost-200 overflow-x-auto">
          npm install @ghostid/sdk @midnight-ntwrk/dapp-connector-api
        </pre>
      </div>

      {/* Code Examples Playground */}
      <div className="rounded-2xl border border-surface-border bg-surface overflow-hidden shadow-glass">
        <div className="flex border-b border-surface-border bg-surface-lighter/50 px-4 pt-2">
          <button
            onClick={() => setActiveTab("ts")}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "ts" ? "border-ghost-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            TypeScript SDK
          </button>
          <button
            onClick={() => setActiveTab("rest")}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "rest" ? "border-ghost-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            REST / API Endpoint
          </button>
          <button
            onClick={() => setActiveTab("compact")}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "compact" ? "border-ghost-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Compact Contract
          </button>
        </div>

        <div className="p-6 relative">
          <button
            onClick={() => copyToClipboard(activeTab === "ts" ? tsExample : activeTab === "rest" ? restExample : compactExample)}
            className="absolute top-8 right-8 flex items-center gap-1.5 rounded-lg bg-surface-lighter px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-surface-border"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
          </button>

          <pre className="rounded-xl bg-surface-lighter/60 p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
            {activeTab === "ts" && tsExample}
            {activeTab === "rest" && restExample}
            {activeTab === "compact" && compactExample}
          </pre>
        </div>
      </div>
    </div>
  );
}
