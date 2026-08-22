# GHOSTID Technical Architecture

```
User (Private Vault)
  ├── 1. Holds private credentials (DOB, Student ID, KYC, secret salts)
  ├── 2. Receives verification request challenge & nonce
  └── 3. Passes witness into local Compact Circuit
          ↓
Local Zero-Knowledge Prover (Client-side / Browser)
  ├── Evaluates mathematical constraints (e.g. currentYear - birthYear >= 18)
  ├── Generates zk-SNARK proof and nullifier hash
  └── Prepares deliberate disclose(satisfiesClaim)
          ↓
Midnight Network & Smart Contract (Preprod / Preview)
  ├── Checks validity against Authorized Issuer Registry
  ├── Checks that commitment has NOT been revoked on Revocation Ledger
  ├── Verifies zero-knowledge proof validity
  └── Increments public TotalVerifications counter & issues receipt
          ↓
Verifier Application / Gateway
  ├── Receives verified boolean attestation
  └── Confirms compliance with ZERO raw identity data exposed
```

---

## 1. Modular System Decomposition

### A. Ghost Wallet & Private Vault (`src/lib/store/ghostStore.ts`)
- Stored exclusively in local encrypted client storage.
- Contains raw identity fields (DOB, full legal name, ID numbers).
- Computes Poseidon/SHA-256 commitments with unique entropy salts.

### B. Proof Engine & Composer (`src/app/proof/` & `src/app/proof/composer/`)
- Compiles constraints for single or compound claims.
- Generates anti-replay nullifier hashes bound to verifier nonces.
- Executes 4-step progress pipeline with animated UI feedback.

### C. GhostIssuer Authority (`src/app/issuer/`)
- Allows organizations (Universities, Banks, Authorities) to sign commitments.
- Maintains the on-chain revocation ledger on Midnight smart contracts.

### D. GhostShield (`src/app/shield/`)
- Analyzes verification requests for over-collection of sensitive fields.
- Calculates heuristic privacy score (0-100) and recommends minimal ZK proofs.

### E. GhostAI Assistant (`src/app/ai/`)
- Explains privacy requests in natural language.
- Enforces local client-side redaction before query evaluation.

### F. GhostConnect Developer Portal (`src/app/developers/`)
- Provides TypeScript SDK interfaces, REST payloads, and Compact circuit references.
