import Link from "next/link";
import copy from "@/content/site.json";
import { Arrow } from "@/components/Header";
export const metadata = {
  title: "Request a Research Session",
  description: "In-person, paid sessions in San Francisco.",
  alternates: { canonical: "/booking" },
};
export default function Booking() {
  return (
    <main id="main" className="shell booking-page">
      <header className="page-heading">
        <p className="eyebrow">{copy["landing.heroTagline"]}</p>
        <h1>
          Request a<br />
          Research Session
        </h1>
      </header>
      <div className="booking-layout">
        <section
          className="prose booking-details"
          aria-label="Research session information"
          dangerouslySetInnerHTML={{ __html: copy["booking.infoBlock"] }}
        />
        <aside className="booking-action">
          <div className="booking-panel">
            <p className="eyebrow">Research participation</p>
            <h2>
              Select a date.
              <br />
              Request a session.
            </h2>
            <p>
              Continue to Conduit’s booking site to view available times and
              submit your booking request.
            </p>
            <a className="button primary" href="https://condu.it/booking">
              View available sessions
              <Arrow />
            </a>
            <p className="external-note">Booking continues on condu.it</p>
            <div className="booking-legal">
              <Link href="/participant-notices">Participant Notices</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
            <a className="support-link" href="https://condu.it/booking">
              Report an Issue ↗
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
