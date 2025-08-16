"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@arno/components/ui/Button"
import { Badge } from "@arno/components/ui/Badge"
import { Metrics } from "@arno/components/ui/Metrics"
import { Section } from "@arno/components/layout/Section"
import { siteData } from "@arno/assets/site"
import { fadeInUp, fadeIn, easeOut, staggerContainer, scaleOnHover } from "@arno/lib/animations"
import { ArrowRight, CarFront, Download, Eye } from "lucide-react"
import  FloatingInput  from "@arno/components/ui/Input"

const childVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
};

export const HeroSection: React.FC = () => {
  return (
    <Section id="home" className="relative">
      <div className="text-center max-w-4xl mx-auto">

        {/* Name */}
        <motion.h1
          {...fadeInUp}
          className="text-4xl md:text-6xl font-bold text-primary mb-4"
        >
          Hi, I'm {siteData.name}
        </motion.h1>
        {/* Role */}
        <motion.h2
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4"
        >
          {siteData.role}
        </motion.h2>
<FloatingInput label="Email" name="email" type="email" required />        {/* Tagline */}
        <motion.p
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/80 mb-6"
        >
          {siteData.tagline}
        </motion.p>

        {/* Tech Stack Badges */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {siteData.skills.frontend.map((skill) => (
            <motion.div key={skill} variants={childVariant} whileHover={scaleOnHover.whileHover}>
              <Badge variant="default">{skill}</Badge>
              <Badge variant="secondary">{skill}</Badge>
              <Badge variant="outline">{skill}</Badge>
              <Badge variant="destructive">{skill}</Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
        >
          <Button size="lg" variant="primary" className="flex items-center gap-2">
            test
          </Button>
          <Button size="md" variant="secondary" className="flex items-center gap-2">
            test
          </Button>
          <Button size="sm" variant="link" className="flex items-center gap-2">
            test
          </Button>
        </motion.div>
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
        >
            <Button size="icon" variant="error" className="flex items-center gap-2">
              test
            </Button>
            <Button size="xl" variant="ghost" className="flex items-center gap-2">
              test
            </Button>
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              test
            </Button>
          </motion.div>

        {/* Metrics */}
        <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 1.0 }}>
          <Metrics metrics={siteData.metrics} />
        </motion.div>

      </div>
    </Section>
  )
}