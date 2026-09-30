"use client"

import * as React from "react"

interface LocalTimeProps {
  /** IANA time zone, for example "Africa/Johannesburg" */
  timeZone: string
  /** Short zone name shown after the time, for example "SAST" */
  label: string
  className?: string
}

/**
 * LocalTime - live clock for a fixed time zone, updated every second.
 * The server render shows a placeholder so the markup does not depend on
 * the build time. The colon blinks once per second.
 */
export function LocalTime({ timeZone, label, className }: LocalTimeProps) {
  const [now, setNow] = React.useState<Date | null>(null)

  React.useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const parts = React.useMemo(() => {
    if (!now) return null
    const formatted = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now)
    const get = (type: string) => formatted.find((p) => p.type === type)?.value ?? "--"
    return { hour: get("hour"), minute: get("minute") }
  }, [now, timeZone])

  const iso = now?.toISOString()

  return (
    <time dateTime={iso} className={className} suppressHydrationWarning>
      <span className="figures">{parts?.hour ?? "--"}</span>
      <span
        aria-hidden="true"
        className="figures transition-opacity duration-300"
        style={{ opacity: now && now.getSeconds() % 2 === 1 ? 0.25 : 1 }}
      >
        :
      </span>
      <span className="figures">{parts?.minute ?? "--"}</span> {label}
    </time>
  )
}
