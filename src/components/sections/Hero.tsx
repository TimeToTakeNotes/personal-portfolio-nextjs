"use client"

import * as React from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useScroll,
  useTransform,
} from "framer-motion"
import { siteData } from "@arno/assets/site"
import type { MetricItem } from "@arno/assets/site"
import { easings, useReducedMotion, durations, useViewportAnimation } from "@arno/lib/animations"
import { RevealText, Rule } from "@arno/components/ui/Reveal"
import { TextLink } from "@arno/components/ui/TextLink"

const ROLE_INTERVAL_MS = 2800

const currentRole = siteData.experience.find((item) => item.period.includes("Present"))

// ── Rotating role ──────────────────────────────────────────────────────────

/**
 * Cycles through siteData.typewriterRoles. Each role slides up from behind
 * a mask. Screen readers get the primary role only, once.
 */
function RotatingRole({ words }: { words: string[] }) {
  const [index, setIndex] = React.useState(0)
  const prefersReduced = useReducedMotion()

  React.useEffect(() => {
    if (prefersReduced || words.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), ROLE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [prefersReduced, words.length])

  return (
    <>
      <span className="visually-hidden">{siteData.role}</span>
      <span aria-hidden="true" className="inline-grid overflow-hidden pb-[0.1em] align-bottom">
        <AnimatePresence initial={false}>
          <motion.span
            key={words[index]}
            className="col-start-1 row-start-1 whitespace-nowrap"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-105%" }}
            transition={{ duration: durations.xslow, ease: easings.expo }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  )
}

// ── Count-up figure ────────────────────────────────────────────────────────

const FIGURE_PATTERN = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/

function CountUp({ value }: { value: string }) {
  const { ref, isInView: inView } = useViewportAnimation({ margin: "0px" })
  const prefersReduced = useReducedMotion()
  const match = value.match(FIGURE_PATTERN)
  const [display, setDisplay] = React.useState(value)

  React.useEffect(() => {
    if (!inView || !match || prefersReduced) return
    const [, prefix, number, suffix] = match
    const decimals = number.includes(".") ? number.split(".")[1].length : 0
    const controls = animate(0, parseFloat(number), {
      duration: durations.crawl,
      ease: easings.expo,
      onUpdate: (latest) => setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`),
    })
    return () => controls.stop()
    // match is derived from value; value is the stable dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, prefersReduced])

  return (
    <span ref={ref} className="figures">
      {display}
    </span>
  )
}

function Figures({ items }: { items: MetricItem[] }) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          className="flex flex-col-reverse gap-2 border-l border-border py-1 pl-4 pr-2 md:pl-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.xslow, ease: easings.expo, delay: 1.05 + i * 0.08 }}
        >
          <dt className="eyebrow">{item.label}</dt>
          <dd className="font-serif text-4xl leading-none md:text-5xl">
            <CountUp value={item.value} />
          </dd>
        </motion.div>
      ))}
    </dl>
  )
}

// ── Hero section ───────────────────────────────────────────────────────────

export function HeroSection() {
  const ref = React.useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  // The name drifts up slower than the page scroll, which gives a subtle depth effect.
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReduced ? "0%" : "35%"])

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col pb-10 pt-24 md:pt-28"
    >
      <div className="container-page flex flex-1 flex-col">
        {/* Meta row */}
        <motion.div
          className="eyebrow flex flex-wrap items-center justify-between gap-x-6 gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durations.xslow, delay: 0.1 }}
        >
          {currentRole && (
            <p className="flex items-start gap-2.5">
              <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>
                Currently {currentRole.title}, {currentRole.org}
              </span>
            </p>
          )}
          <p>{siteData.location}</p>
        </motion.div>

        {/* Name */}
        <div className="flex flex-1 flex-col justify-center py-14 md:py-10">
          <motion.div style={{ y: nameY }}>
            <h1 className="font-serif text-[clamp(3.5rem,21vw,19.5rem)] leading-[0.86] tracking-[-0.035em]">
              <RevealText onMount delay={0.2} stagger={0.12}>
                {siteData.name}
              </RevealText>
            </h1>
          </motion.div>
        </div>

        <Rule strong delay={0.5} />

        {/* Role, tagline and links */}
        <div className="grid grid-cols-12 gap-y-8 pt-8 md:gap-x-8 md:pt-10">
          <motion.p
            className="col-span-12 font-serif text-3xl italic leading-tight text-primary md:col-span-5 md:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: durations.xslow, delay: 0.75 }}
          >
            <RotatingRole words={siteData.typewriterRoles} />
          </motion.p>

          <motion.div
            className="col-span-12 flex flex-col gap-6 md:col-span-6 md:col-start-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.xslow, ease: easings.expo, delay: 0.85 }}
          >
            <p className="max-w-xl text-lg leading-relaxed md:text-xl">{siteData.tagline}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <li>
                <TextLink href="#projects" arrow="down">
                  {siteData.sections.projects.label}
                </TextLink>
              </li>
              <li>
                <TextLink href={siteData.links.github} arrow="up-right" external>
                  GitHub
                </TextLink>
              </li>
              <li>
                <TextLink href={siteData.links.linkedin} arrow="up-right" external>
                  LinkedIn
                </TextLink>
              </li>
              <li>
                <TextLink href={siteData.cv.href} download={siteData.cv.href.slice(1)} arrow="down">
                  {siteData.cv.label}
                </TextLink>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Figures */}
        <div className="pt-14 md:pt-20">
          <Figures items={siteData.metrics} />
        </div>
      </div>
    </section>
  )
}
