"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import { FadeIn, Rule } from "@arno/components/ui/Reveal"
import { siteData } from "@arno/assets/site"
import type { Skill } from "@arno/assets/site"
import { cn } from "@arno/lib/utils"
import { durations, easings } from "@arno/lib/animations"

const copy = siteData.sections.about

/** Short project names: "HMS App – Marvellous Machines" becomes "HMS App" */
const shortTitle = (title: string) => title.split(" – ")[0]

/**
 * Finds the projects and roles whose tags match a skill.
 * The skill name is split on "/" and "&", so "Python / Django" matches
 * a "Python" tag or a "Django" tag. Aliases add extra tags to match.
 */
function usedIn(skill: Skill): string[] {
  const terms = new Set(
    [...skill.name.split(/[/&]/), ...(skill.aliases ?? [])].map((t) => t.trim().toLowerCase()).filter(Boolean)
  )
  const matches = (tags: string[] = []) => tags.some((tag) => terms.has(tag.toLowerCase()))

  const projects = siteData.projects.filter((p) => matches(p.tags)).map((p) => shortTitle(p.title))
  const roles = siteData.experience.filter((e) => e.type === "work" && matches(e.tags)).map((e) => e.org)
  return [...roles, ...projects]
}

// ── Skill item ─────────────────────────────────────────────────────────────

function SkillItem({
  skill,
  open,
  onToggle,
}: {
  skill: Skill
  open: boolean
  onToggle: () => void
}) {
  const panelId = React.useId()
  const uses = React.useMemo(() => usedIn(skill), [skill])

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full cursor-pointer items-baseline justify-between gap-3 py-1 text-left"
      >
        <span
          className={cn(
            "underline decoration-dotted decoration-1 underline-offset-[5px] transition-colors",
            open
              ? "text-primary decoration-primary"
              : "text-foreground/85 decoration-muted-foreground/50 group-hover:text-primary group-hover:decoration-primary"
          )}
        >
          {skill.name}
        </span>
        <Plus
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 shrink-0 self-center transition-all duration-500",
            open ? "rotate-45 text-primary" : "text-muted-foreground/60 group-hover:text-primary"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="note"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: durations.slow, ease: easings.expo }}
            className="overflow-hidden"
          >
            <div className="mb-3 mt-2 border-l border-primary pl-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{skill.summary}</p>
              {uses.length > 0 && (
                <p className="mt-3 text-xs">
                  <span className="eyebrow block">{copy.skillUsedInLabel}</span>
                  <span className="mt-1 block font-mono text-foreground/80">{uses.join("  /  ")}</span>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// ── Glossary ───────────────────────────────────────────────────────────────

/**
 * SkillGlossary - grouped skill lists. Each skill opens a short note with a
 * summary and the projects or roles where it was used. One note is open at
 * a time.
 */
export function SkillGlossary() {
  const [openSkill, setOpenSkill] = React.useState<string | null>(null)

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="eyebrow">{copy.skillsLabel}</p>
        <p className="eyebrow text-muted-foreground/80">{copy.skillsHint}</p>
      </div>
      <div className="mt-8 grid grid-cols-1 items-start gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
        {siteData.skillCategories.map((cat, ci) => (
          <FadeIn key={cat.category} delay={ci * 0.08}>
            <h3 className="text-3xl">{cat.category}</h3>
            <Rule className="mt-4" delay={ci * 0.08} />
            <ul className="mt-4 space-y-1">
              {cat.skills.map((skill) => (
                <SkillItem
                  key={skill.name}
                  skill={skill}
                  open={openSkill === skill.name}
                  onToggle={() => setOpenSkill((current) => (current === skill.name ? null : skill.name))}
                />
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
