import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import ExperienceField from "./ExperienceField";
import "./ExperienceSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EXPERIENCE = [
  {
    period: "28 SEP 2026 — PRESENT",
    label: "CURRENT",
    title: "Full Stack Intern",
    place: "ZTH",
    summary:
      "Working on ZTH's internal website as part of a full-stack internship.",
    points: [
      "Applying full-stack development skills to an internal production website.",
      "Building on hands-on experience across web applications, APIs, and deployment.",
    ],
  },
  {
    period: "1 JUN 2026 — 30 JUN 2026",
    title: "Full Stack Development",
    place: "Makee My App Pvt. Ltd.",
    summary:
      "Developed complete end-to-end web applications for clients in a fast-moving product environment.",
    points: [
      "Contributed to a Workflow Management System and built an e-commerce website with a Next.js admin dashboard.",
      "Managed deployments using Vercel, Render, and VPS servers, and published client mobile apps to Google Play Store.",
    ],
  },
  {
    period: "1 NOV 2025 — 31 MAY 2026",
    title: "Full Stack Development",
    place: "Code World Infotech Pvt. Ltd.",
    summary:
      "Developed production-grade React Native and web applications for real business clients.",
    points: [
      "Integrated 100+ REST APIs for business and jewellery applications across React, Next.js, Node.js, Express.js, PHP, MySQL, and MongoDB.",
      "Built admin dashboards, authentication and reporting modules, then managed deployments on Render, Vercel, and VPS servers.",
    ],
  },
];

const STAGES = [
  {
    number: "01",
    title: "Beginner me.",
    copy: "Building the foundation through a B.Sc. in Computer Science, coding competitions, and early web development internships.",
  },
  {
    number: "02",
    title: "Intermediate me.",
    copy: "Moving from coursework to production work: React Native, real APIs, dashboards, mobile apps, and client requirements.",
  },
  {
    number: "03",
    title: "Developer me.",
    copy: "Shipping end-to-end products across Next.js, Node.js, MySQL, cloud deployment, and Google Play Store publishing.",
  },
];

const EASE = [0.16, 1, 0.3, 1];
const GLYPHS = "!<>-_/[]{}=+*^?#01";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE },
  }),
};

const pad = (n) => String(n).padStart(2, "0");

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Decodes `text` from random glyphs once `run` turns true.
function useScramble(text, run, disabled) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!run || disabled) return undefined;
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const revealed = Math.floor(frame / 1.4);
      let next = "";
      for (let i = 0; i < text.length; i += 1) {
        next +=
          i < revealed || text[i] === " "
            ? text[i]
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(next);
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run, disabled]);

  return run && !disabled ? output : text;
}

// Feeds pointer position into CSS vars for the spotlight glow.
const trackSpotlight = (event) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

function Stage({ stage, index, reduceMotion }) {
  return (
    <motion.article
      className="experience__stage"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      custom={reduceMotion ? 0 : index * 0.12}
      onPointerMove={trackSpotlight}
    >
      <span className="experience__stage-ghost" aria-hidden="true">
        {stage.number}
      </span>
      <span className="experience__stage-number">{stage.number} /</span>
      <h3>{stage.title}</h3>
      <p>{stage.copy}</p>
      <span className="experience__stage-bar" aria-hidden="true" />
    </motion.article>
  );
}

function Entry({ item, index, active, onActive, reduceMotion }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const focused = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const period = useScramble(item.period, seen, reduceMotion);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 160, damping: 18 });

  useEffect(() => {
    if (focused) onActive(index);
  }, [focused, index, onActive]);

  const handleMove = (event) => {
    trackSpotlight(event);
    if (reduceMotion || !canHover()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(-py * 6);
  };
  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      className={`experience__entry${active ? " is-active" : ""}`}
      initial={{ opacity: 0, x: reduceMotion ? 0 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span className="experience__node" aria-hidden="true" />
      <motion.div
        className="experience__card"
        style={{ rotateX: springX, rotateY: springY }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <span className="experience__card-index" aria-hidden="true">
          {pad(index + 1)}
        </span>
        <div className="experience__period" aria-label={item.period}>
          <span aria-hidden="true">{period}</span>{" "}
          {item.label && <b>{item.label}</b>}
        </div>
        <h3>{item.title}</h3>
        <p className="experience__place">{item.place}</p>
        <p className="experience__summary">{item.summary}</p>
        <ul>
          {item.points.map((point, i) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
            >
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  );
}

function HeadingLine({ children, className, delay }) {
  return (
    // The mask is observed, not the line: the line starts fully clipped by
    // the mask, so it would never count as "in view" on its own.
    <motion.span
      className={`experience__heading-mask ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span
        className="experience__heading-line"
        variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = EXPERIENCE[active];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (
        !section ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return undefined;

      const line = section.querySelector(".experience__line");
      const marker = section.querySelector(".experience__marker");
      const markerDistance = () =>
        Math.max(0, line.offsetHeight - marker.offsetHeight);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".experience__timeline",
            start: "top 60%",
            end: "bottom 55%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          ".experience__line-progress",
          { scaleY: 0 },
          { scaleY: 1, ease: "none" },
          0,
        )
        .fromTo(marker, { y: 0 }, { y: markerDistance, ease: "none" }, 0);

      gsap.fromTo(
        ".experience__stages-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience__stages",
            start: "top 85%",
            end: "bottom 35%",
            scrub: 0.6,
          },
        },
      );

      gsap.to(".experience__symbol", {
        rotate: 18,
        xPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <ExperienceField className="experience__field" />
      <div className="experience__inner">
        <motion.div
          className="experience__topline"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <span>04 / THE JOURNEY</span>
          <span>LEARNING BY DOING</span>
        </motion.div>

        <div className="experience__stages">
          <span className="experience__stages-progress" aria-hidden="true" />
          {STAGES.map((stage, index) => (
            <Stage
              key={stage.number}
              stage={stage}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div className="experience__layout">
          <div className="experience__intro">
            <div className="experience__intro-sticky">
              <h2 className="experience__heading">
                <HeadingLine delay={0}>Every step.</HeadingLine>
                <HeadingLine className="is-dim" delay={0.12}>
                  A little further.
                </HeadingLine>
              </h2>
              <motion.p
                className="experience__lead"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                custom={0.3}
              >
                Different products. Real constraints.
                <br />
                The same drive to make things better.
              </motion.p>

              <div className="experience__counter" aria-hidden="true">
                <div className="experience__counter-row">
                  <span className="experience__counter-num">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={active}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                      >
                        {pad(active + 1)}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="experience__counter-total">
                    / {pad(EXPERIENCE.length)}
                  </span>
                </div>
                <div className="experience__counter-place">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={current.place}
                      initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      exit={{ opacity: 0, filter: "blur(6px)", y: -8 }}
                      transition={{ duration: 0.35 }}
                    >
                      {current.place}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="experience__counter-dots">
                  {EXPERIENCE.map((item, i) => (
                    <span key={item.period} className={i === active ? "on" : ""} />
                  ))}
                </div>
              </div>

              <span className="experience__symbol" aria-hidden="true">
                &lt;/&gt;
              </span>
            </div>
          </div>

          <div className="experience__timeline">
            <div className="experience__line" aria-hidden="true">
              <div className="experience__line-progress" />
              {/* <span className="experience__marker" /> */}
            </div>
            <div className="experience__entries">
              {EXPERIENCE.map((item, index) => (
                <Entry
                  key={`${item.place}-${item.period}`}
                  item={item}
                  index={index}
                  active={index === active}
                  onActive={setActive}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
