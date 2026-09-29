"use client"

import type React from "react"
import { motion } from "framer-motion"
import { RevealText, Rule } from "@arno/components/ui/Reveal"
import { TextLink } from "@arno/components/ui/TextLink"
import { siteData } from "@arno/assets/site"
import { easings, durations } from "@arno/lib/animations"

interface StatusPageProps {
  /** Large figure or word, for example "404" */
  code: string
  title: string
  description: string
  /** Primary and secondary actions */
  actions: React.ReactNode
}

/**
 * StatusPage - shared editorial layout for the 404 and error pages.
 */
export function StatusPage({ code, title, description, actions }: StatusPageProps) {
  return (
    <div className="container-page flex min-h-[100svh] flex-col justify-center pb-16 pt-28">
      <p className="eyebrow figures pb-4 text-primary">{code}</p>
      <Rule strong />
      <RevealText as="h1" onMount delay={0.1} className="mt-10 max-w-4xl text-6xl leading-[0.95] md:text-8xl">
        {title}
      </RevealText>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.xslow, ease: easings.expo, delay: 0.4 }}
      >
        <p className="mt-8 max-w-lg text-lg text-muted-foreground">{description}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>
        <p className="mt-16 text-sm text-muted-foreground">
          Think this is a mistake?{" "}
          <TextLink href={`mailto:${siteData.email}`} underline="underline" className="text-foreground">
            Send me a message
          </TextLink>
        </p>
      </motion.div>
    </div>
  )
}
