// Header component for mobile screens -> screen < 1024px

"use client";
import Logo from "@arno/components/ui/Logo";
import BurgerMenu from "@arno/components/ui/BurgerMenu";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export default function MobileHeader({ isOpen, toggle }: Props) {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-1001 lg:hidden">
      <div className="flex justify-between items-center h-16 px-4">
        <Logo />
        <BurgerMenu isOpen={isOpen} toggle={toggle} />
      </div>
    </header>
  );
}