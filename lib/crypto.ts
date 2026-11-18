import { PryKryptError } from "./errors";

const PBKDF2_ITERATIONS = 210_000;
const KEY_LENGTH = 256;

export const SALT_LENGTH = 16;
export const IV_LENGTH = 12;
export const GCM_TAG_LENGTH = 16;
/** salt + iv + GCM auth tag */
export const ENCRYPTION_OVERHEAD = SALT_LENGTH + IV_LENGTH + GCM_TAG_LENGTH;

const encoder = new TextEncoder();

export function isCryptoAvailable(): boolean {
  return typeof globalThis.crypto !== "undefined" && !!globalThis.crypto.subtle;
}

function assertCrypto(): void {
  if (!isCryptoAvailable()) {
    throw new PryKryptError(
      "CRYPTO_UNAVAILABLE",
      "Web Crypto is unavailable. Open PryKrypt over HTTPS (or localhost) in a modern browser.",
    );
  }
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as unknown as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: KEY_LENGTH },
    false,
    ["encrypt", "decrypt"],
  );
}

/** Returns salt | iv | ciphertext+tag */
export async function encryptBytes(plaintext: Uint8Array, password: string): Promise<Uint8Array> {
  assertCrypto();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(password, salt);

  const cipher = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv as unknown as BufferSource },
      key,
      plaintext as unknown as BufferSource,
    ),
  );

  const out = new Uint8Array(SALT_LENGTH + IV_LENGTH + cipher.length);
  out.set(salt, 0);
  out.set(iv, SALT_LENGTH);
  out.set(cipher, SALT_LENGTH + IV_LENGTH);
  return out;
}

/** Expects salt | iv | ciphertext+tag. Throws on wrong password. */
export async function decryptBytes(blob: Uint8Array, password: string): Promise<Uint8Array> {
  assertCrypto();

  if (blob.length < SALT_LENGTH + IV_LENGTH + GCM_TAG_LENGTH) {
    throw new PryKryptError(
      "CORRUPT_PAYLOAD",
      "The encrypted payload is incomplete. The image may be corrupted.",
    );
  }

  const salt = blob.subarray(0, SALT_LENGTH);
  const iv = blob.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const cipher = blob.subarray(SALT_LENGTH + IV_LENGTH);

  const key = await deriveKey(password, salt);

  try {
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv as unknown as BufferSource },
      key,
      cipher as unknown as BufferSource,
    );
    return new Uint8Array(plain);
  } catch {
    throw new PryKryptError(
      "WRONG_PASSWORD",
      "Incorrect password (or the hidden data is corrupted).",
    );
  }
}