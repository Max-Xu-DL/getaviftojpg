import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found — AVIF to JPG" },
  description: "That address is not on getaviftojpg.com.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="content" className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-16">
      <h1>Page not found</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
        That address is not on getaviftojpg.com. The converter lives on the
        homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center self-start rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary/80"
      >
        Back to AVIF to JPG
      </Link>
    </main>
  );
}
