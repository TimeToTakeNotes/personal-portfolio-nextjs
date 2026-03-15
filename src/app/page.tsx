import { HeroSection } from "@arno/components/sections/Hero";
import { AboutSection } from "@arno/components/sections/About";
import { SpecializationsSection } from "@arno/components/sections/Specializations";
import { ProjectsSection } from "@arno/components/sections/Projects";
import { ExperienceSection } from "@arno/components/sections/Experience";
import Web3FormsContact from "@arno/components/sections/ContactForm";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SpecializationsSection />
      <ProjectsSection />
      <ExperienceSection />
      <Web3FormsContact />
    </div>
  );
}
