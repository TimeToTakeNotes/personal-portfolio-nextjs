# Arno Christie – Personal Portfolio

Personal developer portfolio for **Arno Christie** - AI & Full-Stack Developer, BSc IT graduate (86.3% distinction, NWU), and Junior Fullstack Developer at Converge Solutions.

Live at: **[https://arno-christie.duckdns.org/](https://arno-christie.duckdns.org/)**

---

## Tech Stack

### Core Framework

| Tech | Version | Purpose |
| ---- | ------- | ------- |
| [Next.js](https://nextjs.org/) | 15 (App Router) | Framework - SSR, routing, metadata API, image optimisation |
| [React](https://react.dev/) | 19 | UI rendering |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Full type safety across all components and data |

### Styling

| Tech | Version | Purpose |
| ---- | ------- | ------- |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling with OKLCH colour system |
| [tw-animate-css](https://github.com/jamiebuilds/tailwindcss-animate) | 1.3 | CSS keyframe animation utilities |
| Instrument Serif + Schibsted Grotesk + JetBrains Mono | via `next/font` | Typography - serif display, grotesk body, mono metadata |

### Animation & Motion

| Tech | Version | Purpose |
| ---- | ------- | ------- |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Masked text reveals, drawn rules, scroll-linked timeline, page transitions |

### UI Utilities

| Tech | Purpose |
| ---- | ------- |
| [Radix UI (Dropdown Menu, Slot)](https://www.radix-ui.com/) | Accessible headless primitives |
| [class-variance-authority (CVA)](https://cva.style/) | Component variant management (Button) |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class merging |
| [Lucide React](https://lucide.dev/) | Icon library |

### Contact Form

| Tech | Purpose |
| ---- | ------- |
| [Web3Forms](https://web3forms.com/) | Serverless form submission - no backend required |

---

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx               # Root layout - fonts, metadata, theme script, providers
│   ├── page.tsx                 # Home page - section composition
│   ├── globals.css              # CSS entry point - imports the partials in styles/
│   └── styles/                  # theme.css, base.css, components.css, utilities.css
├── assets/
│   └── site.tsx                 # Single source of truth for all portfolio content
├── components/
│   ├── layout/
│   │   ├── MainNavigation.tsx   # Fixed header, always visible, scroll spy
│   │   ├── MobileMenu.tsx       # Full-screen mobile navigation
│   │   ├── CommandMenu.tsx      # Cmd+K / Ctrl+K command menu, provider and trigger
│   │   ├── ConsoleGreeting.tsx  # Styled note in the browser console
│   │   ├── Footer.tsx           # Footer with index, links and copyright
│   │   ├── Section.tsx          # Numbered section shell (01 About, 02 Projects, ...)
│   │   ├── StatusPage.tsx       # Shared 404 / error layout
│   │   ├── MotionProvider.tsx   # Reduced-motion support for Framer Motion
│   │   └── ThemeProvider.tsx    # Dark / light / system theme with circular wipe
│   ├── sections/
│   │   ├── Hero.tsx             # Name, rotating role, tagline, count-up figures
│   │   ├── About.tsx            # Wide photo, bio, areas of expertise
│   │   ├── SkillGlossary.tsx    # Skill lists; each skill opens a short note
│   │   ├── Projects.tsx         # Featured projects + expandable project index
│   │   ├── Experience.tsx       # Scroll-linked timeline - work, education, achievements
│   │   └── ContactForm.tsx      # Contact details + Web3Forms form
│   └── ui/
│       ├── Button.tsx           # CVA-based button variants
│       ├── Input.tsx            # Field - label above, underline-only input
│       ├── Reveal.tsx           # RevealText, Rule, FadeIn motion primitives
│       ├── TextLink.tsx         # Text link with directional arrow
│       ├── ThemeToggle.tsx      # Light / dark / system menu
│       ├── DropdownMenu.tsx     # Radix dropdown wrapper
│       ├── Logo.tsx             # Serif wordmark
│       ├── CopyEmail.tsx        # Large email that copies itself
│       └── LocalTime.tsx        # Live clock for a fixed time zone
└── lib/
    ├── animations/              # Easing and duration tokens, variants, hooks
    ├── clipboard.ts             # copyText() helper
    └── utils.ts                 # cn() helper
```

---

## Key Features

- **Editorial design** - serif display type, numbered sections, hairline rules and a 12-column grid instead of card layouts. See the Design System section in [DEVELOPER.md](DEVELOPER.md)
- **Single data source** - all content (bio, projects, experience, skills, achievements, section copy) lives in `src/assets/site.tsx`
- **Considered motion** - masked word reveals, rules that draw in, a rotating role line, a wide About photo with a clip-path reveal and scroll parallax, count-up figures and a scroll-linked experience timeline
- **Reduced motion support** - Framer Motion and CSS transitions respect `prefers-reduced-motion`
- **Scroll spy navigation** - `IntersectionObserver` marks the active section in the header and the mobile menu. The header stays visible and gains a background after scrolling
- **Dark / light / system theme** - persisted via `ThemeProvider`, applied before first paint to prevent a theme flash
- **Project index** - featured projects show in full; other projects open inline in an accessible expandable list
- **CV download** - Hero link downloads `/public/Arno Christie - CV.pdf`
- **Small touches** - live local time in the Hero, click-to-copy email, a circular wipe when the theme changes, a note in the browser console, and a Cmd+K / Ctrl+K command menu
- **Contact form** - underline inputs with autofill hints, loading state, animated success checkmark, error messaging and a reset flow
- **Open Graph + Twitter Card metadata** - configured in `layout.tsx` for rich link previews on social platforms
- **Fully responsive** - full-screen mobile menu, fluid type and grids

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/TimeToTakeNotes/personal-portfolio-nextjs.git
cd personal-portfolio-nextjs
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

Get a free access key at [web3forms.com](https://web3forms.com). The `.env*` pattern is already listed in `.gitignore` - this file will not be committed.

> **Security note:** `NEXT_PUBLIC_` variables are included in the client bundle by design - this is expected behaviour for Web3Forms since submissions are made directly from the browser. To prevent key abuse, set your **allowed domain** in the Web3Forms dashboard so the key only accepts submissions from your deployed URL.

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). Uses **Turbopack** for fast hot module replacement.

### Production Build

```bash
npm run build
npm run start
```

---

## Deployment on Vercel

This project deploys to **[Vercel](https://vercel.com)** with zero configuration - no Dockerfile, no custom server, no `vercel.json` needed. Vercel has first-class Next.js support.

### One-Time Setup

1. **Push to GitHub** - ensure the repository is connected to your GitHub account
2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - The framework will be auto-detected as **Next.js**
   - Leave all build settings as default
3. **Add the environment variable**
   - In your Vercel project → **Settings → Environment Variables**
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: your Web3Forms access key
   - Enable for **Production**, **Preview**, and **Development**
4. **Deploy** - Vercel builds and distributes to its global edge CDN automatically

### Continuous Deployment

- Every push to `main` triggers an automatic **production deployment**
- Every pull request gets an isolated **preview deployment** with a unique URL for review

### Static Assets (`/public`)

These files are served directly at the root URL by Vercel:

```text
public/
├── Arno Christie - CV.pdf     # Downloaded via the "Download CV" link in Hero
├── arno-lookout.jpg           # About photo and Open Graph / Twitter Card preview image
└── favicon.ico
```

---

## Customisation

All portfolio content is managed from a single file: [src/assets/site.tsx](src/assets/site.tsx)

| Field | Description |
| ----- | ----------- |
| `siteData.name` | Your full name |
| `siteData.role` | Primary role displayed in the Hero |
| `siteData.tagline` | One-liner shown in the Hero and Footer |
| `siteData.bio` | Long-form bio paragraph in the About section |
| `siteData.available` | `true` / `false` - reserved; not rendered at present |
| `siteData.typewriterRoles` | Roles cycled in the Hero rotating role line |
| `siteData.metrics` | Count-up figures in the Hero (value + label pairs) |
| `siteData.skillCategories` | Skill lists grouped by category. Each skill has a `summary` shown when selected, optional `aliases` for the "Where I've used it" match, and `allProjects: true` for tools used on every project, such as Git (`level` is kept as data, not shown) |
| `siteData.specializations` | Areas of expertise list in the About section |
| `siteData.projects` | Projects - `featured: true` shows the project in full; others go in the project index. For company work, set `client` to the employer's `org` (the role then links to the project) and `privateRepo: true` (shows "Private repository" instead of a source link) |
| `siteData.experience` | Work and education timeline entries (`type: "work" \| "education"`) |

**Adding a tool you used at work:** add it to that role's `tags` in `siteData.experience`. The timeline shows it, and the matching skill note lists the role automatically. Do not add tools such as Git to every project's tags; set `allProjects: true` on the skill instead.
| `siteData.achievements` | Achievements list in the Experience section |
| `siteData.sections` | Section labels, titles and intro copy, including the command menu and console greeting |
| `siteData.timeZone` / `timeZoneLabel` | Time zone for the live clock in the Hero |
| `siteData.links.source` | Repository link used by the console greeting and command menu |
| `navLinks` | Links rendered in the header, mobile menu and footer |

To update the colour theme, edit the CSS custom properties in `src/app/styles/theme.css`. The accent colour (`--primary`) is set in OKLCH format. Keep one accent colour only.

---

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server locally after build |
| `npm run lint` | Run ESLint |

---

## License

This project is open source. Feel free to fork and adapt it for your own portfolio - credit appreciated but not required.

---

*Built by [Arno Christie](https://github.com/TimeToTakeNotes)*
