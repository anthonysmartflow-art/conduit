# Conduit public-site inventory

Captured October 10, 2026 from https://condu.it. Eight routes were listed in the site's sitemap. Public HTML, rendered DOM, navigation, article references, media URLs, and the public site-copy payload were inspected. `content/inventory.json` lists observed source links and assets. `research/source-baseline.json` records the content verification baseline. Unauthenticated public pages only; no private/admin interfaces accessed.

| Original route | Redesign | Preserved content and behavior |
|---|---|---|
| `/` | `/` | Thought-to-text headline; current mission, body, location tagline and payment CTA; brand mark; complete-frame original neural video and grain asset; participation and blog navigation |
| `/booking` | `/booking` | Current location, $50 payment wording, parking validation, participation limits, ID/check-in, age/typing/headset requirements, cancellation/discretion language, confirmation notice; clear handoff to original booking |
| `/thought` | `/thought` | Full article title, December 7, 2025 date, subtitle, blog description |
| `/thought/10k-hours` | same | Complete article, authors, 13 original figures, all tables, 15 footnotes, citations, contents links, Noise Reduction and Appendix disclosures, hiring/contact email links |
| `/university` | same | Full program text, $20 referral fee, support/training, closed applications, mobile closing text |
| `/terms` and `/terms.html` | `/terms` | Exact Terms of Use content; original `.html` route redirects permanently |
| `/privacy-policy` and `.html` | `/privacy-policy` | Exact policy content; original alias redirects permanently |
| `/participant-notices` and `.html` | `/participant-notices` | Exact voluntary participation, status, medical, and flashing-light notices; original alias redirects permanently |

## Current copy vs. stale defaults
The source contains duplicated desktop/mobile markup and outdated fallback text. The visible site asynchronously loads `/api/site-copy`. Its current copy takes precedence: Steiner & Haight location, $50 for a completed session, parking validation, two back-to-back sessions and 32 total, age 18+, government ID, typing and headset requirements. We did not publish contradictory stale booking defaults (Oak Street, 10 sessions, check payment, $50/$100 two/four-hour claims). The dated research article remains unchanged, including its historical participation cap. The original homepage still visually types “Thought-to-text” while its content endpoint stores “The conduit between your mind and AI”; both appear in the redesign.

Repeated responsive copies were consolidated into one accessible document. Redundant desktop/mobile versions of the same footnotes were consolidated; every unique source link remains. Article heading levels changed from h4 to h3 for accessibility. Image proportions are preserved. The source labels image4 “Data collection setup,” although its visible contents are a neural-token chart; the article retains its original alt text.

## Interactions inspected
- Original participation CTA → `/booking`.
- Original calendar dates → live slots with dynamic payment labels → booking-request modal. Opened date and slot without entering or submitting participant information.
- Booking modal: name, email, age/birthday, government-ID availability, language, typing proficiency, recruitment source/referral, phone, optional professional background, headset tolerance, legal/participant acknowledgments, optional SMS consent, confirmation screen and submission.
- Article contents, linked footnotes, expandable Noise Reduction and Appendix, outbound research/equipment citations, contact and jobs mailto links.
- University applications explicitly closed; no invented application form.
- Issue reporting depends on original `/api/report-categories` and `/api/report-issue`; the original booking site also exposes a help button and booking@condu.it fallback.

## Backend boundary
This repository does not reproduce the proprietary scheduler, real-time availability, identity cookie/session, eligibility decisions, participant database, dynamic pricing/overbooking, duplicate prevention, booking submission, confirmations, SMS, cancellation links, consent processing, issue-report storage or editable site-copy administration. It does not collect participant information or claim a submission succeeded. The actual booking flow remains at https://condu.it/booking. Known private workflow entry paths redirect to their original site, preserving query parameters. Direct user access, credentials, backend ownership and consent would be needed to migrate those services. No trial booking or outbound message was sent.

## Publication boundary
Publish only to the user's new public `anthonysmartflow-art/conduit` repository and a new HNGR Vercel project. No changes to condu.it, existing production projects, or custom DNS. The checked-in content is a dated snapshot and will not inherit later original-site edits automatically. Company content, marks and existing media remain attributable to Conduit; this repository does not claim ownership or grant an open-source license to those materials.
