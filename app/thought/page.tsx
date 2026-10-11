import Link from "next/link";
import article from "@/content/article.json";
import { Arrow } from "@/components/Header";
export const metadata = {
  title: "Thoughts",
  description:
    "Thoughts and updates from the Conduit team on building the future of thought-to-text technology.",
  alternates: { canonical: "/thought" },
};
export default function Thoughts() {
  return (
    <main id="main" className="shell thoughts-page">
      <div className="page-heading">
        <p className="eyebrow">Conduit</p>
        <h1>Thoughts</h1>
        <p>
          Thoughts and updates from the Conduit team on building the future of
          thought-to-text technology.
        </p>
      </div>
      <Link className="research-feature" href="/thought/10k-hours">
        <div className="research-photo">
          <img
            src="/thought/10k-hours/images/image4.png"
            alt="Data collection setup"
            width="1588"
            height="1046"
          />
        </div>
        <div className="research-copy">
          <p className="eyebrow">{article.date}</p>
          <h2>{article.title}</h2>
          <p>{article.subtitle}</p>
          <span className="text-link">
            Read the research
            <Arrow />
          </span>
        </div>
      </Link>
    </main>
  );
}
