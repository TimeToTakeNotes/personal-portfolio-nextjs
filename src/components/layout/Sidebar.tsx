// Sidebar component for mobile displays -> screen < 1024px
import { Button } from "@arno/components/ui/Button";
import { ThemeToggle } from "@arno/components/ui/ThemeToggle";
import { navLinks } from "@arno/assets/site";

interface Props {
  isOpen: boolean;
  onNavClick: () => void;
}

export default function Sidebar({ isOpen, onNavClick }: Props) {
  return (
    <div
      className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background/98 backdrop-blur-md border-t border-border z-1000 transform transition-all duration-300 ease-in-out lg:hidden ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Navigation Links */}
        <nav className="flex flex-col p-6 space-y-1 pt-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={onNavClick}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-muted"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 p-6 mt-auto border-t border-border/30">
          <Button
            variant="primary"
            className="w-full"
            onClick={onNavClick}
            asChild
          >
            <a href="#contact">Get In Touch</a>
          </Button>
          <div className="flex justify-center pt-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
