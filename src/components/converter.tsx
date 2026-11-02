"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  conversionErrorMessage,
  convertAvifToJpeg,
} from "@/lib/convert-avif";
import { formatBytes, jpgFileName } from "@/lib/format";

const DEFAULT_QUALITY = 92;
const MAX_FILES = 30;

type ItemStatus = "working" | "ready" | "error";

type Item = {
  id: string;
  file: File;
  name: string;
  originalBytes: number;
  rejected: boolean;
  status: ItemStatus;
  error?: string;
  url?: string;
  jpgBytes?: number;
  width?: number;
  height?: number;
};

function isAvif(file: File) {
  return file.type === "image/avif" || /\.avif$/i.test(file.name);
}

async function runPool(tasks: Array<() => Promise<void>>, limit = 2) {
  const queue = [...tasks];
  const workers = Array.from(
    { length: Math.min(limit, queue.length) },
    async () => {
      while (queue.length > 0) {
        const task = queue.shift();
        if (task) await task();
      }
    },
  );
  await Promise.all(workers);
}

export function Converter() {
  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [sampleLoading, setSampleLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef(items);
  const committedQuality = useRef(DEFAULT_QUALITY);
  const generations = useRef(new Map<string, number>());
  const sampleLock = useRef(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    const prevent = (event: DragEvent) => event.preventDefault();
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
      for (const item of itemsRef.current) {
        if (item.url) URL.revokeObjectURL(item.url);
      }
    };
  }, []);

  async function encode(item: Item, nextQuality: number) {
    const generation = (generations.current.get(item.id) ?? 0) + 1;
    generations.current.set(item.id, generation);
    const current = () => generations.current.get(item.id) === generation;

    setItems((prev) =>
      prev.map((entry) =>
        entry.id === item.id
          ? { ...entry, status: "working", error: undefined }
          : entry,
      ),
    );

    try {
      const result = await convertAvifToJpeg(item.file, nextQuality / 100);
      if (!current()) return;
      const url = URL.createObjectURL(result.blob);
      setItems((prev) =>
        prev.map((entry) => {
          if (entry.id !== item.id) return entry;
          if (entry.url) URL.revokeObjectURL(entry.url);
          return {
            ...entry,
            status: "ready",
            error: undefined,
            url,
            jpgBytes: result.blob.size,
            width: result.width,
            height: result.height,
          };
        }),
      );
    } catch (error) {
      if (!current()) return;
      const message = conversionErrorMessage(error);
      setItems((prev) =>
        prev.map((entry) => {
          if (entry.id !== item.id) return entry;
          if (entry.url) {
            return {
              ...entry,
              status: "ready",
              error: `${message} The previous JPG is still available.`,
            };
          }
          return { ...entry, status: "error", error: message };
        }),
      );
    }
  }

  function queueEncode(list: Item[], nextQuality: number) {
    const tasks = list
      .filter((item) => !item.rejected)
      .map((item) => () => encode(item, nextQuality));
    void runPool(tasks);
  }

  function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    if (incoming.length === 0) return;

    const room = MAX_FILES - itemsRef.current.length;
    if (room <= 0) {
      setNotice(`You can convert up to ${MAX_FILES} files at a time.`);
      return;
    }

    const accepted = incoming.slice(0, room);
    if (accepted.length < incoming.length) {
      setNotice(
        `Only the first ${accepted.length} files were added. The limit is ${MAX_FILES}.`,
      );
    } else {
      setNotice(null);
    }

    const nextItems: Item[] = accepted.map((file) => {
      const rejected = !isAvif(file);
      return {
        id: crypto.randomUUID(),
        file,
        name: file.name || "image.avif",
        originalBytes: file.size,
        rejected,
        status: rejected ? "error" : "working",
        error: rejected ? "Only .avif files can be converted." : undefined,
      };
    });

    const merged = [...itemsRef.current, ...nextItems];
    itemsRef.current = merged;
    setItems(merged);
    queueEncode(nextItems, committedQuality.current);
  }

  function commitQuality(next: number) {
    setQuality(next);
    if (next === committedQuality.current) return;
    committedQuality.current = next;
    queueEncode(itemsRef.current, next);
  }

  async function loadSample() {
    if (sampleLock.current) return;
    sampleLock.current = true;
    setSampleLoading(true);
    setNotice(null);
    try {
      const response = await fetch("/sample.avif");
      if (!response.ok) throw new Error("sample missing");
      const blob = await response.blob();
      const file = new File([blob], "sample.avif", { type: "image/avif" });
      addFiles([file]);
    } catch {
      setNotice("The sample image could not be loaded. Choose an AVIF instead.");
    } finally {
      sampleLock.current = false;
      setSampleLoading(false);
    }
  }

  function downloadUrl(url: string, filename: string) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  }

  async function downloadAll() {
    const ready = itemsRef.current.filter((item) => item.status === "ready" && item.url);
    for (const item of ready) {
      if (!item.url) continue;
      downloadUrl(item.url, jpgFileName(item.name));
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  function clearAll() {
    for (const item of itemsRef.current) {
      if (item.url) URL.revokeObjectURL(item.url);
      generations.current.set(item.id, (generations.current.get(item.id) ?? 0) + 1);
    }
    itemsRef.current = [];
    setItems([]);
    setNotice(null);
  }

  const readyCount = items.filter((item) => item.status === "ready" && item.url).length;
  const working = items.some((item) => item.status === "working");

  return (
    <section id="converter" aria-labelledby="converter-title" className="mt-8">
      <h2 id="converter-title" className="sr-only">
        Converter
      </h2>
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setDragging(false);
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            addFiles(event.dataTransfer.files);
          }}
          className={`rounded-xl border border-dashed px-4 py-8 text-center transition-colors ${
            dragging
              ? "border-primary bg-accent"
              : "border-primary/35 bg-background"
          }`}
        >
          <FileImage className="mx-auto size-8 text-primary" aria-hidden="true" />
          <p className="mt-3 font-heading text-xl font-semibold text-foreground">
            {dragging ? "Drop to convert" : "Drop AVIF files here"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            One image or a batch. Up to {MAX_FILES} files.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              size="lg"
              className="h-11 px-4"
              onClick={() => inputRef.current?.click()}
            >
              Choose AVIF files
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="h-11 px-4"
              onClick={() => void loadSample()}
              disabled={sampleLoading}
            >
              {sampleLoading ? "Loading sample…" : "Try the sample"}
            </Button>
          </div>
          <input
            ref={inputRef}
            id="avif-files"
            type="file"
            accept=".avif,image/avif"
            multiple
            className="sr-only"
            onChange={(event) => {
              if (event.target.files) addFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor="jpg-quality" className="text-sm font-medium">
              JPG quality
            </label>
            <span className="font-heading text-lg font-semibold tabular-nums text-primary">
              {quality}
            </span>
          </div>
          <Slider
            id="jpg-quality"
            aria-label="JPEG quality"
            min={50}
            max={100}
            step={1}
            value={[quality]}
            onValueChange={([next]) => {
              if (typeof next === "number") setQuality(next);
            }}
            onValueCommit={([next]) => {
              if (typeof next === "number") commitQuality(next);
            }}
          />
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Default is 92. Release the slider to re-encode. Transparency becomes
            white, and animation keeps the first frame.
          </p>
        </div>

        <p className="mt-4 text-sm font-medium text-foreground">
          Files stay on your device.
        </p>
        {notice ? (
          <p className="mt-2 text-sm text-destructive" role="status">
            {notice}
          </p>
        ) : null}

        {items.length > 0 ? (
          <div className="mt-5">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground" role="status">
                {working
                  ? "Converting…"
                  : readyCount === 1
                    ? "1 JPG ready"
                    : `${readyCount} JPG files ready`}
              </p>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" size="lg" onClick={clearAll}>
                  Clear
                </Button>
                {readyCount > 1 ? (
                  <Button
                    type="button"
                    size="lg"
                    className="h-11 px-4"
                    onClick={() => void downloadAll()}
                    disabled={working}
                  >
                    <Download aria-hidden="true" />
                    Download all
                  </Button>
                ) : null}
              </div>
            </div>
            {readyCount > 1 ? (
              <p className="mb-3 text-sm text-muted-foreground">
                If the browser blocks the rest, allow multiple downloads.
              </p>
            ) : null}
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-background p-3 sm:flex-row sm:items-center"
                >
                  {item.url ? (
                    // Blob previews are created locally and cannot go through the image optimizer.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={`${item.name} converted to JPG`}
                      width={64}
                      height={64}
                      className={`size-16 rounded-md object-cover ${
                        item.status === "working" ? "opacity-50" : ""
                      }`}
                    />
                  ) : (
                    <div className="grid size-16 shrink-0 place-items-center rounded-md bg-muted text-xs font-medium text-muted-foreground">
                      {item.rejected ? "File" : "AVIF"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatBytes(item.originalBytes)}
                      {item.rejected ? "" : " AVIF"}
                      {item.jpgBytes
                        ? ` → ${formatBytes(item.jpgBytes)} JPG`
                        : ""}
                      {item.width && item.height
                        ? ` · ${item.width} × ${item.height}`
                        : ""}
                    </p>
                    {item.status === "working" ? (
                      <p className="mt-1 text-sm text-primary">
                        {item.url ? "Updating…" : "Converting…"}
                      </p>
                    ) : null}
                    {item.error ? (
                      <p className="mt-1 text-sm text-destructive">{item.error}</p>
                    ) : null}
                  </div>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-11 sm:shrink-0"
                    disabled={item.status !== "ready" || !item.url}
                    onClick={() => {
                      if (item.url) downloadUrl(item.url, jpgFileName(item.name));
                    }}
                  >
                    <Download aria-hidden="true" />
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
