"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react"
import { Section } from "@arno/components/layout/Section"
import { FadeIn, RevealText, Rule } from "@arno/components/ui/Reveal"
import { Field } from "@arno/components/ui/Input"
import { Button } from "@arno/components/ui/Button"
import { TextLink } from "@arno/components/ui/TextLink"
import { siteData } from "@arno/assets/site"
import { easings, durations } from "@arno/lib/animations"

const copy = siteData.sections.contact

const details = [
  { label: "Email", value: siteData.email, href: `mailto:${siteData.email}` },
  { label: "Phone", value: siteData.phone, href: `tel:${siteData.phone.replace(/[^\d+]/g, "")}` },
  { label: "Location", value: siteData.location },
]

const profiles = [
  { label: "GitHub", href: siteData.links.github },
  { label: "LinkedIn", href: siteData.links.linkedin },
]

// ── Animated checkmark ─────────────────────────────────────────────────────

function SuccessCheckmark() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16 text-primary" fill="none" aria-hidden="true">
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        stroke="currentColor"
        strokeWidth="1.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: durations.xslow, ease: easings.expo }}
      />
      <motion.path
        d="M15 26.5 L22.5 34 L37 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: durations.base, delay: 0.5, ease: easings.expo }}
      />
    </svg>
  )
}

// ── Form ───────────────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "sent" | "error"

function ContactFormPanel() {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [status, setStatus] = React.useState<Status>("idle")
  const [errorMsg, setErrorMsg] = React.useState("")
  const sending = status === "sending"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    const body = Object.fromEntries(new FormData(e.currentTarget).entries())

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
    <div className="min-h-[30rem]">
      <AnimatePresence mode="wait" initial={false}>
        {status !== "sent" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: durations.quick }}
          >
            <p className="eyebrow">{copy.formTitle}</p>
            <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
              {/* Web3Forms hidden fields */}
              <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ""} />
              <input type="hidden" name="subject" value="New Message On Portfolio Website" />
              <input type="hidden" name="from_name" value="Arno Portfolio Website" />
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Field label="First Name" name="firstName" autoComplete="given-name" required disabled={sending} />
                <Field label="Phone Number" name="phoneNumber" type="tel" autoComplete="tel" disabled={sending} />
              </div>
              <Field label="Email" name="email" type="email" autoComplete="email" required disabled={sending} />
              <Field label="Message" name="message" as="textarea" rows={5} required disabled={sending} />

              {status === "error" && (
                <p className="text-sm text-destructive" role="alert">
                  {errorMsg || "Something went wrong. Please try again."}
                </p>
              )}

              <div>
                <Button type="submit" size="lg" loading={sending} className="group">
                  {sending ? "Sending…" : "Send Message"}
                  {!sending && (
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.quick }}
            className="flex flex-col items-start gap-6 pt-2"
          >
            <SuccessCheckmark />
            <div>
              <h3 className="text-4xl">{copy.successTitle}</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">{copy.successBody}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Send Another
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────

export function ContactSection() {
  return (
    <Section id="contact" index="04" label={copy.label} aside={copy.eyebrow}>
      <RevealText as="h2" className="text-6xl leading-[0.95] md:text-8xl lg:text-9xl">
        {copy.title}
      </RevealText>

      <div className="mt-8 grid grid-cols-12 gap-y-8 md:mt-12 md:gap-x-10">
        <FadeIn delay={0.2} className="col-span-12 md:col-span-7">
          <p className="font-serif text-2xl italic leading-snug text-muted-foreground md:text-3xl">{copy.intro}</p>
        </FadeIn>
      </div>

      <FadeIn delay={0.3} className="mt-12 md:mt-16">
        <a
          href={`mailto:${siteData.email}`}
          className="group inline-flex max-w-full items-center gap-3 font-serif text-[clamp(1.75rem,5.5vw,4.5rem)] leading-none transition-colors hover:text-primary"
        >
          <span className="link-underline break-all pb-1">{siteData.email}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-[0.7em] w-[0.7em] shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>
      </FadeIn>

      <div className="mt-20 grid grid-cols-12 gap-y-16 md:mt-28 md:gap-x-10">
        {/* Details */}
        <div className="col-span-12 md:col-span-5">
          <p className="eyebrow">{copy.detailsTitle}</p>
          <p className="mt-6 max-w-md text-muted-foreground">{copy.details}</p>

          <dl className="mt-10">
            {details.map(({ label, value, href }) => (
              <div key={label}>
                <Rule />
                <div className="grid grid-cols-3 gap-4 py-4">
                  <dt className="eyebrow pt-1">{label}</dt>
                  <dd className="col-span-2">
                    {href ? <TextLink href={href}>{value}</TextLink> : value}
                  </dd>
                </div>
              </div>
            ))}
            <Rule />
            <div className="grid grid-cols-3 gap-4 py-4">
              <dt className="eyebrow pt-1">Elsewhere</dt>
              <dd className="col-span-2">
                <ul className="flex flex-wrap gap-x-6 gap-y-1">
                  {profiles.map(({ label, href }) => (
                    <li key={label}>
                      <TextLink href={href} arrow="up-right" external>
                        {label}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <Rule />
          </dl>
        </div>

        {/* Form */}
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <ContactFormPanel />
        </div>
      </div>
    </Section>
  )
}
