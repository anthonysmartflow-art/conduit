# Verification — October 10, 2026

## Passed before release
- Next.js optimized production build and strict TypeScript check.
- 161 content checks against the captured source baseline: legal text, research prose and tables, citations, all 13 article figures, all 15 footnotes and current site-copy fields.
- All eight primary routes, 15 internal link/redirect/SEO destinations and 15 image/video URLs returned HTTP 200 in local HTTP checks.
- All eight pages: axe WCAG 2 A/AA and WCAG 2.1 AA automated rules at both 320 and 390 CSS pixels; zero detected violations. Home, booking and article were additionally checked at larger widths. Homepage also checked at 768, 1024 and 1440; no horizontal document overflow. Homepage animated-media contrast required visual review; primary text and controls have solid backgrounds.
- Rendered inspection of desktop homepage and booking, tablet article, narrow/mobile homepage, legal text and article sections. Images retain full proportions. Source figures were not replaced or fabricated.
- Mobile Menu opens; Escape closes and returns focus to the menu button. Article contents links update the fragment; Appendix link opens the collapsed section. Native disclosure, focus outlines and accessible media pause control are implemented.
- Background video preserves the source duration/frame at about 1.7 MB instead of 19 MB. Reduced-motion preference is respected in CSS and the video effect; automated OS preference emulation was not available in the browser tool.
- Production dependency audit reported zero known vulnerabilities.

## External links and limits
The official booking URL returned HTTP 200. Its actual calendar and session-request form were inspected without entering information or submitting a booking. Participant selection, confirmations, email/SMS delivery, consent processing, cancellation and issue-report submission were not tested because this would require real participant data and Conduit's backend access.

The article's 32 unique HTTPS destinations were checked. Eight original Craigslist postings return HTTP 404. Three other source links returned HEAD restrictions (403/405); their complete functionality could not be confirmed. These original citations were retained unchanged to honor content/link preservation. All other checked HTTPS destinations returned HTTP 200. Mailto destinations were preserved; no messages were sent.

Automated accessibility checks are not a formal accessibility certification. Real assistive-technology testing and an actual 200% browser-zoom test were not completed; responsive reflow was checked down to 320 CSS pixels. Content is an October 10 snapshot, not a live synchronization with the original CMS.

## Compiled production check
The built production server loaded successfully. No development audit component was rendered. The video pause control paused playback; the original 20.02-second video is delivered at 568×320 with its full 16:9 frame. The participation CTA reached the local booking page, and “View available sessions” reached https://condu.it/booking with the real “Request a Research Session” heading. No browser console errors were reported in this production path. Article responsive WebP candidates reduced the combined largest derivatives from 8.9 MB of original figures to 1.2 MB; original files remain available.

## Animation release — October 11, 2026
- Added a repeating typed/erased Thought-to-text heading with fixed line geometry and a complete accessible heading; observed both partial and completed text in the browser.
- Added staggered scroll entrances across all eight routes, neural orbit/breathing/pointer effects, reading progress, mobile menu entrances, hover interactions, and disclosure animation. Native animation APIs; no new production dependencies.
- Global pause verified to stop video, typing, orbit, CSS transitions and scroll effects; the full heading remains readable. Preference survived reload. Video and orbit pause offscreen; reading progress advances on scroll. OS reduced-motion handling is implemented but OS emulation remains unavailable in the browser tool.
- All eight routes at 390 CSS pixels: zero axe WCAG A/AA violations and no horizontal overflow. Contrast checks on several pages remained marked incomplete during animation; original text colors and solid control backgrounds are unchanged.
- Homepage rendered at 319, 390, 768, 1024, and 1440 CSS pixels. Fixed transformed orbit bounds that caused a 2px tablet overflow; 768/1024 widths rechecked with no overflow. Mobile menu opens and Escape closes/restores focus. Client-side navigation to Thoughts works with motion enabled.
- Production build, strict types and 161 source-content checks passed. Compiled production server checked for typing, video playback, global pause, offscreen pause and reading progress. No browser console errors observed.
