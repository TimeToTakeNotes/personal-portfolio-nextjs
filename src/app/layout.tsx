import "./globals.css";
import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@arno/components/layout/ThemeProvider";
import { MotionProvider } from "@arno/components/layout/MotionProvider";
import MainNavigation from "@arno/components/layout/MainNavigation";
import Footer from "@arno/components/layout/Footer";
import { PageTransition, pageFade } from "@arno/lib/animations";

// Display: headings, names, large figures
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
})

// Body copy and interface text
const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted-grotesk",
})

// Metadata: labels, dates, indexes, tags
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

// Applies the saved theme before first paint, so the page does not flash
// the wrong theme while React hydrates. Keep the storage key in sync with ThemeProvider.
const themeScript = `(function(){try{var t=localStorage.getItem("app-theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.add(d?"dark":"light")}catch(e){}})()`

export function generateViewport() {
  return "width=device-width, initial-scale=1, maximum-scale=5";
}

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-portfolio-nextjs-rouge.vercel.app"),
  title: "Arno Christie – AI & Full-Stack Developer",
  description:
    "BSc IT graduate (86.3% distinction) specialising in NLP fine-tuning and full-stack development. Currently Junior Fullstack Developer at Converge Solutions. Building AI-powered applications with Next.js, Python, and HuggingFace.",
  keywords: [
    "Arno Christie",
    "software developer",
    "AI developer",
    "full-stack developer",
    "NLP",
    "HuggingFace",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Django",
    "South Africa",
    "portfolio",
  ],
  authors: [{ name: "Arno Christie", url: "https://github.com/TimeToTakeNotes" }],
  openGraph: {
    title: "Arno Christie – AI & Full-Stack Developer",
    description:
      "BSc IT graduate specialising in NLP fine-tuning and full-stack development. Junior Fullstack Developer at Converge Solutions.",
    url: "https://personal-portfolio-nextjs-rouge.vercel.app",
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: "/arno-lookout.jpg",
        width: 1599,
        height: 1199,
        alt: "Arno Christie – AI & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arno Christie – AI & Full-Stack Developer",
    description:
      "BSc IT graduate specialising in NLP fine-tuning and full-stack development.",
    images: ["/arno-lookout.jpg"],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${instrumentSerif.variable} ${schibstedGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider defaultTheme="system">
          <MotionProvider>
            <MainNavigation />
            <main id="main" className="relative">
              <PageTransition variant={pageFade}>{children}</PageTransition>
            </main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
