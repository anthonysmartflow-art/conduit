import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="shell not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <Link className="button primary" href="/">
        Back to Home →
      </Link>
    </main>
  );
}
