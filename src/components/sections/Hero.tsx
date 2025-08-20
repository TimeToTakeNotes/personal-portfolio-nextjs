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
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../ui/Card"

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

        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="default" animation="tilt">Default</Badge>
          <Badge variant="secondary" size="sm" animation="pulse">Secondary</Badge>
          <Badge variant="tag" rounded={false}>Tag</Badge>
          <Badge variant="destructive" size="lg" animation="glow">Destructive</Badge>
          <Badge variant="outline" animation="bounce">Outline</Badge>

          {/* Icon-only badges */}
          <Badge variant="icon" size="icon">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z"/>
            </svg>
          </Badge>

          <Badge variant="icon" size="icon">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z"/>
            </svg>
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
          <Card variant="glass" padding="sm" size="full">
          <CardHeader>
            <CardTitle>Glass Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Perfect for modals or overlays.</p>
          </CardContent>
        </Card>
        <Card size="auto" variant="default" padding="lg" animation="tilt">
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Testing different card styles.</p>
          </CardContent>
        </Card>   
        <Card variant="interactive" size="auto">
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
            <CardDescription>Hover me for a smooth scale effect</CardDescription>
          </CardHeader>
          <CardContent>Some card content goes here</CardContent>
          <CardFooter>Footer actions</CardFooter>
        </Card>

        <Card  size="auto" variant="outline" padding="sm">
          <CardHeader>
            <CardTitle >Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Testing different card styles.</p>
          </CardContent>
        </Card>
        <Card variant="flat" padding="lg">
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Testing different card styles.</p>
          </CardContent>
        </Card>
        </div>
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
              <Badge variant="tag">{skill}</Badge>
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
          <Button variant="link" className="flex items-center gap-2">
            testing button
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