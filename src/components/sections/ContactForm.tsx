"use client"

import React, { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Send, RotateCcw } from "lucide-react"
import { Section } from "@arno/components/layout/Section"
import FloatingInput from "@arno/components/ui/Input"
import { Button } from "@arno/components/ui/Button"
import { siteData } from "@arno/assets/site"
import { easeOut } from "@arno/lib/animations"

// ── Static data ────────────────────────────────────────────────────────────

const contactDetails = [
  {
    icon: <Mail className="h-4 w-4" />,
    label: "Email",
    value: siteData.email,
    href: `mailto:${siteData.email}`,
  },
  {
    icon: <Phone className="h-4 w-4" />,
    label: "Phone",
    value: siteData.phone,
    href: `tel:${siteData.phone.replace(/\s/g, "")}`,
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    label: "Location",
    value: siteData.location,
    href: undefined,
  },
]

const socialLinks = [
  {
    icon: <Github className="h-5 w-5" />,
    label: "GitHub",
    href: siteData.links.github,
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn",
    href: siteData.links.linkedin,
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    href: `mailto:${siteData.links.email}`,
  },
]

// ── Animated checkmark SVG ─────────────────────────────────────────────────

function SuccessCheckmark() {
  return (
    <svg
      viewBox="0 0 52 52"
      className="w-20 h-20"
      fill="none"
      aria-hidden
    >
      {/* Circle */}
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        stroke="var(--color-primary)"
        strokeWidth="1.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
      {/* Checkmark */}
      <motion.path
        d="M14 26.5 L22.5 35 L38 18"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
      />
    </svg>
  )
}

// ── Form states ─────────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "sent" | "error"

// ── Main component ──────────────────────────────────────────────────────────

const Web3FormsContact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    const data = new FormData(e.currentTarget)
    const body = Object.fromEntries(data.entries())

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus("sent")
        formRef.current?.reset()
      } else {
        throw new Error(json.message || "Submission failed")
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  return (
    <Section id="contact">
      <div ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: easeOut }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Let&apos;s talk
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Open to opportunities, collaborations, or just a conversation about AI and tech.
          </p>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 h-full">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Contact Information
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Feel free to reach out via email or phone. I&apos;m based in South Africa and
                  available for remote opportunities worldwide.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                {contactDetails.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-auto pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-3">Find me online</p>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.15 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 min-h-[420px] flex flex-col">
              <AnimatePresence mode="wait">

                {/* ── Idle / Error — show form ── */}
                {(status === "idle" || status === "sending" || status === "error") && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col flex-1"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      Send a Message
                    </h3>

                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5 flex-1"
                    >
                      {/* Web3Forms hidden fields */}
                      <input type="hidden" name="access_key" value="885bd2f6-9f53-4dc9-97a5-1f79f8eded9b" />
                      <input type="hidden" name="subject" value="New Message On Portfolio Website" />
                      <input type="hidden" name="from_name" value="Arno Portfolio Website" />
                      <input type="checkbox" name="botcheck" className="hidden" />

                      <FloatingInput
                        label="First Name"
                        name="firstName"
                        required
                        disabled={status === "sending"}
                      />
                      <FloatingInput
                        label="Email"
                        name="email"
                        type="email"
                        required
                        disabled={status === "sending"}
                      />
                      <FloatingInput
                        label="Phone Number"
                        name="phoneNumber"
                        disabled={status === "sending"}
                      />
                      <FloatingInput
                        label="Message"
                        name="message"
                        as="textarea"
                        rows={5}
                        required
                        disabled={status === "sending"}
                      />

                      {/* Error message */}
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                          role="alert"
                        >
                          {errorMsg || "Something went wrong. Please try again."}
                        </motion.p>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        loading={status === "sending"}
                        className="w-full mt-1 gap-2"
                      >
                        {status === "sending" ? (
                          "Sending…"
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}

                {/* ── Sent — success state ── */}
                {status === "sent" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="flex flex-col items-center justify-center flex-1 gap-5 py-8 text-center"
                  >
                    <SuccessCheckmark />

                    <div className="space-y-1">
                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        className="text-xl font-semibold text-foreground"
                      >
                        Message Sent!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.3 }}
                        className="text-sm text-muted-foreground max-w-xs"
                      >
                        Thanks for reaching out — I&apos;ll get back to you as soon as possible.
                      </motion.p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1, duration: 0.3 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setStatus("idle")}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Send Another
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default Web3FormsContact
