import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import DitherVeil from "../DitherVeil/DitherVeil";
import "./Hero.css";

gsap.registerPlugin(useGSAP);

const NAV = ["About", "Skills", "Projects", "Experience", "Contact"];

const Arrow = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
const ArrowRight = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ArrowDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);
const Pin = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const Globe = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </svg>
);
const Github = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-4 1.2-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-.8-2.3c2.8-.3 5.8-1.4 5.8-6.2A4.8 4.8 0 0 0 18.7 4.6 4.5 4.5 0 0 0 18.6 1S17.4.7 15 2.3a12 12 0 0 0-6 0C6.6.7 5.4 1 5.4 1a4.5 4.5 0 0 0-.1 3.6A4.8 4.8 0 0 0 4 8c0 4.8 3 5.9 5.8 6.2A3 3 0 0 0 9 16.5V22" />
  </svg>
);
const Linkedin = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 11v5M8 8v.01M12 16v-5m0 2.5a2.5 2.5 0 0 1 5 0V16" />
  </svg>
);
const Mail = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

/* tech strip icons */
const ReactIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="-12 -12 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.9"
  >
    <circle r="1.6" fill="currentColor" />
    <ellipse rx="10" ry="4" />
    <ellipse rx="10" ry="4" transform="rotate(60)" />
    <ellipse rx="10" ry="4" transform="rotate(120)" />
  </svg>
);
const NodeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round"
  >
    <path d="M12 2.5 20.5 7.3v9.4L12 21.5 3.5 16.7V7.3z" />
  </svg>
);
const MongoIcon = () => (
  <svg width="16" height="26" viewBox="0 0 16 26" fill="currentColor">
    <path d="M2 2l12 11L2 24z" />
  </svg>
);
const JsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" />
  </svg>
);

const TECH = [
  { name: "React", icon: <ReactIcon />, cls: "" },
  { name: "Node.js", icon: <NodeIcon />, cls: "" },
  { name: "express", icon: null, cls: "express" },
  { name: "MongoDB", icon: <MongoIcon />, cls: "" },
  { name: "JavaScript", icon: <JsIcon />, cls: "" },
];

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return undefined;

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          ".pf-nav__inner > *",
          { autoAlpha: 0, y: -36 },
          { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.1 },
        )
        .fromTo(
          ".pf-hero",
          { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(1.15)" },
          "-=0.25",
        )
        .fromTo(
          [
            ".pf-badge",
            ".pf-hey",
            ".pf-title",
            ".pf-lead",
            ".pf-cta",
            ".pf-hero__foot",
          ],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.1 },
          "-=0.42",
        )
        .fromTo(
          ".pf-tech__inner > *",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.1 },
          "-=0.3",
        );
    },
    { scope: heroRef },
  );

  return (
    <div className="pf" ref={heroRef}>
      {/* ───── NAVBAR ───── */}
      <header className="pf-nav">
        <div className="pf-nav__inner">
          <a href="/" className="pf-logo">
            rudresh<span className="pf-logo__dot">.</span>
            <span className="pf-logo__code">&lt;/&gt;</span>
          </a>

          <nav className="pf-links">
            {NAV.map((l, i) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={`pf-links__item ${i === 0 ? "is-active" : ""}`}
              >
                {l}
              </a>
            ))}
          </nav>

          <a href="mailto:rudreshsankpal21@gmail.com" className="pf-talk">
            Let&apos;s talk <Arrow size={12} />
          </a>
        </div>
      </header>

      {/* ───── HERO ───── */}
      <section className="pf-hero" id="about">
        <div className="pf-hero__grid" aria-hidden="true" />

        <div className="pf-hero__bg" aria-hidden="true">
          <DitherVeil
            fit="cover"
            reverse
            pattern="floyd"
            pixelSize={3}
            levels={4}
            palette="rgb"
            inkColor="#0a0b10"
            paperColor="#ffffff"
            contrast={1.15}
            revealRadius={220}
            linger={1.2}
          />
          <div className="pf-hero__fade" />
        </div>

        <div className="pf-hero__content">
          <span className="pf-badge">
            <i className="pf-badge__dot" /> AVAILABLE FOR OPPORTUNITIES
          </span>

          <p className="pf-hey">
            HEY, I&apos;M RUDRESH
            <svg
              className="pf-hey__spark"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
            </svg>
          </p>

          <h1 className="pf-title">
            Building Digital
            <br />
            Experiences
            <br />
            That <span className="pf-title__accent">Matter</span>
            <span className="pf-title__dot">.</span>
          </h1>

          <p className="pf-lead">
            Full-Stack Developer. Creative problem solver.
            <br />
            I turn ideas into thoughtful, high-performing experiences
            <br />
            with <b>React, Node.js, Express &amp; MongoDB.</b>
          </p>

          <div className="pf-cta">
            <a href="#projects" className="pf-btn pf-btn--primary">
              Explore projects <Arrow size={13} />
            </a>
            <a
              href="mailto:rudreshsankpal21@gmail.com"
              className="pf-btn pf-btn--ghost"
            >
              Contact me <ArrowRight />
            </a>
          </div>

          {/* <div className="pf-meta">
            <span>
              <Pin /> Based in India
            </span>
            <span className="pf-meta__sep" />
            <span>
              Building for the world <Globe />
            </span>
          </div> */}
        </div>

        <div className="pf-hero__foot">
          <span className="pf-scroll">
            SCROLL TO EXPLORE <ArrowDown />
          </span>
          <span className="pf-tagline">GOOD CODE. GREAT EXPERIENCES.</span>
          <span className="pf-social">
            <a href="https://github.com/rudreshsankpal21" aria-label="GitHub">
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/rudresh-sankpal-090095326"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
            <a href="mailto:rudreshsankpal21@gmail.com" aria-label="Email">
              <Mail />
            </a>
          </span>
        </div>
      </section>

      {/* ───── TECH STRIP ───── */}
      <section className="pf-tech">
        <div className="pf-tech__inner">
          <span className="pf-tech__label">BUILT WITH INTENTION</span>
          <ul className="pf-tech__list">
            {TECH.map((t) => (
              <li key={t.name} className={`pf-tech__item ${t.cls}`}>
                {t.icon}
                <span>{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
