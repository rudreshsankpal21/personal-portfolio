import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import "./ProjectsSection.css";
import heroImg from "../../assets/3dhero.png";
import thirumalaImg from "../../assets/thirumala.png";
import kabneImg from "../../assets/kabnejewellers.png";
import twogoodImg from "../../assets/twogood.png";
import samarthImg from "../../assets/samarthjewellers.png";

const PROJECTS = [
  {
    number: "01",
    type: "MODERN WEB DEV ",
    name: "3D Animated website.",
    description: "Modern Web Development ",
    stack: ["HTML", "CSS", "GSAP", "LOCOMOTIVE", "THREE.JS"],
    tone: "blue",
    featured: true,
    image: heroImg,
    link: "https://3d-animation-rudresh.netlify.app/",
  },
  {
    number: "02",
    type: "E-COMMERCE EXPERIENCE",
    name: "THIRUMALA CASTINGS",
    description:
      "Less noise. More intention. A considered shopping experience for Industrial objects, built with performance at its core.",
    stack: ["React", "Express", "MySQL"],
    tone: "lilac",
    image: thirumalaImg,
    link: "https://thirumala-castings.netlify.app/",
  },
  {
    number: "03",
    type: "INTERACTIVE BUILDING",
    name: "KABANE JEWELLERS",
    description:
      "Turning ordinary forms into meaningful conversations. A dynamic form builder with conditional logic and real-time insights.",
    stack: ["React", "Three.js", "GSAP"],
    tone: "sage",
    image: kabneImg,
    link: "https://kabanejewellers.netlify.app/",
  },
  {
    number: "04",
    type: "INTERACTIVE BUILDING",
    name: "Two Good Website",
    description:
      "Turning ordinary forms into meaningful conversations. A dynamic form builder with conditional logic and real-time insights.",
    stack: ["HTML", "CSS", "GSAP"],
    tone: "sage",
    image: twogoodImg,
    link: "https://twogood-website-rudresh21.netlify.app/",
  },
  {
    number: "05",
    type: "ANDROID APPLICATION",
    name: "SHRI SAMARTH JEWELLERS",
    description:
      "Turning ordinary forms into meaningful conversations. A dynamic form builder with conditional logic and real-time insights.",
    stack: ["React-Native", "REST APIs"],
    tone: "sage",
    image: samarthImg,
    link: "https://play.google.com/store/apps/details?id=com.shrisamarthjewellers.app",
  },
];

const VISIBLE_BEHIND = 2;
const TILT = 7;

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const CARD_TRANSITION_DURATION = 0.54;

// Every card has one predictable resting place in the deck. Keeping the poses
// simple means a card can be re-targeted mid-animation without a visual jump.
const stackPose = (offset) => {
  const depth = Math.min(offset, VISIBLE_BEHIND + 1);
  return {
    y: -depth * 22,
    scale: 1 - depth * 0.035,
    rotate: 0,
    opacity: offset > VISIBLE_BEHIND ? 0 : 1 - depth * 0.12,
  };
};

function cardMotion(offset, total, reduceMotion) {
  const rest = stackPose(offset);
  const zIndex = total - offset;

  return {
    animate: { ...rest, zIndex },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: CARD_TRANSITION_DURATION,
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.32, ease: "easeOut" },
          zIndex: { duration: 0 },
        },
  };
}

const ChevronIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    style={{ transform: direction === "down" ? "rotate(180deg)" : undefined }}
  >
    <path
      d="M12 19V5M5.5 11.5 12 5l6.5 6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Preview({ project }) {
  const [portrait, setPortrait] = useState(false);
  if (project.image)
    return (
      <>
        <img className="projects__backdrop" src={project.image} alt="" />
        <img
          className={`projects__shot ${portrait ? "projects__shot--portrait" : ""}`}
          src={project.image}
          alt={`${project.name} project preview`}
          onLoad={(e) =>
            setPortrait(
              e.currentTarget.naturalHeight > e.currentTarget.naturalWidth,
            )
          }
        />
      </>
    );
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

function ProjectCard({ project, isActive, reduceMotion }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 160, damping: 18 });

  // Tilt toward the pointer and move the sheen with it (front card only).
  const handleMove = (event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    if (!isActive || reduceMotion || !canHover()) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * TILT);
    rotateX.set(-py * TILT);
  };
  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      className="projects__card"
      aria-hidden={!isActive}
      inert={!isActive ? "" : undefined}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1400 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="projects__content">
        <div className="projects__head">
          <span className="projects__number">{project.number}</span>
          <span className="projects__type">{project.type.trim()}</span>
        </div>
        <div className="projects__copy">
          <h3>{project.name}</h3>
          <p className="projects__description">{project.description}</p>
          <ul className="projects__stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <a
          className="projects__cta"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          View Project
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      <a
        className="projects__preview"
        href={project.link}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
      >
        <Preview project={project} />
      </a>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimer = useRef();
  const reduceMotion = useReducedMotion();
  const total = PROJECTS.length;

  useEffect(
    () => () => window.clearTimeout(animationTimer.current),
    [],
  );

  const go = (step) => {
    if (isAnimating) return;
    setActive((current) => (current + step + total) % total);
    if (reduceMotion) return;

    setIsAnimating(true);
    animationTimer.current = window.setTimeout(
      () => setIsAnimating(false),
      CARD_TRANSITION_DURATION * 1000,
    );
  };

  return (
    <section className="projects" id="projects">
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
        <div className="projects__stage">
          <div
            className="projects__deck"
            aria-roledescription="carousel"
            aria-label="Projects"
          >
            {PROJECTS.map((project, i) => {
              const offset = (i - active + total) % total;
              const { animate, transition } = cardMotion(
                offset,
                total,
                reduceMotion,
              );

              // Every card stays mounted so the leaving/arriving one can animate.
              return (
                <motion.div
                  key={project.number}
                  className="projects__slot"
                  initial={{ ...stackPose(offset), zIndex: total - offset }}
                  animate={animate}
                  transition={transition}
                >
                  <ProjectCard
                    project={project}
                    isActive={i === active}
                    reduceMotion={reduceMotion}
                  />
                </motion.div>
              );
            })}
          </div>
          <div className="projects__controls">
            <button
              type="button"
              className="projects__control"
              onClick={() => go(-1)}
              aria-label="Previous project"
              disabled={isAnimating}
            >
              <ChevronIcon direction="up" />
            </button>
            <span className="projects__counter" aria-live="polite">
              {PROJECTS[active].number}
              <small>/ {String(total).padStart(2, "0")}</small>
            </span>
            <button
              type="button"
              className="projects__control"
              onClick={() => go(1)}
              aria-label="Next project"
              disabled={isAnimating}
            >
              <ChevronIcon direction="down" />
            </button>
          </div>
        </div>
        <a
          href="https://github.com/rudreshsankpal21"
          className="projects__more"
        >
          More experiments on GitHub{" "}
          <span className="projects__arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
