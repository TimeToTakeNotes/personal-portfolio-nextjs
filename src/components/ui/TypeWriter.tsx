"use client"

import * as React from "react"

interface TypeWriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseDuration = 1800,
  className,
}) => {
  const [displayed, setDisplayed] = React.useState("")
  const [wordIndex, setWordIndex] = React.useState(0)
  const [phase, setPhase] = React.useState<"typing" | "pausing" | "deleting">("typing")
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(null)

  React.useEffect(() => {
    const word = words[wordIndex % words.length]

    const tick = () => {
      if (phase === "typing") {
        const next = word.slice(0, displayed.length + 1)
        setDisplayed(next)
        if (next === word) {
          timeoutRef.current = setTimeout(() => setPhase("pausing"), pauseDuration)
          return
        }
        timeoutRef.current = setTimeout(tick, typingSpeed)
      } else if (phase === "pausing") {
        setPhase("deleting")
      } else {
        if (displayed === "") {
          setWordIndex((i) => (i + 1) % words.length)
          setPhase("typing")
          return
        }
        const next = displayed.slice(0, -1)
        setDisplayed(next)
        timeoutRef.current = setTimeout(tick, deletingSpeed)
      }
    }

    timeoutRef.current = setTimeout(
      tick,
      phase === "typing" ? typingSpeed : phase === "deleting" ? deletingSpeed : 100
    )

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {displayed}
      <span
        aria-hidden="true"
        className="inline-block w-[2px] h-[0.85em] ml-0.5 bg-primary align-middle animate-pulse"
      />
    </span>
  )
}
