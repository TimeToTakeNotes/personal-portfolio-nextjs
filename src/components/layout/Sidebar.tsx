// Sidebar component for mobile displays -> screen < 1024px
import { Button } from "@arno/components/ui/Button";
import { ThemeToggle } from "@arno/components/ui/ThemeToggle";

interface Props {
  isOpen: boolean;
  onNavClick: () => void;
}

export default function Sidebar({ isOpen, onNavClick }: Props) {
  return (
    <div
      className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-md border-t border-border z-1000 transform transition-all duration-300 ease-in-out lg:hidden ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Navigation Links */}
        <div className="flex flex-col p-6 space-y-6">
          {["features", "how-it-works", "use-cases", "testimonials"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={onNavClick}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 border-b border-border/30"
            >
              {id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </a>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col gap-4 p-6 mt-auto border-t border-border/30">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onNavClick}
          >
            Book a Demo
          </Button>
          <Button 
            variant="primary" 
            className="w-full"
            onClick={onNavClick}
          >
            Contact Us
          </Button>
          <div className="flex justify-center pt-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}