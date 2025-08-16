import { Button } from "@arno/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@arno/components/ui/DropdownMenu";
import { useTheme } from "@arno/components/layout/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ghost text-foreground"
        >
          <Sun
            className="
              h-[1.1rem] w-[1.2rem]
              rotate-0 scale-100 opacity-100
              transition-all duration-500 ease-in-out
              dark:-rotate-90 dark:scale-0 dark:opacity-0
            "
          />
          <Moon
            className="
              absolute h-[1.1rem] w-[1.2rem]
              rotate-90 scale-0 opacity-0
              transition-all duration-500 ease-in-out
              dark:rotate-0 dark:scale-100 dark:opacity-100
            "
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}