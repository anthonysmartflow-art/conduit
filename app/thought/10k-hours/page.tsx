import Link from "next/link";
import article from "@/content/article.json";
import { ArticleBehavior } from "@/components/Motion";
export const metadata = {
  title: article.title,
  description: article.subtitle,
  alternates: { canonical: "/thought/10k-hours" },
  openGraph: {
    type: "article",
    publishedTime: "2025-12-07",
    images: [
      {
        url: "/thought/10k-hours/images/image4.png",
        alt: "Data collection setup",
      },
    ],
  },
};
export default function Article() {
  return (
    <main id="main" className="article-page shell">
      <ArticleBehavior />
      <header className="article-header" id="introduction">
        <Link className="back-link" href="/thought">
          ← Back to Thoughts
        </Link>
        <p className="eyebrow">{article.date}</p>
        <h1>{article.title}</h1>
        <p className="article-subtitle">{article.subtitle}</p>
        <p className="authors">{article.authors}</p>
      </header>
      <div className="article-layout">
        <aside className="article-toc">
          <details open>
            <summary>Contents</summary>
            <nav aria-label="Article contents">
              {article.toc.map((t) => (
                <a key={t.href} href={t.href}>
                  {t.label}
                </a>
              ))}
            </nav>
          </details>
        </aside>
        <article className="prose">
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
          <section className="footnotes" aria-label="Notes">
            <h2>Notes</h2>
            <ol>
              {article.notes.map((n) => (
                <li
                  id={n.id}
                  key={n.id}
                  dangerouslySetInnerHTML={{ __html: n.html }}
                />
              ))}
            </ol>
          </section>
        </article>
      </div>
      <div className="article-end">
        <Link className="text-link" href="/thought">
          ← View all posts
        </Link>
        <Link className="text-link" href="/booking">
          Become A Paid Research Participant →
        </Link>
      </div>
    </main>
  );
}
