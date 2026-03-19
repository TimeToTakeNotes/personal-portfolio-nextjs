import "./globals.css";
import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { ThemeProvider } from "@arno/components/layout/ThemeProvider";
import MainNavigation from "@arno/components/layout/MainNavigation";
import Footer from "@arno/components/layout/Footer";
import { PageTransition } from "@arno/lib/animations";
import { BackToTop } from "@arno/components/ui/BackToTop";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

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
        url: "/Arno - Selfie Web.png",
        width: 1200,
        height: 630,
        alt: "Arno Christie – AI & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arno Christie – AI & Full-Stack Developer",
    description:
      "BSc IT graduate specialising in NLP fine-tuning and full-stack development.",
    images: ["/Arno - Selfie Web.png"],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system">
          <MainNavigation />
          <main className="pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
