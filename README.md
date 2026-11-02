# AVIF to JPG

Free browser tool for [getaviftojpg.com](https://getaviftojpg.com/). It converts AVIF images to JPG on the device that opens the page. Files are not uploaded.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

No environment variables are required.

## How conversion works

Decoding uses the browser’s native AVIF support. There is no WASM decoder and no server round trip.

1. `createImageBitmap(file)` decodes the file with the decoder already built into Chromium, Firefox, and Safari.
2. If that call throws, the file is loaded in an `HTMLImageElement` and drawn from there.
3. Pixels are painted onto a white canvas (JPEG has no alpha channel) and exported with `canvas.toBlob("image/jpeg", quality)`. The slider default is `0.92`.

A browser that cannot decode AVIF shows an error on that file. The page does not send the image anywhere else.

Limits of this path: the JPG is the first frame of an animation, transparency is flattened to white, EXIF and color profiles are not copied, and very large images can exceed the browser’s canvas limit. Those limits are also explained on the homepage.

## Deploy on Vercel

1. Import this repository in Vercel. Framework preset: Next.js. Build command: `npm run build`. Install command: `npm install`. Leave the output directory as the Next.js default.
2. Deploy. No environment variables.
3. In the project, open **Settings → Domains** and add `getaviftojpg.com` and `www.getaviftojpg.com`.
4. Set `getaviftojpg.com` as the primary domain so it matches the canonical URL `https://getaviftojpg.com/`. Redirect `www` to the apex.

Use the DNS values shown on each domain card. They can differ by project. For most projects they are:

| Host | Type | Value |
| --- | --- | --- |
| `@` (apex) | A | `76.76.21.21` |
| `www` | CNAME | the CNAME target on the www card, often a `*.vercel-dns.com` host |

The card is the source of truth. A newer project may show a different A address, such as one from Vercel’s anycast pool, and a project-specific CNAME. Copy those values rather than guessing.

Remove old A, AAAA, or CNAME records on `@` and `www` before adding these. Leave MX records alone if the domain sends mail.

## Cloudflare DNS

Keep Cloudflare as the DNS host and point the records at Vercel:

1. **A** — name `@`, IPv4 from the Vercel apex card (often `76.76.21.21`).
2. **CNAME** — name `www`, target from the Vercel www card.

Set both records to **DNS only** (grey cloud) while Vercel verifies the domain and issues the certificate. An orange-cloud proxy returns Cloudflare’s IPs, which blocks that check. If you turn the proxy on later, set SSL/TLS to **Full** or **Full (strict)**. **Flexible** causes redirect loops.

After the domain card says Valid Configuration, `https://getaviftojpg.com/` and `https://www.getaviftojpg.com/` should both reach the site, with `www` redirecting to the apex.
