import React from "react";
import Hero from "../components/HeroSection/Hero";
import "./Homepage.css";
import AboutSection from "../components/AboutSection/AboutSection";
import ProjectsSection from "../components/ProjectsSection/ProjectsSection";
import SkillsSection from "../components/SkillsSection/SkillsSection";
function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
    </div>
  );
}

export default HomePage;
