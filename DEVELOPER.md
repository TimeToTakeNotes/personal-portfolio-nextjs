# Developer Reference - personal-portfolio-nextjs

Personal portfolio for Arno Christie. Next.js 15 App Router, Framer Motion 12, Tailwind CSS v4.

This document is the authoritative reference for both human and AI contributors. The **Rules** section must be read before making any change to the codebase.

---

## Table of Contents

1. [Rules](#rules)
2. [Design System](#design-system)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [UI Component Reference](#ui-component-reference)
6. [CSS Architecture](#css-architecture)
7. [Animation System](#animation-system)
8. [Content Management](#content-management)
9. [Security](#security)
10. [Environment Variables](#environment-variables)
11. [Commands](#commands)
12. [Deployment](#deployment)

---

## Rules

These rules are mandatory. They are enforced by convention, not by a linter, so every contributor (human or AI) is responsible for following them exactly. When in doubt about any pattern, this section takes precedence.

---

### RULE 1 - All content lives in `site.tsx` only

Never hardcode copy, links, email addresses, phone numbers, names, metrics, or project data inside a component. All of it must come from `siteData` exported from `src/assets/site.tsx`. Section headings and intro text are in `siteData.sections`.

```tsx
// ✓ Correct
import { siteData } from "@arno/assets/site"
<p>{siteData.bio}</p>
<RevealText as="h2">{siteData.sections.projects.title}</RevealText>

// ✗ Wrong - hardcoded copy inside a component
<p>Passionate developer based in South Africa...</p>
```

---

### RULE 2 - Use existing UI components; never raw HTML equivalents

| Instead of… | Use… |
| --- | --- |
| A raw `<section>` with padding and a heading row | `<Section id index label>` |
| An `<a>` with custom underline or arrow styles | `<TextLink>` |
| A `<button>` with custom background styles | `<Button>` |
| A raw `<input>` or `<textarea>` in a form | `<Field>` |
| A `<div className="h-px bg-border">` divider | `<Rule>` |
| Hand-written word-by-word heading animation | `<RevealText>` |

If a required visual style does not exist as a variant, **add a variant to the component** - do not bypass the component.

---

### RULE 3 - Links and buttons

Use `<TextLink>` for navigation and outbound links. Use `<Button>` only for actions (submit, retry, toggle) or for a single primary call to action in a group.

```tsx
// ✓ Outbound link with arrow
<TextLink href={siteData.links.github} arrow="up-right" external>GitHub</TextLink>

// ✓ In-page link
<TextLink href="#projects" arrow="down">Projects</TextLink>

// ✓ Form submit - use the loading prop, never render a spinner manually
<Button type="submit" size="lg" loading={isSubmitting}>Send Message</Button>

// ✗ Wrong - a link styled as a filled button for plain navigation
<Button asChild><a href="#projects">View My Work</a></Button>
```

`external` sets `target="_blank"`, `rel="noopener noreferrer"` and a visually hidden "(opens in a new tab)" label. Always set it for links that leave the site.

---

### RULE 4 - No cards, no pills

The layout separates content with space, hairline rules and a 12-column grid. Do not add boxed containers.

- Do not wrap content in `bg-card border rounded-*` boxes.
- Do not render tags as pill badges. Render them as monospaced text joined with `"  /  "`.
- Do not put icons in tinted squares as decoration. Use an icon only when it carries meaning (arrows, close, theme).
- Use `<Rule>` between list items and above section content.

```tsx
// ✓ Correct - tags as mono text
<p className="font-mono text-xs">{project.tags.join("  /  ")}</p>

// ✗ Wrong - pill badges
{project.tags.map((t) => <span className="rounded-full border px-2">{t}</span>)}
```

---

### RULE 5 - Styling rules

**Never use raw colour values.** All colours must come from CSS variables via Tailwind token classes.

```tsx
// ✓ Correct - token classes
<p className="text-muted-foreground">…</p>
<div className="border-border bg-muted">…</div>

// ✗ Wrong - hardcoded values
<p className="text-gray-500">…</p>
<div style={{ color: "#9e363a" }}>…</div>
```

**Do not use:** gradients on surfaces or text, glow shadows, glassmorphism panels, or a second accent colour.

**Typography rules:**

| Role | Classes |
| --- | --- |
| Display heading (section title) | `<RevealText as="h2" className="text-5xl md:text-7xl">` - serif is applied by the base `h2` style |
| Item heading | `<h3 className="text-3xl md:text-4xl">` |
| Body text | default (`font-sans`), `text-muted-foreground` for secondary copy |
| Metadata label (dates, indexes, captions) | `className="eyebrow"` |
| Tags and tech lists | `font-mono text-xs` |
| Numbers and dates | add `figures` for tabular figures |
| Accent | `text-primary` - use for one element per block at most |

**Dark mode:**

- Do not use `dark:` variants to swap colours that are already handled by CSS variables.
- Only add `dark:` when a visual tweak is not captured by the variable.

**Utility and component classes:**

| Class | Source | Use for |
| --- | --- | --- |
| `container-page` | `components.css` | Page gutter and max width. Use on every full-width block |
| `eyebrow` | `components.css` | Small monospaced uppercase metadata label |
| `link-draw` | `components.css` | Underline that draws on hover (used by `TextLink`) |
| `link-underline` | `components.css` | Permanent underline that redraws on hover (used by `TextLink underline="underline"`) |
| `field-input` | `components.css` | Underline-only form input (used by `Field`) |
| `figures` | `utilities.css` | Tabular lining figures |
| `visually-hidden` | `utilities.css` | Hide visually, keep for screen readers |

---

### RULE 6 - Animation rules

**Never use raw easing arrays, raw easing strings, or magic duration numbers.**

```ts
// ✓ Correct
transition={{ duration: durations.xslow, ease: easings.expo }}

// ✗ Wrong - raw values
transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
```

**Scroll-triggered animations must use `useViewportAnimation`** - not raw `useInView` + `useRef`:

```ts
// ✓ Correct
const { ref, isInView } = useViewportAnimation({ margin: "0px 0px -10% 0px" })

// ✗ Wrong - raw framer-motion hooks in section/UI components
const ref = useRef(null)
const isInView = useInView(ref, { once: true })
```

**Prefer the reveal primitives** in `src/components/ui/Reveal.tsx` over one-off motion code:

| Primitive | Effect | Use for |
| --- | --- | --- |
| `RevealText` | Words slide up from behind a mask | Section titles, project titles, hero name (`onMount`) |
| `Rule` | Hairline draws from left to right | Dividers between items and under section headers |
| `FadeIn` | Short fade and rise | Body copy, lists, supporting blocks |

**Load-time (on-mount) animations** use inline `initial/animate/transition` props with explicit delays - not `variants={}` - because variant-embedded transitions take precedence over element-level `transition` props.

**Reduced motion:** `MotionProvider` sets `reducedMotion="user"`, so Framer Motion skips transform animations when the operating system requests it. Scroll-linked values (`useScroll` + `useTransform`) are not covered by this setting. Gate them with `useReducedMotion()`.

**Do not add:** always-on pulsing or glowing elements, infinite marquees, typewriter effects, animated background paths, or hover scale on buttons.

**`position: fixed` elements** must be siblings of `<PageTransition>` in `layout.tsx`, not children. Framer Motion applies CSS `transform` during transitions, which breaks fixed positioning. `<MainNavigation />` is the reference pattern.

---

### RULE 7 - CSS architecture rules

- `@import "tailwindcss"` and `@import "tw-animate-css"` appear **once** - in `globals.css` only. Never in partials.
- `@keyframes` used by a component class go at the top level of the same partial as that class.
- New CSS variables must be added to `theme.css` under both `:root` and `.dark`, and mapped in the `@theme inline` block.
- Never write `color: #hex` or `background: rgb(...)` in CSS files. Use CSS variable references.

---

### RULE 8 - Import rules

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

## Design System

The site uses an editorial layout: typography and whitespace carry the design, not decoration.

| Element | Decision |
| --- | --- |
| Display font | Instrument Serif (`font-serif`) - all headings, names and large figures |
| Body font | Schibsted Grotesk (`font-sans`) - body copy and interface text |
| Metadata font | JetBrains Mono (`font-mono`, `.eyebrow`) - labels, dates, indexes, tags |
| Palette | Warm paper and ink neutrals with one accent (Redline crimson) |
| Structure | Numbered sections (`01 About`), 12-column grid, hairline rules |
| Texture | Static paper grain on `body::before` (see `base.css`) |
| Photography | Full-width, opaque photos only. Do not use background-removed cutouts or boxed portraits |
| Radius | `--radius: 0.25rem`. Most elements have no radius |

**Section pattern:**

```tsx
<Section id="projects" index="02" label={copy.label} aside="08 entries">
  <RevealText as="h2" className="text-5xl md:text-7xl">{copy.title}</RevealText>
  {/* content on the 12-column grid */}
</Section>
```

**List pattern** (projects, specialisations, achievements):

```tsx
<ol>
  {items.map((item, i) => (
    <li key={item.title} className="group">
      <Rule />
      <div className="grid grid-cols-12 gap-y-4 py-8 md:gap-x-10">
        <span className="eyebrow figures col-span-12 md:col-span-1 group-hover:text-primary">{pad(i + 1)}</span>
        <h3 className="col-span-12 md:col-span-6">{item.title}</h3>
        <p className="col-span-12 md:col-span-5 md:col-start-8">{item.description}</p>
      </div>
    </li>
  ))}
</ol>
<Rule />
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
| UI Primitives | Radix UI | 2.x |
| Fonts | Instrument Serif, Schibsted Grotesk, JetBrains Mono via `next/font` | - |
| Form | Web3Forms API | - |
| Deploy | Vercel | - |

---

## Project Structure

```text
src/
├── app/
│   ├── globals.css          # Single CSS entry point - imports all partials
│   ├── layout.tsx           # Root layout: fonts, metadata, theme script, providers
│   ├── page.tsx             # Home page - composes all sections
│   ├── error.tsx            # Error boundary (uses StatusPage)
│   ├── not-found.tsx        # 404 page (uses StatusPage)
│   ├── loading.tsx          # Route loading indicator
│   ├── sitemap.ts           # Next.js sitemap generator
│   ├── robots.ts            # Robots.txt generator
│   └── styles/
│       ├── theme.css        # CSS variables (:root, .dark) + @theme inline tokens
│       ├── base.css         # Resets, typography, paper grain, focus, reduced motion
│       ├── components.css   # .container-page, .eyebrow, .link-draw, .link-underline, .field-input
│       └── utilities.css    # .figures, .visually-hidden
│
├── assets/
│   └── site.tsx             # SINGLE SOURCE OF TRUTH for all content data
│
├── components/
│   ├── layout/
│   │   ├── MainNavigation.tsx   # Fixed header: always visible, active-section tracking
│   │   ├── MobileMenu.tsx       # Full-screen menu below 1024px
│   │   ├── Footer.tsx           # Footer
│   │   ├── Section.tsx          # Numbered section shell: header row + rule + content
│   │   ├── StatusPage.tsx       # Shared layout for 404 and error pages
│   │   ├── MotionProvider.tsx   # MotionConfig with reducedMotion="user"
│   │   └── ThemeProvider.tsx    # Dark/light mode context
│   │
│   ├── sections/
│   │   ├── Hero.tsx             # Name, rotating role, tagline, count-up figures
│   │   ├── About.tsx            # Wide photo, bio, facts, areas of expertise
│   │   ├── SkillGlossary.tsx    # Skill lists; each skill opens a note with a summary and "Where I've used it"
│   │   ├── Projects.tsx         # Featured projects + expandable project index
│   │   ├── Experience.tsx       # Work + education timeline, achievements
│   │   └── ContactForm.tsx      # Contact details + Web3Forms form
│   │
│   └── ui/
│       ├── Button.tsx           # CVA button - variants: primary, outline, secondary, ghost, link, error
│       ├── DropdownMenu.tsx     # Radix dropdown wrapper
│       ├── Input.tsx            # Field - label above, underline-only input/textarea
│       ├── Logo.tsx             # Serif wordmark
│       ├── Reveal.tsx           # RevealText, Rule, FadeIn motion primitives
│       ├── TextLink.tsx         # Text link with optional directional arrow
│       └── ThemeToggle.tsx      # Light / dark / system menu
│
└── lib/
    ├── animations/          # Modular animation system (see Animation System section)
    └── utils.ts             # cn() helper (clsx + tailwind-merge)
```

### Path alias

All imports use `@arno/*` → `./src/*`. Never use relative paths.

---

## UI Component Reference

### Section

**Source:** `src/components/layout/Section.tsx`

| Prop | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Anchor target. Must match the `navLinks` href |
| `index` | `string` | Two-digit number, for example `"02"` |
| `label` | `string` | Short name shown next to the number |
| `aside` | `ReactNode` | Optional text on the right of the header row |
| `className` | `string` | Merged via `cn()` |

### Reveal primitives

**Source:** `src/components/ui/Reveal.tsx`

| Component | Props | Notes |
| --- | --- | --- |
| `RevealText` | `children: string`, `as`, `className`, `delay`, `stagger`, `onMount` | Renders a visually hidden copy for screen readers. `children` must be a plain string |
| `Rule` | `className`, `delay`, `strong` | `strong` uses the ink colour (`--border-strong`) |
| `FadeIn` | `as`, `className`, `delay` | `as`: `div`, `li`, `dl`, `ul` |

### TextLink

**Source:** `src/components/ui/TextLink.tsx`

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `href` | `string` | - | Required |
| `arrow` | `"up-right"` \| `"right"` \| `"down"` \| `"up"` | - | The arrow moves in its direction on hover |
| `external` | `boolean` | `false` | New tab, safe `rel`, hidden screen reader note |
| `underline` | `"draw"` \| `"underline"` | `"draw"` | `draw` shows the line on hover only |

### Button

**Source:** `src/components/ui/Button.tsx` · Built with CVA

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | see table | `"primary"` | |
| `size` | `"sm"` \| `"md"` \| `"lg"` \| `"icon"` | `"md"` | Always add `aria-label` or hidden text to `icon` buttons |
| `asChild` | `boolean` | `false` | Delegates rendering to the child element |
| `loading` | `boolean` | `false` | Shows a spinner and disables the button |

| Variant | Appearance | Use for |
| --- | --- | --- |
| `primary` | Solid ink, turns crimson on hover | Form submit, main action |
| `outline` | Hairline ink border, fills on hover | Secondary action next to `primary` |
| `secondary` | Muted fill | Low-emphasis action |
| `ghost` | No fill until hover | Icon buttons (theme toggle) |
| `link` | Underlined text | Inline action inside text |
| `error` | Destructive fill | Destructive action |

### Field

**Source:** `src/components/ui/Input.tsx`

```tsx
<Field label="Email" name="email" type="email" autoComplete="email" required />
<Field label="Message" name="message" as="textarea" rows={5} required />
```

Always set `autoComplete` where a standard token exists (`given-name`, `email`, `tel`).

---

## CSS Architecture

### Partial responsibilities

| File | Layer | Contains |
| --- | --- | --- |
| `theme.css` | - | CSS variables (`:root`, `.dark`) and `@theme inline` token mapping |
| `base.css` | `@layer base` | Resets, heading and body typography, paper grain, focus ring, selection, autofill, reduced motion |
| `components.css` | `@layer components` | `.container-page`, `.eyebrow`, `.link-draw`, `.link-underline`, `.field-input` and their keyframes |
| `utilities.css` | `@layer utilities` | `.figures`, `.visually-hidden` |

**Rule:** `@import "tailwindcss"` and `@import "tw-animate-css"` appear **once**, in `globals.css` only. Partials must never contain their own `@import`.

### Theme tokens

Theme: **Paper + Ink + Redline**. See the header comment in `theme.css` for the palette rules.

| Token | Use for |
| --- | --- |
| `background` / `foreground` | Page surface and main text |
| `muted` / `muted-foreground` | Hover fills and secondary text |
| `primary` | The single accent: active states, key labels, focus ring |
| `border` | Hairline rules |
| `border-strong` | Section header rules (ink colour) |
| `card`, `popover` | Dropdown menus and other raised surfaces |

```css
/* CSS variable - use in raw CSS and Framer Motion inline styles */
var(--color-primary)

/* Tailwind token class - use in JSX className */
text-primary  ·  bg-primary  ·  border-primary
```

Fonts (loaded in `layout.tsx`, mapped in `theme.css`):

- `font-serif` → Instrument Serif (`--font-instrument-serif`)
- `font-sans` → Schibsted Grotesk (`--font-schibsted-grotesk`)
- `font-mono` → JetBrains Mono (`--font-jetbrains-mono`)

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
| `easings.expo` | `[0.16, 1, 0.3, 1]` | Exponential ease-out - reveals, rules, editorial entrances (default for this design) |

### Duration tokens

| Token | Value | Use for |
| --- | --- | --- |
| `durations.instant` | 0.1s | Micro-feedback (tap, focus) |
| `durations.fast` | 0.2s | Hover states |
| `durations.quick` | 0.35s | Dropdown open/close |
| `durations.base` | 0.5s | Standard UI transitions |
| `durations.slow` | 0.7s | Section entrances, card reveals |
| `durations.xslow` | 1.0s | Text reveals, section entrances |
| `durations.crawl` | 1.5s | Rules drawing, portrait reveal, count-up figures |

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
| Animates on page load (Hero) | Inline `initial/animate/transition` with explicit `delay` per element, or `RevealText onMount` |
| Heading enters the viewport | `RevealText` |
| Divider enters the viewport | `Rule` |
| Body block enters the viewport | `FadeIn` |
| List of items | `Rule` + `FadeIn` per item with `delay={i * 0.06}` to `delay={i * 0.1}` |
| Scroll-linked value | `useScroll` + `useTransform` or `useSpring`, gated by `useReducedMotion()` |

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

**Everything visible on the site** - name, bio, links, metrics, projects, skills, experience, achievements, rotating roles, section copy - lives in:

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
