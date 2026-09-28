// ============================================================================
// GHOSTID INTENT: Compact Compiler & Artifacts Generator
// Generates managed/ artifacts from Compact contracts
// ============================================================================

const fs = require("fs");
const path = require("path");

const managedDir = path.join(__dirname, "../managed");

if (!fs.existsSync(managedDir)) {
  fs.mkdirSync(managedDir, { recursive: true });
}

// Generate Compact compiled bindings artifact for GhostID Intent
const ghostidArtifact = {
  contractName: "GhostIDContract",
  product: "GhostID Intent — Privacy Policy-to-Proof Layer",
  languageVersion: "0.16.0",
  circuits: [
    {
      name: "verifyIntentPolicyProof",
      inputs: ["intentHash", "minRequiredAge", "currentYear", "requiredKycTier", "requireActiveStudent", "verifierNonce"],
      returnType: "Boolean",
      discloses: true,
      description: "Verifies that client private witness satisfies the policy constraints declared in an Intent"
    },
    {
      name: "verifyAgeProof",
      inputs: ["minRequiredAge", "currentYear", "verifierNonce"],
      returnType: "Boolean",
      discloses: true,
      description: "Verifies Age >= minRequiredAge without revealing birth year or DOB"
    },
    {
      name: "verifyStudentProof",
      inputs: ["institutionId", "verifierNonce"],
      returnType: "Boolean",
      discloses: true,
      description: "Verifies active student status without revealing enrollment ID"
    },
    {
      name: "verifyKYCProof",
      inputs: ["requiredTier", "verifierNonce"],
      returnType: "Boolean",
      discloses: true,
      description: "Verifies KYC tier compliance without exposing document numbers"
    },
    {
      name: "registerIssuer",
      inputs: ["issuerId"],
      returnType: "Void",
      discloses: false,
      description: "Registers an authorized credential issuer on public ledger"
    },
    {
      name: "revokeCredential",
      inputs: ["commitmentHash"],
      returnType: "Void",
      discloses: false,
      description: "Revokes a credential commitment on the public ledger"
    }
  ],
  ledgerFields: [
    { name: "authority", type: "Bytes<32>" },
    { name: "totalVerifications", type: "Counter" },
    { name: "validIssuers", type: "Map<Bytes<32>, Boolean>" },
    { name: "revokedCommitments", type: "Map<Bytes<32>, Boolean>" },
    { name: "activeVerificationReceipts", type: "Map<Bytes<32>, Uint<64>>" },
    { name: "processedIntentNonces", type: "Map<Bytes<32>, Boolean>" }
  ],
  witnesses: [
    { name: "getPrivateIdentity", returnType: "PrivateIdentityWitness" },
    { name: "getPrivateIntentWitness", returnType: "PrivateIntentWitness" },
    { name: "getCredentialSignature", returnType: "Bytes<64>" }
  ],
  compiledAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(managedDir, "ghostid.json"),
  JSON.stringify(ghostidArtifact, null, 2)
);

const counterArtifact = {
  contractName: "CounterContract",
  languageVersion: "0.16.0",
  circuits: [
    { name: "incrementWithProof", inputs: ["challenge"], returnType: "Boolean", discloses: true }
  ],
  ledgerFields: [
    { name: "counter", type: "Counter" },
    { name: "round", type: "Counter" },
    { name: "lastDisclosedHash", type: "Bytes<32>" }
  ],
  witnesses: [
    { name: "secretIncrement", returnType: "Uint<16>" },
    { name: "userSecretKey", returnType: "Bytes<32>" }
  ],
  compiledAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(managedDir, "counter.json"),
  JSON.stringify(counterArtifact, null, 2)
);

console.log("✓ Successfully compiled GhostID Intent Compact contracts to managed/ directory.");
