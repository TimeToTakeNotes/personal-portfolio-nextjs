import type { MetricItem } from "@arno/components/ui/Metrics"

// ── Types ──────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
}

export interface SkillCategory {
  category: string
  skills: Array<{ name: string; level: number }>
}

export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  featured?: boolean
  achievement?: string
}

export interface ExperienceItem {
  type: "work" | "education"
  title: string
  org: string
  period: string
  description: string[]
  tags?: string[]
}

export interface Achievement {
  title: string
  description: string
  icon: string
}

export interface Specialization {
  title: string
  description: string
  tags: string[]
}

// ── Navigation ─────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

// ── Site Data ──────────────────────────────────────────────────────────────

export const siteData = {
  name: "Arno Christie",
  role: "AI & Full-Stack Developer",
  tagline:
    "BSc IT graduate building intelligent web applications - where modern frontend meets real AI.",
  bio: "I'm a BSc Information Technology graduate from North-West University (86.3% distinction) with a passion for building AI-powered web applications. I combine modern full-stack development with machine learning to create tools that genuinely solve problems.",
  typewriterRoles: [
    "AI & Full-Stack Developer",
    "Next.js & React Engineer",
    "ML Integration Specialist",
    "BSc IT Graduate",
  ],
  email: "arno.christie@gmail.com",
  phone: "(+27) 082 654 2130",
  location: "South Africa",
  available: true,

  metrics: [
    { value: "86.3%", label: "Degree Average" },
    { value: "5+", label: "Projects Built" },
    { value: "2+", label: "Years Coding" },
    { value: "Top 15%", label: "Golden Key" },
  ] satisfies MetricItem[],

  links: {
    github: "https://github.com/TimeToTakeNotes",
    linkedin: "https://www.linkedin.com/in/arno-christie-5003a1209",
    email: "arno.christie@gmail.com",
  },

  skillCategories: [
    {
      category: "Frontend",
      skills: [
        { name: "React / Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 85 },
        { name: "HTML & CSS", level: 90 },
        { name: "Framer Motion", level: 70 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Python / Django", level: 80 },
        { name: "C# / .NET", level: 75 },
        { name: "Node.js", level: 70 },
        { name: "REST APIs", level: 80 },
      ],
    },
    {
      category: "AI & ML",
      skills: [
        { name: "OpenAI APIs", level: 75 },
        { name: "HuggingFace", level: 70 },
        { name: "PyTorch", level: 65 },
        { name: "LLM Integration", level: 70 },
      ],
    },
    {
      category: "Tools & Infra",
      skills: [
        { name: "Git / GitHub", level: 85 },
        { name: "Docker", level: 65 },
        { name: "MongoDB", level: 70 },
        { name: "SQL", level: 75 },
        { name: "Scrum / Agile", level: 75 },
      ],
    },
  ] satisfies SkillCategory[],

  specializations: [
    {
      title: "AI-Powered Applications",
      description:
        "Integrating large language models, speech recognition, and ML pipelines into production web apps - from OpenAI Whisper voice transcription to HuggingFace model deployment.",
      tags: ["OpenAI", "HuggingFace", "PyTorch", "LLM Integration"],
    },
    {
      title: "Full-Stack Development",
      description:
        "Building complete, production-ready web applications with modern React frontends and robust Python/Node.js backends - clean architecture, typed APIs, and real-world scalability.",
      tags: ["Next.js", "Django", "TypeScript", "REST APIs"],
    },
    {
      title: "Modern Frontend Engineering",
      description:
        "Crafting performant, accessible, and visually engaging interfaces with Next.js, Tailwind CSS, and Framer Motion - mobile-first and design-system driven.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Accessibility"],
    },
  ] satisfies Specialization[],

  projects: [
    {
      title: "Hospital Management System",
      description:
        "Full-stack hospital management system built as a university group project - adopted by NWU as a teaching resource and scored 94% in final assessment.",
      tags: ["C#", ".NET", "SQL", "Team Project"],
      github: "https://github.com/TimeToTakeNotes",
      featured: true,
      achievement: "University adopted · 94%",
    },
    {
      title: "AI Notes App",
      description:
        "Smart note-taking application with OpenAI Whisper voice-to-text transcription - capture and organise notes by speaking naturally.",
      tags: ["Python", "OpenAI Whisper", "React", "Speech Recognition"],
      github: "https://github.com/TimeToTakeNotes",
      featured: true,
    },
    {
      title: "QR Code Generator",
      description:
        "Clean, instant QR code generator. Enter any URL or text and get a downloadable QR code - no signup required.",
      tags: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/TimeToTakeNotes",
      live: "https://timetotakenotes.github.io/QR-Code-Generator/",
    },
    {
      title: "Rock Paper Scissors",
      description:
        "Interactive Rock Paper Scissors game with a computer opponent, score tracking, and smooth animations.",
      tags: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/TimeToTakeNotes",
      live: "https://timetotakenotes.github.io/Rock-Paper-Scissors/",
    },
    {
      title: "Flappy Bird Clone",
      description:
        "Browser-based Flappy Bird clone with physics-accurate flight mechanics and collision detection via the Canvas API.",
      tags: ["JavaScript", "Canvas API", "Game Dev"],
      github: "https://github.com/TimeToTakeNotes",
    },
  ] satisfies Project[],

  experience: [
    {
      type: "work" as const,
      title: "AI Development Intern",
      org: "Reverside Software Solutions",
      period: "Apr 2025 – May 2025",
      description: [
        "Developed and deployed ML models using HuggingFace Transformers and PyTorch for internal AI tooling.",
        "Built Django REST APIs to expose model inference endpoints consumed by frontend applications.",
        "Containerised services with Docker; participated in Scrum ceremonies throughout each sprint.",
        "Integrated MongoDB for document storage of model outputs and structured experiment results.",
      ],
      tags: ["HuggingFace", "PyTorch", "Django", "MongoDB", "Docker", "Scrum"],
    },
    {
      type: "education" as const,
      title: "BSc Information Technology",
      org: "North-West University",
      period: "Jan 2022 – Dec 2024",
      description: [
        "Graduated with distinction - 86.3% overall average across all three years.",
        "Covered software engineering, AI fundamentals, databases, networks, and systems design.",
        "Capstone Hospital Management System adopted by the university after scoring 94%.",
        "Inducted into the Golden Key International Honour Society (Top 15% of cohort).",
      ],
      tags: ["Software Engineering", "AI", "Databases", "C#", "Python"],
    },
  ] satisfies ExperienceItem[],

  achievements: [
    {
      title: "Golden Key International Honour Society",
      description:
        "Inducted for academic excellence - Top 15% of BSc IT cohort at North-West University.",
      icon: "award",
    },
    {
      title: "BSc IT - Graduated with Distinction",
      description: "Achieved an 86.3% cumulative average across all three years of study.",
      icon: "graduation-cap",
    },
    {
      title: "University-Adopted Capstone Project",
      description:
        "Hospital Management System selected by NWU as a teaching resource after scoring 94%.",
      icon: "star",
    },
    {
      title: "Microsoft C# Certification",
      description:
        "Completed official Microsoft certification in C# demonstrating professional-level proficiency.",
      icon: "badge-check",
    },
  ] satisfies Achievement[],
}
