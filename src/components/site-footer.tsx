import Link from "next/link";

const linkClass =
  "underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>Files stay on your device.</p>
          <nav className="flex gap-5">
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
          </nav>
        </div>
        <p>
          Questions or feedback?{" "}
          <a href="mailto:hello@getaviftojpg.com" className={linkClass}>
            hello@getaviftojpg.com
          </a>
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href="https://twelve.tools"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit"
          >
            {/* Official free badge: https://twelve.tools/badge (badge0-white). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://twelve.tools/badge0-white.svg"
              alt="Featured on Twelve Tools"
              width={200}
              height={54}
            />
          </a>
          <a
            href="https://www.saashub.com/getaviftojpg?utm_source=badge&utm_campaign=badge&utm_content=getaviftojpg&badge_variant=color&badge_kind=approved"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit"
          >
            {/* Official approved embed from the SaaSHub product page. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn-b.saashub.com/img/badges/approved-color.png?v=1"
              alt="GetAVIFtoJPG badge"
              width={150}
              height={50}
              className="h-auto w-auto max-w-[150px]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
