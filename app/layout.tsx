import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { MotionProvider } from "@/components/MotionSystem";
import LocalAudit from "@/components/LocalAudit";
export const metadata: Metadata = {
  metadataBase: new URL("https://conduit-redesign-hngr.vercel.app"),
  title: { default: "Conduit — Thought-to-text", template: "%s | Conduit" },
  description:
    "Building telepathy at scale — where nothing is lost between what you think and what you do.",
  openGraph: { type: "website", siteName: "Conduit", locale: "en_US" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
        {process.env.NODE_ENV === "development" && <LocalAudit />}
      </body>
    </html>
  );
}
