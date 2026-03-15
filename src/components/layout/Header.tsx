// Desktop navbar -> screen >= 1024px
"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Logo from "@arno/components/ui/Logo";
import { Button } from "@arno/components/ui/Button";
import { ThemeToggle } from "@arno/components/ui/ThemeToggle";
import { navLinks } from "@arno/assets/site";

interface Props {
  activeSection: string;
}

export default function Navbar({ activeSection }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "hidden lg:block",
        "fixed top-0 w-full z-1001 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0 pl-4">
            <Logo />
          </div>
          <div className="ml-auto flex items-center gap-8">
            {navLinks.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  className={clsx(
                    "text-sm font-medium transition-colors duration-200 relative",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary rounded-full" />
                  )}
                </a>
              );
            })}
            <Button variant="primary" size="sm" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
