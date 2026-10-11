import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-top">
        <Link href="/" className="brand" aria-label="Conduit home">
          <img
            src="/assets/images/conduit-logo.png"
            width="35"
            height="35"
            alt=""
          />
          <span>conduit</span>
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/thought">Thoughts</Link>
          <Link href="/university">University</Link>
          <Link href="/booking">Research participation</Link>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <p>Copyright © Conduit 2026</p>
        <nav aria-label="Legal documents">
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/participant-notices">Participant Notices</Link>
        </nav>
      </div>
    </footer>
  );
}
