import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import "./globals.css";

const title = `${site.name} — ${site.brand}`;
export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.tagline,
  openGraph: {
    title,
    description: site.tagline,
    ...(site.url ? { url: site.url } : {}),
    siteName: site.brand,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description: site.tagline },
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
};
export const viewport: Viewport = { themeColor: "#15171a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
