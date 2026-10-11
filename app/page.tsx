import Link from "next/link";
import copy from "@/content/site.json";
import article from "@/content/article.json";
import { Arrow } from "@/components/Header";
import { NeuralVisual } from "@/components/Motion";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <main id="main">
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">The conduit between your mind and AI</p>
          <h1>
            Thought<span className="dash">-</span>
            <br />
            to-text
            <span className="cursor" aria-hidden="true" />
          </h1>
          <div className="hero-action">
            <Link className="button primary" href="/booking">
              {copy["landing.heroCtaPrimary"]}
              <Arrow />
            </Link>
            <p className="payment">{copy["landing.heroCtaSecondary"]}</p>
          </div>
        </div>
        <div className="hero-art">
          <NeuralVisual />
          <p className="hero-caption">{copy["landing.heroTagline"]}</p>
        </div>
      </section>
      <section className="mission shell">
        <p className="eyebrow">Conduit</p>
        <div>
          <h2>{copy["landing.heroDescription"]}</h2>
          <p className="mission-body">{copy["landing.heroBody"]}</p>
          <Link className="text-link" href="/booking">
            Request a research session <Arrow />
          </Link>
        </div>
      </section>
      <section className="research-section">
        <div className="shell">
          <div className="section-heading">
            <h2>Our thoughts</h2>
            <Link className="text-link" href="/thought">
              View all posts <Arrow />
            </Link>
          </div>
          <Link href="/thought/10k-hours" className="research-feature">
            <div className="research-photo">
              <img
                src="/thought/10k-hours/images/image4.png"
                width="1588"
                height="1046"
                alt="Data collection setup"
                loading="lazy"
              />
            </div>
            <div className="research-copy">
              <p className="eyebrow">{article.date}</p>
              <h3>{article.title}</h3>
              <p>{article.subtitle}</p>
              <span className="text-link">
                Read the research <Arrow />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
