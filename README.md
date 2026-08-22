# GHOSTID
[![GhostID Midnight CI/CD](https://github.com/thesayancodes/GhostID/actions/workflows/ci.yml/badge.svg)](https://github.com/thesayancodes/GhostID/actions/workflows/ci.yml)

> **"Prove Who You Are. Reveal Nothing You Don't Need To."**  
> *Your identity is yours. Your proof is public. Your data stays private.*

---

## Live Demo
- **Live dApp URL:** [https://ghostid-midnight.vercel.app](https://ghostid-midnight.vercel.app) *(or local preview `http://localhost:3000`)*

---

## Contract Address
| Network | Address |
|---|---|
| **Preprod** | `0200078b5490a2ec7e19b5b2909476839352e1320efb5cc1269fa628c68c17bdf75f` |
| **Preview** | `02000a6c98f92bd87e21a4f0285918239045e1290fab4bc098fa618c728c19adfa4e` |

---

## What This Does
GhostID is a privacy-first decentralized identity and credential verification platform designed for the **Midnight Network**. Instead of forcing users to upload raw identity documents (passports, driver's licenses, student cards) to third-party databases, GhostID allows users to generate zero-knowledge attestations from locally stored private credentials.

**Supported Initial Credential Types:**
1. **Age Attestation:** Prove `Age >= 18` or `Age >= 21` without revealing Date of Birth, Name, or Address.
2. **Student Status:** Prove `Student = Active` from a recognized institution without exposing Student Registration ID or grades.
3. **KYC Compliance:** Prove `KYC Tier >= 1 Verified` without disclosing passport or national ID numbers.

---

## Privacy Model
- **What is PUBLIC (On-chain, visible to anyone):**
  - Contract authority public key.
  - Global verification counter tally.
  - Authorized issuer public key hashes.
  - Revocation commitment hashes.
  - Verification challenge nonces and receipt hashes.
  - The disclosed binary result (`true`/`false`) signifying that the cryptographic constraint was satisfied.
- **What is PRIVATE (Private witness, never on-chain or transmitted):**
  - Full Legal Name, Exact Date of Birth (DOB), and Age calculation values.
  - Physical street address, postal code, and contact information.
  - National ID / Passport / Aadhaar numbers.
  - University student IDs, transcripts, and faculty details.
  - User private cryptographic secret key and commitment blinding salts.
- **What the user PROVES without revealing:**
  - That their private attributes satisfy the verifier's mathematical predicate (e.g. `Age >= 18`).
  - That the credential was signed by an authorized issuing authority.
  - That the credential commitment has not expired and has not been revoked on the Midnight ledger.

---

## Privacy Claim
> **Specific Statement:**  
> An on-chain observer or verifier sees **only** a zero-knowledge attestation receipt and a valid boolean result confirming constraint satisfaction. They **cannot** see, extract, or reconstruct the user's Date of Birth, Legal Name, National ID, Address, or Student Registration ID. Private inputs are processed strictly inside the client's local Compact circuit witness and are never written to the public ledger.

---

## Tech Stack
- **Blockchain & ZK:** Midnight Network, Compact Smart Contract Language, Midnight.js SDK (`@midnight-ntwrk/dapp-connector-api`), Lace Wallet.
- **Frontend & UI:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React, Zustand State Management.
- **Testing & Tooling:** Vitest, Docker (Midnight Proof Server), GitHub Actions CI/CD.

---

## Prerequisites
- **Node.js v22+**
- **Docker** *(Optional for local proof server `midnightnetwork/proof-server`)*
- **Midnight Lace Wallet Extension** *(Available on Chrome / Brave / Edge)*

---

## Setup & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/sayansadhukhin/GhostID.git
cd GhostID

# 2. Install dependencies
npm install

# 3. Compile Compact smart contracts to managed/ directory
npm run compile:contract

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Run Tests
The test suite validates circuit logic, ledger state transitions, and strict privacy isolation:

```bash
npm test
```

### Test Coverage Summary:
- **`tests/counter.test.ts`**:
  - `Test 1 (Circuit Logic)`: Verifies successful circuit execution when private witness meets constraints.
  - `Test 2 (State Transition)`: Asserts sequential public ledger counter increments.
  - `Test 3 (Privacy Isolation)`: Strictly asserts that private witness keys are never present in public outputs.
- **`tests/ghostid.test.ts`**:
  - Validates Age inequality threshold logic (`>= 18` pass vs `< 18` fail).
  - Validates Student and KYC compliance claim evaluation.
  - Validates Poseidon/Pedersen-style cryptographic commitment computation.
  - Validates GhostShield heuristic privacy score calculation.

---

## CI/CD Pipeline
The automated GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every `push` and `pull_request` to `main`:
1. Checks out repository on `ubuntu-latest`.
2. Installs Node.js v22 environment.
3. Installs dependencies (`npm ci`).
4. Compiles Compact contracts into `managed/`.
5. Executes Vitest test suite with full circuit and privacy assertions.
6. Builds the production Next.js application (`npm run build`).

---

## Product Proposal
See [PROPOSAL.md](file:///c:/Users/SAYAN%20SADHUKHIN/Desktop/GhostID/PROPOSAL.md) for the complete Rise In Builder Challenge submission details.

---

## Demo Video Checklist
For the under 2-minute demonstration video:
1. **Connect Wallet:** Connect Lace wallet (or toggle Demo Sandbox) and show the public address on screen.
2. **View Private Vault:** Show the 3 active credentials (Age, Student, KYC) and highlight that raw data is kept locally.
3. **Execute Circuit / Generate Proof:** Open a verification request (e.g. `Prove Age >= 18`), show the 4-step proof generation pipeline animation, and disclose the verified result on Midnight.
4. **Demonstrate Privacy Isolation:** Point out the side-by-side selective disclosure breakdown showing that Name, DOB, and ID remain 100% hidden.
5. **Show Test Suite & CI:** Display terminal output showing passing tests and the green CI badge.
