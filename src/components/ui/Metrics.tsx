"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

export interface MetricItem {
  value: string | number
  label: string
}

interface SingleMetricProps extends MetricItem {
  delay?: number
}

function SingleMetric({ value, label, delay = 0 }: SingleMetricProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState("")
  const strValue = String(value)

  useEffect(() => {
    if (!isInView) return

    // Match: optional prefix text, then digits (with optional decimal), then optional suffix
    const match = strValue.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
    if (!match) {
      setDisplay(strValue)
      return
    }

    const prefix = match[1]
    const numeric = parseFloat(match[2])
    const suffix = match[3]
    const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0
    const duration = 1300

    let startTime: number | null = null

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = eased * numeric
      setDisplay(prefix + current.toFixed(decimals) + suffix)
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplay(strValue) // snap to exact value
      }
    }

    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, strValue])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col items-center gap-1.5 px-4 py-5 rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
    >
      <span className="text-3xl md:text-4xl font-bold tabular-nums text-gradient-primary">
        {display || strValue}
      </span>
      <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold tracking-widest uppercase">
        {label}
      </span>
    </motion.div>
  )
}

interface MetricsProps {
  items: MetricItem[]
}

export function Metrics({ items }: MetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
      {items.map((item, i) => (
        <SingleMetric key={item.label} {...item} delay={i * 0.1 + 0.1} />
      ))}
    </div>
  )
}
