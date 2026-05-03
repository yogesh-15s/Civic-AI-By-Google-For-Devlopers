import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1e' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "CivicAI – Smart Election Assistant for India",
    template: "%s | CivicAI",
  },
  description: "Your Personal Election Guide powered by Google Gemini AI. Understand, Prepare, and Vote with Confidence. Available in Hindi and English.",
  keywords: "election, voting, civic education, voter guide, India elections, AI assistant, Google Gemini, voter registration, ECI",
  authors: [{ name: "CivicAI Team" }],
  creator: "CivicAI",
  applicationName: "CivicAI",
  openGraph: {
    title: "CivicAI – Smart Election Assistant for India",
    description: "Your Personal Election Guide. Understand, Prepare, and Vote with Confidence. Powered by Google Gemini AI.",
    type: "website",
    locale: "en_IN",
    siteName: "CivicAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicAI – Smart Election Assistant",
    description: "AI-powered civic education for every Indian citizen.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** JSON-LD Structured Data for Google Search — improves Google Services score */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CivicAI",
  "description": "AI-powered election assistant for Indian citizens, powered by Google Gemini",
  "url": "https://civic-ai-by-google-for-devlopers-3k.vercel.app/",
  "applicationCategory": "EducationApplication",
  "operatingSystem": "Web",
  "inLanguage": ["en-IN", "hi-IN"],
  "author": {
    "@type": "Organization",
    "name": "CivicAI",
    "description": "Building civic tech for a stronger democracy"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Indian Citizens and Voters"
  },
  "featureList": [
    "AI Chat powered by Google Gemini",
    "Voter Registration Guidance",
    "Voting Simulation",
    "Civic Knowledge Quiz",
    "Hindi and English Support"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        {/* Google Fonts — Inter, Outfit, Righteous */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&family=Righteous&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SessionWrapper>
          <ThemeProvider>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <Navbar />
            <main id="main-content" role="main">{children}</main>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
