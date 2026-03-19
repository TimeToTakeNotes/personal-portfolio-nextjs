# Arno Christie – Personal Portfolio

Personal developer portfolio for **Arno Christie** - AI & Full-Stack Developer, BSc IT graduate (86.3% distinction, NWU), and Junior Fullstack Developer at Converge Solutions.

Live at: **[personal-portfolio-nextjs-rouge.vercel.app](https://personal-portfolio-nextjs-rouge.vercel.app)**

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
| Space Grotesk + DM Sans | via `next/font` | Typography - display headings + body copy |

### Animation & Motion

| Tech | Version | Purpose |
| ---- | ------- | ------- |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Page animations, scroll-triggered reveals, SVG path animations |

### UI Utilities

| Tech | Purpose |
| ---- | ------- |
| [Radix UI (Dropdown Menu, Slot)](https://www.radix-ui.com/) | Accessible headless primitives |
| [class-variance-authority (CVA)](https://cva.style/) | Component variant management (Button, Badge) |
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
│   ├── layout.tsx               # Root layout - fonts, metadata, Open Graph tags
│   ├── page.tsx                 # Home page - section composition
│   └── globals.css              # Global styles, CSS custom properties, OKLCH theme
├── assets/
│   └── site.tsx                 # Single source of truth for all portfolio content
├── components/
│   ├── layout/
│   │   ├── MainNavigation.tsx   # Scroll spy + active section state
│   │   ├── Header.tsx           # Desktop nav with active highlight
│   │   ├── Sidebar.tsx          # Mobile drawer nav
│   │   ├── Footer.tsx           # Footer with links and copyright
│   │   ├── Section.tsx          # Reusable section wrapper
│   │   └── ThemeProvider.tsx    # Dark / light / system theme context
│   ├── sections/
│   │   ├── Hero.tsx             # Hero section + FloatingPaths SVG background
│   │   ├── About.tsx            # Bio, metrics, skills, achievements
│   │   ├── Specializations.tsx  # AI, Full-Stack, Frontend focus cards
│   │   ├── Projects.tsx         # Featured + all projects grid
│   │   ├── Experience.tsx       # Vertical timeline - work + education
│   │   └── ContactForm.tsx      # Web3Forms contact + contact info panel
│   └── ui/
│       ├── Button.tsx           # CVA-based button variants
│       ├── Badge.tsx            # Skill / tag badges
│       ├── Card.tsx             # Reusable card component
│       ├── Input.tsx            # Floating label input + textarea
│       ├── TypeWriter.tsx       # Typewriter role animation in Hero
│       ├── Metrics.tsx          # Animated stat counters
│       ├── Marquee.tsx          # Infinite scroll ticker
│       ├── BackToTop.tsx        # Scroll-to-top with conveyor-belt hover animation
│       ├── ThemeToggle.tsx      # Dark / light mode toggle
│       ├── Magnet.tsx           # Magnetic hover effect
│       └── BackgroundWrapper.tsx
└── lib/
    └── animations.ts            # Shared easing curves
```

---

## Key Features

- **Single data source** - all content (bio, projects, experience, skills, achievements) lives in `src/assets/site.tsx`; update once, reflected everywhere across every section
- **Scroll spy navigation** - `IntersectionObserver` detects the active section and highlights the corresponding nav link in both desktop header and mobile sidebar
- **Dark / light / system theme** - persisted via `ThemeProvider`, toggled from the header; respects `prefers-color-scheme`
- **FloatingPaths SVG animation** - animated crimson SVG line paths in the Hero background; the same component is reused (rotated 180°) as the Contact section background
- **Back-to-top button** - fixed bottom-right corner, springs in after 400 px of scroll, conveyor-belt upward arrow animation on hover
- **CV download** - Hero button downloads `/public/Arno Christie - CV.pdf` directly via an anchor tag
- **Animated contact form** - floating label inputs, loading state, animated SVG success checkmark, error messaging, and a reset flow
- **Open Graph + Twitter Card metadata** - configured in `layout.tsx` for rich link previews on social platforms
- **Fully responsive** - mobile drawer navigation, fluid CSS grids, touch-friendly targets throughout

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
├── Arno Christie - CV.pdf     # Downloaded via the "Download CV" button in Hero
├── Arno - Selfie Web.png      # Open Graph / Twitter Card social preview image
└── favicon.ico
```

---

## Customisation

All portfolio content is managed from a single file: [src/assets/site.tsx](src/assets/site.tsx)

| Field | Description |
| ----- | ----------- |
| `siteData.name` | Your full name |
| `siteData.role` | Primary role displayed in the Hero |
| `siteData.tagline` | One-liner shown below the role |
| `siteData.bio` | Long-form bio paragraph in the About section |
| `siteData.available` | `true` / `false` - controls the hero availability badge |
| `siteData.typewriterRoles` | Array of roles cycled through the typewriter animation |
| `siteData.metrics` | Stat counters in About (value + label pairs) |
| `siteData.skillCategories` | Skill progress bars grouped by category (level: 0–100) |
| `siteData.specializations` | Three focus-area cards in the Specializations section |
| `siteData.projects` | Project cards - add `featured: true` to show in the featured row |
| `siteData.experience` | Work and education timeline entries (`type: "work" \| "education"`) |
| `siteData.achievements` | Achievement cards in the About section |
| `navLinks` | Links rendered in the desktop header and mobile sidebar |

To update the colour theme, edit the CSS custom properties in `src/app/globals.css`. The primary accent colour (`--color-primary`) is set in OKLCH format.

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
