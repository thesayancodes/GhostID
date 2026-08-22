// ============================================================================
// GHOSTID Global Application State Store
// Manages local private credential vault, proof history, requests, and settings
// ============================================================================

import { create } from "zustand";
import { GhostCredential, VerificationRequest, ActivityRecord, VerificationResult } from "../types";

export interface GhostStoreState {
  // Mode & Network
  isDemoMode: boolean;
  activeNetwork: "preprod" | "preview" | "local" | "demo";
  setDemoMode: (isDemo: boolean) => void;
  setActiveNetwork: (network: "preprod" | "preview" | "local" | "demo") => void;

  // Wallet
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: (address?: string) => void;
  disconnectWallet: () => void;

  // Credential Vault (Client-side private storage)
  credentials: GhostCredential[];
  addCredential: (credential: GhostCredential) => void;
  revokeCredential: (id: string) => void;
  removeCredential: (id: string) => void;
  resetToDemoCredentials: () => void;

  // Verification Requests & Proofs
  activeRequests: VerificationRequest[];
  createVerificationRequest: (request: Partial<VerificationRequest>) => VerificationRequest;
  
  // Verification / Activity History
  activityLog: ActivityRecord[];
  addActivityRecord: (record: ActivityRecord) => void;
  revokePermission: (activityId: string) => void;

  // Latest Verification Cache
  latestResult: VerificationResult | null;
  setLatestResult: (result: VerificationResult | null) => void;
}

// Synthetic Demo Credentials for "Alex" (Zero real personal identity information)
export const INITIAL_DEMO_CREDENTIALS: GhostCredential[] = [
  {
    id: "cred_age_001",
    type: "AGE",
    title: "Age Attestation (Over 18)",
    issuerName: "GovTrust Identity Authority (Simulated)",
    issuerId: "0xissuer_govtrust_authority_01",
    isSimulated: true,
    subjectAddress: "mn_preprod1qz4a5v9x0w7u8l3k2j1h9g8f7e6d5c4b3a2s1",
    issuedAt: "2024-01-15T10:00:00Z",
    expiresAt: "2029-01-15T10:00:00Z",
    status: "ACTIVE",
    commitmentHash: "0x8fa402b8d910c2e3914a827b501c82e091b4",
    salt: "e4a291f09c81b27d45e690a2bf4198c2184910eb",
    safeSummary: {
      badgeText: "Age >= 18 Verified",
      verifiedFact: "Eligible for adult-restricted services",
      trustScore: 99,
      jurisdiction: "International",
    },
    privateClaims: {
      birthYear: 2004,
      ageCalculated: 22,
      birthDateRaw: "2004-06-12",
      nationalIdMasked: "IN-XXXX-9104",
      fullName: "Alex Rivera",
    },
  },
  {
    id: "cred_student_002",
    type: "STUDENT",
    title: "University Student Status",
    issuerName: "Acme Metropolitan University (Simulated)",
    issuerId: "0xissuer_acme_university_02",
    isSimulated: true,
    subjectAddress: "mn_preprod1qz4a5v9x0w7u8l3k2j1h9g8f7e6d5c4b3a2s1",
    issuedAt: "2024-08-20T08:30:00Z",
    expiresAt: "2027-08-20T23:59:59Z",
    status: "ACTIVE",
    commitmentHash: "0x4b7190f48a1c9201948b271a6279140283c7",
    salt: "91b384ca0291f827364810da849102c918471928",
    safeSummary: {
      badgeText: "Active Student",
      verifiedFact: "Enrolled in Degree Program (Computer Science)",
      trustScore: 96,
      jurisdiction: "Higher Ed Registry",
    },
    privateClaims: {
      isStudentActive: true,
      university: "Acme Metropolitan University",
      studentId: "AMU-2024-CS-8921",
      department: "School of Engineering",
      expectedGraduation: 2027,
    },
  },
  {
    id: "cred_kyc_003",
    type: "KYC",
    title: "KYC Tier 1 Compliance",
    issuerName: "Apex Financial Bank (Simulated)",
    issuerId: "0xissuer_apex_financial_03",
    isSimulated: true,
    subjectAddress: "mn_preprod1qz4a5v9x0w7u8l3k2j1h9g8f7e6d5c4b3a2s1",
    issuedAt: "2024-03-10T14:20:00Z",
    expiresAt: "2026-03-10T14:20:00Z",
    status: "ACTIVE",
    commitmentHash: "0x192847a0c8b29174628103c89140a9273b01",
    salt: "7291a0c849182b374619028a4719203847192837",
    safeSummary: {
      badgeText: "KYC Tier 1 Verified",
      verifiedFact: "Anti-Money Laundering & Identity Verified",
      trustScore: 98,
      jurisdiction: "Global Compliance",
    },
    privateClaims: {
      kycTier: 1,
      isCompliant: true,
      riskRating: "Low",
      documentType: "Passport",
      documentNumberMasked: "PASS-****-4821",
    },
  },
];

export const INITIAL_ACTIVITY_LOG: ActivityRecord[] = [
  {
    id: "act_001",
    timestamp: "2026-08-22T14:30:00Z",
    appName: "Apex Crypto Exchange",
    purpose: "Account Tier 1 Compliance Verification",
    claimProven: "KYC Tier >= 1",
    status: "VERIFIED",
    mode: "SIMULATED_DEMO",
    proofHash: "0xzkp_apex_7491028471928",
    expiresIn: "30 days",
    canRevoke: true,
  },
  {
    id: "act_002",
    timestamp: "2026-08-21T09:15:00Z",
    appName: "Student Perk Portal",
    purpose: "Student Discount Eligibility",
    claimProven: "Student Status = Active",
    status: "VERIFIED",
    mode: "SIMULATED_DEMO",
    proofHash: "0xzkp_student_819203847192",
    expiresIn: "90 days",
    canRevoke: true,
  },
  {
    id: "act_003",
    timestamp: "2026-08-20T18:45:00Z",
    appName: "Nightclub VIP Access",
    purpose: "Age 21+ Gate Check",
    claimProven: "Age >= 21",
    status: "VERIFIED",
    mode: "SIMULATED_DEMO",
    proofHash: "0xzkp_age_192837461928",
    expiresIn: "Session only",
    canRevoke: false,
  },
];

export const useGhostStore = create<GhostStoreState>((set, get) => ({
  isDemoMode: true,
  activeNetwork: "demo",
  setDemoMode: (isDemo) => set({ isDemoMode: isDemo }),
  setActiveNetwork: (network) => set({ activeNetwork: network }),

  isConnected: true,
  walletAddress: "mn_preprod1qz4a5v9x0w7u8l3k2j1h9g8f7e6d5c4b3a2s1",
  connectWallet: (address) =>
    set({
      isConnected: true,
      walletAddress: address || "mn_preprod1qz4a5v9x0w7u8l3k2j1h9g8f7e6d5c4b3a2s1",
    }),
  disconnectWallet: () =>
    set({
      isConnected: false,
      walletAddress: null,
    }),

  credentials: INITIAL_DEMO_CREDENTIALS,
  addCredential: (credential) =>
    set((state) => ({
      credentials: [credential, ...state.credentials],
    })),
  revokeCredential: (id) =>
    set((state) => ({
      credentials: state.credentials.map((c) =>
        c.id === id ? { ...c, status: "REVOKED" as const } : c
      ),
    })),
  removeCredential: (id) =>
    set((state) => ({
      credentials: state.credentials.filter((c) => c.id !== id),
    })),
  resetToDemoCredentials: () =>
    set({
      credentials: INITIAL_DEMO_CREDENTIALS,
      activityLog: INITIAL_ACTIVITY_LOG,
    }),

  activeRequests: [
    {
      id: "req_demo_age_18",
      verifierName: "Midnight DeFi Gateway",
      verifierAddress: "mn_verifier_0x918237918237",
      purpose: "Adult Regulatory Compliance for Token Swap",
      requiredClaims: [
        {
          credentialType: "AGE",
          claimKey: "ageCalculated",
          description: "Must be at least 18 years old",
          predicate: ">=",
          requiredValue: 18,
        },
      ],
      unnecessaryFieldsNotRequested: [
        "Full Legal Name",
        "Exact Date of Birth",
        "Home Address",
        "National ID / Passport Number",
      ],
      privacyScore: 95,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      nonce: "0xnonce_defi_918237",
      createdAt: new Date().toISOString(),
    },
  ],
  createVerificationRequest: (requestData) => {
    const newReq: VerificationRequest = {
      id: "req_" + Math.random().toString(36).substring(2, 9),
      verifierName: requestData.verifierName || "Acme Verifier Portal",
      verifierAddress: requestData.verifierAddress || "mn_verifier_custom_01",
      purpose: requestData.purpose || "Identity Requirement Verification",
      requiredClaims: requestData.requiredClaims || [
        {
          credentialType: "AGE",
          claimKey: "ageCalculated",
          description: "Age >= 18",
          predicate: ">=",
          requiredValue: 18,
        },
      ],
      unnecessaryFieldsNotRequested: requestData.unnecessaryFieldsNotRequested || [
        "Full Legal Name",
        "Exact Date of Birth",
        "Home Address",
        "Government ID Number",
      ],
      privacyScore: requestData.privacyScore || 94,
      expiresAt: requestData.expiresAt || new Date(Date.now() + 3600000 * 24).toISOString(),
      nonce: "0xnonce_" + Math.random().toString(36).substring(2, 10),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      activeRequests: [newReq, ...state.activeRequests],
    }));
    return newReq;
  },

  activityLog: INITIAL_ACTIVITY_LOG,
  addActivityRecord: (record) =>
    set((state) => ({
      activityLog: [record, ...state.activityLog],
    })),
  revokePermission: (activityId) =>
    set((state) => ({
      activityLog: state.activityLog.map((act) =>
        act.id === activityId ? { ...act, status: "REVOKED" as const, canRevoke: false } : act
      ),
    })),

  latestResult: null,
  setLatestResult: (result) => set({ latestResult: result }),
}));
