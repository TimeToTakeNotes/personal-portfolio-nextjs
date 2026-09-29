"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Section } from "@arno/components/layout/Section"
import { FadeIn, RevealText, Rule } from "@arno/components/ui/Reveal"
import { siteData } from "@arno/assets/site"
import { easings, durations, useReducedMotion, useViewportAnimation } from "@arno/lib/animations"

const copy = siteData.sections.about
const degree = siteData.experience.find((item) => item.type === "education")
const honour = siteData.achievements[0]

const facts = [
  { label: "Based in", value: siteData.location },
  { label: "Education", value: degree ? `${degree.title}, ${degree.org}` : "" },
  { label: "Honours", value: honour.title },
].filter((fact) => fact.value)

// ── Photo ──────────────────────────────────────────────────────────────────

/**
 * Wide photo with a clip-path reveal and a slow scroll parallax.
 * The frame opens from the bottom edge while the photo settles from a slight
 * zoom. The crop keeps the face in view at every aspect ratio.
 */
function Photo() {
  const { ref, isInView: inView } = useViewportAnimation({ margin: "0px 0px -15% 0px" })
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["-6%", "6%"])

  return (
    <figure ref={ref}>
      <motion.div
        className="relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[4/3] md:aspect-[16/8] lg:aspect-[16/7]"
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
          {/* Oversized by 8% top and bottom so the parallax never shows an edge */}
          <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={{ y }}>
            <Image
              src="/arno-lookout.jpg"
              alt={`${siteData.name} at a lookout above a forested river valley`}
              fill
              sizes="(min-width: 1408px) 1312px, 92vw"
              className="object-cover object-[88%_40%]"
            />
          </motion.div>
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
      <Photo />

      {/* Bio and facts */}
      <div className="mt-16 grid grid-cols-12 gap-y-14 md:mt-24 md:gap-x-10">
        <FadeIn className="col-span-12 lg:col-span-10">
          <p className="font-serif text-[1.75rem] leading-[1.25] md:text-[2.5rem] lg:text-[3rem]">
            {siteData.bio}
          </p>
        </FadeIn>

        <dl className="col-span-12 grid grid-cols-1 gap-x-10 md:grid-cols-3">
          {facts.map((fact, i) => (
            <FadeIn key={fact.label} delay={i * 0.08}>
              <Rule delay={i * 0.08} />
              <dt className="eyebrow pt-4">{fact.label}</dt>
              <dd className="mt-2 pb-6">{fact.value}</dd>
            </FadeIn>
          ))}
        </dl>
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
