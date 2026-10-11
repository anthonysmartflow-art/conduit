import content from "@/content/university.json";
export const metadata = {
  title: "University Ambassador Program",
  description: content.paragraphs[0],
  alternates: { canonical: "/university" },
};
export default function University() {
  return (
    <main id="main" className="shell university-page">
      <header className="page-heading">
        <p className="eyebrow">Conduit</p>
        <h1>
          University
          <br />
          Ambassador Program
        </h1>
      </header>
      <div className="university-layout">
        <div className="program-status">
          <span className="status-dot" aria-hidden="true" />
          <p>Applications are currently closed.</p>
        </div>
        <div className="prose">
          {content.paragraphs
            .filter((p) => !p.includes("Applications are currently closed."))
            .map((p) => (
              <p key={p}>{p}</p>
            ))}
          <p className="program-closing">{content.closing}</p>
        </div>
      </div>
    </main>
  );
}
