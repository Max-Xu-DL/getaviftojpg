/**
 * Host that returns HTTP 200.
 * The apex (https://getaviftojpg.com) permanently redirects here, and the
 * directory listings we checked link here. Canonical, sitemap, and Open Graph
 * URLs must use this origin so they are not the source of that redirect.
 */
export const siteOrigin = "https://www.getaviftojpg.com";

export const siteUrls = {
  // Next's metadata API emits the homepage canonical without a trailing slash.
  // The sitemap and structured data use the same string.
  home: siteOrigin,
  privacy: `${siteOrigin}/privacy`,
  terms: `${siteOrigin}/terms`,
} as const;
