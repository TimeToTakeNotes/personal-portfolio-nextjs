# Developer Reference - personal-portfolio-nextjs

Personal portfolio for Arno Christie. Next.js 15 App Router, Framer Motion 12, Tailwind CSS v4.

This document is the authoritative reference for both human and AI contributors. The **Rules** section must be read before making any change to the codebase.

---

## Table of Contents

1. [Rules](#rules)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [UI Component Reference](#ui-component-reference)
   - [Button](#button)
   - [Badge](#badge)
   - [Card](#card)
   - [Other UI Components](#other-ui-components)
5. [CSS Architecture](#css-architecture)
6. [Animation System](#animation-system)
7. [Content Management](#content-management)
8. [Security](#security)
9. [Environment Variables](#environment-variables)
10. [Commands](#commands)
11. [Deployment](#deployment)

---

## Rules

These rules are mandatory. They are enforced by convention, not by a linter, so every contributor (human or AI) is responsible for following them exactly. When in doubt about any pattern, this section takes precedence.

---

### RULE 1 - All content lives in `site.tsx` only

Never hardcode copy, links, email addresses, phone numbers, names, metrics, or project data inside a component. All of it must come from `siteData` exported from `src/assets/site.tsx`.

```tsx
// ✓ Correct
import { siteData } from "@arno/assets/site"
<p>{siteData.bio}</p>

// ✗ Wrong - hardcoded copy inside a component
<p>Passionate developer based in South Africa...</p>
```

---

### RULE 2 - Use existing UI components; never raw HTML equivalents

The following components exist specifically to enforce consistent styling and behaviour. Using a raw `<button>`, `<div>`, or `<span>` instead of the component is always wrong.

| Instead of… | Use… |
| --- | --- |
| `<button>`, `<a>` styled as a button | `<Button>` |
| `<span className="badge ...">` | `<Badge>` |
| `<div className="bg-card rounded-2xl p-6 ...">` | `<Card>` |
| Raw `<h2>` + description block for section headers | `<SectionHeader>` |
| Raw `<section>` with padding | `<Section>` |

If a required visual style does not exist as a variant, **add a variant to the component** - do not bypass the component.

---

### RULE 3 - Button usage rules

Always specify `variant` and `size` explicitly. Never leave both as default without intent.

**`asChild` rule:** When a `Button` wraps a link (`<a>`) or a Next.js `<Link>`, use `asChild`. This delegates rendering to the child element so you get correct HTML semantics (`<a>` not `<button>`).

```tsx
// ✓ CTA link - asChild + variant
<Button variant="primary" size="lg" asChild className="gap-2">
  <a href="#projects">View My Work <ArrowRight className="h-4 w-4" /></a>
</Button>

// ✓ Icon-only button - use size="icon" and provide aria-label
<Button variant="ghost" size="icon" asChild aria-label="GitHub">
  <a href={siteData.links.github} target="_blank" rel="noopener noreferrer">
    <Github className="h-4 w-4" />
  </a>
</Button>

// ✓ Loading state - use loading prop, never render a spinner manually
<Button variant="primary" loading={isSubmitting}>Submit</Button>

// ✗ Wrong - raw anchor styled like a button
<a href="#projects" className="bg-primary text-white px-5 py-3 rounded-md">View My Work</a>
```

**Variant selection guide:**

| Variant | Use for |
| --- | --- |
| `primary` | Primary CTAs - one per visual group maximum |
| `secondary` | Secondary actions alongside a `primary` |
| `outline` | Tertiary actions, "View all", external links |
| `ghost` | Icon buttons, nav links, inline actions with no background |
| `link` | Inline text links within paragraphs |
| `error` | Destructive or error-state actions |

**Size selection guide:**

| Size | Use for |
| --- | --- |
| `sm` | Compact actions inside cards, tag rows |
| `md` | Default - most UI contexts |
| `lg` | Hero CTAs, section-level primary actions |
| `xl` | Full-width CTA banners |
| `icon` | Square icon-only buttons - always pair with `aria-label` |

---

### RULE 4 - Badge usage rules

Badges are read-only labels. They are not interactive unless given an `onClick` intentionally. Do not use `<Button>` where a static label is needed, and do not use a raw `<span>` where a `<Badge>` would work.

```tsx
// ✓ Tech tag
<Badge variant="tag" size="sm">TypeScript</Badge>

// ✓ Period / date label on a card
<Badge variant="outline" size="sm" className="whitespace-nowrap">2021 – 2024</Badge>

// ✓ Hero status with always-on glow pulse
<Badge variant="tag" size="sm" animation="pulse-glow" className="gap-2 px-4 py-1.5">
  <span className="inline-flex rounded-full h-2 w-2 bg-primary" />
  Junior Fullstack Developer
</Badge>

// ✓ Achievement label on project card
<Badge variant="tag" size="sm" className="gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
  <Trophy className="h-3 w-3" />
  1st Place
</Badge>
```

**Variant selection guide:**

| Variant | Use for |
| --- | --- |
| `default` | Primary accent badge - filled with `bg-primary` |
| `secondary` | Neutral filled badge |
| `tag` | Tech/skill tags, achievement labels - transparent with border |
| `outline` | Period/date spans, info chips - transparent, subtle border |
| `destructive` | Error or warning labels |
| `icon` | Square icon-only badge |

**Size selection guide:**

| Size | Use for |
| --- | --- |
| `sm` | Tag rows, compact labels inside cards |
| `md` | Standalone labels |
| `lg` | Large status indicators |
| `icon` | Icon-only square badge |

**Animation selection guide:**

| Animation | Effect | Use for |
| --- | --- | --- |
| `none` (default) | No animation | Most badges |
| `pulse-glow` | Always-on crimson glow pulse | Hero status badge |
| `pulse` | Pulse on hover | Attention-drawing labels |
| `bounce` | Bounce on hover | Playful callouts |
| `glow` | Glow on hover | Interactive highlight |
| `tilt` | Tilt + scale on hover | Interactive tags |

**Rounded:** Defaults to `true` (pill shape). Set `rounded={false}` for square-cornered badges.

---

### RULE 5 - Card usage rules

Use `<Card>` for any content container with a background, border, and shadow. Do not write `bg-card border border-border rounded-2xl` manually.

```tsx
// ✓ Standard section content card
<Card padding="md">
  <h3>Title</h3>
  <p>Content</p>
</Card>

// ✓ Override padding at a breakpoint
<Card padding="md" className="md:p-8">
  {/* form fields */}
</Card>

// ✓ Clickable card with lift animation
<Card variant="interactive" animation="hover-lift" padding="md">
  {/* card content */}
</Card>

// ✗ Wrong - manual card styles
<div className="bg-card border border-border rounded-2xl p-6 shadow-sm">...</div>
```

**Variant selection guide:**

| Variant | Use for |
| --- | --- |
| `default` | Standard content cards - bg-card, border, shadow |
| `outline` | Emphasised border cards, feature boxes |
| `flat` | Borderless, shadowless - inside another card, or on coloured backgrounds |
| `glass` | Frosted-glass overlay cards - use sparingly |
| `interactive` | Clickable cards - adds cursor-pointer, hover scale, active press |

**Padding options:** `sm` (p-4) · `md` (p-6) · `lg` (p-8)

**Size options:** `full` (w-full, default) · `auto` (max-w-md centered) · `lg` (max-w-4xl centered)

**Sub-components** (optional, for structured content):

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@arno/components/ui/Card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Supporting text</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
```

---

### RULE 6 - Styling rules

**Never use raw colour values.** All colours must come from CSS variables via Tailwind token classes.

```tsx
// ✓ Correct - token classes
<p className="text-muted-foreground">…</p>
<div className="bg-primary/10 border-primary/50">…</div>
<div style={{ color: "var(--color-primary)" }}>…</div>

// ✗ Wrong - hardcoded values
<p className="text-gray-500">…</p>
<div style={{ color: "#9e363a" }}>…</div>
```

**Typography rules:**

- Body text: `text-foreground` (primary) or `text-muted-foreground` (secondary/captions)
- Headings: `text-foreground` - never `text-black` or `text-white`
- Accent text: `text-primary`
- Gradient accent: `className="text-gradient-primary"` (defined in `utilities.css`)
- Section label (small uppercase above heading): `text-sm font-semibold text-primary uppercase tracking-widest`

**Spacing rules:**

- Section vertical padding is handled by the `<Section>` wrapper - do not add top/bottom padding to the `<section>` element directly.
- Card gap between fields: `gap-4` or `gap-5`.
- Card gap between major card groups: `gap-8` for desktop grids.

**Dark mode:**

- Do not use `dark:` variants to swap colours that are already handled by CSS variables. `bg-card`, `text-foreground`, `border-border`, etc. automatically invert.
- Only add `dark:` when a visual tweak is not captured by the variable (e.g. `opacity-40 dark:opacity-20`).

**Utility class rules:**

| Class | Source | Use for |
| --- | --- | --- |
| `text-gradient-primary` | `utilities.css` | Crimson gradient on headings |
| `btn-glow` | `utilities.css` | Subtle glow aura on primary CTA buttons |
| `card-glow` | `utilities.css` | Hover glow on project cards |
| `underline-animated` | `utilities.css` | Single animated underline on links |
| `double-underline-animated` | `utilities.css` | Double animated underline (used by `Button variant="link"`) |
| `btn-pulse-glow` | `animations.css` | Always-on crimson pulse (used by `Badge animation="pulse-glow"`) |

---

### RULE 7 - Animation rules

**Never use raw easing arrays, raw easing strings, or magic duration numbers.**

```ts
// ✓ Correct
transition={{ duration: durations.base, ease: easings.smooth }}

// ✗ Wrong - raw values
transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

**Scroll-triggered animations must use `useViewportAnimation`** - not raw `useInView` + `useRef`:

```ts
// ✓ Correct
const { ref, isInView } = useViewportAnimation({ once: true, margin: "-80px" })

// ✗ Wrong - raw framer-motion hooks in section/UI components
const ref = useRef(null)
const isInView = useInView(ref, { once: true })
```

**Load-time (on-mount) animations** use inline `initial/animate/transition` props with explicit delays - not `variants={}` - because variant-embedded transitions take precedence over element-level `transition` props, making per-element delay control impossible:

```tsx
// ✓ Correct - load-time with delay
<motion.div
  initial={{ opacity: 0, y: 32 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: durations.slow, ease: easings.smooth, delay: 0.72 }}
/>

// ✗ Wrong for load-time - variants prevent delay overrides
<motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.72 }} />
```

**Scroll-triggered animations** use `variants` + `useViewportAnimation`:

```tsx
// ✓ Correct - scroll-triggered
const { ref, isInView } = useViewportAnimation({ once: true, margin: "-80px" })
<motion.div ref={ref} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} />
```

**Grids of 3+ cards** must use `StaggerGroup` + `cardEntrance` - no individual refs per card:

```tsx
<StaggerGroup stagger="loose" className="grid grid-cols-3 gap-6">
  {items.map((item) => (
    <motion.div key={item.id} variants={cardEntrance}>…</motion.div>
  ))}
</StaggerGroup>
```

**`position: fixed` elements** must be siblings of `<PageTransition>` in `layout.tsx`, not children. Framer Motion's `motion.div` applies CSS `transform` during transitions, which breaks fixed positioning. The `<BackToTop />` placement is the reference pattern:

```tsx
// layout.tsx - correct structure
<PageTransition>{children}</PageTransition>
<BackToTop />
```

---

### RULE 8 - CSS architecture rules

- `@import "tailwindcss"` and `@import "tw-animate-css"` appear **once** - in `globals.css` only. Never in partials.
- `@keyframes` definitions belong in `animations.css` only.
- `transition`-based effects belong in `utilities.css` or `components.css`.
- New CSS variables must be added to `theme.css` under both `:root` and `.dark`, and mapped in the `@theme inline` block.
- Never write `color: #hex` or `background: rgb(...)` in CSS files. Use CSS variable references.

---

### RULE 9 - Import rules

All imports use the `@arno/*` path alias - never relative paths:

```ts
// ✓ Correct
import { Button } from "@arno/components/ui/Button"
import { easings, durations } from "@arno/lib/animations"
import { siteData } from "@arno/assets/site"

// ✗ Wrong
import { Button } from "../../components/ui/Button"
```

---

## Tech Stack

| Layer | Library | Version |
| --- | --- | --- |
| Framework | Next.js (App Router) | 15.4.x |
| UI | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS v4 | 4.x |
| Animation | Framer Motion | 12.x |
| Icons | Lucide React | 0.539.x |
| UI Variants | Class Variance Authority (CVA) | 0.7.x |
| UI Variants | tailwind-variants (tv) | - |
| UI Primitives | Radix UI | 2.x |
| Form | Web3Forms API | - |
| Deploy | Vercel | - |

---

## Project Structure

```text
src/
├── app/
│   ├── globals.css          # Single CSS entry point - imports all partials
│   ├── layout.tsx           # Root layout: fonts, metadata, PageTransition, BackToTop
│   ├── page.tsx             # Home page - composes all sections
│   ├── error.tsx            # Error boundary (animated)
│   ├── not-found.tsx        # 404 page (animated)
│   ├── loading.tsx          # Route loading spinner
│   ├── sitemap.ts           # Next.js sitemap generator
│   ├── robots.ts            # Robots.txt generator
│   └── styles/
│       ├── theme.css        # CSS variables (:root, .dark) + @theme inline tokens
│       ├── base.css         # HTML/body resets, typography, scrollbar, autofill
│       ├── components.css   # CSS class components (.input-field, .floating-label, etc.)
│       ├── utilities.css    # Utility classes (.text-gradient-primary, .btn-glow, .card-glow, etc.)
│       └── animations.css   # @keyframes + trigger classes (.btn-pulse-glow, .btn-shimmer, etc.)
│
├── assets/
│   └── site.tsx             # SINGLE SOURCE OF TRUTH for all content data
│
├── components/
│   ├── layout/
│   │   ├── MainNavigation.tsx   # Orchestrator: Header + MobileHeader + Sidebar
│   │   ├── Header.tsx           # Desktop nav bar
│   │   ├── MobileHeader.tsx     # Mobile top bar with burger toggle
│   │   ├── Sidebar.tsx          # Mobile slide-in drawer
│   │   ├── Footer.tsx           # Footer
│   │   ├── Section.tsx          # Section wrapper - consistent padding + max-width
│   │   └── ThemeProvider.tsx    # Dark/light mode context
│   │
│   ├── sections/
│   │   ├── Hero.tsx             # Hero + FloatingPaths background animation
│   │   ├── About.tsx            # About - skill bars, tabs (Skills / Education / Achievements)
│   │   ├── Specializations.tsx  # 3-card expertise grid
│   │   ├── Projects.tsx         # Project cards grid
│   │   ├── Experience.tsx       # Timeline - work + education
│   │   └── ContactForm.tsx      # Web3Forms contact form + contact info panel
│   │
│   └── ui/
│       ├── Badge.tsx            # CVA badge - variants: default, secondary, tag, outline, destructive, icon
│       ├── Button.tsx           # CVA button - variants: primary, secondary, outline, ghost, link, error
│       ├── BackToTop.tsx        # Fixed scroll-to-top button (placed outside PageTransition)
│       ├── Card.tsx             # tailwind-variants card - variants: default, outline, flat, glass, interactive
│       ├── Input.tsx            # Floating-label input/textarea
│       ├── Marquee.tsx          # Infinite scrolling tech-stack strip
│       ├── Metrics.tsx          # Animated counter stat cards
│       ├── SectionHeader.tsx    # Reusable badge + h2 + description header
│       ├── TypeWriter.tsx       # Typewriter word cycling
│       ├── ThemeToggle.tsx      # Dark/light toggle button
│       ├── BurgerMenu.tsx       # Animated burger icon
│       ├── DropdownMenu.tsx     # Radix dropdown wrapper
│       ├── Logo.tsx             # Site logo
│       └── Magnet.tsx           # Magnetic cursor effect wrapper
│
└── lib/
    ├── animations/          # Modular animation system (see Animation System section)
    └── utils.ts             # cn() helper (clsx + tailwind-merge)
```

### Path alias

All imports use `@arno/*` → `./src/*`. Never use relative paths.

---

## UI Component Reference

### Button

**Source:** `src/components/ui/Button.tsx` · Built with CVA

```tsx
import { Button } from "@arno/components/ui/Button"
```

**Props:**

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | see table | `"primary"` | Required in practice - always specify |
| `size` | see table | `"md"` | Required in practice - always specify |
| `rounded` | `boolean` | `false` | `true` → pill shape |
| `asChild` | `boolean` | `false` | Delegates rendering to child element - use when wrapping `<a>` or `<Link>` |
| `loading` | `boolean` | `false` | Shows spinner, disables button - use for async actions |
| `disabled` | `boolean` | `false` | Disables button |

**Variants:**

| Value | Appearance | Use for |
| --- | --- | --- |
| `primary` | Filled crimson, shadow | Primary CTAs |
| `secondary` | Muted fill → primary on hover | Secondary actions |
| `outline` | Transparent, border | Tertiary/external links |
| `ghost` | Transparent, no border | Icon buttons, nav links, quiet actions |
| `link` | Underline animation | Inline text links |
| `error` | Filled destructive red | Dangerous/error actions |

**Sizes:**

| Value | Classes | Use for |
| --- | --- | --- |
| `sm` | `text-sm px-3 py-1.5` | Compact card actions, tag rows |
| `md` | `text-base px-4 py-2` | Default - general UI |
| `lg` | `text-lg px-5 py-3` | Hero and section CTAs |
| `xl` | `text-xl px-6 py-3.5` | Full-width banner buttons |
| `icon` | `h-10 w-10 p-0` | Square icon-only - always add `aria-label` |

**Common patterns:**

```tsx
// Primary hero CTA
<Button variant="primary" size="lg" asChild className="btn-glow gap-2">
  <a href="#projects">View My Work <ArrowRight className="h-4 w-4" /></a>
</Button>

// Outline secondary CTA
<Button variant="outline" size="lg" asChild>
  <a href="#contact">Get In Touch</a>
</Button>

// Ghost icon button (nav, social)
<Button variant="ghost" size="icon" asChild
  className="h-9 w-9 rounded-lg bg-card/50 border border-border/50
             text-muted-foreground hover:text-foreground hover:border-primary/50">
  <a href={siteData.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
    <Github className="h-4 w-4" />
  </a>
</Button>

// Async form submit
<Button type="submit" variant="primary" loading={status === "sending"} className="w-full gap-2">
  {status === "sending" ? "Sending…" : <><Send className="h-4 w-4" /> Send Message</>}
</Button>
```

---

### Badge

**Source:** `src/components/ui/Badge.tsx` · Built with CVA

```tsx
import { Badge } from "@arno/components/ui/Badge"
```

**Props:**

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | see table | `"default"` | Always specify |
| `size` | see table | `"md"` | Always specify |
| `rounded` | `boolean` | `true` | `false` → `rounded-md` corners |
| `animation` | see table | `"none"` | |
| `className` | `string` | - | Merged via `cn()` |

**Variants:**

| Value | Appearance | Use for |
| --- | --- | --- |
| `default` | `bg-primary`, filled | Featured label, primary accent |
| `secondary` | `bg-secondary`, filled | Neutral labels |
| `tag` | Transparent, `border-border` | Tech tags, skill chips, achievement labels |
| `outline` | Transparent, subtle border | Period/date spans, info chips |
| `destructive` | `bg-destructive`, filled | Error/warning labels |
| `icon` | Square icon, `bg-primary` | Icon-only badge |

**Animations:**

| Value | Effect | Use for |
| --- | --- | --- |
| `none` | - | Default - most badges |
| `pulse-glow` | Always-on crimson glow pulse | Hero status badge |
| `pulse` | Hover pulse | Attention labels |
| `bounce` | Hover bounce | Playful callouts |
| `glow` | Hover blue glow | Interactive highlight |
| `tilt` | Hover tilt + scale | Interactive tags |

**Common patterns:**

```tsx
// Tech/skill tag
<Badge variant="tag" size="sm">TypeScript</Badge>

// Period/date label
<Badge variant="outline" size="sm" className="whitespace-nowrap self-start">2021 – 2024</Badge>

// Info chip with icon
<Badge variant="outline" size="sm" className="gap-1.5 bg-card/80 backdrop-blur-sm py-1.5">
  <MapPin className="h-3 w-3 text-primary" />
  South Africa
</Badge>

// Hero status badge with always-on glow
<Badge variant="tag" size="sm" animation="pulse-glow" className="gap-2 px-4 py-1.5 backdrop-blur-sm">
  <span className="inline-flex rounded-full h-2 w-2 bg-primary" />
  Junior Fullstack Developer @ Converge Solutions
</Badge>

// Achievement label on a project card
<Badge variant="tag" size="sm"
  className="gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
  <Trophy className="h-3 w-3" />
  1st Place
</Badge>
```

---

### Card

**Source:** `src/components/ui/Card.tsx` · Built with `tailwind-variants` (`tv()`)

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@arno/components/ui/Card"
```

**Props:**

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | see table | `"default"` | |
| `padding` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Override with `className="md:p-8"` for responsive padding |
| `animation` | see table | `"none"` | |
| `size` | `"full"` \| `"auto"` \| `"lg"` | `"full"` | |

**Variants:**

| Value | Appearance | Use for |
| --- | --- | --- |
| `default` | `bg-card`, border, shadow | Standard content cards |
| `outline` | `border-2`, no fill | Feature boxes, emphasis |
| `flat` | No border, no shadow | Nested cards, coloured backgrounds |
| `glass` | Frosted glass | Overlays - use sparingly |
| `interactive` | Cursor pointer, hover scale + press | Clickable cards |

**Animations:**

| Value | Effect |
| --- | --- |
| `none` | No animation |
| `hover-lift` | Lifts up + deeper shadow on hover |
| `hover-glow` | Glow on hover |
| `tilt` | Tilt + scale on hover |
| `pulse` | Pulse on hover |

**Common patterns:**

```tsx
// Standard content card
<Card padding="md">
  <h3 className="text-lg font-semibold text-foreground">Title</h3>
  <p className="text-sm text-muted-foreground">Description</p>
</Card>

// Contact info panel - md padding with responsive override
<Card padding="md" className="md:p-8 flex flex-col gap-6 h-full">
  {/* fields */}
</Card>

// Clickable project card
<Card variant="interactive" animation="hover-lift" padding="md">
  {/* project content */}
</Card>

// Structured card with sub-components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Supporting text</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>
```

---

### Other UI Components

| Component | Import | Use for |
| --- | --- | --- |
| `SectionHeader` | `@arno/components/ui/SectionHeader` | Badge + h2 + description header at the top of each section |
| `Section` | `@arno/components/layout/Section` | Section wrapper - consistent vertical padding and max-width |
| `FloatingInput` | `@arno/components/ui/Input` | Floating-label input or textarea - always use inside forms, never raw `<input>` |
| `Marquee` | `@arno/components/ui/Marquee` | Infinite scroll strip (tech stack) |
| `Metrics` | `@arno/components/ui/Metrics` | Animated stat counter cards |
| `TypeWriter` | `@arno/components/ui/TypeWriter` | Cycling typewriter text |
| `BackToTop` | `@arno/components/ui/BackToTop` | Fixed scroll-to-top button - placed in layout, not in pages |
| `ThemeToggle` | `@arno/components/ui/ThemeToggle` | Dark/light mode toggle |

**`SectionHeader` usage:**

```tsx
import SectionHeader from "@arno/components/ui/SectionHeader"

<SectionHeader
  badge="What I've built"
  title="Projects"
  description="A selection of projects ranging from AI-powered tools to interactive web apps."
  align="center"
/>
```

**`Section` usage:**

```tsx
import { Section } from "@arno/components/layout/Section"

<Section id="projects">
  {/* section content */}
</Section>

// With modifier classes
<Section id="about" className="relative overflow-hidden">
  {/* section content */}
</Section>
```

---

## CSS Architecture

### Partial responsibilities

| File | Layer | Contains |
| --- | --- | --- |
| `theme.css` | - | CSS variables (`:root`, `.dark`) and `@theme inline` token mapping |
| `base.css` | `@layer base` | HTML/body resets, headings, links, scrollbar, autofill fix |
| `components.css` | `@layer components` | CSS class components - `.input-field`, `.floating-label`, `.back-to-top-btn` |
| `utilities.css` | `@layer utilities` | Utility classes - `.text-gradient-primary`, `.btn-glow`, `.card-glow`, `.animate-marquee`, `.underline-animated` |
| `animations.css` | top-level + `@layer components` | `@keyframes` + trigger classes - `.btn-pulse-glow`, `.btn-shimmer`, `.aurora-gradient`, `.typing-cursor` |

**Rule:** `@import "tailwindcss"` and `@import "tw-animate-css"` appear **once**, in `globals.css` only. Partials must never contain their own `@import`.

**Rule:** If it uses `@keyframes` → `animations.css`. If it uses CSS `transition` → `utilities.css` or `components.css`.

### Theme tokens

Theme: **Midnight Navy + Redline Crimson**.

```css
/* CSS variable - use in raw CSS and Framer Motion inline styles */
var(--color-primary)

/* Tailwind token class - use in JSX className */
text-primary  ·  bg-primary  ·  border-primary
```

Fonts:

- `var(--font-heading)` → Space Grotesk
- `var(--font-body)` → DM Sans

---

## Animation System

Single import path:

```ts
import {
  AnimatedSection, fadeUp, easings, durations,
  useViewportAnimation, StaggerGroup, cardEntrance
} from "@arno/lib/animations"
```

### Architecture

```text
src/lib/animations/
├── index.ts              # Barrel - single export point
├── config/
│   ├── easings.ts        # Cubic-bezier tokens
│   ├── durations.ts      # Duration tokens (seconds)
│   └── springs.ts        # Spring physics presets
├── variants/
│   ├── entrance.ts       # fadeUp, fadeDown, blurReveal, scaleUp, cardEntrance, iconPop, clipRevealX, …
│   ├── text.ts           # headline, textBlock, badgePop, wordReveal, charDrop, …
│   ├── interactive.ts    # hoverLift, hoverGrow, hoverGlow, buttonPress, iconSpin, …
│   ├── stagger.ts        # staggerContainer, makeStagger, …
│   ├── continuous.ts     # floatY, pulse, shimmerSweep, spinSlow, …
│   └── page.ts           # pageFadeUp, pageFade, pageScale, pageSlideLeft
├── hooks/
│   ├── useViewportAnimation.ts   # Scroll trigger - returns { ref, isInView }
│   ├── useStagger.ts             # Per-item delay calculator
│   └── useReducedMotion.ts       # Accessibility gate
└── components/
    ├── AnimatedSection.tsx   # Scroll-triggered wrapper
    ├── AnimatedText.tsx      # Word/block/char text animation
    ├── StaggerGroup.tsx      # Stagger container for grids and lists
    └── PageTransition.tsx    # Route-level enter/exit (used once in layout.tsx)
```

### Easing tokens

| Token | Cubic-bezier | Use for |
| --- | --- | --- |
| `easings.smooth` | `[0.25, 0.46, 0.45, 0.94]` | Standard ease-out - most UI transitions |
| `easings.back` | `[0.34, 1.56, 0.64, 1]` | BackOut overshoot snap - badges, CTAs, icon pops |
| `easings.spring` | `[0.68, -0.55, 0.265, 1.55]` | Aggressive overshoot - use sparingly |
| `easings.gentle` | `[0.4, 0.0, 0.2, 1]` | Material standard - form inputs, tabs |
| `easings.sharp` | `[0.4, 0.0, 0.6, 1]` | Fast in/out - quick dismissals |
| `easings.out` | `[0.0, 0.0, 0.2, 1]` | Fast in, slow out - large entrances |
| `easings.in` | `[0.4, 0.0, 1.0, 1]` | Slow in, fast out - exits |

### Duration tokens

| Token | Value | Use for |
| --- | --- | --- |
| `durations.instant` | 0.1s | Micro-feedback (tap, focus) |
| `durations.fast` | 0.2s | Hover states |
| `durations.quick` | 0.35s | Dropdown open/close |
| `durations.base` | 0.5s | Standard UI transitions |
| `durations.slow` | 0.7s | Section entrances, card reveals |
| `durations.xslow` | 1.0s | Hero headlines, blur reveals |
| `durations.crawl` | 1.5s | Ambient / background effects |

### Variant convention

All entrance and stagger variants use `hidden → visible`:

```ts
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: easings.smooth } },
}
```

Variants in `entrance.ts`: `fadeIn`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `scaleUp`, `scaleDown`, `blurReveal`, `clipRevealX`, `clipRevealY`, `cardEntrance`, `iconPop`

Variants in `text.ts`: `textBlock`, `headline`, `textSlideIn`, `badgePop`, `wordReveal`, `wordFadeUp`, `wordSlide`, `charDrop`

### Load-time vs scroll-triggered

| Situation | Pattern |
| --- | --- |
| Animates on page load (Hero) | Inline `initial/animate/transition` with explicit `delay` per element |
| Animates when scrolled into view | `useViewportAnimation` + `variants` + `animate={isInView ? "visible" : "hidden"}` |
| Grid of 3+ cards | `StaggerGroup` + `motion.div variants={cardEntrance}` |
| Single block wrapper | `AnimatedSection variant={fadeUp}` |

### StaggerGroup

```tsx
import { StaggerGroup, cardEntrance } from "@arno/lib/animations"

<StaggerGroup stagger="loose" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {items.map((item) => (
    <motion.div key={item.id} variants={cardEntrance}>
      {/* card content */}
    </motion.div>
  ))}
</StaggerGroup>
```

Stagger presets: `"default"` · `"tight"` · `"loose"` · `"cascade"`

---

## Content Management

**Everything visible on the site** - name, bio, links, metrics, projects, skills, experience, achievements, typewriter roles - lives in:

```text
src/assets/site.tsx
```

Edit this file to update any content. No section component should be touched for content-only changes. The file exports `siteData` (typed object) and `navLinks`.

---

## Security

Headers are set in `next.config.ts` via `async headers()`:

| Header | Value |
| --- | --- |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation all blocked |
| `Content-Security-Policy` | Defined inline - see `next.config.ts` |

CSP notes:

- `'unsafe-inline'` on `script-src` - required by Next.js App Router for hydration scripts.
- `'unsafe-eval'` on `script-src` - required by Framer Motion v12's animation engine.
- `'unsafe-inline'` on `style-src` - required by Framer Motion for inline style injection.

---

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for the contact form |

Set in `.env.local`. Never committed to source control.

---

## Commands

```bash
npm run dev      # Dev server with Turbopack
npm run build    # Production build (type-check + static generation)
npm run start    # Serve production build locally
npm run lint     # ESLint
```

---

## Deployment

Deployed to Vercel. `metadataBase` in `layout.tsx` is set to:

```text
https://personal-portfolio-nextjs-rouge.vercel.app
```

Update this if the deployment URL changes. It affects Open Graph and Twitter card image URL resolution.
