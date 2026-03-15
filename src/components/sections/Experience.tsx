"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import { Section } from "@arno/components/layout/Section"
import { Badge } from "@arno/components/ui/Badge"
import { siteData } from "@arno/assets/site"
import { easeOut } from "@arno/lib/animations"
import type { ExperienceItem } from "@arno/assets/site"

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: ExperienceItem
  index: number
  isLast?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const isWork = item.type === "work"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: easeOut, delay: index * 0.1 }}
      className="relative pl-14"
    >
      {/* Timeline icon */}
      <div
        className={`absolute left-0 top-0 h-10 w-10 rounded-xl flex items-center justify-center border-2 z-10 ${
          isWork
            ? "bg-primary/10 border-primary/30 text-primary"
            : "bg-card border-border text-muted-foreground"
        }`}
      >
        {isWork ? (
          <Briefcase className="h-4 w-4" />
        ) : (
          <GraduationCap className="h-4 w-4" />
        )}
      </div>

      {/* Connecting line — runs from below the icon to the bottom of this wrapper (which includes mb-6) */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
      )}

      {/* Card */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-7 mb-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <span
              className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${
                isWork ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {isWork ? "Work Experience" : "Education"}
            </span>
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className={`font-medium text-sm ${isWork ? "text-primary" : "text-foreground"}`}>
              {item.org}
            </p>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full whitespace-nowrap self-start">
            {item.period}
          </span>
        </div>

        {/* Description bullets */}
        <ul className="space-y-2 mb-4">
          {item.description.map((point, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        {item.tags && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="tag" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function ExperienceSection() {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <Section id="experience" className="bg-muted/30">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: easeOut }}
        className="text-center mb-12"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
          My journey
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Experience &amp; Education
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          From academic foundations to real-world AI development - here&apos;s how I got here.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto">
        {siteData.experience.map((item, i) => (
          <TimelineItem key={item.title} item={item} index={i} isLast={i === siteData.experience.length - 1} />
        ))}
      </div>
    </Section>
  )
}
