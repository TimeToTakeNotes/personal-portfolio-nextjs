"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink, Trophy } from "lucide-react"
import { Section } from "@arno/components/layout/Section"
import { Badge } from "@arno/components/ui/Badge"
import { Button } from "@arno/components/ui/Button"
import { siteData } from "@arno/assets/site"
import { easings, cardEntrance, StaggerGroup, useViewportAnimation } from "@arno/lib/animations"
import type { Project } from "@arno/assets/site"

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardEntrance}
      className="group relative bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 overflow-hidden card-glow hover:border-primary/40 transition-all duration-300"
    >
      {/* Top gradient accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Subtle bg tint on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      {/* Featured + achievement badges */}
      <div className="relative flex flex-wrap gap-2 min-h-[1.5rem]">
        {project.featured && (
          <Badge variant="default" size="sm">
            Featured
          </Badge>
        )}
        {project.achievement && (
          <Badge
            variant="tag"
            size="sm"
            className="gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
          >
            <Trophy className="h-3 w-3" />
            {project.achievement}
          </Badge>
        )}
      </div>

      {/* Title + description */}
      <div className="relative flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
      </div>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="tag" size="sm">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Links */}
      <div className="relative flex items-center gap-2 pt-2 border-t border-border/50">
        {project.github && (
          <Button variant="ghost" size="sm" asChild className="gap-1.5 h-8 px-3 text-xs">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
        )}
        {project.live && (
          <Button variant="outline" size="sm" asChild className="gap-1.5 h-8 px-3 text-xs">
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const { ref: headerRef, isInView: headerInView } = useViewportAnimation({ once: true, margin: "-80px" })

  return (
    <Section id="projects">
      <div>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: easings.smooth }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            What I&apos;ve built
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Projects</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A selection of projects ranging from AI-powered tools to interactive web apps.
          </p>
        </motion.div>

        {/* Grid */}
        <StaggerGroup stagger="loose" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteData.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </StaggerGroup>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button variant="outline" asChild className="gap-2">
            <a href={siteData.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              View all on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
