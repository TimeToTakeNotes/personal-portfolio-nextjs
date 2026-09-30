import { HeroSection } from "@arno/components/sections/Hero";
import { AboutSection } from "@arno/components/sections/About";
import { ProjectsSection } from "@arno/components/sections/Projects";
import { ExperienceSection } from "@arno/components/sections/Experience";
import { ContactSection } from "@arno/components/sections/ContactForm";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
