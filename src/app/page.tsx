import { HeroSection } from "@arno/components/sections/Hero";
// import ProblemSolution from "@arno/components/sections/ProblemSolution";
// import Features from "@arno/components/sections/Features";
// import HowItWorks from "@arno/components/sections/HowItWorks";
// import UseCases from "@arno/components/sections/UseCases";
// import Testimonial from "@arno/components/sections/Testimonials";
// import Cta from "@arno/components/sections/Cta";
// import Web3FormsContact from "@arno/components/sections/ContactForm";

import BackgroundWrapper from "@arno/components/ui/BackgroundWrapper";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* {
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <UseCases />
      <Testimonial />

      <BackgroundWrapper
        image={bgImage}
        overlay={false}
        className="flex items-center justify-center"
      >
        <Cta />
      </BackgroundWrapper>

      <Web3FormsContact /> } */}
    </div>
  );
}