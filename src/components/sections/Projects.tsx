"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Lock, Plus } from "lucide-react"
import { Section } from "@arno/components/layout/Section"
import { FadeIn, RevealText, Rule } from "@arno/components/ui/Reveal"
import { TextLink } from "@arno/components/ui/TextLink"
import { siteData } from "@arno/assets/site"
import type { Project } from "@arno/assets/site"
import { cn } from "@arno/lib/utils"
import { projectId } from "@arno/lib/projects"
import { easings, durations } from "@arno/lib/animations"

const copy = siteData.sections.projects
const featured = siteData.projects.filter((p) => p.featured)
const others = siteData.projects.filter((p) => !p.featured)

const pad = (n: number) => String(n).padStart(2, "0")

/** Splits "Name – Context" titles so the context can render as a subtitle. */
const splitTitle = (title: string) => {
  const [name, ...rest] = title.split(" – ")
  return { name, context: rest.join(" – ") }
}

/** Eyebrow above a project title: the achievement and, for client work, the employer. */
function projectLabel(project: Project) {
  const client = project.client ? `${copy.clientLabel}, ${project.client}` : null
  return [project.achievement, client].filter(Boolean).join("  ·  ")
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.github && !project.live && !project.privateRepo) return null

  return (
    <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm font-medium">
      {project.github && !project.privateRepo && (
        <li>
          <TextLink href={project.github} arrow="up-right" external underline="underline">
            {copy.sourceLabel}
          </TextLink>
        </li>
      )}
      {project.live && (
        <li>
          <TextLink href={project.live} arrow="up-right" external underline="underline">
            {project.client ? copy.liveSiteLabel : copy.liveDemoLabel}
          </TextLink>
        </li>
      )}
      {project.privateRepo && (
        <li className="eyebrow inline-flex items-center gap-1.5">
          <Lock aria-hidden="true" className="h-3 w-3" />
          {copy.privateRepoLabel}
        </li>
      )}
    </ul>
  )
}

// ── Featured project ───────────────────────────────────────────────────────

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const { name, context } = splitTitle(project.title)
  const label = projectLabel(project)

  return (
    <li id={projectId(project)} className="group scroll-mt-20">
      <Rule />
      <article className="grid grid-cols-12 gap-y-6 py-10 md:gap-x-10 md:py-16">
        <span className="eyebrow figures col-span-12 pt-3 transition-colors group-hover:text-primary md:col-span-1">
          {pad(index + 1)}
        </span>

        <div className="col-span-12 md:col-span-6">
          {label && (
            <FadeIn>
              <p className="eyebrow mb-4 text-primary">{label}</p>
            </FadeIn>
          )}
          <h3 className="text-4xl leading-[1.02] md:text-5xl lg:text-6xl">
            <RevealText>{name}</RevealText>
            {context && (
              <span className="mt-2 block text-2xl italic text-muted-foreground md:text-3xl">
                <span className="visually-hidden"> – </span>
                {context}
              </span>
            )}
          </h3>
        </div>

        <FadeIn delay={0.15} className="col-span-12 flex flex-col gap-5 md:col-span-5 md:col-start-8">
          <p className="text-muted-foreground">{project.description}</p>
          <p className="font-mono text-xs leading-relaxed text-foreground/80">{project.tags.join("  /  ")}</p>
          <ProjectLinks project={project} />
        </FadeIn>
      </article>
    </li>
  )
}

// ── Project index row ──────────────────────────────────────────────────────

function IndexRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = React.useState(false)
  const panelId = React.useId()

  return (
    <li id={projectId(project)} className="scroll-mt-20 border-t border-border">
      <h3 className="font-sans text-base">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "group relative grid w-full cursor-pointer grid-cols-12 items-baseline gap-x-4 py-5 text-left md:gap-x-10",
            // Muted fill wipes in from the left on hover
            "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-muted",
            "before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100"
          )}
        >
          <span className="eyebrow figures col-span-2 pl-1 transition-colors group-hover:text-primary md:col-span-1">
            {pad(index)}
          </span>
          <span className="col-span-8 font-serif text-2xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:col-span-6 md:text-3xl">
            {project.title}
          </span>
          <span className="hidden font-mono text-xs text-muted-foreground md:col-span-4 md:block">
            {project.tags.slice(0, 3).join("  /  ")}
          </span>
          <span className="col-span-2 flex justify-end pr-1 md:col-span-1">
            <Plus
              aria-hidden="true"
              className={cn("h-5 w-5 transition-transform duration-500", open && "rotate-45 text-primary")}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: durations.slow, ease: easings.expo }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-x-4 gap-y-4 pb-8 md:gap-x-10">
              <div className="col-span-12 flex flex-col gap-4 md:col-span-6 md:col-start-2">
                <p className="text-muted-foreground">{project.description}</p>
                <p className="font-mono text-xs leading-relaxed text-foreground/80">
                  {project.tags.join("  /  ")}
                </p>
                <ProjectLinks project={project} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// ── Section ────────────────────────────────────────────────────────────────

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      index="02"
      label={copy.label}
      aside={<span className="figures">{pad(siteData.projects.length)} entries</span>}
    >
      <div className="grid grid-cols-12 gap-y-6 md:gap-x-10">
        <div className="col-span-12 md:col-span-8">
          <RevealText as="h2" className="text-5xl md:text-7xl">
            {copy.title}
          </RevealText>
        </div>
        <FadeIn delay={0.2} className="col-span-12 md:col-span-4 md:self-end">
          <p className="text-muted-foreground md:text-lg">{copy.intro}</p>
        </FadeIn>
      </div>

      <ol className="mt-14 md:mt-20">
        {featured.map((project, i) => (
          <FeaturedProject key={project.title} project={project} index={i} />
        ))}
      </ol>
      <Rule />

      {others.length > 0 && (
        <div className="mt-24 md:mt-32">
          <div className="flex items-baseline justify-between gap-6 pb-4">
            <p className="eyebrow">{copy.moreLabel}</p>
            <TextLink href={siteData.links.github} arrow="up-right" external className="text-sm font-medium">
              {copy.githubCta}
            </TextLink>
          </div>
          <ol className="relative isolate border-b border-border">
            {others.map((project, i) => (
              <IndexRow key={project.title} project={project} index={featured.length + i + 1} />
            ))}
          </ol>
        </div>
      )}
    </Section>
  )
}
