import React from "react";
import Hero from "../components/HeroSection/Hero";
import "./Homepage.css";
import AboutSection from "../components/AboutSection/AboutSection";
import ProjectsSection from "../components/ProjectsSection/ProjectsSection";
function HomePage() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ProjectsSection />
    </div>
  );
}

export default HomePage;
