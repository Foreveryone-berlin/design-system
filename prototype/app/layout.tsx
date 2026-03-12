import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForEveryone Design System",
  description:
    "Design system prototype for ForEveryone Berlin — future design.foreveryone.berlin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
