// ── Types ──────────────────────────────────────────────────────────────────

export interface MetricItem {
  value: string
  label: string
}

export interface NavLink {
  label: string
  href: string
}

export interface Skill {
  name: string
  /** Kept as reference data. The UI does not show it. */
  level: number
  /** One or two sentences shown when the skill is selected */
  summary: string
  /**
   * Extra project or experience tags that count as a use of this skill.
   * The name is already split on "/" and "&" and matched against tags.
   */
  aliases?: string[]
  /**
   * Set when the skill applies to every project, for example version control.
   * The note then says so once, instead of listing every project.
   */
  allProjects?: boolean
}

export interface SkillCategory {
  category: string
  skills: Skill[]
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
  /** Lucide icon key. Kept as reference data. The UI does not show it. */
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
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
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
  /** IANA time zone for the live local time in the Hero */
  timeZone: "Africa/Johannesburg",
  timeZoneLabel: "SAST",
  available: false,

  metrics: [
    { value: "86.3%", label: "Degree Average" },
    { value: "5+", label: "Projects Built" },
    { value: "4+", label: "Years Coding" },
    { value: "Top 15%", label: "Golden Key" },
  ] satisfies MetricItem[],

  // Section copy. Components read these values; do not hardcode copy in JSX.
  sections: {
    about: {
      label: "About",
      practiceLabel: "What I do",
      practiceTitle: "Areas of Expertise",
      practiceIntro:
        "Where my skills and interests intersect - from AI model integration to production-ready full-stack engineering.",
      skillsLabel: "Skills",
      skillsHint: "Select a skill for a short note",
      skillUsedInLabel: "Where I've used it",
      skillAllProjects: "Every project on this page",
    },
    projects: {
      label: "Projects",
      title: "What I've built",
      intro: "A selection of projects ranging from AI-powered tools to interactive web apps.",
      moreLabel: "More projects",
      githubCta: "View all on GitHub",
    },
    experience: {
      label: "Experience",
      title: "Experience & Education",
      intro: "From academic foundations to real-world AI development - here's how I got here.",
      workLabel: "Work Experience",
      educationLabel: "Education",
      achievementsLabel: "Achievements",
    },
    contact: {
      label: "Contact",
      eyebrow: "Let's talk",
      title: "Get In Touch",
      intro: "Open to opportunities, collaborations, or just a conversation about AI and tech.",
      detailsTitle: "Contact Information",
      details:
        "Feel free to reach out via email or phone. I'm based in South Africa and available for remote opportunities worldwide.",
      formTitle: "Send a Message",
      copyHint: "Click to copy",
      copied: "Copied to clipboard",
      mailAppLabel: "Or open in your mail app",
      successTitle: "Message Sent!",
      successBody: "Thanks for reaching out - I'll get back to you as soon as possible.",
    },
    console: {
      greeting: "Hi there. You're reading the console, so we'll probably get along.",
      sourceLabel: "The source for this site is on GitHub:",
      contactLabel: "Say hello:",
    },
    commandMenu: {
      placeholder: "Type a command or search",
      empty: "No matching commands",
      triggerLabel: "Open command menu",
    },
    footer: {
      credit: "Built with Next.js, TypeScript & Tailwind CSS",
    },
  },

  cv: {
    href: "/Arno Christie - CV.pdf",
    label: "Download CV",
  },

  links: {
    github: "https://github.com/TimeToTakeNotes",
    linkedin: "https://www.linkedin.com/in/arno-christie-5003a1209",
    email: "arno.christie@gmail.com",
    source: "https://github.com/TimeToTakeNotes/personal-portfolio-nextjs",
  },

  skillCategories: [
    {
      category: "Frontend",
      skills: [
        {
          name: "React / Next.js",
          level: 85,
          summary:
            "React builds interfaces from reusable components. Next.js adds routing, server rendering and static generation on top. This site uses both.",
        },
        {
          name: "TypeScript",
          level: 80,
          summary:
            "JavaScript with static types. It catches whole classes of bugs before the code runs and makes large codebases safer to change.",
        },
        {
          name: "Tailwind CSS",
          level: 85,
          summary:
            "A utility-first CSS framework. Styles are composed in the markup from small, consistent building blocks instead of separate stylesheets.",
        },
        {
          name: "HTML & CSS",
          level: 90,
          summary:
            "The foundation of every web page. HTML gives content structure and meaning; CSS controls layout, type and colour.",
        },
        {
          name: "Framer Motion",
          level: 70,
          summary:
            "A React animation library. It drives the text reveals, drawn rules and scroll effects on this page.",
        },
      ],
    },
    {
      category: "Backend",
      skills: [
        {
          name: "Python / Django",
          level: 80,
          summary:
            "Python is the main language for data and machine learning work. Django is its full-featured web framework, with an ORM, admin and auth built in.",
        },
        {
          name: "C# / .NET",
          level: 75,
          summary:
            "C# is a statically typed language from Microsoft, and .NET is the runtime and framework around it. ASP.NET Core with C# is my day-to-day stack at work.",
          aliases: ["ASP.NET Core"],
        },
        {
          name: "Node.js / Express",
          level: 70,
          summary:
            "Node.js runs JavaScript on the server. Express is a minimal framework for building HTTP APIs on top of it.",
        },
        {
          name: "Java",
          level: 65,
          summary:
            "A statically typed, object-oriented language that runs on the JVM. Common in enterprise systems and used throughout my degree.",
        },
        {
          name: "REST APIs",
          level: 80,
          summary:
            "A convention for designing web APIs around resources and standard HTTP methods, so clients and servers can change independently.",
          aliases: ["Express", "ASP.NET Core"],
        },
      ],
    },
    {
      category: "AI & ML",
      skills: [
        {
          name: "HuggingFace",
          level: 75,
          summary:
            "The open hub for machine learning models and datasets. Its Transformers library makes it practical to load, fine-tune and serve pretrained models.",
        },
        {
          name: "PyTorch",
          level: 70,
          summary:
            "A deep learning framework with dynamic computation graphs. It is the engine under most modern NLP research and HuggingFace models.",
        },
        {
          name: "NLP Fine-tuning",
          level: 70,
          summary:
            "Further training a pretrained language model on a smaller, domain-specific dataset so it performs better on one task.",
        },
        {
          name: "Text Generation",
          level: 65,
          summary:
            "Using language models to produce text, from short completions to long-form writing. Quality depends on the data, the decoding settings and careful evaluation.",
        },
        {
          name: "OpenAI APIs",
          level: 70,
          summary:
            "Hosted APIs for OpenAI models such as GPT and Whisper. They add language and speech features to an application without training a model.",
          aliases: ["OpenAI Whisper"],
        },
      ],
    },
    {
      category: "Tools & Infra",
      skills: [
        {
          name: "Git / GitHub",
          level: 85,
          summary:
            "Git records every change to a codebase. GitHub hosts the repositories and adds pull requests, code review and CI on top.",
          allProjects: true,
        },
        {
          name: "Docker",
          level: 65,
          summary:
            "Packages an application and its dependencies into a container, so it runs the same way on a laptop, a server or in the cloud.",
        },
        {
          name: "MongoDB",
          level: 70,
          summary:
            "A document database that stores flexible, JSON-like records. A good fit for data whose shape changes often.",
        },
        {
          name: "PostgreSQL / MySQL",
          level: 75,
          summary:
            "Two widely used open-source relational databases, both queried with SQL. PostgreSQL adds strong support for advanced types, JSON and extensions.",
          aliases: ["SQL", "SQL Server"],
        },
        {
          name: "Scrum / Agile",
          level: 75,
          summary:
            "An iterative way to deliver software in short sprints, with regular planning, review and retrospectives.",
        },
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
      tags: ["C#", "ASP.NET Core", "Angular", "TypeScript", "Next.js", "PostgreSQL", "MySQL", "Docker", "Git", "Remote"],
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
      tags: ["HuggingFace", "PyTorch", "Django", "MongoDB", "MySQL", "Docker", "Git", "Scrum"],
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
