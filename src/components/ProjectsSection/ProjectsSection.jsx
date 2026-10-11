import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectsSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Set `image` to an imported project image when your final assets are ready.
const PROJECTS = [
  {
    number: "01",
    type: "PRODUCTIVITY PLATFORM",
    name: "Orbit.",
    description:
      "A calmer way to manage the chaos. A collaborative workspace that brings projects, tasks, and teams into one beautifully simple place.",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    tone: "blue",
    featured: true,
    image: null,
  },
  {
    number: "02",
    type: "INTERACTIVE FORM BUILDER",
    name: "Formly.",
    description:
      "Turning ordinary forms into meaningful conversations. A dynamic form builder with conditional logic and real-time insights.",
    stack: ["React", "Express", "MongoDB"],
    tone: "lilac",
    image: null,
  },
  {
    number: "03",
    type: "E-COMMERCE EXPERIENCE",
    name: "Mono.",
    description:
      "Less noise. More intention. A considered shopping experience for everyday objects, built with performance at its core.",
    stack: ["React", "Node.js", "Stripe"],
    tone: "sage",
    image: null,
  },
];

const Arrow = () => (
  <span className="projects__arrow" aria-hidden="true">
    ↗
  </span>
);

function Preview({ project }) {
  if (project.image)
    return <img src={project.image} alt={`${project.name} project preview`} />;
  return (
    <div
      className="projects__placeholder"
      aria-label={`${project.name} project image placeholder`}
    >
      <div className="projects__browser">
        <span />
        <span />
        <span />
        <small>{project.name.toLowerCase()} / overview</small>
        <div>
          <b>{project.name}</b>
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article
      className={`projects__card ${project.featured ? "projects__card--featured" : ""}`}
    >
      <a
        className={`projects__preview projects__preview--${project.tone}`}
        href="#contact"
      >
        <span className="projects__number">{project.number} /</span>
        {project.featured && (
          <span className="projects__featured">✦ FEATURED PROJECT</span>
        )}
        <Preview project={project} />
        <span className="projects__preview-arrow">
          <Arrow />
        </span>
      </a>
      <div className="projects__info">
        <div>
          <p className="projects__type">{project.type}</p>
          <h3>{project.name}</h3>
        </div>
        <div className="projects__detail">
          <p>{project.description}</p>
          <ul>
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return undefined;
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: ".projects", start: "top 74%", once: true },
        })
        .from(".projects__topline > *", {
          autoAlpha: 0,
          y: 22,
          duration: 0.55,
          stagger: 0.12,
        })
        .from(
          ".projects__headline span",
          { autoAlpha: 0, y: 42, duration: 0.65, stagger: 0.12 },
          "-=0.3",
        )
        .from(
          ".projects__intro-copy",
          { autoAlpha: 0, y: 22, duration: 0.55 },
          "-=0.48",
        )
        .from(
          ".projects__card",
          { autoAlpha: 0, y: 54, duration: 0.7, stagger: 0.14 },
          "-=0.25",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects__inner">
        <div className="projects__topline">
          <span>SELECTED WORK</span>
          <span>IDEAS, MADE REAL</span>
        </div>
        <div className="projects__intro">
          <h2 className="projects__headline">
            <span>A few things</span>
            <span>I&apos;ve built.</span>
          </h2>
          <p className="projects__intro-copy">
            Thoughtful solutions. Tangible impact.
            <br />A selection of projects I&apos;m proud to put my name on.
          </p>
        </div>
        <div className="projects__work">
          <ProjectCard project={PROJECTS[0]} />
          <div className="projects__grid">
            <ProjectCard project={PROJECTS[1]} />
            <ProjectCard project={PROJECTS[2]} />
          </div>
        </div>
        <a
          href="https://github.com/rudreshsankpal21"
          className="projects__more"
        >
          More experiments on GitHub <Arrow />
        </a>
      </div>
    </section>
  );
}
