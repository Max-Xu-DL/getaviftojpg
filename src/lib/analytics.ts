"use client";

import { track } from "@vercel/analytics";

/**
 * Conversion events for Vercel Web Analytics.
 * Properties are counts and short outcomes only. Do not pass file names,
 * byte lengths, dimensions, or anything taken from the image.
 * `track` stores nothing until Web Analytics is enabled for the project.
 */
export type ConversionErrorKind =
  | "not_avif"
  | "too_large"
  | "decode"
  | "encode"
  | "browser";

export function conversionErrorKind(message: string): ConversionErrorKind {
  if (/too large/i.test(message)) return "too_large";
  if (/encode a jpeg/i.test(message)) return "encode";
  if (/decode|no visible pixels/i.test(message)) return "decode";
  return "browser";
}

export function trackFilesAdded(count: number) {
  if (count < 1) return;
  track("files_added", { count });
}

export function trackConversionResult(
  outcome: "ready" | "error",
  errorKind?: ConversionErrorKind,
) {
  if (outcome === "error" && errorKind) {
    track("conversion_result", { outcome, error_kind: errorKind });
    return;
  }
  track("conversion_result", { outcome });
}

export function trackDownloadStarted(count: number) {
  if (count < 1) return;
  track("download_started", { count });
}

export function trackSampleOpened(outcome: "loaded" | "failed") {
  track("sample_opened", { outcome });
}
