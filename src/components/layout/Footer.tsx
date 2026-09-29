import { navLinks, siteData } from "@arno/assets/site"
import { Rule } from "@arno/components/ui/Reveal"
import { TextLink } from "@arno/components/ui/TextLink"

const profiles = [
  { label: "GitHub", href: siteData.links.github, external: true },
  { label: "LinkedIn", href: siteData.links.linkedin, external: true },
  { label: "Email", href: `mailto:${siteData.links.email}`, external: false },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative pb-8 pt-10">
      <div className="container-page">
        <Rule strong />

        <div className="grid grid-cols-12 gap-y-10 py-12 md:gap-x-10 md:py-16">
          <div className="col-span-12 md:col-span-6">
            <p className="font-serif text-4xl leading-none">{siteData.name}</p>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">{siteData.tagline}</p>
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-3">
            <p className="eyebrow">Index</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <TextLink href={href}>{label}</TextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-sm">
              {profiles.map(({ label, href, external }) => (
                <li key={label}>
                  <TextLink href={href} external={external} arrow={external ? "up-right" : undefined}>
                    {label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="eyebrow flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteData.name}
          </p>
          <p>{siteData.sections.footer.credit}</p>
          <TextLink href="#home" arrow="up">
            Back to top
          </TextLink>
        </div>
      </div>
    </footer>
  )
}
