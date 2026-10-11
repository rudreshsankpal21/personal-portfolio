import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./AboutSection.css";

gsap.registerPlugin(useGSAP);

const STATS = [
  { value: "8", suffix: "+", label: "Projects brought to life" },
  { value: "2", suffix: "+", label: "Years of building" },
  { value: "15", suffix: "+", label: "Technologies explored" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-section__inner">
        <div className="about-section__topline">
          <span className="about-section__eyebrow">ABOUT</span>
          <span className="about-section__context">A LITTLE CONTEXT</span>
        </div>

        <div className="about-section__story">
          <div className="about-section__intro">
            <h2 className="about-section__headline">
              <span>More than code.</span>
              <span>A curious mind.</span>
            </h2>
            <div className="about-section__principles">
              <p>Code with purpose.</p>
              <p>Design with intent.</p>
              <span aria-hidden="true">↗</span>
            </div>
          </div>

          <div className="about-section__details">
            <p className="about-section__manifesto">
              I&apos;m Rudresh, a full-stack developer who cares as much about
              how a product <em>feels</em> as how it works.
            </p>
            <div className="about-section__copy">
              <p>
                I connect thoughtful design with reliable engineering to build
                intuitive, accessible web experiences. From the first sketch to
                the final API endpoint, I love bringing the whole picture
                together.
              </p>
              <p>
                Currently exploring scalable systems, creative interfaces, and
                the small details that make good products great. Always
                learning. Always building.
              </p>
            </div>
            <a className="about-section__journey" href="#experience">
              The journey so far <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="about-section__stats">
          {STATS.map((stat) => (
            <div className="about-section__stat" key={stat.label}>
              <p className="about-section__stat-value">
                {stat.value}
                <span>{stat.suffix}</span>
              </p>
              <p className="about-section__stat-label">{stat.label}</p>
            </div>
          ))}
          <div className="about-section__signature">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 18-6-6 6-6M15 6l6 6-6 6M14 4l-4 16" />
            </svg>
            <p>
              Endlessly curious.
              <br />
              Intentionally creative.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
