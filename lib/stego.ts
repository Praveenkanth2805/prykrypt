import {
  HEADER_LENGTH,
  parseHeader,
  type ContainerHeader,
} from "./container";
import { PryKryptError } from "./errors";

/** RGB LSBs are used. The alpha channel is never touched. */
export const CHANNELS_USED = 3;

export function getCapacityBytes(width: number, height: number): number {
  return Math.floor((width * height * CHANNELS_USED) / 8);
}

class BitReader {
  private position = 0;

  constructor(
    private readonly data: Uint8ClampedArray,
    private readonly capacityBits: number,
  ) {}

  get remainingBits(): number {
    return this.capacityBits - this.position;
  }

  readByte(): number {
    let byte = 0;
    for (let i = 0; i < 8; i += 1) {
      const pixel = Math.floor(this.position / CHANNELS_USED);
      const channel = this.position % CHANNELS_USED;
      byte = (byte << 1) | (this.data[pixel * 4 + channel] & 1);
      this.position += 1;
    }
    return byte;
  }

  readBytes(count: number): Uint8Array {
    const out = new Uint8Array(count);
    for (let i = 0; i < count; i += 1) out[i] = this.readByte();
    return out;
  }
}

/** Writes `bytes` into the RGB LSBs of `imageData` (mutates in place). */
export function embedBytes(imageData: ImageData, bytes: Uint8Array): void {
  const capacityBits = imageData.width * imageData.height * CHANNELS_USED;
  const neededBits = bytes.length * 8;

  if (neededBits > capacityBits) {
    throw new PryKryptError(
      "CAPACITY_EXCEEDED",
      "The payload does not fit in this image. Use a larger cover image.",
    );
  }

  const data = imageData.data;
  const totalPixels = imageData.width * imageData.height;
  let bitIndex = 0;

  for (let pixel = 0; pixel < totalPixels && bitIndex < neededBits; pixel += 1) {
    const base = pixel * 4;
    for (let channel = 0; channel < CHANNELS_USED && bitIndex < neededBits; channel += 1) {
      const byte = bytes[bitIndex >> 3];
      const bit = (byte >> (7 - (bitIndex & 7))) & 1;
      data[base + channel] = (data[base + channel] & 0xfe) | bit;
      bitIndex += 1;
    }
  }
}

/** Reads the PryKrypt container (header + body) out of an image. */
export function extractContainer(imageData: ImageData): {
  header: ContainerHeader;
  body: Uint8Array;
} {
  const capacityBits = imageData.width * imageData.height * CHANNELS_USED;

  if (capacityBits < HEADER_LENGTH * 8) {
    throw new PryKryptError("INVALID_IMAGE", "This image is too small to contain a PryKrypt payload.");
  }

  const reader = new BitReader(imageData.data, capacityBits);
  const headerBytes = reader.readBytes(HEADER_LENGTH);
  const header = parseHeader(headerBytes);

  const availableBytes = Math.floor(reader.remainingBits / 8);
  if (header.bodyLength > availableBytes) {
    throw new PryKryptError(
      "CORRUPT_PAYLOAD",
      "The hidden payload length exceeds this image's capacity. The file may be corrupted or edited.",
    );
  }

  const body = reader.readBytes(header.bodyLength);
  return { header, body };
}