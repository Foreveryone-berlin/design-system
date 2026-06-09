import type { Metadata, Viewport } from "next";
import { Outfit, Young_Serif } from "next/font/google";
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

// Young Serif stands in for the brand accent serif (style guide H1/H3 additional).
// Single weight (400) is the only one published.
const youngSerif = Young_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-young-serif",
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
      className={`ds-light-only ${outfit.variable} ${youngSerif.variable}`}
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
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
