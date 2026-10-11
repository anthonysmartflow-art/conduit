# Conduit website redesign

Next.js App Router, TypeScript, React, and custom responsive CSS. Rebuild of Conduit's public website from a source inventory captured October 10, 2026.

## Development

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
npm run audit:content
npm run typecheck
npm run build
```

The development server includes an automated axe accessibility report in the hidden `#local-accessibility-audit` output. It is not rendered in production. Follow DESIGN.md and AGENTS.md for future changes. Content is stored in `content/`; the exact comparison baseline is in `research/source-baseline.json`.

## Scope

All eight public sitemap routes are implemented. Legal text and research article content are preserved, with 13 figures, 15 footnotes, linked citations, and native expandable sections. Legacy `.html` routes redirect. Shared navigation, a keyboard-accessible mobile menu, a skip link, motion controls and reduced-motion support are included. SEO titles, descriptions, canonical links, sitemap and robots routes are provided.

## Booking and service boundaries

The booking information page hands participants to **https://condu.it/booking** for the real live calendar, screening, identity, consent, booking request, confirmations, SMS, and issue reporting. These services require Conduit's proprietary backend and were not cloned or simulated. This app stores no participant data. The university application remains closed, as on the source site. See `research/INVENTORY.md` for the full route, content, interaction and limitation inventory.

## Deployment

GitHub: https://github.com/anthonysmartflow-art/conduit

A separate Vercel project hosts this redesign. It does not replace condu.it or change its DNS. Update the site origin in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` if the Vercel production domain changes. Booking information and legal text are snapshots; review against the source before future releases.

Conduit text, identity and original media remain the property of their respective owners. No license to those materials is granted by this repository.
