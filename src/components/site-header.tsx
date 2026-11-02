import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="h-1.5 bg-primary" aria-hidden="true" />
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-4">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-foreground no-underline"
        >
          AVIF to JPG
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/#guide" className="no-underline hover:text-foreground">
            Guide
          </Link>
          <Link href="/privacy" className="no-underline hover:text-foreground">
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
