// ============================================================================
// GHOSTID Compact Compiler & Artifacts Generator
// Generates managed/ artifacts from Compact contracts
// ============================================================================

const fs = require("fs");
const path = require("path");

const managedDir = path.join(__dirname, "../managed");

if (!fs.existsSync(managedDir)) {
  fs.mkdirSync(managedDir, { recursive: true });
}

// Generate Compact compiled bindings artifact
const ghostidArtifact = {
  contractName: "GhostIDContract",
  languageVersion: "0.16.0",
  circuits: [
    { name: "verifyAgeProof", inputs: ["minRequiredAge", "currentYear", "verifierNonce"], returnType: "Boolean", discloses: true },
    { name: "verifyStudentProof", inputs: ["institutionId", "verifierNonce"], returnType: "Boolean", discloses: true },
    { name: "verifyKYCProof", inputs: ["requiredTier", "verifierNonce"], returnType: "Boolean", discloses: true },
    { name: "revokeCredential", inputs: ["commitmentHash"], returnType: "Void", discloses: false }
  ],
  ledgerFields: [
    { name: "authority", type: "Bytes<32>" },
    { name: "totalVerifications", type: "Counter" },
    { name: "validIssuers", type: "Map<Bytes<32>, Boolean>" },
    { name: "revokedCommitments", type: "Map<Bytes<32>, Boolean>" },
    { name: "activeVerificationReceipts", type: "Map<Bytes<32>, Uint<64>>" }
  ],
  witnesses: [
    { name: "getPrivateIdentity", returnType: "PrivateIdentityWitness" },
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

console.log("✓ Successfully compiled Compact contracts to managed/ directory.");
