"use client";

import { useState, useEffect } from "react";
import Navbar from "@arno/components/layout/Header";
import MobileHeader from "@arno/components/layout/MobileHeader";
import Sidebar from "@arno/components/layout/Sidebar";

const SECTIONS = ["home", "about", "projects", "experience", "contact"];

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export default function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavClick = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <MobileHeader isOpen={isMobileMenuOpen} toggle={toggleMobileMenu} />
      <Sidebar isOpen={isMobileMenuOpen} onNavClick={handleNavClick} activeSection={activeSection} />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-999 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
