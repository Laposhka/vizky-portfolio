# Portfolio

A single-page personal portfolio built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Making it yours

**All copy lives in one file: [`src/lib/content.ts`](src/lib/content.ts).** Edit it and the whole
site updates — no component changes needed.

| What                                     | Where                                        |
| ---------------------------------------- | -------------------------------------------- |
| Name, role, intro, email, availability    | `site`                                       |
| Social links                              | `socials`                                    |
| Marquee technologies                      | `stack`                                      |
| About copy + the four fact tiles          | `about`                                      |
| Projects (mark `featured: true` for the large cards) | `projects`                        |
| Job history                               | `experience`                                 |
| Skill groups                              | `skills`                                     |
| Bittensor account for the live balance    | `wallet`                                     |

Before deploying, set `site.url` to your real domain — it feeds `metadataBase`, Open Graph tags,
`robots.txt`, and `sitemap.xml`.

## Live TAO balance

The About section shows the live balance of the Bittensor account set in `wallet.address`
(content.ts), priced in USD.

- [`src/lib/tao.ts`](src/lib/tao.ts) decodes the SS58 address to a public key, builds the
  `System.Account` storage key (`twox128("System") ++ twox128("Account") ++
  blake2_128_concat(pubkey)`), reads it from the public Finney RPC node via `state_getStorage`,
  and SCALE-decodes the result. Bittensor's `Balance` is a `u64`, so `AccountInfo` is
  `4 × u32` header, then `free`/`reserved`/`frozen` as `u64`, then a `u128` flags field.
- Price comes from CoinGecko's free `simple/price` endpoint.
- [`src/app/api/tao/route.ts`](src/app/api/tao/route.ts) combines both, memoises for 60s per
  server instance, and sets `s-maxage=60, stale-while-revalidate=300`. If an upstream fails it
  serves the last good reading instead of an error.
- [`TaoBalance.tsx`](src/components/TaoBalance.tsx) polls that route every 60s with skeleton,
  live, and offline states.

**No API keys are required** for either endpoint. To point it at a different account, change
`wallet.address`. Note this reports the *liquid* balance — TAO staked to subnets is not counted.

## Design

Colours, spacing tokens, and the keyframe animations are defined in
[`src/app/globals.css`](src/app/globals.css) under `@theme`. Change `--color-accent` and
`--color-accent-2` to re-skin the whole site; per-project card gradients are set in `content.ts`.

Everything respects `prefers-reduced-motion` — reveals become instant and looping animations stop.

## Structure

```
src/
  app/
    layout.tsx      metadata, fonts, viewport
    page.tsx        section composition
    globals.css     design tokens + animations
    icon.svg        monogram favicon
    robots.ts       robots.txt
    sitemap.ts      sitemap.xml
    api/tao/route.ts  cached balance + price endpoint
  components/
    Backdrop        fixed gradient orbs, grid, grain
    ScrollProgress  hairline reading-progress bar
    Nav             sticky nav, scroll-spy, mobile menu
    Hero            typed role, CTAs, stack marquee
    About / Projects / Experience / Contact / Footer
    TaoBalance      live wallet balance card
    Reveal          IntersectionObserver fade-in wrapper
    SectionHeading  numbered section header
  lib/
    content.ts      all site copy
    tao.ts          SS58 decode, RPC storage read, price fetch
```

## Deploying

Deploys as-is to any Node host. On [Vercel](https://vercel.com/new), import the repo — no
configuration or environment variables required.
