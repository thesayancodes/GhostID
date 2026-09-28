# How to Use GhostID Intent

GhostID Intent is a Privacy Policy-to-Proof protocol built on the Midnight Network. It enables decentralized applications (verifiers) to request verifiable zero-knowledge identity proofs without collecting, seeing, or storing any underlying personal documents.

---

## What You Need

Before you begin, ensure you have:
1. **A Web Browser**: Google Chrome, Brave, Microsoft Edge, or Firefox.
2. **Midnight Lace Wallet (Optional for Live Preprod)**: Installed via browser extension with Midnight Preprod network enabled and testnet tDUST for on-chain gas.
3. **Demo Sandbox Mode (Default)**: If you do not have a Lace wallet installed, GhostID runs in zero-friction **Demo Sandbox Mode**, providing fully functional cryptographic simulations of Midnight Compact circuits and private witness generation directly in your browser.

---

## Step-by-Step Guide

### Step 1: Connect Your Vault or Wallet
1. Open the GhostID application in your browser.
2. Click **Connect Lace Wallet** in the top navigation bar.
3. If using Lace Wallet, approve the connection request in the Lace popup.
4. If testing without Lace, switch the network selector to **Demo Sandbox** to use a pre-loaded, simulated private credential vault.

---

### Step 2: Receive or Create an Identity Intent
1. Navigate to **Intent Protocol** in the top navigation menu (`/intent`).
2. Select a preset intent or create a custom request:
   - **Age Threshold**: Proves `Age >= 18` for age-gated purchases.
   - **Student Attestation**: Proves `Student = Active` for academic discounts.
   - **KYC Tier**: Proves `KYC >= Tier 1` for regulated financial services.
   - **Composite Intent**: Proves multiple facts simultaneously in one transaction.
3. Review the machine-readable intent payload:
   - **Purpose**: Why the verifier requires verification.
   - **Required Claims**: Exact mathematical predicates to prove.
   - **Expiration & Nonce**: Cryptographic challenge to prevent replay attacks.
   - **Allowed Disclosure**: Confirmed as `PREDICATE_RESULT_ONLY`.

---

### Step 3: Run GhostShield 2.0 Over-Collection Analysis
1. Switch to the **GhostShield 2.0 Firewall** tab.
2. Observe how GhostShield inspects the inbound request.
3. If an invasive verifier attempts to collect your Full Name, Date of Birth, Home Address, or Passport Number, GhostShield flags these fields in red as **Over-Collection**.
4. Click **Apply Intent Minimization Firewall** to replace invasive data transfer with a minimal zero-knowledge proof.

---

### Step 4: Review Proof Router Credential Matching
1. Switch to the **Proof Router & Vault** tab.
2. The Proof Router automatically matches the required claims against your locally encrypted private credentials.
3. Verify that compatible credentials exist in your vault (marked with green checkmarks).

---

### Step 5: Execute Zero-Knowledge Proof & Generate Privacy Receipt
1. Return to the **Intent Studio** and click **Execute Policy Proof & Emit Receipt**.
2. GhostID evaluates the private witness locally on your device, executes the Midnight Compact circuit, verifies against the on-chain revocation ledger, and consumes the challenge nonce.
3. Upon completion, an immutable **Privacy Receipt** is issued showing:
   - Verifier Name & Purpose
   - Claims Proven
   - **Raw Identity Disclosed: NO (0 bytes leaked)**
   - Cryptographic Receipt Hash & Midnight Contract Address
4. Click **Copy Cryptographic Receipt** to share or archive your proof audit trail.

---

### Step 6: Use GhostAI Natural Language Policy Compiler
1. Switch to the **GhostAI Policy Assistant** tab.
2. Type any plain English business rule (e.g., *"Verify that this customer is over 18 and an active student for discounted festival tickets"*).
3. Click **Compile Intent & Open Studio** to automatically convert your natural language requirement into a machine-readable Intent schema.

---

## What Gets Proved (and What Stays Private)

| Data Point | What Happens | Destination |
|---|---|---|
| **Proof Satisfaction Result (`true`/`false`)** | Disclosed on-chain | Verifier & Smart Contract |
| **Verifier Nonce & Receipt Hash** | Recorded on public ledger | Verifier & Smart Contract |
| **Target Predicate (e.g. `Age >= 18`)** | Validated via ZK Circuit | Smart Contract |
| **Exact Date of Birth (DOB)** | **Kept 100% Private** | **Never leaves your device** |
| **Full Legal Name** | **Kept 100% Private** | **Never leaves your device** |
| **Physical Residential Address** | **Kept 100% Private** | **Never leaves your device** |
| **Government Passport / National ID Number** | **Kept 100% Private** | **Never leaves your device** |
| **Student Enrollment ID Number** | **Kept 100% Private** | **Never leaves your device** |
| **Cryptographic Secret Keys & Blinding Salts** | **Kept 100% Private** | **Never leaves your device** |

---

## Troubleshooting

### Lace Wallet Not Connecting
- Ensure the Midnight Lace wallet extension is installed and unlocked.
- Verify that the network inside Lace is set to **Midnight Preprod**.
- If connection fails or extension is absent, use **Demo Sandbox Mode** from the top network dropdown.

### Credential Not Found or Expired
- If the Proof Router indicates *Missing/Unsatisfied*, navigate to `/credentials/add` to import a new simulated or issuer-signed credential.

### Nonce Already Processed
- If a proof fails with *Intent nonce already processed*, the verifier's challenge nonce was previously consumed. Generate a fresh Intent to obtain a new unique nonce.
