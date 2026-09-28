import { describe, it, expect } from "vitest";
import { evaluateLocalClaim, calculatePrivacyScore, computeCommitment } from "../src/lib/crypto/commitments";
import {
  createIdentityIntent,
  routeProofPlan,
  analyzeRequestOverCollection,
  generatePrivacyReceipt,
  compileNaturalLanguageToIntent,
} from "../src/lib/intent";
import { GhostCredential } from "../src/lib/types";

describe("GhostID Intent & Zero-Knowledge Policy Engine Tests", () => {
  // Mock credential store
  const mockCredentials: GhostCredential[] = [
    {
      id: "cred_age_001",
      type: "AGE",
      title: "Government Verified Age",
      issuerName: "GovTrust Identity Root",
      issuerId: "0xgov_trust_root",
      isSimulated: true,
      subjectAddress: "0xuser_midnight_01",
      issuedAt: "2024-01-01T00:00:00Z",
      expiresAt: "2030-01-01T00:00:00Z",
      status: "ACTIVE",
      commitmentHash: "0xcommit_age_01",
      salt: "salt_age_01",
      safeSummary: {
        badgeText: "Age >= 18",
        verifiedFact: "Age Verified",
        trustScore: 98,
      },
      privateClaims: {
        birthYear: 2002,
        ageCalculated: 24,
      },
    },
    {
      id: "cred_student_002",
      type: "STUDENT",
      title: "Acme University Enrollment",
      issuerName: "Acme University Registrar",
      issuerId: "0xacme_univ",
      isSimulated: true,
      subjectAddress: "0xuser_midnight_01",
      issuedAt: "2024-08-01T00:00:00Z",
      expiresAt: "2026-08-01T00:00:00Z",
      status: "ACTIVE",
      commitmentHash: "0xcommit_student_01",
      salt: "salt_student_01",
      safeSummary: {
        badgeText: "Student Active",
        verifiedFact: "Active Enrollment",
        trustScore: 95,
      },
      privateClaims: {
        isStudentActive: true,
        university: "Acme University",
        studentId: "ACME-99120",
      },
    },
    {
      id: "cred_kyc_003",
      type: "KYC",
      title: "FinSafe Tier 1 Compliance",
      issuerName: "FinSafe Compliance Authority",
      issuerId: "0xfinsafe_auth",
      isSimulated: true,
      subjectAddress: "0xuser_midnight_01",
      issuedAt: "2024-05-01T00:00:00Z",
      expiresAt: "2027-05-01T00:00:00Z",
      status: "ACTIVE",
      commitmentHash: "0xcommit_kyc_01",
      salt: "salt_kyc_01",
      safeSummary: {
        badgeText: "KYC Tier 1",
        verifiedFact: "KYC Compliant",
        trustScore: 99,
      },
      privateClaims: {
        kycTier: 1,
        passportNumber: "P-881923-US",
      },
    },
  ];

  it("1. Creates machine-readable Identity Intent with cryptographic hash and nonces", () => {
    const intent = createIdentityIntent({
      verifierId: "marketplace_x",
      verifierName: "Marketplace-X",
      purpose: "Age-restricted marketplace access",
      requiredClaims: [
        {
          id: "claim_1",
          credentialType: "AGE",
          claimKey: "ageCalculated",
          description: "Age >= 18",
          predicate: ">=",
          requiredValue: 18,
        },
      ],
      expiresInSeconds: 300,
    });

    expect(intent.intentId).toBeDefined();
    expect(intent.intentHash).toBeDefined();
    expect(intent.intentHash.startsWith("0x")).toBe(true);
    expect(intent.nonce.startsWith("0x")).toBe(true);
    expect(intent.allowedDisclosure).toBe("PREDICATE_RESULT_ONLY");
    expect(intent.requiredClaims.length).toBe(1);
  });

  it("2. Proof Router: Matches required claims to compatible private credentials", () => {
    const intent = createIdentityIntent({
      verifierId: "campus_store",
      verifierName: "Campus Discounts",
      purpose: "Student discount eligibility",
      requiredClaims: [
        {
          id: "claim_student",
          credentialType: "STUDENT",
          claimKey: "isStudentActive",
          description: "Student active enrollment",
          predicate: "truthy",
          requiredValue: true,
        },
        {
          id: "claim_age",
          credentialType: "AGE",
          claimKey: "ageCalculated",
          description: "Age >= 18",
          predicate: ">=",
          requiredValue: 18,
        },
      ],
    });

    const proofPlan = routeProofPlan(intent, mockCredentials);

    expect(proofPlan.allClaimsSatisfiable).toBe(true);
    expect(proofPlan.matchedCredentials.length).toBe(2);
    expect(proofPlan.matchedCredentials[0].canSatisfy).toBe(true);
    expect(proofPlan.matchedCredentials[1].canSatisfy).toBe(true);
    expect(proofPlan.compositeCircuit).toBe("verifyIntentPolicyProof");
  });

  it("3. GhostShield 2.0: Detects data over-collection and proposes minimal Zero-Knowledge Intent", () => {
    const traditionalRequest = ["Full Name", "Date of Birth", "Home Address", "Government ID"];
    const analysis = analyzeRequestOverCollection(
      "Age verification",
      traditionalRequest,
      "Age >= 18"
    );

    expect(analysis.unnecessaryFields.length).toBeGreaterThan(0);
    expect(analysis.unnecessaryFields).toContain("Exact Date of Birth");
    expect(analysis.unnecessaryFields).toContain("Full Legal Name");
    expect(analysis.unnecessaryFields).toContain("Physical Residential Address");
    expect(analysis.privacyScore).toBeLessThan(70);
    expect(analysis.riskLevel).not.toBe("LOW");
    expect(analysis.recommendation).toContain("Age >= 18");
  });

  it("4. Generates verifiable Privacy Receipt without leaking underlying personal data", () => {
    const intent = createIdentityIntent({
      verifierId: "defi_vault",
      verifierName: "DeFi Compliance Gateway",
      purpose: "Accredited access check",
      requiredClaims: [
        {
          id: "c_kyc",
          credentialType: "KYC",
          claimKey: "kycTier",
          description: "KYC Tier 1",
          predicate: ">=",
          requiredValue: 1,
        },
      ],
    });

    const receipt = generatePrivacyReceipt({
      intent,
      proofResult: true,
      contractAddress: "0200c64a430698c0d72a7cd526081fd585dad2a131ec3051e56b45c9135fd8d37756",
      mode: "REAL_MIDNIGHT",
    });

    expect(receipt.receiptId).toBeDefined();
    expect(receipt.receiptHash.startsWith("0xrcpt_")).toBe(true);
    expect(receipt.rawIdentityDisclosed).toBe(false);
    expect(receipt.result).toBe("VERIFIED");
    expect(receipt.verifier).toBe("DeFi Compliance Gateway");
  });

  it("5. GhostAI Assistant: Compiles natural language requirements into machine-readable intent", () => {
    const naturalQuery = "I need to verify that a customer is over 18 before allowing access to the store";
    const compiledIntent = compileNaturalLanguageToIntent(naturalQuery);

    expect(compiledIntent.purpose).toContain("Age");
    expect(compiledIntent.requiredClaims.length).toBeGreaterThan(0);
    expect(compiledIntent.requiredClaims[0].claimKey).toBe("ageCalculated");
    expect(compiledIntent.requiredClaims[0].requiredValue).toBe(18);
  });

  it("6. Evaluates local predicate logic strictly and securely", () => {
    const adultPrivateClaims = { ageCalculated: 24, birthYear: 2002 };
    const minorPrivateClaims = { ageCalculated: 15, birthYear: 2011 };

    const adultCheck = evaluateLocalClaim("ageCalculated", ">=", 18, adultPrivateClaims);
    const minorCheck = evaluateLocalClaim("ageCalculated", ">=", 18, minorPrivateClaims);

    expect(adultCheck.satisfied).toBe(true);
    expect(minorCheck.satisfied).toBe(false);
  });

  it("7. Computes cryptographically bound commitment hash", async () => {
    const commitment = await computeCommitment(
      "0xsubject_secret_test_99",
      "0xgov_trust_root",
      { ageCalculated: 24 },
      "salt_secret_123"
    );

    expect(commitment).toBeDefined();
    expect(commitment.startsWith("0x")).toBe(true);
  });
});
