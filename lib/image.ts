import { PryKryptError } from "./errors";

/** ~20 megapixels — keeps ImageData allocation within safe browser limits. */
export const MAX_PIXELS = 20_000_000;

export interface LoadedImage {
  data: ImageData;
  hadTransparency: boolean;
  transparencyFlattened: boolean;
}

/* ------------------------------------------------------------------ */
/*  Low-level decoding                                                 */
/* ------------------------------------------------------------------ */

function bitmapToImageData(bitmap: ImageBitmap): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new PryKryptError("CANVAS_UNAVAILABLE", "Canvas 2D is unavailable in this browser.");
  }
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(bitmap, 0, 0);
  return ctx.getImageData(0, 0, bitmap.width, bitmap.height);
}

async function decodeViaBitmap(blob: Blob): Promise<ImageData | null> {
  if (typeof createImageBitmap !== "function") return null;

  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(blob, {
      premultiplyAlpha: "none",
      colorSpaceConversion: "none",
    });
  } catch {
    try {
      bitmap = await createImageBitmap(blob);
    } catch {
      return null;
    }
  }

  try {
    if (bitmap.width * bitmap.height > MAX_PIXELS) {
      throw new PryKryptError(
        "IMAGE_TOO_LARGE",
        `Images larger than ${Math.round(MAX_PIXELS / 1_000_000)} megapixels are not supported for browser memory safety.`,
      );
    }
    return bitmapToImageData(bitmap);
  } finally {
    bitmap.close();
  }
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(
        new PryKryptError("IMAGE_LOAD_FAILED", "This image could not be decoded by your browser."),
      );
    image.src = src;
  });
}

async function decodeViaImage(blob: Blob): Promise<ImageData> {
  const url = URL.createObjectURL(blob);
  try {
    const image = await loadImage(url);
    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;

    if (!width || !height) {
      throw new PryKryptError("INVALID_IMAGE", "The image has no readable dimensions.");
    }
    if (width * height > MAX_PIXELS) {
      throw new PryKryptError(
        "IMAGE_TOO_LARGE",
        `Images larger than ${Math.round(MAX_PIXELS / 1_000_000)} megapixels are not supported for browser memory safety.`,
      );
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      throw new PryKryptError("CANVAS_UNAVAILABLE", "Canvas 2D is unavailable in this browser.");
    }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, width, height);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Read raw pixels from any image blob without modifying them. */
export async function readImageData(blob: Blob): Promise<ImageData> {
  const viaBitmap = await decodeViaBitmap(blob);
  if (viaBitmap) return viaBitmap;
  return decodeViaImage(blob);
}

/* ------------------------------------------------------------------ */
/*  Transparency handling                                              */
/* ------------------------------------------------------------------ */

function detectTransparency(data: ImageData): boolean {
  const arr = data.data;
  for (let i = 3; i < arr.length; i += 4) {
    if (arr[i] !== 255) return true;
  }
  return false;
}

function flattenOntoBlack(data: ImageData): void {
  const arr = data.data;
  for (let i = 0; i < arr.length; i += 4) {
    const alpha = arr[i + 3];
    if (alpha === 255) continue;
    const factor = alpha / 255;
    arr[i] = Math.round(arr[i] * factor);
    arr[i + 1] = Math.round(arr[i + 1] * factor);
    arr[i + 2] = Math.round(arr[i + 2] * factor);
    arr[i + 3] = 255;
  }
}

/**
 * Decode an image for encoding. Semi-transparent pixels are composited onto
 * black so the resulting RGBA data is fully opaque and losslessly
 * round-trippable through canvas → PNG → canvas.
 */
export async function readImageForEncoding(blob: Blob): Promise<LoadedImage> {
  const data = await readImageData(blob);
  const hadTransparency = detectTransparency(data);

  if (hadTransparency) flattenOntoBlack(data);

  return {
    data,
    hadTransparency,
    transparencyFlattened: hadTransparency,
  };
}

/* ------------------------------------------------------------------ */
/*  Writing                                                            */
/* ------------------------------------------------------------------ */

export function cloneImageData(source: ImageData): ImageData {
  return new ImageData(new Uint8ClampedArray(source.data), source.width, source.height);
}

export function imageDataToPngBlob(imageData: ImageData): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new PryKryptError("CANVAS_UNAVAILABLE", "Canvas 2D is unavailable in this browser.");
  }
  ctx.putImageData(imageData, 0, 0);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new PryKryptError("ENCODE_FAILED", "The browser could not produce a PNG from this image."));
    }, "image/png");
  });
}