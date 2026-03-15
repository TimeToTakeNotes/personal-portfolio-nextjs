"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Award, GraduationCap, Star, BadgeCheck, MapPin } from "lucide-react"
import { Section } from "@arno/components/layout/Section"
import { Badge } from "@arno/components/ui/Badge"
import { siteData } from "@arno/assets/site"
import { easeOut } from "@arno/lib/animations"
import { cn } from "@arno/lib/utils"

// ── Helpers ────────────────────────────────────────────────────────────────

const achievementIcon = (icon: string) => {
  const cls = "h-5 w-5 text-primary flex-shrink-0"
  switch (icon) {
    case "award":          return <Award className={cls} />
    case "graduation-cap": return <GraduationCap className={cls} />
    case "star":           return <Star className={cls} />
    case "badge-check":    return <BadgeCheck className={cls} />
    default:               return <Award className={cls} />
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-muted-foreground tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay }}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

const TABS = ["Skills", "Education", "Achievements"] as const
type Tab = (typeof TABS)[number]

// ── Quick-info chips ────────────────────────────────────────────────────────

const INFO_CHIPS = [
  { icon: <MapPin className="h-3 w-3 text-primary" />, label: "South Africa" },
  { icon: <GraduationCap className="h-3 w-3 text-primary" />, label: "BSc IT Graduate" },
  { icon: <Award className="h-3 w-3 text-primary" />, label: "Golden Key Society" },
]

// ── Main Component ─────────────────────────────────────────────────────────

export function AboutSection() {
  const [activeTab, setActiveTab] = React.useState<Tab>("Skills")
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <Section id="about" className="relative overflow-hidden">
      <div ref={sectionRef}>

        {/* ── Background photo — xl+ only (≥1280px, wide desktop bleed) ──── */}
        <div
          className="hidden xl:block absolute right-0 top-0 bottom-0 w-[52%] pointer-events-none select-none"
          aria-hidden
        >
          {/* Left-edge fade: transparent → opaque */}
          <div
            className="absolute inset-0"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 42%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 42%)",
            }}
          >
            {/* Top + bottom fade */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
              }}
            >
              <Image
                src="/Arno - Selfie.png"
                alt=""
                fill
                className="object-contain object-right-bottom"
                priority
              />
            </div>
          </div>
        </div>

        {/* ── Intro: responsive layout ─────────────────────────────────────── */}
        {/*
          Mobile  (<md):  single col — photo above text
          Tablet  (md–xl): 2-col grid — text left, contained photo right
          Desktop (xl+):  single col — text only (absolute bleed photo above)
        */}
        <div className="relative z-10 mb-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-10 md:gap-14 items-center xl:min-h-[380px] xl:flex xl:flex-col xl:justify-center">

          {/* Text — below photo on mobile, left col on md–xl, full on xl+ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.05 }}
            className="order-2 md:order-1 xl:max-w-lg"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Get to know me
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
              About Me
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-7">
              {siteData.bio}
            </p>

            {/* Quick-info chips */}
            <div className="flex flex-wrap gap-2">
              {INFO_CHIPS.map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground bg-card/80 backdrop-blur-sm border border-border/70 rounded-full px-3 py-1.5"
                >
                  {icon}
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Photo — above text on mobile, right col on md–xl, hidden on xl+ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.1 }}
            className="order-1 md:order-2 xl:hidden flex justify-center"
          >
            {/* Mobile: compact centered */}
            <div className="md:hidden relative w-52 h-64 overflow-hidden rounded-2xl border border-border/50 shadow-xl bg-muted/20">
              <Image
                src="/Arno - Selfie.png"
                alt="Arno Christie"
                fill
                className="object-contain object-center"
                priority
              />
            </div>

            {/* md–xl: taller card, person right-aligned within container */}
            <div className="hidden md:block relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-muted/15">
              <Image
                src="/Arno - Selfie.png"
                alt="Arno Christie"
                fill
                className="object-contain object-right-bottom"
                priority
              />
              {/* Bottom gradient so card edge blends */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent mb-10" />

        {/* ── Tab bar ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: easeOut, delay: 0.25 }}
          className="relative z-10 flex justify-center mb-8"
        >
          <div className="inline-flex bg-muted rounded-xl p-1 gap-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === tab
                    ? "bg-background dark:bg-secondary text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Tab content ─────────────────────────────────────────────────── */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="relative z-10"
        >
          {activeTab === "Skills" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {siteData.skillCategories.map((cat, ci) => (
                <div
                  key={cat.category}
                  className="bg-card border border-border rounded-2xl p-6 space-y-4"
                >
                  <h3 className="text-base font-semibold text-foreground">{cat.category}</h3>
                  <div className="space-y-4">
                    {cat.skills.map((skill, si) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        delay={(ci * cat.skills.length + si) * 0.06}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Education" && (
            <div className="max-w-2xl mx-auto space-y-6">
              {siteData.experience
                .filter((e) => e.type === "education")
                .map((edu) => (
                  <div
                    key={edu.title}
                    className="bg-card border border-border rounded-2xl p-6 md:p-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{edu.title}</h3>
                        <p className="text-primary font-medium">{edu.org}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap self-start">
                        {edu.period}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {edu.description.map((point, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    {edu.tags && (
                      <div className="flex flex-wrap gap-2">
                        {edu.tags.map((tag) => (
                          <Badge key={tag} variant="tag" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}

          {activeTab === "Achievements" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {siteData.achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: easeOut, delay: i * 0.08 }}
                  className="bg-card border border-border rounded-2xl p-5 flex gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {achievementIcon(achievement.icon)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </Section>
  )
}
