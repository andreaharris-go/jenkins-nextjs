import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jenkins + Next.js",
  description: "A Next.js application with Jenkins CI/CD integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
