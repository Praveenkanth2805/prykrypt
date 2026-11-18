/**
 * Domain error used across the steganography / crypto layers so the UI can
 * present meaningful, non-leaky messages.
 */
export class PryKryptError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "PryKryptError";
    this.code = code;
  }
}

export function toMessage(error: unknown, fallback = "Something went wrong."): string {
  if (error instanceof PryKryptError) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}