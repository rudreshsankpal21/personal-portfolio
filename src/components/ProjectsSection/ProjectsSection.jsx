import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./ProjectsSection.css";

const PROJECTS = [
  {
    number: "01",
    type: "MODERN WEB DEV ",
    name: "3D Animated website.",
    description: "Modern Web Development ",
    stack: ["HTML", "CSS", "GSAP", "LOCOMOTIVE", "THREE.JS"],
    tone: "blue",
    featured: true,
    image: "src/assets/3dhero.png",
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
    image: "src/assets/thirumala.png",
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
    image: "src/assets/kabnejewellers.png",
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
    image: "src/assets/twogood.png",
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
    image: "src/assets/samarthjewellers.png",
    link: "https://play.google.com/store/apps/details?id=com.shrisamarthjewellers.app",
  },
];

const VISIBLE_BEHIND = 2;
const SWAP_DURATION = 0.9;
// Fraction of the swap at which the moving card changes layer.
const SWAP_MIDPOINT = 0.45;

// Resting pose for a card `offset` places behind the active one.
const stackPose = (offset) => {
  const depth = Math.min(offset, VISIBLE_BEHIND + 1);
  return {
    y: -depth * 38,
    scale: 1 - depth * 0.06,
    rotate: 0,
    filter: `brightness(${1 - depth * 0.22})`,
    opacity: offset > VISIBLE_BEHIND ? 0 : 1,
  };
};

// Pose at the swap midpoint: the leaving card drops below the deck (↓),
// the arriving card lifts above it (↑).
const swapMidpoint = (direction) =>
  direction > 0
    ? { y: 300, scale: 0.96, rotate: -4, filter: "brightness(1)", opacity: 1 }
    : { y: -300, scale: 0.96, rotate: 3, filter: "brightness(1)", opacity: 1 };

function cardMotion(offset, direction, total, reduceMotion) {
  const rest = stackPose(offset);
  const zIndex = total - offset;
  const isSwapping =
    !reduceMotion &&
    ((direction > 0 && offset === total - 1) ||
      (direction < 0 && offset === 0));

  if (!isSwapping)
    return {
      animate: { ...rest, zIndex },
      transition: reduceMotion
        ? { duration: 0 }
        : {
            type: "spring",
            stiffness: 220,
            damping: 26,
            zIndex: { duration: 0 },
          },
    };

  // `null` starts each keyframe track from the card's current value,
  // so clicking mid-animation continues smoothly.
  const mid = swapMidpoint(direction);
  const animate = Object.fromEntries(
    Object.keys(rest).map((key) => [key, [null, mid[key], rest[key]]]),
  );
  const timing = {
    duration: SWAP_DURATION,
    times: [0, SWAP_MIDPOINT, 1],
    ease: ["easeIn", "easeOut"],
  };
  // ↓ stays on top while dropping, then slides underneath the stack.
  // ↑ stays behind while lifting, then lands on top.
  animate.zIndex =
    direction > 0
      ? [total + 1, total + 1, zIndex, zIndex]
      : [0, 0, total + 1, total + 1];
  return {
    animate,
    transition: {
      ...timing,
      zIndex: {
        duration: SWAP_DURATION,
        times: [0, SWAP_MIDPOINT, SWAP_MIDPOINT + 0.01, 1],
        ease: "linear",
      },
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

function ProjectCard({ project, isActive }) {
  return (
    <article
      className="projects__card"
      aria-hidden={!isActive}
      inert={!isActive ? "" : undefined}
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
    </article>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for down, -1 for up
  const reduceMotion = useReducedMotion();
  const total = PROJECTS.length;

  const go = (step) => {
    setDirection(step);
    setActive((current) => (current + step + total) % total);
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
                direction,
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
                  <ProjectCard project={project} isActive={i === active} />
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
