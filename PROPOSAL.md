# GhostID Intent — Proposal

## GhostID Intent: Privacy Policy-to-Proof Layer for Midnight

GhostID is a privacy-first decentralized identity and selective credential verification platform built on the Midnight blockchain network.

The Level 4 upgrade introduces **GhostID Intent** — a new protocol-level layer that transforms GhostID from a proof generator into a **Privacy Policy-to-Proof firewall**.

---

## What is the product, and who uses it?

GhostID Intent changes the fundamental interface between verifiers and users.

Today, a verifier application may request a user's full name, date of birth, home address, and government ID even when its real requirement is only: **"Is this user over 18?"**

GhostID Intent forces every verification request to declare a structured **Identity Intent** containing:

- **Purpose** — why the verification is being requested
- **Required Claims** — the minimum set of mathematical predicates to evaluate (e.g. `AGE >= 18`)
- **Issuer Constraints** — trusted issuer authorities
- **Expiration** — time-bounded request with expiry
- **Nonce** — cryptographic challenge specific to this request
- **Allowed Disclosure** — `PREDICATE_RESULT_ONLY`

The user's private identity data remains on their device. Only the boolean result of the predicate evaluation is disclosed.

**Target Users:**
1. **Consumers / Web Users** — prove age, student status, or KYC compliance without handing over documents
2. **Verifier DApps** — declare precise intent and receive cryptographic proof without collecting PII
3. **Credential Issuers** — universities, government authorities, and KYC providers issuing signed credentials
4. **Developers** — integrate privacy-minimized verification via the GhostID SDK and Compact contracts

---

## Why Midnight specifically?

GhostID Intent is specifically designed around Midnight's privacy model.

Midnight provides programmable privacy and selective disclosure, allowing developers to define what remains private and what is disclosed through application logic and zero-knowledge proofs.

Key Midnight capabilities used:

1. **Dual State Architecture** — sensitive data (birth years, student IDs, KYC numbers, Intent witness hashes) is evaluated exclusively within the user's client-side private witness
2. **Compact Smart Contracts** — native zero-knowledge circuit compilation where `disclose()` is the only pathway for data to be published
3. **On-Chain ZK Verification** — Midnight verifies proof validity, consumes request nonces, and records Privacy Receipt hashes on the public ledger while the subject remains anonymous
4. **DApp Connector & Lace Wallet** — native privacy-preserving wallet architecture designed for zero-knowledge interactions

---

## Data Model

| Data Point | Type | Disclosed To |
|---|---|---|
| Contract Authority Public Key | Public ledger | Everyone |
| Total Global Verification Counter | Public ledger | Everyone |
| Authorized Issuer Public Key Hashes | Public ledger | Everyone |
| Revocation Commitment Hashes | Public ledger | Everyone |
| Processed Intent Nonces (replay prevention) | Public ledger | Everyone |
| Privacy Receipt Hash | Public ledger | Everyone |
| Disclosed Proof Satisfaction Boolean | Verifier & Contract | Verifier Only |
| Intent Hash (binding nonce + purpose + claims) | Circuit input only | Verifier & Circuit |
| **User Exact Date of Birth (DOB)** | **Private witness** | **No one** |
| **Full Legal Name** | **Private witness** | **No one** |
| **National Identity / Passport Number** | **Private witness** | **No one** |
| **Physical Home Address** | **Private witness** | **No one** |
| **University Student Registration ID** | **Private witness** | **No one** |
| **User Cryptographic Secret Key & Blinding Salts** | **Private witness** | **No one** |
| **Intent Witness (verifier ID, purpose hash, consent secret)** | **Private witness** | **No one** |

---

## New GhostID Intent Components Built for Level 4

### 1. Identity Intent Schema (`src/lib/intent/index.ts`)
Machine-readable structured format for purpose, claims, issuer constraints, nonce, and expiration.

### 2. Policy Engine
Converts verification requirements into explicit, cryptographic claim policies.

### 3. Proof Router
Matches required intent claims against the user's available private credentials to produce a minimal composite proof plan.

### 4. `verifyIntentPolicyProof()` Compact Circuit (`contracts/ghostid.compact`)
New ZK circuit that binds the verification execution to the declared Intent hash, preventing scope expansion.

### 5. GhostShield 2.0
Analyzes inbound verification requests for unnecessary raw personal data collection and recommends Intent minimization.

### 6. Privacy Receipt
Immutable, off-chain auditable record of what was verified, by whom, for what purpose, and what was disclosed (nothing).

### 7. GhostAI Policy Assistant
Natural language compiler: converts plain English business requirements into structured GhostID Identity Intents.

---

## Mainnet Feasibility

Yes, GhostID Intent is feasible for production Mainnet deployment.

1. **Lightweight Circuit Footprint** — `verifyIntentPolicyProof()` evaluates arithmetic inequality, equality, Merkle/hash commitment constraints, and nonce checks; proof generation under 1.5 seconds in standard browser environments.
2. **Standardized Credential Commitments** — commitment scheme aligns with W3C Verifiable Credentials and Poseidon/Pedersen hash standards.
3. **Decoupled Architecture** — issuers publish only commitment roots and revocation hashes; on-chain storage is extremely lightweight.
4. **Intent Protocol Reusability** — other Midnight dApps can integrate via the GhostID Intent SDK adapter without building their own identity verification systems.
