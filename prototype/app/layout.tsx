import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/Navigation";
import MobileNav from "./_components/MobileNav";
import ViewTransitions from "./_components/ViewTransitions";
import packageJson from "@/package.json";

const outfit = Outfit({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://design.foreveryone.berlin"),
  title: "ForEveryone Design System | design.foreveryone.berlin",
  description:
    "Design system for For Everyone Berlin — tokens, components, and patterns at design.foreveryone.berlin.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "ForEveryone Design System | design.foreveryone.berlin",
    description:
      "Design tokens, components, and patterns for the ForEveryone digital experience.",
    images: [
      {
        url: "/images/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "People gathered around a wooden table in the ForEveryone community café, with paintings on the wall and natural light through tall windows.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ForEveryone Design System | design.foreveryone.berlin",
    description:
      "Design tokens, components, and patterns for the ForEveryone digital experience.",
    images: ["/images/social-preview.jpg"],
  },
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const version = packageJson.version;

  return (
    <html
      lang="en"
      className={`ds-light-only ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ViewTransitions />
        <MobileNav />
        <div className="ds-layout" suppressHydrationWarning>
          <Navigation />
          <div className="ds-main-area" suppressHydrationWarning>
            <main className="ds-page" suppressHydrationWarning>
              {children}
            </main>
            <footer className="ds-footer" suppressHydrationWarning>
              <p className="ds-footer-version">Design System v{version}</p>
              <p style={{ margin: 0 }}>design.foreveryone.berlin</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
