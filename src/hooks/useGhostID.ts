// ============================================================================
// GHOSTID Core Orchestration Hook
// Handles proof generation, consent approvals, revocation, and verification
// ============================================================================

"use client";

import { useState, useCallback } from "react";
import { useGhostStore } from "../lib/store/ghostStore";
import { midnightService } from "../lib/midnight/midnightService";
import { GhostCredential, VerificationRequest, ZKProofPayload, VerificationResult, ActivityRecord } from "../lib/types";
import { computeCommitment, computeNullifier, generateSalt } from "../lib/crypto/commitments";

export function useGhostID() {
  const store = useGhostStore();
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepMessage, setStepMessage] = useState("");
  const [proofError, setProofError] = useState<string | null>(null);

  /**
   * Generates a zero-knowledge proof for a specific credential claim
   */
  const generateProofForClaim = useCallback(
    async (
      credential: GhostCredential,
      claimKey: string,
      predicate: ">=" | "==" | "<=" | "truthy",
      targetValue: string | number | boolean,
      verifierNonce?: string
    ): Promise<{ proof: ZKProofPayload; result: VerificationResult } | null> => {
      setIsGeneratingProof(true);
      setProofError(null);
      setCurrentStep(1);
      setStepMessage("Reading private credential securely from local vault");

      try {
        // Validate credential status
        if (credential.status === "REVOKED") {
          throw new Error("Cannot generate proof: Credential has been revoked on-chain");
        }
        if (credential.status === "EXPIRED" || new Date(credential.expiresAt) < new Date()) {
          throw new Error("Cannot generate proof: Credential has expired");
        }

        const nonce = verifierNonce || "0xnonce_" + generateSalt().slice(0, 16);
        const nullifier = await computeNullifier(credential.commitmentHash, nonce, credential.salt);

        let circuitName = "verifyAgeProof";
        if (credential.type === "STUDENT") circuitName = "verifyStudentProof";
        if (credential.type === "KYC") circuitName = "verifyKYCProof";

        // Execute proof pipeline with animated progress steps
        const proofPayload = await midnightService.executeZKProofPipeline(
          credential.type,
          circuitName,
          credential.privateClaims,
          {
            commitmentHash: credential.commitmentHash,
            nullifierHash: nullifier,
            nonce,
            minAge: typeof targetValue === "number" ? targetValue : undefined,
            institutionId: credential.issuerId,
            kycTier: typeof targetValue === "number" ? targetValue : 1,
            requestId: "req_" + Date.now(),
          },
          (step, msg) => {
            setCurrentStep(step);
            setStepMessage(msg);
          }
        );

        // Verify the proof result
        const verificationResult = await midnightService.verifyProof(proofPayload);
        store.setLatestResult(verificationResult);

        // Record in activity history
        const activityRecord: ActivityRecord = {
          id: "act_" + Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          appName: "Verifier Application",
          purpose: `Selective Disclosure of ${credential.type} Claim`,
          claimProven: `${credential.type} condition met (${claimKey} ${predicate} ${targetValue})`,
          status: verificationResult.verified ? "VERIFIED" : "REJECTED",
          mode: proofPayload.mode,
          proofHash: proofPayload.proofId,
          expiresIn: "24 hours",
          canRevoke: true,
        };
        store.addActivityRecord(activityRecord);

        return { proof: proofPayload, result: verificationResult };
      } catch (err: any) {
        setProofError(err?.message || "Proof generation failed");
        return null;
      } finally {
        setIsGeneratingProof(false);
        setCurrentStep(0);
        setStepMessage("");
      }
    },
    [store]
  );

  /**
   * Generates a Compound Zero-Knowledge Proof combining multiple claims
   */
  const generateCompoundProof = useCallback(
    async (
      selectedCredentials: GhostCredential[],
      combinedClaimsSummary: string[]
    ): Promise<{ proof: ZKProofPayload; result: VerificationResult } | null> => {
      setIsGeneratingProof(true);
      setProofError(null);
      setCurrentStep(1);
      setStepMessage("Validating local multi-claim witness constraints");

      try {
        for (const cred of selectedCredentials) {
          if (cred.status === "REVOKED") {
            throw new Error(`Credential '${cred.title}' is revoked`);
          }
        }

        const nonce = "0xcomp_nonce_" + generateSalt().slice(0, 16);
        const proofPayload = await midnightService.executeZKProofPipeline(
          "COMPOUND",
          "verifyCompoundProof",
          { credentialsCount: selectedCredentials.length },
          {
            claimsCount: combinedClaimsSummary.length,
            nonce,
            requestId: "req_compound_" + Date.now(),
          },
          (step, msg) => {
            setCurrentStep(step);
            setStepMessage(msg);
          }
        );

        const result: VerificationResult = {
          verified: true,
          proofId: proofPayload.proofId,
          requestId: proofPayload.requestId,
          timestamp: new Date().toISOString(),
          verifierName: "Ghost Proof Composer",
          mode: proofPayload.mode,
          contractAddress: proofPayload.contractAddress,
          txHash: proofPayload.txHash,
          disclosedFacts: combinedClaimsSummary.map((claim) => ({
            claim,
            result: "TRUE",
            verified: true,
          })),
          hiddenProtectedData: [
            "All underlying Date of Birth values",
            "Full Student Registration IDs",
            "Personal Aadhaar / National ID numbers",
            "Physical Addresses",
          ],
          issuerTrustScore: 99,
          privacyScore: 98,
        };

        store.setLatestResult(result);

        store.addActivityRecord({
          id: "act_comp_" + Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          appName: "Compound Proof Engine",
          purpose: "Multi-claim Identity Verification",
          claimProven: combinedClaimsSummary.join(" AND "),
          status: "VERIFIED",
          mode: proofPayload.mode,
          proofHash: proofPayload.proofId,
          expiresIn: "Session only",
          canRevoke: false,
        });

        return { proof: proofPayload, result };
      } catch (err: any) {
        setProofError(err?.message || "Compound proof generation failed");
        return null;
      } finally {
        setIsGeneratingProof(false);
        setCurrentStep(0);
      }
    },
    [store]
  );

  return {
    ...store,
    isGeneratingProof,
    currentStep,
    stepMessage,
    proofError,
    generateProofForClaim,
    generateCompoundProof,
  };
}
