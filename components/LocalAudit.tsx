"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function LocalAudit() {
  const pathname = usePathname();
  const [result, setResult] = useState("pending");
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      const axe = (await import("axe-core")).default;
      const result = await axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      });
      if (!cancelled)
        setResult(
          JSON.stringify({
            url: pathname,
            violations: result.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.map((n) => ({
                html: n.html,
                target: n.target,
                summary: n.failureSummary,
              })),
            })),
            passes: result.passes.length,
            incomplete: result.incomplete.map((v) => v.id),
          }),
        );
    }, 900);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname]);
  return (
    <output
      hidden
      data-ready={result !== "pending" && JSON.parse(result).url === pathname}
      id="local-accessibility-audit"
    >
      {result}
    </output>
  );
}
