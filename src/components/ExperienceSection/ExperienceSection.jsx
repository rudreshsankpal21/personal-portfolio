import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
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

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

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

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "bottom 70%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          ".experience__line-progress",
          { scaleY: 0 },
          { scaleY: 1, ease: "none" },
          0,
        )
        .fromTo(marker, { y: 0 }, { y: markerDistance, ease: "none" }, 0);
    },
    { scope: sectionRef },
  );

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="experience__inner">
        <motion.div
          className="experience__topline"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          custom={reduceMotion ? 0 : 0}
        >
          <span>04 / THE JOURNEY</span>
          <span>LEARNING BY DOING</span>
        </motion.div>
        <div className="experience__stages">
          {STAGES.map((stage, index) => (
            <motion.article
              className="experience__stage"
              key={stage.number}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={reduceMotion ? 0 : index * 0.12}
            >
              <span>{stage.number} /</span>
              <h3>{stage.title}</h3>
              <p>{stage.copy}</p>
            </motion.article>
          ))}
        </div>
        <div className="experience__layout">
          <motion.div
            className="experience__intro"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <h2 className="experience__heading">
              <span>Every step.</span>
              <span>A little further.</span>
            </h2>
            <p className="experience__lead">
              Different products. Real constraints.
              <br />
              The same drive to make things better.
            </p>
            <span className="experience__symbol" aria-hidden="true">
              &lt;/&gt;
            </span>
          </motion.div>
          <div className="experience__timeline">
            <div className="experience__line" aria-hidden="true">
              <div className="experience__line-progress" />
              <span className="experience__marker" />
            </div>
            <div className="experience__entries">
              {EXPERIENCE.map((item, index) => (
                <motion.article
                  className="experience__entry"
                  key={`${item.place}-${item.period}`}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : 42 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.65,
                    delay: reduceMotion ? 0 : index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="experience__node" aria-hidden="true" />
                  <div className="experience__period">
                    {item.period} {item.label && <b>{item.label}</b>}
                  </div>
                  <h3>{item.title}</h3>
                  <p className="experience__place">{item.place}</p>
                  <p className="experience__summary">{item.summary}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {index < EXPERIENCE.length - 1 && (
                    <span className="experience__entry-separator" />
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
