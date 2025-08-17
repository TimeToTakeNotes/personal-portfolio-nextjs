// Header component (navbar) for navigation on computer screens -> screen > 1024px

"use client";
import clsx from "clsx";
import Logo from "@arno/components/ui/Logo";
import { Button } from "@arno/components/ui/Button";
import { ThemeToggle } from "@arno/components/ui/ThemeToggle";

export default function Navbar() {
  return (
    <nav
      className={clsx(
        "hidden lg:block", // Hidden on mobile, visible on commp
        "fixed top-0 w-full backdrop-blur-md border-b z-1001 transition-all duration-300",
        "bg-muted border-b border-border"
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0 pl-4">
            <Logo />
          </div>
          <div className="ml-auto items-center space-x-8 flex">
            {["features", "how-it-works", "use-cases", "testimonials"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="underline-animated"
              >
                {id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </a>
            ))}
            <Button
              variant="outline"
              size="sm"
            >
              Book a Demo
            </Button>
            <Button
              variant="primary"
              size="sm"
            >
              Contact Us
            </Button>

            <ThemeToggle  />
          </div>
        </div>
      </div>
    </nav>
  );
}