"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Layers, Monitor } from "lucide-react"
import { Section } from "@arno/components/layout/Section"
import { Badge } from "@arno/components/ui/Badge"
import { siteData } from "@arno/assets/site"
import { easeOut } from "@arno/lib/animations"

const icons = [
  <Brain className="h-7 w-7 text-primary" key="brain" />,
  <Layers className="h-7 w-7 text-primary" key="layers" />,
  <Monitor className="h-7 w-7 text-primary" key="monitor" />,
]

export function SpecializationsSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section id="specializations" className="bg-muted/20">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: easeOut }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            What I do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Areas of Expertise
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Where my skills and interests intersect — from AI model integration to production-ready full-stack engineering.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {siteData.specializations.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: easeOut, delay: i * 0.12 }}
              className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-5 overflow-hidden card-glow hover:border-primary/40 transition-all duration-300"
            >
              {/* Top gradient accent line — slides in on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

              {/* Icon */}
              <div className="relative h-12 w-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/20 transition-all duration-300">
                {icons[i]}
              </div>

              {/* Title + description */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
                  {spec.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {spec.description}
                </p>
              </div>

              {/* Tags */}
              <div className="relative flex flex-wrap gap-2 mt-auto pt-2">
                {spec.tags.map((tag) => (
                  <Badge key={tag} variant="tag" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
