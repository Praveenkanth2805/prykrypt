import { PryKryptError } from "./errors";

/** ~20 megapixels — keeps ImageData allocation within safe browser limits. */
export const MAX_PIXELS = 20_000_000;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new PryKryptError("IMAGE_LOAD_FAILED", "This image could not be decoded by your browser."));
    image.src = src;
  });
}

export async function imageToImageData(image: HTMLImageElement): Promise<ImageData> {
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

  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, width, height);
}

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

export async function blobToImageData(blob: Blob): Promise<ImageData> {
  const url = URL.createObjectURL(blob);
  try {
    const image = await loadImage(url);
    return await imageToImageData(image);
  } finally {
    URL.revokeObjectURL(url);
  }
}