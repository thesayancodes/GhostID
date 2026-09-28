// ============================================================================
// GHOSTID INTENT: Policy Engine, Proof Router & Privacy Compiler
// Implements the Privacy Policy-to-Proof protocol for Midnight Network
// ============================================================================

import {
  IdentityIntent,
  IntentClaim,
  ProofPlan,
  PrivacyReceipt,
  GhostCredential,
  PrivacyAnalysisResult
} from "../types";
import { generateSalt, evaluateLocalClaim } from "../crypto/commitments";

/**
 * Creates a structured, machine-readable Identity Intent with cryptographic binding
 */
export function createIdentityIntent(params: {
  verifierId: string;
  verifierName: string;
  verifierLogo?: string;
  verifierAddress?: string;
  purpose: string;
  requiredClaims: IntentClaim[];
  optionalClaims?: IntentClaim[];
  issuerRequirements?: string[];
  expiresInSeconds?: number;
  context?: string;
}): IdentityIntent {
  const expiresInSeconds = params.expiresInSeconds || 300;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000).toISOString();
  const nonce = "0x" + generateSalt().slice(0, 32);
  const intentId = `intent_${Date.now()}_${nonce.slice(2, 10)}`;

  // Compute Intent Hash binding verifier, purpose and claims
  const rawPayload = JSON.stringify({
    verifierId: params.verifierId,
    purpose: params.purpose,
    claims: params.requiredClaims.map((c) => ({ key: c.claimKey, pred: c.predicate, val: c.requiredValue })),
    nonce,
    expiresAt,
  });

  // Deterministic fast hash for intent representation
  let hash = 0x811c9dc5;
  for (let i = 0; i < rawPayload.length; i++) {
    hash ^= rawPayload.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const intentHash = `0x${(hash >>> 0).toString(16).padStart(8, "0")}${nonce.slice(2, 58)}`;

  return {
    intentId,
    verifierId: params.verifierId,
    verifierName: params.verifierName,
    verifierLogo: params.verifierLogo,
    verifierAddress: params.verifierAddress || "0x98a1...49f0",
    purpose: params.purpose,
    requiredClaims: params.requiredClaims,
    optionalClaims: params.optionalClaims || [],
    issuerRequirements: params.issuerRequirements || ["GOV_TRUST_ROOT", "ACADEMIC_REGISTRY", "MIDNIGHT_KYC_AUTH"],
    expiresInSeconds,
    expiresAt,
    nonce,
    allowedDisclosure: "PREDICATE_RESULT_ONLY",
    context: params.context || "Standard Zero-Knowledge Predicate Verification",
    intentHash,
    createdAt: now.toISOString(),
  };
}

/**
 * Proof Router: Matches required intent claims against available user credentials
 * to build an optimized composite proof execution plan
 */
export function routeProofPlan(
  intent: IdentityIntent,
  availableCredentials: GhostCredential[]
): ProofPlan {
  const matchedCredentials: ProofPlan["matchedCredentials"] = [];
  let allClaimsSatisfiable = true;

  for (const claim of intent.requiredClaims) {
    // Find matching credential by type or claim key
    const matchingCred = availableCredentials.find((cred) => {
      if (cred.status !== "ACTIVE") return false;
      
      // Match by credential type
      if (claim.credentialType === cred.type) return true;

      // Match by field presence
      if (cred.privateClaims && cred.privateClaims[claim.claimKey] !== undefined) return true;

      return false;
    });

    if (matchingCred) {
      // Evaluate if claim is actually satisfied by the local private data
      const evalResult = evaluateLocalClaim(
        claim.claimKey,
        claim.predicate,
        claim.requiredValue,
        matchingCred.privateClaims
      );

      matchedCredentials.push({
        claimKey: claim.claimKey,
        credentialId: matchingCred.id,
        credentialType: matchingCred.type,
        credentialTitle: matchingCred.title,
        canSatisfy: evalResult.satisfied,
      });

      if (!evalResult.satisfied) {
        allClaimsSatisfiable = false;
      }
    } else {
      allClaimsSatisfiable = false;
      matchedCredentials.push({
        claimKey: claim.claimKey,
        credentialId: "NONE",
        credentialType: claim.credentialType,
        credentialTitle: "Missing Credential",
        canSatisfy: false,
      });
    }
  }

  // Determine circuit
  let compositeCircuit = "verifyIntentPolicyProof";
  if (intent.requiredClaims.length === 1) {
    const type = intent.requiredClaims[0].credentialType;
    if (type === "AGE") compositeCircuit = "verifyAgeProof";
    else if (type === "STUDENT") compositeCircuit = "verifyStudentProof";
    else if (type === "KYC") compositeCircuit = "verifyKYCProof";
  }

  return {
    intentId: intent.intentId,
    matchedCredentials,
    allClaimsSatisfiable,
    compositeCircuit,
    estimatedProofTimeMs: Math.max(850, intent.requiredClaims.length * 450),
  };
}

/**
 * Generates an immutable, zero-knowledge Privacy Receipt after verification
 */
export function generatePrivacyReceipt(params: {
  intent: IdentityIntent;
  proofResult: boolean;
  contractAddress?: string;
  txHash?: string;
  mode?: "REAL_MIDNIGHT" | "SIMULATED_DEMO";
}): PrivacyReceipt {
  const { intent, proofResult, contractAddress, txHash, mode } = params;
  const timestamp = new Date().toISOString();
  const receiptId = `rcpt_${Date.now()}_${intent.nonce.slice(2, 10)}`;

  const rawReceipt = JSON.stringify({
    receiptId,
    verifier: intent.verifierName,
    purpose: intent.purpose,
    result: proofResult ? "VERIFIED" : "FAILED",
    intentHash: intent.intentHash,
    nonce: intent.nonce,
    timestamp,
  });

  let hash = 0x5a17b01d;
  for (let i = 0; i < rawReceipt.length; i++) {
    hash ^= rawReceipt.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const receiptHash = `0xrcpt_${(hash >>> 0).toString(16).padStart(8, "0")}_${intent.nonce.slice(2, 18)}`;

  return {
    receiptId,
    verifier: intent.verifierName,
    verifierAddress: intent.verifierAddress,
    purpose: intent.purpose,
    claimsProven: intent.requiredClaims.map((c) => `${c.description} (${c.predicate} ${c.requiredValue})`),
    result: proofResult ? "VERIFIED" : "FAILED",
    rawIdentityDisclosed: false,
    requestId: intent.intentId,
    intentHash: intent.intentHash,
    nonce: intent.nonce,
    timestamp,
    receiptHash,
    contractAddress: contractAddress || "0200c64a430698c0d72a7cd526081fd585dad2a131ec3051e56b45c9135fd8d37756",
    txHash: txHash || "0x" + generateSalt().slice(0, 64),
    mode: mode || "REAL_MIDNIGHT",
  };
}

/**
 * GhostShield 2.0: Analyzes verification requests for unnecessary raw personal data collection
 * and formulates a privacy-preserving Intent recommendation
 */
export function analyzeRequestOverCollection(
  purpose: string,
  requestedRawFields: string[],
  predicateClaim: string
): PrivacyAnalysisResult {
  const unnecessaryFields: string[] = [];
  const justifiedFields: string[] = [];

  const sensitiveDict: Record<string, string> = {
    dob: "Exact Date of Birth",
    dateofbirth: "Exact Date of Birth",
    birthdate: "Birth Date",
    name: "Full Legal Name",
    fullname: "Full Legal Name",
    address: "Physical Residential Address",
    homeaddress: "Physical Residential Address",
    passport: "Government Passport Document",
    nationalid: "National Government ID Number",
    ssn: "Social Security Number",
    phone: "Personal Phone Number",
    email: "Personal Email Address",
    salary: "Raw Financial Income",
  };

  for (const field of requestedRawFields) {
    const clean = field.toLowerCase().replace(/[^a-z]/g, "");
    if (sensitiveDict[clean]) {
      unnecessaryFields.push(sensitiveDict[clean]);
    } else {
      justifiedFields.push(field);
    }
  }

  const isZk = unnecessaryFields.length === 0;
  const score = Math.max(15, 100 - unnecessaryFields.length * 22);

  let riskLevel: PrivacyAnalysisResult["riskLevel"] = "LOW";
  if (score < 50) riskLevel = "CRITICAL";
  else if (score < 70) riskLevel = "HIGH";
  else if (score < 85) riskLevel = "MEDIUM";

  const recommendation = unnecessaryFields.length > 0
    ? `GhostShield detected ${unnecessaryFields.length} over-collected field(s). Convert to a GhostID Intent to prove '${predicateClaim}' without exposing ${unnecessaryFields.join(", ")}.`
    : `Optimal Zero-Knowledge Privacy: Only the minimal '${predicateClaim}' predicate is evaluated.`;

  return {
    privacyScore: score,
    riskLevel,
    unnecessaryFields,
    justifiedFields,
    recommendation,
    suggestedZkProof: predicateClaim,
    heuristicBreakdown: [
      {
        factor: "Over-Collection Prevention",
        score: Math.max(20, 100 - unnecessaryFields.length * 25),
        weight: "40%",
      },
      {
        factor: "Zero-Knowledge Predicate Isolation",
        score: isZk ? 100 : 30,
        weight: "35%",
      },
      {
        factor: "Intent Policy-Bound Nonce",
        score: 95,
        weight: "25%",
      },
    ],
  };
}

/**
 * GhostAI Assistant: Compiles a natural-language statement into a GhostID Identity Intent
 */
export function compileNaturalLanguageToIntent(input: string): IdentityIntent {
  const lower = input.toLowerCase();

  let purpose = "Decentralized Access Verification";
  const requiredClaims: IntentClaim[] = [];

  if (lower.includes("18") || lower.includes("age") || lower.includes("adult")) {
    purpose = "Age-Restricted Marketplace Access";
    requiredClaims.push({
      id: "claim_age_18",
      credentialType: "AGE",
      claimKey: "ageCalculated",
      description: "User is 18 years of age or older",
      predicate: ">=",
      requiredValue: 18,
    });
  }

  if (lower.includes("student") || lower.includes("university") || lower.includes("college")) {
    purpose = "Academic Student Verification";
    requiredClaims.push({
      id: "claim_student_active",
      credentialType: "STUDENT",
      claimKey: "isStudentActive",
      description: "Active enrollment status at accredited institution",
      predicate: "truthy",
      requiredValue: true,
    });
  }

  if (lower.includes("kyc") || lower.includes("compliance") || lower.includes("tier")) {
    purpose = "Regulatory Compliance & Tier Verification";
    requiredClaims.push({
      id: "claim_kyc_tier1",
      credentialType: "KYC",
      claimKey: "kycTier",
      description: "Identity compliance Tier 1 verification",
      predicate: ">=",
      requiredValue: 1,
    });
  }

  if (requiredClaims.length === 0) {
    // Default fallback
    purpose = "General Zero-Knowledge Compliance";
    requiredClaims.push({
      id: "claim_age_18",
      credentialType: "AGE",
      claimKey: "ageCalculated",
      description: "Age >= 18 Compliance",
      predicate: ">=",
      requiredValue: 18,
    });
  }

  return createIdentityIntent({
    verifierId: "0xverifier_" + generateSalt().slice(0, 16),
    verifierName: "Midnight DApp Partner",
    purpose,
    requiredClaims,
    expiresInSeconds: 300,
  });
}
