export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;

  const units = ["KB", "MB", "GB"] as const;
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const shown = value >= 10 ? value.toFixed(0) : value.toFixed(1);
  return `${shown} ${units[unitIndex]}`;
}

export function jpgFileName(name: string): string {
  const trimmed = name.trim();
  if (/\.avif$/i.test(trimmed)) {
    const stem = trimmed.replace(/\.avif$/i, "");
    return `${stem || "image"}.jpg`;
  }
  return `${trimmed || "image"}.jpg`;
}
