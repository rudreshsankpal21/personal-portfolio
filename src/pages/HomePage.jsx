import React from "react";
import Hero from "../components/HeroSection/Hero";
import "./Homepage.css";
import AboutSection from "../components/AboutSection/AboutSection";
import ProjectsSection from "../components/ProjectsSection/ProjectsSection";
import SkillsSection from "../components/SkillsSection/SkillsSection";
import ExperienceSection from "../components/ExperienceSection/ExperienceSection";
import ContactSection from "../components/ContactSection/ContactSection";
import SiteFooter from "../components/SiteFooter/SiteFooter";
function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}

export default HomePage;
