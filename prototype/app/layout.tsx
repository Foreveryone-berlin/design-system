import type { Metadata, Viewport } from "next";
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
  title: {
    default: "ForEveryone Design System",
    template: "%s | ForEveryone Design System",
  },
  description:
    "Design system for For Everyone Berlin: tokens, components, and patterns at design.foreveryone.berlin.",
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
        alt: "ForEveryone Design System card: a bold \"Design System\" headline on a soft-lavender background with an orange megaphone burst, a line-art illustration of a person making pottery, and the For Everyone logo.",
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
            <main id="main-content" tabIndex={-1} className="ds-page" suppressHydrationWarning>
              {children}
            </main>
            <footer className="ds-footer" suppressHydrationWarning>
              <p className="ds-footer-version">Design System v{version}</p>
              <p style={{ margin: 0 }}>design.foreveryone.berlin</p>
              <a
                className="ds-footer__github"
                href="https://github.com/Foreveryone-berlin/design-system"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
