import { Github, Linkedin, Mail } from "lucide-react";
import { siteData } from "@arno/assets/site";

const socialLinks = [
  { icon: Github, label: "GitHub", href: siteData.links.github },
  { icon: Linkedin, label: "LinkedIn", href: siteData.links.linkedin },
  { icon: Mail, label: "Email", href: `mailto:${siteData.links.email}` },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Name & tagline */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-xl font-bold text-primary">{siteData.name}</p>
            <p className="text-sm text-muted-foreground">{siteData.tagline}</p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>&copy; {year} {siteData.name}. All rights reserved.</span>
          <span>Built with Next.js, TypeScript &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
