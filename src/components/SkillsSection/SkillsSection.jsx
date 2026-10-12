import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularCarousel from "../../carousel/CircularCarousel";
import "./SkillsSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TOOLKITS = [
  {
    title: "Frontend",
    description: "Interfaces that feel right.",
    icon: "&lt;/&gt;",
    items: [
      "React.js",
      "React-Native",
      "JavaScript (ES6+)",
      "HTML5 & CSS3",
      "Responsive design",
      "GSAP",
    ],
  },
  {
    title: "Backend",
    description: "Solid foundations. Seamless flow.",
    icon: "&gt;_",
    items: ["Node.js", "Express.js", "REST APIs", "Authentication", "JWT"],
  },
  {
    title: "Databases",
    description: "Data, thoughtfully structured.",
    icon: "▤",
    items: ["MongoDB", "Mongoose", "MySQL", "Basics of System Design"],
  },
  {
    title: "Tools & beyond",
    description: "The right tools for the craft.",
    icon: "▱",
    items: ["Git & GitHub", "Figma", "Postman", "Android Studio"],
  },
  {
    title: "Cloud & Deployment",
    description: "From local to global, effortlessly.",
    icon: "☁",
    items: [
      "Render",
      "Vercel",
      "Netlify",
      "VPS Hosting",
      "Play Store Publishing",
    ],
  },
];

const escapeXml = (text) =>
  text.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character],
  );

const createSkillCard = ({ title, description, icon, items }) => {
  const contentStart = Math.round((900 - (272 + items.length * 48)) / 2);
  const list = items
    .map(
      (item, index) =>
        `<text x="380" y="${contentStart + 260 + index * 42}" text-anchor="middle" class="item">•  ${escapeXml(item)}</text>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 980"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#181b24"/><stop offset="1" stop-color="#0b0c10"/></linearGradient></defs><rect width="760" height="980" rx="20" fill="url(#bg)"/><rect x="1" y="1" width="758" height="978" rx="19" fill="none" stroke="#314363"/><text x="380" y="${contentStart - 50}" text-anchor="middle" class="icon">${icon}</text><text x="680" y="${contentStart - 50}" class="arrow">↗</text><text x="380" y="${contentStart + 38}" text-anchor="middle" class="title">${escapeXml(title)}</text><text x="380" y="${contentStart + 100}" text-anchor="middle" class="description">${escapeXml(description)}</text><line x1="120" y1="${contentStart + 160}" x2="640" y2="${contentStart + 160}" stroke="#293040"/>${list}<text x="380" y="${contentStart + 180 + items.length * 52}" text-anchor="middle" class="footer"></text><style>.icon{fill:#4f91ff;font:52px monospace}.arrow{fill:#98a3b6;font:32px Arial}.title{fill:#f5f7fb;font:54px Georgia,serif}.description{fill:#9ca7b9;font:28px Arial,sans-serif}.item{fill:#c0c8d6;font:28px Arial,sans-serif}.footer{fill:#55729e;font:14px monospace;letter-spacing:3px}</style></svg>`;
  return {
    src: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    alt: `${title} skills`,
    title,
    subtitle: description,
  };
};

const CAROUSEL_ITEMS = TOOLKITS.map(createSkillCard);

export default function SkillsSection() {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return undefined;
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: ".toolkit", start: "top 74%", once: true },
        })
        .from(".toolkit__topline > *", {
          autoAlpha: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.12,
        })
        .from(
          ".toolkit__heading > span",
          { autoAlpha: 0, y: 40, duration: 0.65, stagger: 0.12 },
          "-=0.28",
        )
        .from(
          ".toolkit__intro-copy",
          { autoAlpha: 0, y: 20, duration: 0.5 },
          "-=0.45",
        )
        .from(
          ".toolkit__carousel",
          { autoAlpha: 0, y: 38, duration: 0.75 },
          "-=0.3",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section className="toolkit" id="skills" ref={sectionRef}>
      <div className="toolkit__inner">
        <div className="toolkit__topline">
          <span>THE SKILLSET</span>
          <span>CRAFT, NOT JUST A STACK</span>
        </div>
        <div className="toolkit__intro">
          <h2 className="toolkit__heading">
            <span>The tools behind</span>
            <span>the thinking.</span>
          </h2>
          <p className="toolkit__intro-copy">
            A versatile stack. One consistent goal.
            <br />
            Build things that work beautifully.
          </p>
        </div>
        <div className="toolkit__carousel">
          <CircularCarousel
            items={CAROUSEL_ITEMS}
            preset="orbit"
            intro="rise"
            cardWidth={460}
            aspectRatio={0.9}
            gap={40}
            autoplay="off"
            draggable
            snap
            momentum={0.72}
            depthFade={0.42}
            fadeColor="#0a0b10"
            cornerRadius={18}
            focusScale={2.15}
            captions
            className="toolkit__circular-carousel"
          />
        </div>
        <p className="toolkit__drag-hint">
          <span>←</span> DRAG TO EXPLORE <span>→</span>
        </p>
        <p className="toolkit__exploring">
          <i /> Currently exploring{" "}
          <b>Next.js, system design & AI-powered experiences</b>
        </p>
      </div>
    </section>
  );
}
