import { CONTACT_EMAIL, SOCIAL_LINKS } from "../../data/socialLinks";
import "./SiteFooter.css";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a href="#home" className="site-footer__brand">rudresh<span>.</span></a>
        <p>© 2026 Rudresh Sankpal <i /> Crafted with care &amp; a little caffeine.</p>
        <div className="site-footer__links"><a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">GitHub</a><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${CONTACT_EMAIL}`}>Email</a><a href="#home">BACK TO TOP <span>↗</span></a></div>
      </div>
    </footer>
  );
}
