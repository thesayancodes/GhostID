// ============================================================================
// GHOSTID Cryptographic Engine & Local Proof Simulator
// Computes Pedersen/Poseidon-style commitments and ZK witness transformations
// ============================================================================

/**
 * Generates a high-entropy 32-byte cryptographic hex string (salt or blinding factor)
 */
export function generateSalt(): string {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback for non-browser / test environments
  let result = "";
  const hexChars = "0123456789abcdef";
  for (let i = 0; i < 64; i++) {
    result += hexChars[Math.floor(Math.random() * 16)];
  }
  return result;
}

/**
 * Computes a SHA-256 / Poseidon equivalent hex commitment from arbitrary fields
 */
export async function computeCommitment(
  secret: string,
  issuerId: string,
  claims: Record<string, any>,
  salt: string
): Promise<string> {
  const payload = JSON.stringify({ secret, issuerId, claims, salt });
  
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  
  // Fast deterministic hash fallback for synchronous/test execution
  let hash = 0x811c9dc5;
  for (let i = 0; i < payload.length; i++) {
    hash ^= payload.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, "0");
  return `0x${hex}${salt.slice(0, 56)}`;
}

/**
 * Computes a nullifier hash ensuring a proof cannot be replay-attacked
 */
export async function computeNullifier(
  commitmentHash: string,
  verifierNonce: string,
  subjectSecret: string
): Promise<string> {
  const raw = `${commitmentHash}:${verifierNonce}:${subjectSecret}`;
  let hash = 0x5a17b01d;
  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return `0xnull_${(hash >>> 0).toString(16).padStart(8, "0")}_${verifierNonce.slice(0, 16)}`;
}

/**
 * Local Privacy Evaluation: checks whether local claims satisfy verifier criteria
 * without exposing intermediate variables.
 */
export function evaluateLocalClaim(
  claimKey: string,
  predicate: ">=" | "==" | "<=" | "truthy",
  requiredValue: string | number | boolean,
  privateData: Record<string, any>
): { satisfied: boolean; debugDetail: string } {
  const privateValue = privateData[claimKey];

  if (privateValue === undefined || privateValue === null) {
    return { satisfied: false, debugDetail: `Claim '${claimKey}' not found in private vault` };
  }

  let satisfied = false;
  switch (predicate) {
    case ">=":
      satisfied = Number(privateValue) >= Number(requiredValue);
      break;
    case "<=":
      satisfied = Number(privateValue) <= Number(requiredValue);
      break;
    case "==":
      satisfied = String(privateValue).toLowerCase() === String(requiredValue).toLowerCase();
      break;
    case "truthy":
      satisfied = Boolean(privateValue) === true;
      break;
    default:
      satisfied = false;
  }

  return {
    satisfied,
    debugDetail: satisfied
      ? `Constraint satisfied: ${claimKey} ${predicate} ${requiredValue}`
      : `Constraint failed: ${claimKey} does not satisfy condition`,
  };
}

/**
 * Calculates heuristic privacy score (0-100) based on fields requested
 */
export function calculatePrivacyScore(
  requestedFields: string[],
  unnecessaryFields: string[],
  isZkUsed: boolean
): { score: number; riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" } {
  let score = 100;

  // Sensitive field penalties
  const highRiskFields = ["dob", "dateofbirth", "aadhaar", "ssn", "passport", "nationalid", "address", "rawsalary"];
  
  for (const field of requestedFields) {
    const lower = field.toLowerCase().replace(/[^a-z]/g, "");
    if (highRiskFields.includes(lower)) {
      score -= 25;
    } else {
      score -= 5;
    }
  }

  for (const _ of unnecessaryFields) {
    score -= 10;
  }

  if (isZkUsed) {
    // Zero-knowledge restoration bonus
    score = Math.min(100, score + 45);
  }

  score = Math.max(10, Math.min(100, score));

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW";
  if (score < 50) riskLevel = "CRITICAL";
  else if (score < 70) riskLevel = "HIGH";
  else if (score < 85) riskLevel = "MEDIUM";

  return { score, riskLevel };
}
