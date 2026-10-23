import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "../../data/socialLinks";
import "./ContactSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 19c-4 1.2-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-.8-2.3c2.8-.3 5.8-1.4 5.8-6.2A4.8 4.8 0 0 0 18.7 4.6 4.5 4.5 0 0 0 18.6 1S17.4.7 15 2.3a12 12 0 0 0-6 0C6.6.7 5.4 1 5.4 1a4.5 4.5 0 0 0-.1 3.6A4.8 4.8 0 0 0 4 8c0 4.8 3 5.9 5.8 6.2A3 3 0 0 0 9 16.5V22" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 11v5M8 8v.01M12 16v-5m0-2.5a2.5 2.5 0 0 1 5 0V16" />
  </svg>
);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return undefined;
      gsap.to(".contact__spark", {
        rotation: 360,
        duration: 14,
        repeat: -1,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact",
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play pause resume pause",
        },
      });
    },
    { scope: sectionRef },
  );

  const updateField = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const startConversation = (event) => {
    event.preventDefault();
    const subject = `Portfolio enquiry from ${form.name || "a visitor"}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact__inner">
        <motion.div
          className="contact__topline"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <span>05 / SAY HELLO</span>
          <span>THE NEXT GREAT THING STARTS HERE</span>
        </motion.div>
        <div className="contact__layout">
          <motion.div
            className="contact__intro"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="contact__availability">
              <i /> OPEN TO WHAT&apos;S NEXT
            </p>
            <h2>
              Have something
              <br />
              in <em>mind?</em>
            </h2>
            <span className="contact__spark" aria-hidden="true">
              ✳
            </span>
            <p className="contact__copy">
              A project, an opportunity, or just a good conversation.
              <br />
              I&apos;d love to hear from you.
            </p>
            <a className="contact__email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
              <span>↗</span>
            </a>
            <div className="contact__socials">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub <span>↗</span>
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon /> LinkedIn <span>↗</span>
              </a>
            </div>
          </motion.div>
          <motion.form
            className="contact__form"
            onSubmit={startConversation}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            custom={reduceMotion ? 0 : 0.14}
          >
            <label>
              Your name
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Your name"
              />
            </label>
            <label>
              Your email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="Your email"
                required
              />
            </label>
            <label className="contact__message">
              What&apos;s on your mind?
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="Tell me a little about your idea..."
                required
              />
            </label>
            <button type="submit">
              Let&apos;s start a conversation <span>↗</span>
            </button>
            <p>Opens your email app with a ready-to-send draft.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
