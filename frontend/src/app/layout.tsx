import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "CivicAI – Smart Election Assistant",
  description: "Your Personal Election Guide. Understand, Prepare, and Vote with Confidence. AI-powered civic education for every citizen.",
  keywords: "election, voting, civic education, voter guide, India elections, AI assistant",
  openGraph: {
    title: "CivicAI – Smart Election Assistant",
    description: "Your Personal Election Guide. Understand, Prepare, and Vote with Confidence.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body>
        <SessionWrapper>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
