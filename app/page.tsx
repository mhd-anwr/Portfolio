import HeroSection from "@/sections/hero";
import AboutSection from "@/sections/about";
import ProjectsSection from "@/sections/projects";
import ExperienceSection from "@/sections/experience";
import ServicesSection from "@/sections/services";
import TestimonialsSection from "@/sections/testimonials";
import ToolsSection from "@/sections/tools";
import ContactSection from "@/sections/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ServicesSection />
      <TestimonialsSection />
      <ToolsSection />
      <ContactSection />
    </>
  );
}
