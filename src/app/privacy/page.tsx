import type { Metadata } from "next";
import Link from "next/link";
import { siteUrls } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How getaviftojpg.com handles images. Conversion stays in your browser and files are not uploaded.",
  alternates: { canonical: siteUrls.privacy },
};

export default function PrivacyPage() {
  return (
    <main id="content" className="mx-auto w-full max-w-2xl flex-1 px-5 py-12">
      <h1>Privacy</h1>
      <div className="mt-8 space-y-4 text-base leading-7 text-foreground/90">
        <p>
          getaviftojpg.com is a free page that converts AVIF images to JPG in
          your browser. This note describes what that means for your files.
        </p>
        <h2>Images</h2>
        <p>
          Files stay on your device. The converter reads the AVIF locally,
          draws it on a canvas, and lets you download a JPG. The picture, the
          file name, and the finished JPG are not sent to this site. There is
          no account and no image-upload address.
        </p>
        <p>
          Previews live in memory for the current tab. Closing the tab drops
          them. The tool does not write your images to local storage.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          This site does not use an advertising network and does not set its
          own cookies. The page does include Vercel Web Analytics. Vercel says
          that script does not use third-party cookies, and that a visitor is
          counted with a hash of the request that is discarded after 24 hours,
          not a profile that follows someone across other websites.
        </p>
        <p>
          When Web Analytics is enabled for this Vercel project, Vercel can
          store a page view and a few conversion events: files were added, a
          conversion finished or failed, the sample image was opened, or a
          download was started. A page view can include the page address and
          ordinary query parameters, such as a directory referrer tag. A
          conversion event includes a count and a short outcome such as ready
          or a failure category. None of those events include the picture, the
          file name, or the JPG.
        </p>
        <p>
          The script is in the page whether or not collection is switched on.
          Vercel stores those visits only after Web Analytics is enabled in
          the project settings. Turning it on does not collect visits from
          before that switch. The code and the project setting are separate.
        </p>
        <h2>Hosting logs</h2>
        <p>
          The host that serves the page, such as Vercel, can keep ordinary
          request logs: an IP address, a browser name, the time, and the URL
          that was requested. Those logs are how any public website stays up.
          They do not contain your photos, because the photos never leave the
          browser.
        </p>
        <h2>What this page is not</h2>
        <p>
          There is no contact form and no mailing list. If that changes, this
          page will say so.
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
