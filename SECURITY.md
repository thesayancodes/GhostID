# GHOSTID Security Policy & Cryptographic Privacy Boundaries

## 1. Security Philosophy: "Prove More. Reveal Less."

GhostID is built around strict data minimization principles:
1. **Never persist raw identity documents on public ledgers.**
2. **Never expose user secrets or witness pre-images in client logs or URLs.**
3. **Never transmit unencrypted credentials to third-party AI or analytics services.**

---

## 2. Threat Model & Mitigation Strategies

| Threat Vector | Potential Impact | GhostID Mitigation |
|---|---|---|
| **Public Blockchain Scraping** | Identity theft, dox attack | All personal data is held in private witnesses. Public ledger receives only non-reversible Poseidon hashes and boolean satisfactions. |
| **Proof Replay Attack** | Impersonating a user with a captured proof | Every proof request generates an ephemeral verifier challenge nonce that is mathematically bound to a single-use nullifier hash. |
| **Revoked Credential Usage** | Using cancelled licenses or degrees | Circuits query the on-chain revocation ledger (`revokedCommitments.lookup()`) and reject invalidated proofs. |
| **Data Over-Collection by Verifiers** | Honeypots of user PII | GhostShield scores requests and flags unnecessary sensitive fields, suggesting minimal zero-knowledge alternatives. |
| **Third-Party AI Leakage** | Confidential identity data leaking to AI | GhostAI runs pre-flight client-side sanitization, preventing private records from reaching external LLM endpoints. |

---

## 3. Cryptographic Honesty & Boundaries

- GhostID avoids misleading security buzzwords such as "100% immune to all attacks" or "unhackable".
- Client-side security relies on local browser sandboxing and host device integrity.
- In simulated demo mode, proofs are clearly labeled as `"Demo verification"` to maintain total transparency.
