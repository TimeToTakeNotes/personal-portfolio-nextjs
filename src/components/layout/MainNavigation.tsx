// Main navigation component that handles all navigation logic
"use client";
import { useState, useEffect } from "react";
import Navbar from "@arno/components/layout/Header";
import MobileHeader from "@arno/components/layout/MobileHeader";
import Sidebar from "@arno/components/layout/Sidebar";

export default function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu when clicking on nav links
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar - Hidden on mobile */}
      <Navbar />
      
      {/* Mobile Header with Burger Menu - Hidden on desktop */}
      <MobileHeader 
        isOpen={isMobileMenuOpen} 
        toggle={toggleMobileMenu} 
      />
      
      {/* Mobile Sidebar */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onNavClick={handleNavClick}
      />
      
      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-999 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}