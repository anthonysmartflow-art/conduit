import Link from "next/link";
import { notFound } from "next/navigation";
import terms from "@/content/terms.json";
import privacy from "@/content/privacy-policy.json";
import notices from "@/content/participant-notices.json";
const documents: Record<string, { title: string; html: string }> = {
  terms: terms,
  "privacy-policy": privacy,
  "participant-notices": notices,
};
export function generateStaticParams() {
  return Object.keys(documents).map((legal) => ({ legal }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ legal: string }>;
}) {
  const { legal } = await params;
  return {
    title: documents[legal]?.title,
    alternates: { canonical: `/${legal}` },
  };
}
export default async function Legal({
  params,
}: {
  params: Promise<{ legal: string }>;
}) {
  const { legal } = await params;
  const content = documents[legal];
  if (!content) notFound();
  return (
    <main id="main" className="shell legal-page">
      <div className="legal-layout">
        <aside>
          <nav aria-label="Legal document navigation">
            {Object.entries(documents).map(([slug, d]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                aria-current={slug === legal ? "page" : undefined}
              >
                {d.title}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="prose legal-prose">
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </article>
      </div>
    </main>
  );
}
