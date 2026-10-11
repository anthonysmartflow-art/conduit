# Conduit design direction

## Evidence and purpose
Conduit builds non-invasive thought-to-text technology. Its current public website recruits paid San Francisco research participants and publishes technical research. The primary action is participation, followed by reading the research. Source authority: live rendered pages plus public site-copy response retrieved October 10, 2026. Raw source defaults are stale and must not override live copy.

## Visual thesis
A precise, quiet research interface. Preserve Conduit's black-and-white identity, Neue Montreal type, original mark, neural background motion, and original research figures. Give thought-to-text a distinctive oversized typographic treatment, with the original neural visual framed in its complete proportions. Use a clear compact navigation bar, generous but purposeful space, readable text columns, and a continuous path to participation.

## Tokens
Ink #191B1C, graphite #565B5C, paper #FFFFFF, soft gray #F1F3F2, border #D9DEDB, muted accent #E7EEE9. Display: original Neue Montreal Medium. Body: Neue Montreal Regular with system sans fallback. Utility: native monospace for dates and navigation annotations only. No ornamental numbering or vertical rules.

## Layout
Homepage: split typographic hero + original moving neural visual → mission statement and participant CTA → open research feature with uncropped existing figure → footer. Blog: open image/text editorial composition. Article: wide title then bounded reading column, sticky contents on large screens, footnotes, expandable sections, all figures and external citations. Booking: current official information plus explicit handoff to condu.it. University: readable program description and closed-application state. Legal: shared navigation and untouched text.

## Signature and risk
The large Thought-to-text heading and quiet neural-field animation make the communication concept visible without inventing a working product demo. The aesthetic risk is unusually large type, balanced by a short hero and compact CTA. Rejected: dark AI dashboard, glowing gradients, invented metrics, repeated card grids.

## Behavior
Use native semantic links and details, focus-visible outlines, skip link, route-specific titles, single h1, 44px controls, accessible menu state/Escape, sufficient contrast, and reduced-motion support. Motion must never hide content. Preserve full image aspect ratio; use width:100%;height:auto or object-fit:contain. Mobile stacks the hero and moves contents above the article. Target 1440/1024/768/390/320 widths and 200% zoom.

## Boundaries
Do not create appointments, submit study forms, recreate identity/eligibility decisions, or collect participant personal data. Booking, availability, confirmation, cancellation, SMS, issue reporting, and consent remain on the official service. Do not change condu.it DNS or an existing Vercel production project.
