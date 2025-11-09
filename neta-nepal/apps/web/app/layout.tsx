import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Neta Nepal - Political Transparency Platform",
  description: "A non-partisan, fact-based political transparency platform for Nepal",
  keywords: ['Nepal', 'politics', 'politicians', 'elections', 'promises', 'accountability', 'transparency'],
  authors: [{ name: 'Neta Nepal Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#C1121F',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Montserrat:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-sans">
        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-lg focus:py-md focus:bg-accent focus:text-white focus:rounded focus:m-base"
        >
          Skip to main content
        </a>
        
        <Providers>
          <main id="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
