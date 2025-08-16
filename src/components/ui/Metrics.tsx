"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface MetricProps {
  value: string
  label: string
  delay?: number
}

function Metric({ value, label, delay = 0 }: MetricProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView) {
      // Extract number from value string
      const numericValue = Number.parseInt(value.replace(/\D/g, ""))
      if (!isNaN(numericValue)) {
        let current = 0
        const increment = numericValue / 30
        const timer = setInterval(() => {
          current += increment
          if (current >= numericValue) {
            setDisplayValue(value)
            clearInterval(timer)
          } else {
            setDisplayValue(Math.floor(current).toString() + value.replace(/\d/g, ""))
          }
        }, 50)
        return () => clearInterval(timer)
      } else {
        setDisplayValue(value)
      }
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ delay, duration: 0.3 }}
      className="text-center"
    >
      <div className="text-2xl md:text-3xl font-bold">{displayValue}</div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </motion.div>
  )
}

interface MetricsProps {
  metrics: {
    projects: number
    experience: string
    certifications: number
    technologies: number
  }
}

export function Metrics({ metrics }: MetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
      <Metric value={metrics.projects.toString()} label="Projects" delay={0.1} />
      <Metric value={metrics.experience} label="Experience" delay={0.2} />
      <Metric value={metrics.certifications.toString()} label="Certifications" delay={0.3} />
      <Metric value={metrics.technologies.toString()} label="Technologies" delay={0.4} />
    </div>
  )
}
