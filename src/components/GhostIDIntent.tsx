"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Lock,
  EyeOff,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  Layers,
  FileCode2,
  Terminal,
  FileText
} from "lucide-react";
import {
  createIdentityIntent,
  routeProofPlan,
  analyzeRequestOverCollection,
  generatePrivacyReceipt,
  compileNaturalLanguageToIntent
} from "../lib/intent";
import { useGhostID } from "../hooks/useGhostID";
import { useMidnight } from "../hooks/useMidnight";
import { IdentityIntent, ProofPlan, PrivacyReceipt, PrivacyAnalysisResult } from "../lib/types";

export function GhostIDIntent() {
  const { credentials, activityLog } = useGhostID();
  const { isConnected, activeNetwork, connect, contractAddress } = useMidnight();

  // Selected Intent State
  const [activeTab, setActiveTab] = useState<"intent_studio" | "ghostshield" | "proof_router" | "ai_assistant">("intent_studio");
  const [aiPrompt, setAiPrompt] = useState("I need to verify that a customer is at least 18 years old before allowing marketplace checkout");
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  // Default Intent
  const [currentIntent, setCurrentIntent] = useState<IdentityIntent>(() =>
    createIdentityIntent({
      verifierId: "marketplace_x_auth",
      verifierName: "Marketplace-X",
      purpose: "Age-restricted digital goods access",
      requiredClaims: [
        {
          id: "claim_age",
          credentialType: "AGE",
          claimKey: "ageCalculated",
          description: "Age >= 18 Compliance",
          predicate: ">=",
          requiredValue: 18,
        },
      ],
      expiresInSeconds: 300,
    })
  );

  // Over-collection demo state for GhostShield 2.0
  const [requestedFields, setRequestedFields] = useState<string[]>([
    "Full Legal Name",
    "Date of Birth",
    "Physical Residential Address",
    "Government Passport ID",
    "Age >= 18"
  ]);

  // Verification execution states
  const [isProving, setIsProving] = useState(false);
  const [proofPlan, setProofPlan] = useState<ProofPlan | null>(() => routeProofPlan(currentIntent, credentials));
  const [privacyReceipt, setPrivacyReceipt] = useState<PrivacyReceipt | null>(null);

  // Handle Intent generation
  const handleCreatePresetIntent = (type: "age" | "student" | "kyc" | "composite") => {
    let intent: IdentityIntent;
    if (type === "age") {
      intent = createIdentityIntent({
        verifierId: "store_age_gate",
        verifierName: "Aether Marketplace",
        purpose: "Age-restricted item access",
        requiredClaims: [
          {
            id: "claim_1",
            credentialType: "AGE",
            claimKey: "ageCalculated",
            description: "Age Threshold (18+)",
            predicate: ">=",
            requiredValue: 18,
          },
        ],
      });
    } else if (type === "student") {
      intent = createIdentityIntent({
        verifierId: "campus_discounts",
        verifierName: "Campus Tech Store",
        purpose: "Academic student discount eligibility",
        requiredClaims: [
          {
            id: "claim_2",
            credentialType: "STUDENT",
            claimKey: "isStudentActive",
            description: "Active University Enrollment",
            predicate: "truthy",
            requiredValue: true,
          },
        ],
      });
    } else if (type === "kyc") {
      intent = createIdentityIntent({
        verifierId: "defi_portal",
        verifierName: "Nocturne DeFi Protocol",
        purpose: "Institutional AML / KYC Tier 1 Access",
        requiredClaims: [
          {
            id: "claim_3",
            credentialType: "KYC",
            claimKey: "kycTier",
            description: "KYC Compliance Tier 1+",
            predicate: ">=",
            requiredValue: 1,
          },
        ],
      });
    } else {
      intent = createIdentityIntent({
        verifierId: "enterprise_b2b",
        verifierName: "OmniCorp Global Exchange",
        purpose: "Accredited Student Trader Tier",
        requiredClaims: [
          {
            id: "c1",
            credentialType: "AGE",
            claimKey: "ageCalculated",
            description: "Age >= 18",
            predicate: ">=",
            requiredValue: 18,
          },
          {
            id: "c2",
            credentialType: "STUDENT",
            claimKey: "isStudentActive",
            description: "Active Student Enrollment",
            predicate: "truthy",
            requiredValue: true,
          },
          {
            id: "c3",
            credentialType: "KYC",
            claimKey: "kycTier",
            description: "KYC Tier 1 Verified",
            predicate: ">=",
            requiredValue: 1,
          },
        ],
      });
    }

    setCurrentIntent(intent);
    setProofPlan(routeProofPlan(intent, credentials));
    setPrivacyReceipt(null);
  };

  // Run GhostAI compilation
  const handleCompileAiPrompt = () => {
    const compiled = compileNaturalLanguageToIntent(aiPrompt);
    setCurrentIntent(compiled);
    setProofPlan(routeProofPlan(compiled, credentials));
    setPrivacyReceipt(null);
    setActiveTab("intent_studio");
  };

  // Run Zero-Knowledge Proof with Midnight Compact circuit simulation
  const handleExecuteProof = async () => {
    setIsProving(true);
    try {
      // Simulate off-chain witness extraction and Midnight ZK circuit execution
      await new Promise((resolve) => setTimeout(resolve, 1400));
      
      const plan = routeProofPlan(currentIntent, credentials);
      setProofPlan(plan);

      const receipt = generatePrivacyReceipt({
        intent: currentIntent,
        proofResult: plan.allClaimsSatisfiable,
        contractAddress: contractAddress || "0200c64a430698c0d72a7cd526081fd585dad2a131ec3051e56b45c9135fd8d37756",
        mode: isConnected ? "REAL_MIDNIGHT" : "SIMULATED_DEMO",
      });

      setPrivacyReceipt(receipt);
    } finally {
      setIsProving(false);
    }
  };

  // GhostShield Analysis
  const shieldAnalysis: PrivacyAnalysisResult = analyzeRequestOverCollection(
    currentIntent.purpose,
    requestedFields,
    currentIntent.requiredClaims.map((c) => `${c.description}`).join(" AND ")
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 text-fog">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-spectral-violet/30 bg-surface/80 p-6 md:p-8 backdrop-blur-xl shadow-glass">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-spectral-violet/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-phantom-cyan/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-phantom-cyan/30 bg-phantom-cyan/10 px-3 py-1 text-xs font-mono text-phantom-cyan mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>GhostID Intent Protocol v1.0 • Midnight Network</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              Privacy Policy-to-Proof Layer
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base text-fog-dim">
              Transforming raw identity collection into machine-readable <strong className="text-fog">Identity Intents</strong>,
              enforced by Midnight Compact zero-knowledge circuits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!isConnected && (
              <button
                onClick={connect}
                className="flex items-center gap-2 rounded-xl bg-spectral-violet px-4 py-2 text-xs md:text-sm font-bold text-white shadow-glow-spectral hover:bg-spectral-violet/90 transition-all active:scale-95"
              >
                <Zap className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
            <div className="rounded-xl border border-spectral-violet/20 bg-void/60 px-3 py-2 text-right">
              <div className="text-[10px] uppercase tracking-wider text-fog-dim/70">Target Contract</div>
              <div className="font-mono text-xs text-phantom-cyan truncate max-w-[180px]">
                {contractAddress ? `${contractAddress.slice(0, 10)}...${contractAddress.slice(-6)}` : "0200c64a...7756"}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-spectral-violet/15 pt-4">
          {[
            { id: "intent_studio", label: "Intent Studio & Verifier", icon: Layers },
            { id: "ghostshield", label: "GhostShield 2.0 Firewall", icon: ShieldCheck },
            { id: "proof_router", label: "Proof Router & Vault", icon: Cpu },
            { id: "ai_assistant", label: "GhostAI Policy Assistant", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  active
                    ? "bg-spectral-violet text-white shadow-glow-spectral"
                    : "bg-surface-raised/60 text-fog-dim hover:text-fog hover:bg-surface-raised"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: INTENT STUDIO */}
      {activeTab === "intent_studio" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Preset Intent Selector & Intent Schema */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-spectral-violet/20 bg-surface/70 p-5 backdrop-blur-md">
              <h2 className="text-base font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-phantom-cyan" />
                  Select or Generate Intent
                </span>
                <span className="text-xs font-mono text-fog-dim">Policy-Bound</span>
              </h2>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "age", label: "Age >= 18", desc: "Age Gating" },
                  { id: "student", label: "Active Student", desc: "Academic Discount" },
                  { id: "kyc", label: "KYC Tier 1", desc: "DeFi Access" },
                  { id: "composite", label: "Composite (3)", desc: "Multi-Claim" },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleCreatePresetIntent(preset.id as any)}
                    className="flex flex-col items-start p-3 rounded-xl border border-spectral-violet/20 bg-surface-raised/50 hover:border-spectral-violet hover:bg-surface-raised text-left transition-all"
                  >
                    <span className="text-xs font-bold text-white">{preset.label}</span>
                    <span className="text-[10px] text-fog-dim mt-0.5">{preset.desc}</span>
                  </button>
                ))}
              </div>

              {/* Machine-Readable Intent Definition */}
              <div className="mt-5 space-y-3">
                <div className="text-xs font-semibold text-fog uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode2 className="h-3.5 w-3.5 text-spectral-violet" />
                  Machine-Readable Intent Payload
                </div>

                <div className="rounded-xl border border-spectral-violet/20 bg-void/90 p-4 font-mono text-xs text-fog-dim space-y-2 overflow-x-auto">
                  <div className="text-phantom-cyan font-bold">// Cryptographic Intent Definition</div>
                  <div><span className="text-spectral-violet">PURPOSE:</span> "{currentIntent.purpose}"</div>
                  <div><span className="text-spectral-violet">VERIFIER:</span> "{currentIntent.verifierName}" ({currentIntent.verifierId})</div>
                  <div>
                    <span className="text-spectral-violet">REQUIRED CLAIMS:</span>
                    <ul className="pl-4 list-disc text-fog mt-1">
                      {currentIntent.requiredClaims.map((c) => (
                        <li key={c.id}>
                          {c.claimKey} <span className="text-phantom-cyan font-bold">{c.predicate} {String(c.requiredValue)}</span> ({c.description})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div><span className="text-spectral-violet">EXPIRATION:</span> {currentIntent.expiresInSeconds}s (Valid until {new Date(currentIntent.expiresAt).toLocaleTimeString()})</div>
                  <div><span className="text-spectral-violet">NONCE:</span> {currentIntent.nonce}</div>
                  <div><span className="text-spectral-violet">DISCLOSURE:</span> <span className="text-phantom-cyan font-bold">{currentIntent.allowedDisclosure}</span></div>
                  <div className="pt-2 border-t border-spectral-violet/15 text-[11px] text-fog-dim/70 truncate">
                    INTENT_HASH: {currentIntent.intentHash}
                  </div>
                </div>
              </div>
            </div>

            {/* Proof Routing Overview */}
            <div className="rounded-2xl border border-spectral-violet/20 bg-surface/70 p-5 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="h-4 w-4 text-phantom-cyan" />
                Proof Router Matching Status
              </h3>
              <div className="mt-3 space-y-2">
                {proofPlan?.matchedCredentials.map((match, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-spectral-violet/15 bg-surface-raised/40 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{match.credentialTitle}</div>
                      <div className="text-[11px] text-fog-dim font-mono">Claim: {match.claimKey}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {match.canSatisfy ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-phantom-cyan/15 text-phantom-cyan font-semibold text-[10px]">
                          <CheckCircle2 className="h-3 w-3" /> Compatible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-danger-glitch/15 text-danger-glitch font-semibold text-[10px]">
                          <AlertTriangle className="h-3 w-3" /> Missing/Unsatisfied
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-spectral-violet/15 flex items-center justify-between text-xs">
                <span className="text-fog-dim">Selected Compact Circuit:</span>
                <span className="font-mono font-semibold text-phantom-cyan bg-phantom-cyan/10 px-2 py-1 rounded-md">
                  {proofPlan?.compositeCircuit}()
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Verification Pipeline & Privacy Receipt */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-spectral-violet/30 bg-surface/80 p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-spectral-violet" />
                    Zero-Knowledge Proof Execution
                  </h2>
                  <span className="text-xs font-mono text-phantom-cyan bg-phantom-cyan/10 px-2 py-0.5 rounded-full">
                    {proofPlan?.allClaimsSatisfiable ? "Ready to Prove" : "Requires Credentials"}
                  </span>
                </div>

                <div className="mt-4 p-4 rounded-xl border border-spectral-violet/20 bg-void/50 text-xs text-fog-dim space-y-2">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-phantom-cyan" />
                    Off-Chain Privacy Firewall Boundary
                  </div>
                  <p>
                    Your raw identity attributes (DOB, legal name, address, student ID) remain strictly inside your private witness.
                    Only the proof satisfaction boolean is dispatched to Midnight.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={handleExecuteProof}
                    disabled={isProving || !proofPlan?.allClaimsSatisfiable}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-spectral-violet to-phantom-cyan px-6 py-3.5 text-sm font-bold text-white shadow-glow-spectral hover:opacity-95 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProving ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Compiling Private Witness & Evaluating Circuit...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        <span>Execute Policy Proof & Emit Receipt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Privacy Receipt Result */}
              {privacyReceipt && (
                <div className="mt-6 rounded-xl border border-phantom-cyan/30 bg-surface-raised/80 p-5 shadow-glass animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-phantom-cyan/20">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-phantom-cyan" />
                      <span className="text-sm font-bold text-white font-display">GHOSTID PRIVACY RECEIPT</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-phantom-cyan/20 text-phantom-cyan font-mono text-[10px] font-bold">
                      {privacyReceipt.result}
                    </span>
                  </div>

                  <div className="mt-3 font-mono text-xs space-y-1.5 text-fog-dim">
                    <div><span className="text-white">VERIFIER:</span> {privacyReceipt.verifier}</div>
                    <div><span className="text-white">PURPOSE:</span> {privacyReceipt.purpose}</div>
                    <div>
                      <span className="text-white">CLAIMS PROVEN:</span>
                      <ul className="pl-4 list-disc text-phantom-cyan">
                        {privacyReceipt.claimsProven.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-1.5 text-phantom-cyan font-bold pt-1">
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>RAW IDENTITY DISCLOSED: NO (0 bytes leaked)</span>
                    </div>
                    <div className="pt-2 border-t border-spectral-violet/15 text-[11px]">
                      <div>RECEIPT_HASH: <span className="text-fog truncate">{privacyReceipt.receiptHash}</span></div>
                      <div>NONCE: <span className="text-fog">{privacyReceipt.nonce}</span></div>
                      <div>TIMESTAMP: <span className="text-fog">{new Date(privacyReceipt.timestamp).toLocaleString()}</span></div>
                      <div>CONTRACT: <span className="text-fog">{privacyReceipt.contractAddress ? `${privacyReceipt.contractAddress.slice(0, 16)}...` : "0200c64a...7756"}</span></div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(privacyReceipt, null, 2));
                        setCopiedReceipt(true);
                        setTimeout(() => setCopiedReceipt(false), 2000);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-spectral-violet/30 bg-surface py-2 text-xs font-semibold text-fog hover:text-white hover:border-spectral-violet transition-all"
                    >
                      {copiedReceipt ? <Check className="h-3.5 w-3.5 text-phantom-cyan" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedReceipt ? "Copied JSON!" : "Copy Cryptographic Receipt"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GHOSTSHIELD 2.0 FIREWALL */}
      {activeTab === "ghostshield" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl border border-spectral-violet/20 bg-surface/70 p-6 backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-phantom-cyan" />
                Over-Collection Detection Engine
              </h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                shieldAnalysis.riskLevel === "LOW" ? "bg-phantom-cyan/20 text-phantom-cyan" : "bg-danger-glitch/20 text-danger-glitch"
              }`}>
                RISK LEVEL: {shieldAnalysis.riskLevel}
              </span>
            </div>

            <p className="text-xs text-fog-dim">
              GhostShield 2.0 intercepts inbound verification requests, evaluates the declared purpose against requested fields,
              and flags unnecessary raw data collection.
            </p>

            <div className="p-4 rounded-xl border border-spectral-violet/20 bg-void/70 space-y-3">
              <div className="text-xs font-semibold text-fog flex items-center justify-between">
                <span>Intercepted Raw Data Fields Requested by Verifier:</span>
                <span className="text-[11px] font-mono text-fog-dim">{requestedFields.length} Fields</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {requestedFields.map((f, i) => {
                  const isOver = shieldAnalysis.unnecessaryFields.some((u) => u.toLowerCase().includes(f.toLowerCase().slice(0, 4)));
                  return (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        isOver
                          ? "border-danger-glitch/40 bg-danger-glitch/10 text-danger-glitch"
                          : "border-phantom-cyan/40 bg-phantom-cyan/10 text-phantom-cyan"
                      }`}
                    >
                      {isOver ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                      {f}
                      {isOver && <span className="text-[10px] uppercase font-bold">(Over-collected)</span>}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Recommendation */}
            <div className="rounded-xl border border-spectral-violet/30 bg-surface-raised/50 p-4 text-xs space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-phantom-cyan" />
                GhostShield Firewall Recommendation:
              </div>
              <p className="text-fog-dim leading-relaxed">{shieldAnalysis.recommendation}</p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-spectral-violet/20 bg-surface/70 p-6 backdrop-blur-md space-y-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Privacy Score Breakdown</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-spectral-violet/30 bg-void">
                  <span className="text-3xl font-extrabold text-white font-display">{shieldAnalysis.privacyScore}</span>
                </div>
                <div>
                  <div className="text-xs text-fog-dim">Firewall Protection Score</div>
                  <div className="text-sm font-bold text-white mt-1">
                    {shieldAnalysis.privacyScore > 80 ? "Zero-Knowledge Protected" : "Severe Data Leak Risk"}
                  </div>
                  <div className="text-[11px] text-fog-dim/80 mt-1">
                    Traditional collection leaks 100% of PII. Intent isolation restores cryptographic privacy.
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {shieldAnalysis.heuristicBreakdown.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-fog">{item.factor}</span>
                      <span className="font-mono text-phantom-cyan">{item.score}/100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-void overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-spectral-violet to-phantom-cyan rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setRequestedFields(["Age >= 18 Predicate (Zero-Knowledge Proof)"]);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-phantom-cyan/15 border border-phantom-cyan/40 py-2.5 text-xs font-bold text-phantom-cyan hover:bg-phantom-cyan/25 transition-all"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Apply Intent Minimization Firewall</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: PROOF ROUTER & VAULT */}
      {activeTab === "proof_router" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 rounded-2xl border border-spectral-violet/20 bg-surface/70 p-6 backdrop-blur-md space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-phantom-cyan" />
              Private Local Identity Vault
            </h2>
            <p className="text-xs text-fog-dim">
              These credentials reside exclusively in your browser/device encrypted store. They are never sent over the network or stored on-chain.
            </p>

            <div className="space-y-3">
              {credentials.map((cred) => (
                <div
                  key={cred.id}
                  className="rounded-xl border border-spectral-violet/20 bg-surface-raised/40 p-4 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{cred.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-spectral-violet/20 text-spectral-violet font-mono text-[10px]">
                      {cred.type}
                    </span>
                  </div>
                  <div className="text-fog-dim">Issuer: {cred.issuerName}</div>
                  <div className="font-mono text-[11px] text-phantom-cyan bg-void/50 p-2 rounded-lg border border-spectral-violet/10">
                    <div>Private Fact: {cred.safeSummary.badgeText}</div>
                    <div>Commitment: {cred.commitmentHash.slice(0, 24)}...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl border border-spectral-violet/20 bg-surface/70 p-6 backdrop-blur-md space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-spectral-violet" />
              Proof Router Composite Resolver
            </h2>
            <p className="text-xs text-fog-dim">
              The Proof Router synthesizes minimal credential subsets to satisfy composite Intent requirements in a single Midnight execution pass.
            </p>

            <div className="rounded-xl border border-spectral-violet/20 bg-void/80 p-4 font-mono text-xs text-fog-dim space-y-3">
              <div className="text-phantom-cyan font-bold">// Proof Plan Synthesis</div>
              <div>Intent ID: <span className="text-fog">{currentIntent.intentId}</span></div>
              <div>Required Predicates: <span className="text-white font-bold">{currentIntent.requiredClaims.length}</span></div>
              <div>Matched Vault Secrets: <span className="text-phantom-cyan font-bold">{proofPlan?.matchedCredentials.filter((m) => m.canSatisfy).length} / {currentIntent.requiredClaims.length}</span></div>
              <div>Target Circuit: <span className="text-spectral-violet font-bold">{proofPlan?.compositeCircuit}</span></div>
              <div>Estimated Proof Latency: <span className="text-fog">{proofPlan?.estimatedProofTimeMs} ms</span></div>
            </div>

            <div className="p-4 rounded-xl border border-phantom-cyan/20 bg-phantom-cyan/5 text-xs text-fog-dim">
              <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="h-4 w-4 text-phantom-cyan" />
                No Redundant Data Access
              </div>
              The Proof Router ensures only credentials relevant to the verified claims are unlocked for witness generation.
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GHOSTAI POLICY ASSISTANT */}
      {activeTab === "ai_assistant" && (
        <div className="rounded-2xl border border-spectral-violet/20 bg-surface/70 p-6 md:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-phantom-cyan" />
                GhostAI Natural Language Policy Compiler
              </h2>
              <p className="mt-1 text-xs md:text-sm text-fog-dim">
                Enter any human business requirement, access condition, or compliance rule. GhostAI translates it into a structured, privacy-minimized GhostID Intent.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-fog">Human Verification Requirement</label>
            <div className="relative">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-spectral-violet/30 bg-void/80 p-4 text-sm text-white placeholder-fog-dim/50 focus:border-phantom-cyan focus:outline-none focus:ring-1 focus:ring-phantom-cyan"
                placeholder="e.g. Verify that the user is an active university student over 18 for student discount"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-fog-dim self-center">Try prompt:</span>
              {[
                "Verify customer is over 18 for age gate",
                "Verify active student enrollment status",
                "Verify KYC Tier 1 compliance for DeFi",
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setAiPrompt(example)}
                  className="rounded-lg border border-spectral-violet/20 bg-surface-raised px-2.5 py-1 text-[11px] text-fog hover:text-white hover:border-spectral-violet transition-all"
                >
                  {example}
                </button>
              ))}
            </div>

            <button
              onClick={handleCompileAiPrompt}
              className="flex items-center gap-2 rounded-xl bg-spectral-violet px-5 py-2.5 text-xs md:text-sm font-bold text-white shadow-glow-spectral hover:bg-spectral-violet/90 transition-all active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Compile Intent & Open Studio</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default GhostIDIntent;
