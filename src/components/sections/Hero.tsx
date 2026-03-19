"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Download, Github, Linkedin } from "lucide-react"
import { Button } from "@arno/components/ui/Button"
import { Badge } from "@arno/components/ui/Badge"
import { Metrics } from "@arno/components/ui/Metrics"
import { TypeWriter } from "@arno/components/ui/TypeWriter"
import { Marquee } from "@arno/components/ui/Marquee"
import { siteData } from "@arno/assets/site"
import { easings, durations } from "@arno/lib/animations"

// ── Floating path lines ────────────────────────────────────────────────────
// Uses `currentColor` so colour is controlled by the wrapping element's
// `text-*` class - no hardcoded colour values inside the component.

const PATHS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  d: (pos: number) =>
    `M-${380 - i * 5 * pos} -${189 + i * 6}` +
    `C-${380 - i * 5 * pos} -${189 + i * 6}` +
    ` -${312 - i * 5 * pos} ${216 - i * 6}` +
    ` ${152 - i * 5 * pos} ${343 - i * 6}` +
    `C${616 - i * 5 * pos} ${470 - i * 6}` +
    ` ${684 - i * 5 * pos} ${875 - i * 6}` +
    ` ${684 - i * 5 * pos} ${875 - i * 6}`,
  width: 0.5 + i * 0.03,
  // Deterministic duration - avoids SSR/client Math.random() hydration mismatch
  duration: 20 + (i * 7) % 11,
  strokeOpacity: 0.12 + i * 0.018,
}))

export function FloatingPaths({ position }: { position: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {PATHS.map((path) => (
          <motion.path
            key={path.id}
            d={path.d(position)}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.strokeOpacity}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.55, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// ── Tech stack ─────────────────────────────────────────────────────────────

const techStack = [
  "Next.js", "React", "TypeScript", "Python", "Django",
  "HuggingFace", "PyTorch", "Tailwind CSS", "Docker", "MongoDB",
  "Node.js", "OpenAI", "C# / .NET", "Git",
]

// ── Hero section ───────────────────────────────────────────────────────────

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >

      {/* ── Background Layer ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>

        {/* Dot grid - structural base */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(79 95 118 / 0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating paths - crimson (primary) sweep */}
        <div className="absolute inset-0 text-primary opacity-[0.75] dark:opacity-[0.65]">
          <FloatingPaths position={1} />
        </div>

        {/* Floating paths - grey-blue (muted) counter-sweep */}
        <div className="absolute inset-0 text-muted-foreground opacity-[0.55] dark:opacity-[0.45]">
          <FloatingPaths position={-1} />
        </div>

        {/* Bottom fade - blends into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="max-w-4xl mx-auto text-center">

          {/* Available badge - badgePop: drops in from above with scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: durations.base, ease: easings.back }}
            className="flex justify-center mb-8"
          >
            <Badge variant="tag" size="sm" animation="pulse-glow" className="gap-2 px-4 py-1.5 backdrop-blur-sm">
              <span className="inline-flex rounded-full h-2 w-2 bg-primary" />
              Junior Fullstack Developer @ Converge Solutions
            </Badge>
          </motion.div>

          {/* Name - headline: large y travel + slight scale for impact */}
          <motion.h1
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: durations.xslow, ease: easings.smooth, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-5 tracking-tight leading-[1.05]"
          >
            <span className="text-foreground">Hi, I&apos;m </span>
            <span className="text-gradient-primary">{siteData.name}</span>
          </motion.h1>

          {/* Typewriter role - blurReveal: blur + fade + rise, premium feel */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: durations.xslow, ease: easings.smooth, delay: 0.3 }}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground mb-7 min-h-[2rem] flex items-center justify-center"
          >
            <TypeWriter words={siteData.typewriterRoles} />
          </motion.div>

          {/* Bio - textBlock: softer blur + fade + rise for body copy */}
          <motion.p
            initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: durations.xslow, ease: easings.smooth, delay: 0.45 }}
            className="text-base md:text-lg text-foreground/75 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {siteData.bio}
          </motion.p>

          {/* CTA buttons - scaleUp: grows from slightly smaller with backOut snap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: durations.base, ease: easings.back, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-5"
          >
            <Button size="lg" variant="primary" asChild className="btn-glow gap-2 w-full sm:w-auto">
              <a href="#projects">
                View My Work
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto backdrop-blur-sm">
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>

          {/* Social icons + CV - fadeUp: rises from below */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.slow, ease: easings.smooth, delay: 0.72 }}
            className="flex justify-center items-center gap-3 mb-14"
          >
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-9 w-9 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5"
            >
              <a href={siteData.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-9 w-9 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5"
            >
              <a href={siteData.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <div className="h-4 w-px bg-border/50" />
            <Button size="sm" variant="ghost" className="gap-1.5 text-muted-foreground text-sm" asChild>
              <a href="/Arno Christie - CV.pdf" download="Arno Christie - CV.pdf">
                <Download className="h-3.5 w-3.5" />
                Download CV
              </a>
            </Button>
          </motion.div>

          {/* Tech stack marquee - clipRevealX: horizontal wipe-in */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: durations.slow, ease: easings.smooth, delay: 0.85 }}
            className="mb-12"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-border/80 to-transparent mb-5" />
            <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-[0.2em] mb-4">
              Tech Stack
            </p>
            <Marquee items={techStack} duration={36} />
            <div className="h-px bg-gradient-to-r from-transparent via-border/80 to-transparent mt-5" />
          </motion.div>

          {/* Metrics - fadeUp: clean rise from below */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.slow, ease: easings.smooth, delay: 1.0 }}
          >
            <Metrics items={siteData.metrics} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: easings.smooth }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground/50" />
        </motion.div>
      </motion.div>

    </section>
  )
}
