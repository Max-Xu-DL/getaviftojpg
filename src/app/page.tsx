import type { Metadata } from "next";
import { Converter } from "@/components/converter";
import { Faq } from "@/components/faq";
import { Guide } from "@/components/guide";
import { faqs } from "@/content/copy";

const title = "AVIF to JPG — Free Online Converter";
const description =
  "Convert AVIF to JPG in your browser. Free, no upload to a server, keep quality options.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getaviftojpg.com/",
    siteName: "AVIF to JPG",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "AVIF to JPG",
      url: "https://getaviftojpg.com/",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a browser that can decode AVIF.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <main id="content" className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:py-14">
      <link rel="canonical" href="https://getaviftojpg.com/" />
      <p className="text-sm font-medium tracking-wide text-primary uppercase">
        Free browser tool
      </p>
      <h1 className="mt-3">AVIF to JPG</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-foreground/80 sm:text-xl">
        Convert AVIF images to JPG instantly in your browser.
      </p>
      <Converter />
      <Guide />
      <Faq />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
