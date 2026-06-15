import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/Navigation";
import MobileNav from "./_components/MobileNav";
import OnThisPage from "./_components/OnThisPage";
import ViewTransitions from "./_components/ViewTransitions";
import packageJson from "@/package.json";

const outfit = Outfit({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://design.foreveryone.berlin"),
  title: {
    default: "ForEveryone Design System",
    template: "%s | ForEveryone Design System",
  },
  description:
    "Design system for ForEveryone Berlin: tokens, components, and patterns at design.foreveryone.berlin.",
  applicationName: "ForEveryone Design System",
  authors: [{ name: "ForEveryone Berlin", url: "https://foreveryone.berlin" }],
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "ForEveryone Design System",
    title: "ForEveryone Design System",
    description:
      "Design tokens, components, and patterns for the ForEveryone digital experience.",
    url: "/",
    images: [
      {
        url: "/images/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "ForEveryone Design System card: a bold \"Design System\" headline on a soft-lavender background with an orange megaphone burst, a line-art illustration of a person making pottery, and the ForEveryone logo.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ForEveryone Design System",
    description:
      "Design tokens, components, and patterns for the ForEveryone digital experience.",
    images: ["/images/social-preview.jpg"],
  },
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF7A3A",
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
        <a href="#main-content" className="ds-skip-link">
          Skip to content
        </a>
        <ViewTransitions />
        <MobileNav />
        <div className="ds-layout" suppressHydrationWarning>
          <Navigation />
          <div className="ds-main-area" suppressHydrationWarning>
            <div className="ds-content-row" suppressHydrationWarning>
              <main id="main-content" tabIndex={-1} className="ds-page" suppressHydrationWarning>
                {children}
              </main>
              <OnThisPage />
            </div>
            <footer className="ds-footer" suppressHydrationWarning>
              <p className="ds-footer-version">
                ForEveryone Design System
              </p>
              <span className="ds-footer-sep" aria-hidden="true">
                -
              </span>
              <span className="ds-footer-version">v{version}</span>
              <span className="ds-footer-sep" aria-hidden="true">
                -
              </span>
              <a
                className="ds-footer__github"
                href="https://github.com/Foreveryone-berlin/design-system"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
