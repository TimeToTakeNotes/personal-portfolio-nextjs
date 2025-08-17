import { HeroSection } from "@arno/components/sections/Hero";
// import ProblemSolution from "@arno/components/sections/ProblemSolution";
// import Features from "@arno/components/sections/Features";
// import HowItWorks from "@arno/components/sections/HowItWorks";
// import UseCases from "@arno/components/sections/UseCases";
// import Testimonial from "@arno/components/sections/Testimonials";
// import Cta from "@arno/components/sections/Cta";
import Web3FormsContact from "@arno/components/sections/ContactForm";

import BackgroundWrapper from "@arno/components/ui/BackgroundWrapper";
import bgImage from "@arno/assets/images/temp.png";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BackgroundWrapper image={bgImage}>
        <Web3FormsContact />
      </BackgroundWrapper>
      
    </div>
  );
}