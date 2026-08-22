import { describe, it, expect } from "vitest";
import { evaluateLocalClaim, calculatePrivacyScore, computeCommitment } from "../src/lib/crypto/commitments";

describe("GhostID Core Zero-Knowledge Identity Engine Tests", () => {
  it("Evaluates Age predicate: Age >= 18 passes for adult, fails for minor", () => {
    const adultPrivateClaims = { ageCalculated: 22, birthYear: 2004 };
    const minorPrivateClaims = { ageCalculated: 16, birthYear: 2010 };

    const adultCheck = evaluateLocalClaim("ageCalculated", ">=", 18, adultPrivateClaims);
    const minorCheck = evaluateLocalClaim("ageCalculated", ">=", 18, minorPrivateClaims);

    expect(adultCheck.satisfied).toBe(true);
    expect(minorCheck.satisfied).toBe(false);
  });

  it("Evaluates Student Status: Validates active enrollment without exposing student ID", () => {
    const studentPrivateClaims = {
      isStudentActive: true,
      studentId: "AMU-2024-CS-9901",
      university: "Acme Metropolitan University",
    };

    const check = evaluateLocalClaim("isStudentActive", "truthy", true, studentPrivateClaims);
    expect(check.satisfied).toBe(true);
  });

  it("Evaluates KYC Compliance: Validates Tier 1 requirement", () => {
    const kycPrivateClaims = {
      kycTier: 1,
      documentNumberMasked: "PASS-****-4821",
      isCompliant: true,
    };

    const check = evaluateLocalClaim("kycTier", ">=", 1, kycPrivateClaims);
    expect(check.satisfied).toBe(true);
  });

  it("Computes Privacy Score: Rewards ZK selective disclosure and penalizes over-collection", () => {
    const traditionalRequest = ["Full Name", "Date of Birth", "Home Address", "Passport Number"];
    const unnecessaryFields = ["Date of Birth", "Home Address", "Passport Number"];

    const traditionalScore = calculatePrivacyScore(traditionalRequest, unnecessaryFields, false);
    const zkScore = calculatePrivacyScore(["Age >= 18 Proof"], [], true);

    expect(traditionalScore.score).toBeLessThan(70);
    expect(traditionalScore.riskLevel).not.toBe("LOW");

    expect(zkScore.score).toBeGreaterThan(80);
    expect(zkScore.score).toBeGreaterThan(traditionalScore.score);
  });

  it("Generates cryptographic commitment hash correctly", async () => {
    const commitment = await computeCommitment(
      "0xsubject_secret_991823",
      "0xissuer_govtrust_01",
      { ageCalculated: 22 },
      "salt_881923"
    );

    expect(commitment).toBeDefined();
    expect(commitment.startsWith("0x")).toBe(true);
  });
});
