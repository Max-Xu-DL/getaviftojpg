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
      </div>
    </footer>
  );
}
