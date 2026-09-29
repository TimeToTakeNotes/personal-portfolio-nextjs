"use client"

import * as React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Section } from "@arno/components/layout/Section"
import { FadeIn, RevealText, Rule } from "@arno/components/ui/Reveal"
import { siteData } from "@arno/assets/site"
import type { ExperienceItem } from "@arno/assets/site"
import { cn } from "@arno/lib/utils"
import { useReducedMotion, useViewportAnimation } from "@arno/lib/animations"

const copy = siteData.sections.experience

const groups = [
  { label: copy.workLabel, items: siteData.experience.filter((e) => e.type === "work") },
  { label: copy.educationLabel, items: siteData.experience.filter((e) => e.type === "education") },
].filter((group) => group.items.length > 0)

// ── Entry ──────────────────────────────────────────────────────────────────

function Entry({ item }: { item: ExperienceItem }) {
  // The marker on the timeline turns to the accent colour while the entry is in the reading zone.
  const { ref, isInView: active } = useViewportAnimation({ once: false, amount: 0, margin: "-40% 0px -40% 0px" })

  return (
    <li ref={ref} className="relative pl-6 md:pl-10">
      <span
        aria-hidden="true"
        className={cn(
          "absolute -left-[3.5px] top-3 h-2 w-2 rounded-full border transition-colors duration-500",
          active ? "border-primary bg-primary" : "border-border-strong/40 bg-background"
        )}
      />
      <FadeIn className="grid grid-cols-12 gap-y-4 pb-14 md:gap-x-10 md:pb-20">
        <p className="eyebrow figures col-span-12 pt-2 md:col-span-3">{item.period}</p>

        <div className="col-span-12 md:col-span-6">
          <h3 className="text-3xl md:text-4xl">{item.title}</h3>
          <p className="mt-2 font-medium text-primary">{item.org}</p>
          <ul className="mt-6 space-y-3">
            {item.description.map((point) => (
              <li key={point} className="relative pl-6 text-muted-foreground">
                <span aria-hidden="true" className="absolute left-0 top-[0.8em] h-px w-3 bg-muted-foreground/60" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {item.tags && (
          <ul className="col-span-12 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-foreground/75 md:col-span-3 md:flex-col md:pt-2">
            {item.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </FadeIn>
    </li>
  )
}

// ── Timeline with scroll-linked progress line ──────────────────────────────

function Timeline({ items }: { items: ExperienceItem[] }) {
  const ref = React.useRef<HTMLOListElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-0 left-0 top-3 w-px bg-border" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-3 w-px origin-top bg-primary"
        style={{ scaleY: prefersReduced ? 1 : progress }}
      />
      {items.map((item) => (
        <Entry key={`${item.title}-${item.org}`} item={item} />
      ))}
    </ol>
  )
}

// ── Section ────────────────────────────────────────────────────────────────

export function ExperienceSection() {
  return (
    <Section id="experience" index="03" label={copy.label}>
      <div className="grid grid-cols-12 gap-y-6 md:gap-x-10">
        <div className="col-span-12 md:col-span-8">
          <RevealText as="h2" className="text-5xl md:text-7xl">
            {copy.title}
          </RevealText>
        </div>
        <FadeIn delay={0.2} className="col-span-12 md:col-span-4 md:self-end">
          <p className="text-muted-foreground md:text-lg">{copy.intro}</p>
        </FadeIn>
      </div>

      {groups.map((group) => (
        <div key={group.label} className="mt-20 md:mt-28">
          <p className="eyebrow pb-4">{group.label}</p>
          <Rule className="mb-10 md:mb-14" />
          <Timeline items={group.items} />
        </div>
      ))}

      {/* Achievements */}
      <div className="mt-16 md:mt-24">
        <p className="eyebrow pb-4">{copy.achievementsLabel}</p>
        <ol>
          {siteData.achievements.map((achievement, i) => (
            <li key={achievement.title} className="group">
              <Rule delay={i * 0.06} />
              <FadeIn delay={i * 0.06} className="grid grid-cols-12 gap-y-2 py-6 md:gap-x-10 md:py-8">
                <span className="eyebrow figures col-span-12 pt-2 transition-colors group-hover:text-primary md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-12 text-2xl md:col-span-5 md:text-3xl">{achievement.title}</h3>
                <p className="col-span-12 text-muted-foreground md:col-span-5 md:col-start-8 md:pt-1">
                  {achievement.description}
                </p>
              </FadeIn>
            </li>
          ))}
        </ol>
        <Rule />
      </div>
    </Section>
  )
}
