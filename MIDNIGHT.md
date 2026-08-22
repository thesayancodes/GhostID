# Midnight Network & Compact Integration Guide

## 1. Overview
Midnight is a data protection blockchain that enables decentralized applications to preserve data confidentiality through zero-knowledge cryptography. GhostID leverages Midnight's domain-specific smart contract language, **Compact**, to build privacy-preserving identity verification circuits.

---

## 2. Compact Contract Specifications (`contracts/ghostid.compact`)

### Language Pragma & Imports
```typescript
pragma language_version >= 0.16.0;
import CompactStandardLibrary;
```

### Public Ledger State
Public state is stored on the blockchain and visible to network participants:
- `authority: Bytes<32>`: Root administrative key.
- `totalVerifications: Counter`: Global tally of anonymous verifications.
- `validIssuers: Map<Bytes<32>, Boolean>`: Registry of approved issuer public key hashes.
- `revokedCommitments: Map<Bytes<32>, Boolean>`: Lookup table of invalidated credentials.
- `activeVerificationReceipts: Map<Bytes<32>, Uint<64>>`: Nonce-bound verification receipts.

### Private Witnesses
Private witnesses execute locally inside the user's browser:
```typescript
struct PrivateIdentityWitness {
  subjectSecret: Bytes<32>;
  issuerPublicKey: Bytes<32>;
  credentialType: Uint<16>;
  claimNumericValue: Uint<64>;
  claimStatusFlag: Boolean;
  blindingFactor: Bytes<32>;
  issuanceTimestamp: Uint<64>;
  expirationTimestamp: Uint<64>;
}

witness getPrivateIdentity(): PrivateIdentityWitness;
```

### Deliberate `disclose()`
Compact enforces privacy-by-default. The compiler forbids witness-derived data from writing to the ledger unless explicitly wrapped in `disclose()`.
```typescript
export circuit verifyAgeProof(minAge: Uint<16>, currentYear: Uint<16>, nonce: Bytes<32>): Boolean {
  const priv = getPrivateIdentity();
  assert(priv.credentialType == 1, "Expected AGE credential");
  assert(currentYear <= (priv.expirationTimestamp as Uint<16>), "Expired");
  
  const calculatedAge = currentYear - (priv.claimNumericValue as Uint<16>);
  const satisfiesClaim = calculatedAge >= minRequiredAge;
  
  totalVerifications.increment(1);
  return disclose(satisfiesClaim);
}
```

---

## 3. Lace Wallet & DApp Connector Integration

GhostID connects to the official Midnight Lace browser extension via `window.midnight.mnLace`:

```typescript
const mnLace = window.midnight.mnLace;
const api = await mnLace.enable();
const state = await api.state();
const uris = await api.serviceUriConfig();
```

---

## 4. Honest Dual Mode Support
- **Midnight Live Mode:** Connects to Midnight Preprod / Preview with real Lace wallet integration and proof server pipelines (`"Verified on Midnight"`).
- **Demo Sandbox Mode:** Provides identical local cryptographic simulation for testing when external testnet nodes are unreachable (`"Demo verification"`).
