import type { Metadata } from "next";
import Link from "next/link";
import { siteUrls } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Plain terms for the free AVIF to JPG converter at getaviftojpg.com.",
  alternates: { canonical: siteUrls.terms },
};

export default function TermsPage() {
  return (
    <main id="content" className="mx-auto w-full max-w-2xl flex-1 px-5 py-12">
      <h1>Terms</h1>
      <div className="mt-8 space-y-4 text-base leading-7 text-foreground/90">
        <p>
          getaviftojpg.com is a free tool. You can use it to convert AVIF
          images to JPG in your own browser. These terms are a plain
          description of that offer, not a negotiated contract.
        </p>
        <h2>The tool</h2>
        <p>
          Conversion runs on your device. The site does not host your files
          and does not promise a particular file size, color profile, or
          visual match. JPEG is lossy, transparency is flattened to white, and
          metadata is not copied. Keep your original AVIF if you might need it
          later.
        </p>
        <h2>Your files</h2>
        <p>
          You are responsible for the images you convert and for having the
          right to use them. Do not use the site to handle files you are not
          allowed to process. The tool does not review what you convert.
        </p>
        <h2>No warranty</h2>
        <p>
          The page is provided as-is. It may be changed, interrupted, or
          removed. Local consumer rules still apply where they cannot be
          waived.
        </p>
        <p>
          <Link
            href="/"
            className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          >
            Back to AVIF to JPG
          </Link>
        </p>
      </div>
    </main>
  );
}
