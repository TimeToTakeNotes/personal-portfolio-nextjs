import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@arno/components/layout/ThemeProvider";
import MainNavigation from "@arno/components/layout/MainNavigation";
// import Footer from "@arno/components/layout/Footer";

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

// Tells Next.js to use the viewport meta tag
export function generateViewport() {
  return "width=device-width, initial-scale=1, maximum-scale=5";
}

export const metadata: Metadata = {
  title: "Arno Christie - Software Developer",
  description:
    "Passionate  software developer specializing in AI-powered web applications. Building the future with React, Next.js, and modern AI technologies.",
  keywords: ["software developer", "AI", "React", "Next.js", "TypeScript", "web development"],
  authors: [{ name: "Arno Christie" }],
  openGraph: {
    title: "Arno Christie - Software Developer",
    description: "Passionate software developer specializing in AI-powered web applications.",
    type: "website",
  },
  robots: "index, follow",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${dmSans.style.fontFamily};
            --font-space-grotesk: ${spaceGrotesk.variable};
            --font-dm-sans: ${dmSans.variable};
          }
        `}</style>
      </head>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system">
        <MainNavigation />
        <main>{children}</main>
        {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}