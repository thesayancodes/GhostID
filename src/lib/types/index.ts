// ============================================================================
// GHOSTID INTENT: Core TypeScript Definitions & Domain Types
// ============================================================================

export type CredentialType = "AGE" | "STUDENT" | "KYC" | "CUSTOM";

export type CredentialStatus = "ACTIVE" | "EXPIRED" | "REVOKED" | "SUSPENDED";

export interface RawPrivateIdentityData {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  nationalIdNumber: string; // e.g. Passport / Aadhaar / SSN
  address: string;
  universityName?: string;
  studentId?: string;
  enrollmentStatus?: "Active" | "Graduated" | "Withdrawn";
  kycTier?: 1 | 2;
  incomeAnnual?: number;
  country: string;
}

export interface CredentialClaim {
  id: string;
  key: string;
  label: string;
  predicate: ">=" | "==" | "<=" | "in" | "truthy";
  targetValue: string | number | boolean;
  isPrivate: boolean;
}

export interface GhostCredential {
  id: string;
  type: CredentialType;
  title: string;
  issuerName: string;
  issuerId: string;
  issuerLogo?: string;
  isSimulated: boolean;
  subjectAddress: string;
  issuedAt: string; // ISO 8601
  expiresAt: string; // ISO 8601
  status: CredentialStatus;
  commitmentHash: string;
  salt: string;
  
  // Publicly privacy-safe metadata (displayed to user without exposing raw values)
  safeSummary: {
    badgeText: string;
    verifiedFact: string;
    trustScore: number;
    jurisdiction?: string;
  };

  // Raw private claims held STRICTLY in local private vault
  privateClaims: {
    birthYear?: number;
    ageCalculated?: number;
    isStudentActive?: boolean;
    university?: string;
    kycTier?: number;
    nationality?: string;
    [key: string]: any;
  };
}

// ----------------------------------------------------------------------------
// GHOSTID INTENT PROTOCOL TYPES
// ----------------------------------------------------------------------------

export interface IntentClaim {
  id: string;
  credentialType: CredentialType;
  claimKey: string;
  description: string;
  predicate: ">=" | "==" | "<=" | "truthy";
  requiredValue: string | number | boolean;
  isOptional?: boolean;
}

export interface IdentityIntent {
  intentId: string;
  verifierId: string;
  verifierName: string;
  verifierLogo?: string;
  verifierAddress?: string;
  purpose: string;
  requiredClaims: IntentClaim[];
  optionalClaims?: IntentClaim[];
  issuerRequirements?: string[];
  expiresInSeconds: number;
  expiresAt: string;
  nonce: string;
  allowedDisclosure: "PREDICATE_RESULT_ONLY" | "SELECTIVE_DISCLOSURE";
  context?: string;
  intentHash: string;
  createdAt: string;
}

export interface ProofPlan {
  intentId: string;
  matchedCredentials: {
    claimKey: string;
    credentialId: string;
    credentialType: CredentialType;
    credentialTitle: string;
    canSatisfy: boolean;
  }[];
  allClaimsSatisfiable: boolean;
  compositeCircuit: string;
  estimatedProofTimeMs: number;
}

export interface PrivacyReceipt {
  receiptId: string;
  verifier: string;
  verifierAddress?: string;
  purpose: string;
  claimsProven: string[];
  result: "VERIFIED" | "FAILED";
  rawIdentityDisclosed: false;
  requestId: string;
  intentHash: string;
  nonce: string;
  timestamp: string;
  receiptHash: string;
  contractAddress?: string;
  txHash?: string;
  mode: "REAL_MIDNIGHT" | "SIMULATED_DEMO";
}

export interface VerificationRequest {
  id: string;
  verifierName: string;
  verifierLogo?: string;
  verifierAddress: string;
  purpose: string;
  requiredClaims: {
    credentialType: CredentialType;
    claimKey: string;
    description: string;
    predicate: ">=" | "==" | "<=" | "truthy";
    requiredValue: string | number | boolean;
  }[];
  unnecessaryFieldsNotRequested: string[];
  privacyScore: number;
  expiresAt: string;
  nonce: string;
  createdAt: string;
}

export interface ZKProofPayload {
  proofId: string;
  requestId: string;
  timestamp: string;
  circuit: string;
  commitmentHash: string;
  nullifierHash: string;
  publicInputs: {
    minAge?: number;
    institutionId?: string;
    kycTier?: number;
    nonce: string;
    verified: boolean;
    intentHash?: string;
  };
  proofString: string;
  mode: "REAL_MIDNIGHT" | "SIMULATED_DEMO";
  contractAddress?: string;
  txHash?: string;
}

export interface VerificationResult {
  verified: boolean;
  proofId: string;
  requestId: string;
  timestamp: string;
  verifierName: string;
  mode: "REAL_MIDNIGHT" | "SIMULATED_DEMO";
  contractAddress?: string;
  txHash?: string;
  disclosedFacts: {
    claim: string;
    result: string;
    verified: boolean;
  }[];
  hiddenProtectedData: string[];
  issuerTrustScore: number;
  privacyScore: number;
  privacyReceipt?: PrivacyReceipt;
}

export interface ActivityRecord {
  id: string;
  timestamp: string;
  appName: string;
  purpose: string;
  claimProven: string;
  status: "VERIFIED" | "REJECTED" | "REVOKED";
  mode: "REAL_MIDNIGHT" | "SIMULATED_DEMO";
  proofHash: string;
  receiptHash?: string;
  expiresIn?: string;
  canRevoke: boolean;
}

export interface PrivacyAnalysisResult {
  privacyScore: number; // 0-100
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  unnecessaryFields: string[];
  justifiedFields: string[];
  recommendation: string;
  suggestedZkProof: string;
  heuristicBreakdown: {
    factor: string;
    score: number;
    weight: string;
  }[];
}

export interface NetworkConfig {
  id: "preview" | "preprod" | "local" | "demo";
  name: string;
  indexerUri: string;
  proofServerUri: string;
  contractAddress: string;
  isReal: boolean;
}
