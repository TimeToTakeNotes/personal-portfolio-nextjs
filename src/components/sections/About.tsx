"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Section } from "@arno/components/layout/Section"
import { FadeIn, RevealText, Rule } from "@arno/components/ui/Reveal"
import { siteData } from "@arno/assets/site"
import { easings, durations, useViewportAnimation } from "@arno/lib/animations"

const copy = siteData.sections.about
const degree = siteData.experience.find((item) => item.type === "education")
const honour = siteData.achievements[0]

const facts = [
  { label: "Based in", value: siteData.location },
  { label: "Education", value: degree ? `${degree.title}, ${degree.org}` : "" },
  { label: "Honours", value: honour.title },
].filter((fact) => fact.value)

// ── Portrait ───────────────────────────────────────────────────────────────

/**
 * Portrait with a clip-path reveal: the frame opens from the bottom edge
 * while the photo settles from a slight zoom.
 */
function Portrait() {
  const { ref, isInView: inView } = useViewportAnimation({ margin: "0px 0px -15% 0px" })

  return (
    <figure ref={ref} className="lg:sticky lg:top-24">
      <motion.div
        className="relative aspect-[4/5] overflow-hidden bg-muted"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: durations.crawl, ease: easings.expo }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: durations.crawl, ease: easings.expo }}
        >
          <Image
            src="/Arno - Selfie Mobile.png"
            alt={`Portrait of ${siteData.name}`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 90vw"
            className="object-cover object-[80%_top]"
          />
        </motion.div>
      </motion.div>
      <figcaption className="eyebrow mt-3 flex justify-between gap-4">
        <span>{siteData.name}</span>
        <span>{siteData.role}</span>
      </figcaption>
    </figure>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <Section id="about" index="01" label={copy.label}>
      {/* Intro: portrait and bio */}
      <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
        <div className="col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-5 md:col-start-1 lg:col-span-4">
          <Portrait />
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
          <FadeIn>
            <p className="font-serif text-[1.75rem] leading-[1.25] md:text-[2.25rem] lg:text-[2.6rem]">
              {siteData.bio}
            </p>
          </FadeIn>

          <dl className="mt-14 md:mt-20">
            {facts.map((fact, i) => (
              <FadeIn key={fact.label} delay={i * 0.08}>
                <Rule delay={i * 0.08} />
                <div className="grid grid-cols-3 gap-4 py-4">
                  <dt className="eyebrow pt-1">{fact.label}</dt>
                  <dd className="col-span-2">{fact.value}</dd>
                </div>
              </FadeIn>
            ))}
            <Rule />
          </dl>
        </div>
      </div>

      {/* Areas of expertise */}
      <div className="mt-28 md:mt-40">
        <div className="grid grid-cols-12 gap-y-6 md:gap-x-10">
          <p className="eyebrow col-span-12 md:col-span-4">{copy.practiceLabel}</p>
          <div className="col-span-12 md:col-span-8">
            <RevealText as="h2" className="text-5xl md:text-7xl">
              {copy.practiceTitle}
            </RevealText>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">{copy.practiceIntro}</p>
            </FadeIn>
          </div>
        </div>

        <ol className="mt-14 md:mt-20">
          {siteData.specializations.map((spec, i) => (
            <li key={spec.title} className="group">
              <Rule delay={i * 0.1} />
              <FadeIn delay={i * 0.1} className="grid grid-cols-12 gap-y-4 py-8 md:gap-x-10 md:py-12">
                <span className="eyebrow figures col-span-12 pt-2 transition-colors group-hover:text-primary md:col-span-1">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <h3 className="col-span-12 text-3xl transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-2 lg:text-5xl">
                  {spec.title}
                </h3>
                <div className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
                  <p className="text-muted-foreground">{spec.description}</p>
                  <p className="mt-4 font-mono text-xs text-foreground/80">{spec.tags.join("  /  ")}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
        <Rule />
      </div>

      {/* Skills: grouped lists, no self-rated levels */}
      <div className="mt-28 md:mt-40">
        <p className="eyebrow">{copy.skillsLabel}</p>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
          {siteData.skillCategories.map((cat, ci) => (
            <FadeIn key={cat.category} delay={ci * 0.08}>
              <h3 className="text-3xl">{cat.category}</h3>
              <Rule className="mt-4" delay={ci * 0.08} />
              <ul className="mt-4 space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill.name} className="text-foreground/85">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  )
}
