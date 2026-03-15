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
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" }
]

// ── Site Data ──────────────────────────────────────────────────────────────

export const siteData = {
  name: "Arno Christie",
  role: "AI & Full-Stack Developer",
  tagline:
    "BSc IT graduate specialising in NLP fine-tuning and full-stack development - building AI-powered applications that work in the real world.",
  bio: "I'm a BSc Information Technology graduate from North-West University (86.3% distinction) with a focus on NLP model fine-tuning and full-stack web development. From training HuggingFace Transformers for domain-specific text generation to shipping multi-platform apps, I build systems that bridge AI research and production software.",
  typewriterRoles: [
    "AI & Full-Stack Developer",
    "Next.js & React Engineer",
    "NLP Developer",
    "BSc IT Graduate",
  ],
  email: "arno.christie@gmail.com",
  phone: "(+27) 082 654 2130",
  location: "Randfontein, Gauteng, South Africa",
  available: false,

  metrics: [
    { value: "86.3%", label: "Degree Average" },
    { value: "5+", label: "Projects Built" },
    { value: "4+", label: "Years Coding" },
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
        { name: "Node.js / Express", level: 70 },
        { name: "Java", level: 65 },
        { name: "REST APIs", level: 80 },
      ],
    },
    {
      category: "AI & ML",
      skills: [
        { name: "HuggingFace", level: 75 },
        { name: "PyTorch", level: 70 },
        { name: "NLP Fine-tuning", level: 70 },
        { name: "Text Generation", level: 65 },
        { name: "OpenAI APIs", level: 70 },
      ],
    },
    {
      category: "Tools & Infra",
      skills: [
        { name: "Git / GitHub", level: 85 },
        { name: "Docker", level: 65 },
        { name: "MongoDB", level: 70 },
        { name: "MySQL / SQL", level: 75 },
        { name: "Scrum / Agile", level: 75 },
      ],
    },
  ] satisfies SkillCategory[],

  specializations: [
    {
      title: "AI-Powered Applications",
      description:
        "Fine-tuning large language models for domain-specific text generation, integrating HuggingFace Transformers and OpenAI APIs into production workflows - from dataset preprocessing to containerised deployment.",
      tags: ["HuggingFace", "PyTorch", "NLP Fine-tuning", "OpenAI"],
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
      title: "Themis to the Moon – NASA Space Apps",
      description:
        "Air quality forecasting web app built at the 2025 NASA Space Apps Challenge (Oct 4–5). Integrates NASA TEMPO satellite data with ground-based measurements and weather data to predict pollution levels and alert users to health risks. Built as a team across an advanced-difficulty global challenge.",
      tags: ["TypeScript", "Vue", "Python", "NASA TEMPO", "Air Quality", "HTML"],
      github: "https://github.com/TimeToTakeNotes/themis-to-the-moon",
      featured: true,
      achievement: "NASA Space Apps Challenge 2025",
    },
    {
      title: "HMS App – Marvellous Machines",
      description:
        "Multi-platform student feedback application where students submit video assignments and receive structured faculty feedback. Built with a Node.js/Express backend (JWT auth, MySQL, Nextcloud video storage, rate limiting) and a Flutter mobile frontend. Scored 94% and selected by NWU as a teaching resource.",
      tags: ["Node.js", "Express", "Flutter", "MySQL", "JWT", "Nextcloud"],
      github: "https://github.com/JasonErasmus264/hms_app_marvellous_machines",
      featured: true,
      achievement: "Best among 5 finalist groups · 94%",
    },
    {
      title: "AI Notes App",
      description:
        "Smart note-taking application with OpenAI Whisper voice-to-text transcription - capture and organise notes by speaking naturally.",
      tags: ["Python", "OpenAI Whisper", "React", "Speech Recognition"],
      github: "https://github.com/TimeToTakeNotes/notes-app",
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
      github: "https://github.com/TimeToTakeNotes/rock-paper-scissors",
      live: "https://timetotakenotes.github.io/Rock-Paper-Scissors/",
    },
    {
      title: "Flappy Bird Clone",
      description:
        "Browser-based Flappy Bird clone with physics-accurate flight mechanics and collision detection via the Canvas API.",
      tags: ["JavaScript", "Canvas API", "Game Dev"],
      github: "https://github.com/TimeToTakeNotes/flappy-bird",
    },
    {
      title: "Stock Price Prediction with LightGBM",
      description:
        "Time-series regression pipeline predicting S&P 500 stock prices (Open, High, Low, Close) using LightGBM wrapped in a MultiOutputRegressor. Includes lag features, rolling averages, one-hot encoding, and time-aware train/test splits. Achieved R² of 0.9717 and MAE of 2.93 on the test set.",
      tags: ["Python", "LightGBM", "scikit-learn", "Pandas", "Google Colab", "Machine Learning"],
      github: "https://github.com/TimeToTakeNotes/stock-price-prediction-lightgbm",
    },
    {
      title: "Image Color Extractor",
      description:
        "Full-stack image upload and color extraction app. Users upload images to extract the center pixel color in hex, generate thumbnails, and manage their uploads per-user. Built with ASP.NET Core Web API and Angular standalone components, secured with JWT HttpOnly cookies, CSRF middleware, and IP-based rate limiting.",
      tags: ["C#", "ASP.NET Core", "Angular", "JWT", "SQL Server", "Entity Framework"],
      github: "https://github.com/TimeToTakeNotes/aspnet-angular-image-color-extractor",
    },
  ] satisfies Project[],

  experience: [
    {
      type: "work" as const,
      title: "Junior Fullstack Developer",
      org: "Converge Solutions",
      period: "Jun 2025 – Present",
      description: [
        "Building and maintaining full-stack web applications using C#, ASP.NET Core, and Angular in a remote, full-time role.",
        "Developing RESTful APIs and backend services with ASP.NET Core, integrated with Angular frontends.",
        "Collaborating with a distributed team to deliver features across the full stack.",
      ],
      tags: ["C#", "ASP.NET Core", "Angular", "TypeScript", "Remote"],
    },
    {
      type: "work" as const,
      title: "AI Development Intern",
      org: "Reverside Software Solutions",
      period: "Apr 2025 – May 2025",
      description: [
        "Fine-tuned HuggingFace Transformer models for long-form text generation on domain-specific datasets.",
        "Built Django REST APIs to expose model inference endpoints consumed by frontend applications.",
        "Handled dataset preprocessing, evaluation, and model deployment via Docker containerisation.",
        "Integrated MongoDB for document storage of model outputs; participated in Scrum ceremonies throughout each sprint.",
      ],
      tags: ["HuggingFace", "PyTorch", "Django", "MongoDB", "Docker", "Scrum"],
    },
    {
      type: "work" as const,
      title: "Sales Associate",
      org: "Power Truck Parts",
      period: "Jan 2021 – Sep 2021",
      description: [
        "Assisted customers with product selection and technical queries for heavy-vehicle parts.",
        "Managed stock inventory and coordinated with suppliers to ensure parts availability.",
        "Developed strong communication and client-facing skills in a fast-paced retail environment.",
      ],
      tags: ["Customer Service", "Sales", "Inventory Management"],
    },
    {
      type: "education" as const,
      title: "BSc Information Technology",
      org: "North-West University",
      period: "Jan 2022 – Dec 2024",
      description: [
        "Graduated with distinction - 86.3% overall average across all three years.",
        "Covered software engineering, AI fundamentals, databases, networks, and systems design.",
        "Capstone project (Multi-Platform Student Feedback App) scored 94% and was adopted by NWU as a teaching resource.",
        "Inducted into the Golden Key International Honour Society (Top 15% of cohort).",
      ],
      tags: ["Software Engineering", "AI", "Databases", "C#", "Java", "Python"],
    },
    {
      type: "education" as const,
      title: "National Senior Certificate",
      org: "Hoërskool Riebeeckrand",
      period: "Jan 2016 – Dec 2020",
      description: [
        "Completed Matric in Randfontein, Gauteng.",
      ],
      tags: ["Matric"],
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
        "Multi-Platform Student Feedback App selected as best among five finalist groups and adopted by NWU as a teaching resource after scoring 94%.",
      icon: "star",
    },
    {
      title: "NASA Space Apps Challenge 2025",
      description:
        "Competed in the global NASA hackathon (Oct 4–5, 2025) - built an air quality forecasting app using NASA TEMPO satellite data alongside a team of developers.",
      icon: "rocket",
    },
    {
      title: "Microsoft C# Certification",
      description:
        "Completed official Microsoft certification in C# demonstrating professional-level proficiency.",
      icon: "badge-check",
    },
  ] satisfies Achievement[],
}
