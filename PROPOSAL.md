# Product Proposal: GHOSTID

## What is the product, and who uses it?
GhostID is a privacy-first decentralized identity and selective credential verification platform built on the Midnight blockchain. It allows users to prove verified facts about themselves (such as `Age >= 18`, `Student Status = Active`, or `KYC Tier 1 = Verified`) without revealing their underlying personal data (exact date of birth, legal name, physical address, or national ID numbers).

**Target Users:**
1. **Normal Consumers / Web Users:** Everyday individuals needing to pass age gates, access student discounts, or sign up for financial services without exposing raw identity documents to third-party databases.
2. **Credential Issuers (Universities, Banks, Government Authorities):** Organizations that issue cryptographically signed identity commitments and maintain verifiable on-chain revocation registries.
3. **Verifiers & DApps:** DeFi protocols, exchanges, e-commerce platforms, and venues needing zero-knowledge compliance verification without taking on the regulatory and breach liabilities of storing sensitive customer data.
4. **Developers:** Engineers integrating minimal privacy-preserving verification using the GhostID TypeScript SDK and Compact smart contracts.

---

## Why Midnight specifically?
Transparent blockchains (such as Ethereum, Solana, or Bitcoin) record all transaction inputs, caller addresses, and state variables publicly on-chain. Deploying an identity verification system on a transparent chain inherently forces a fatal trade-off: either dox the user's personal data publicly, or rely on centralized off-chain servers that defeat decentralization.

Midnight solves this fundamentally through:
1. **Dual State Architecture (Public Ledger vs. Private Witnesses):** Sensitive data (birth years, student IDs, KYC numbers) is evaluated exclusively within the user's client-side private witness.
2. **Compact Smart Contracts:** Native zero-knowledge circuit compilation where the compiler enforces privacy-by-default, ensuring private witness data cannot leak without deliberate `disclose()` directives.
3. **On-Chain Zero-Knowledge Verification:** Midnight verifies the validity of mathematical proofs on-chain and updates public counters and revocation registries while maintaining complete anonymity for the subject.
4. **DApp Connector & Lace Wallet Integration:** Native privacy-preserving wallet architecture designed specifically for zero-knowledge interactions.

---

## Data Model

| Data Point | Type | Disclosed To |
|---|---|---|
| Platform Authority Public Key | Public ledger | Everyone (On-chain) |
| Total Global Verification Counter | Public ledger | Everyone (On-chain) |
| Authorized Issuer Public Key Hashes | Public ledger | Everyone (On-chain) |
| Revocation Commitment Hashes | Public ledger | Everyone (On-chain) |
| Disclosed Proof Satisfaction Boolean (`true`/`false`) | Public ledger / Verifier Receipt | Verifier & Smart Contract |
| Ephemeral Verifier Challenge Nonce | Public ledger / Circuit Input | Verifier & Smart Contract |
| User Exact Date of Birth (DOB) | Private witness | **No one (Local Device Only)** |
| Full Legal Name | Private witness | **No one (Local Device Only)** |
| National Identity / Passport / Aadhaar Number | Private witness | **No one (Local Device Only)** |
| Physical Home Address & Postal Code | Private witness | **No one (Local Device Only)** |
| University Student Registration ID & Grades | Private witness | **No one (Local Device Only)** |
| User Cryptographic Secret Key & Blinding Salts | Private witness | **No one (Local Device Only)** |

---

## Mainnet Feasibility
Yes, GhostID is highly feasible for production Mainnet deployment by Level 6.

1. **Lightweight Circuit Footprint:** The Compact circuits (`verifyAgeProof`, `verifyStudentProof`, `verifyKYCProof`) evaluate basic arithmetic inequality, equality, and Merkle/hash commitment constraints, requiring minimal proof generation time (< 1.5s in standard browser environments).
2. **Standardized Credential Commitments:** The cryptographic commitment scheme aligns with W3C Verifiable Credentials and Poseidon/Pedersen hash standards on Midnight.
3. **Decoupled Architecture:** Issuers publish only commitment roots and revocation hashes, making on-chain storage extremely lightweight and cost-effective.
4. **Full Production Stack:** GhostID features a modular Next.js frontend, Lace DApp connector integration, and an extensible SDK adapter pattern.
