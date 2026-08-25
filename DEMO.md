# GHOSTID MVP Demonstration & Evaluation Guide

This guide walks judges and evaluators through the complete GhostID user journey and demo scenarios.

---

## 2-Minute Demo Flow

### Step 1: Landing Page & WOW Hero Demonstration
1. Open **[https://ghostid-midnight.vercel.app](https://ghostid-midnight.vercel.app)** (or `http://localhost:3000` locally).
2. Examine the **Side-by-Side Hero Comparison**:
   - **Left:** Traditional verification (Name, DOB, Address, ID exposed).
   - **Right:** GhostID zero-knowledge verification (Only `Age >= 18 ✓` revealed; all raw personal fields remain `HIDDEN`).
3. Click **"Simulate ZK Proof"** to watch the real-time circuit execution.
4. Try the interactive **"Generate Proof & Call Circuit"** widget right on the landing page.

### Step 2: Private Credential Vault
1. Navigate to `/dashboard` & `/credentials`.
2. Inspect the 3 active credentials in the local encrypted witness vault:
   - **Age Attestation (Over 18)**
   - **University Student Status**
   - **KYC Compliance Tier 1**
3. Notice that raw sensitive dates and registration numbers are marked as *Encrypted Locally*.

### Step 3: Verification Request & User Consent Flow
1. Navigate to `/requests` to create a challenge as a verifier, or open an existing request (e.g. `/requests/req_demo_age_18`).
2. Examine the **Identity Consent Screen**:
   - **Requested Claim:** `☑ Age >= 18`
   - **Protected Fields:** Name, DOB, Address, Passport (Marked as `Zero Disclosure`).
   - **Privacy Score:** `94/100`.
3. Click **"Approve & Generate Proof"**.
4. Watch the 4-step Zero-Knowledge proof generation pipeline:
   - *1. Reading private credential*
   - *2. Building ZK proof*
   - *3. Verifying on Midnight*
   - *4. Finalizing selective disclosure*
5. View the resulting **Selective Disclosure Breakdown** showing verified status and protected fields.

### Step 4: Ghost Proof Composer
1. Navigate to `/proof/composer`.
2. Select multiple claims: `Age >= 18` AND `KYC Tier 1` AND `Student Status`.
3. Notice: **"3 requirements selected &rarr; 1 Single ZK Proof Generated"**.
4. Click **"Generate Compound Proof"** to verify that all conditions are proven in a single consolidated attestation.

### Step 5: GhostShield & GhostAI
1. Navigate to `/shield` to test the Privacy Analyzer against over-collecting data forms.
2. Navigate to `/ai` to ask GhostAI why websites request specific identity documents and receive minimal proof recommendations.

### Step 6: Test Suite & CI/CD
1. In your terminal, run:
   ```bash
   npm test
   ```
2. Confirm all 8 tests pass covering circuit logic, ledger state transitions, and privacy isolation.
