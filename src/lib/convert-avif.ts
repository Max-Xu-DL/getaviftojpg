export type JpegResult = {
  blob: Blob;
  width: number;
  height: number;
};

/**
 * Decode an AVIF with the browser's built-in decoder and encode a JPEG.
 * No bytes are uploaded. createImageBitmap uses the native AVIF decoder
 * (Chromium, Firefox, Safari). If that call fails, an HTMLImageElement
 * is tried before giving up. Pixels are matted on white because JPEG
 * has no alpha channel.
 */
export async function convertAvifToJpeg(
  file: File,
  quality: number,
): Promise<JpegResult> {
  const bitmap = await decodeAvif(file);
  try {
    if (bitmap.width < 1 || bitmap.height < 1) {
      throw new Error("That AVIF has no visible pixels.");
    }

    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      throw new Error("This browser could not open a canvas.");
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0);

    const clamped = Math.min(1, Math.max(0.05, quality));
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result && result.size > 0) {
            resolve(result);
            return;
          }
          reject(new Error("This browser could not encode a JPEG."));
        },
        "image/jpeg",
        clamped,
      );
    });

    return { blob, width: bitmap.width, height: bitmap.height };
  } finally {
    bitmap.close();
  }
}

async function decodeAvif(file: File): Promise<ImageBitmap> {
  if (typeof createImageBitmap !== "function") {
    throw new Error(
      "This browser cannot decode AVIF. Update Chrome, Edge, Firefox, or Safari.",
    );
  }

  try {
    return await createImageBitmap(file);
  } catch {
    return decodeWithImageElement(file);
  }
}

function decodeWithImageElement(file: File): Promise<ImageBitmap> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    const fail = () => {
      URL.revokeObjectURL(url);
      reject(new Error("This browser could not decode that AVIF."));
    };

    image.onload = () => {
      createImageBitmap(image).then(
        (bitmap) => {
          URL.revokeObjectURL(url);
          resolve(bitmap);
        },
        fail,
      );
    };
    image.onerror = fail;
    image.src = url;
  });
}

export function conversionErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    if (/too large|exceeds|exceed|canvas/i.test(error.message)) {
      return "That image is too large for this browser to draw. Resize it and try again.";
    }
    if (
      /decode|JPEG|canvas|pixels|browser/i.test(error.message) &&
      error.message.length < 180
    ) {
      return error.message;
    }
  }
  return "This browser could not decode that AVIF. Update Chrome, Edge, Firefox, or Safari and try again.";
}
