'use client';

import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import MakerScene from "./MakerScene";
import MakerStickers from "./MakerStickers";
import ExpandableImage from "./ExpandableImage";
import PortfolioMotion from "./PortfolioMotion";
import ProjectShowcase from "./ProjectShowcase";
import SfxLayer from "./SfxLayer";
import SplashExperience from "./SplashExperience";
import { portfolioContent as defaultContent } from "../lib/portfolio-data";

const iconMap = {
  GitHub: GithubLogo,
  LinkedIn: LinkedinLogo,
  X: XLogo,
  Mail: EnvelopeSimple,
};

function Marquee() {
  const items = ["software", "shaders", "hardware", "cinema", "games", "design", "wood", "food"];
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function toRem(value, fallback) {
  const numeric = Number(value);
  return `${Number.isFinite(numeric) ? numeric : fallback}rem`;
}

function getTypographyStyle(typography = {}) {
  return {
    "--font-size-hero-title-max": toRem(typography.heroTitle, 12.5),
    "--font-size-hero-subtitle-max": toRem(typography.heroSubtitle, 1.45),
    "--font-size-section-title-max": toRem(typography.sectionTitle, 8),
    "--font-size-story-title-max": toRem(typography.storyTitle, 3.2),
    "--font-size-body": toRem(typography.body, 1),
    "--font-size-project-title-max": toRem(typography.projectTitle, 3.4),
    "--font-size-skill-title-max": toRem(typography.skillTitle, 3.2),
    "--font-size-skill-item": toRem(typography.skillItem, 1),
    "--font-size-certificate-title-max": toRem(typography.certificateTitle, 3.2),
  };
}

function SocialRail({ socialLinks }) {
  return (
    <div className="social-rail" aria-label="Social links">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.label] || ArrowUpRight;
        return (
          <a
            href={link.href}
            key={link.label}
            aria-label={link.label}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            data-sfx="click"
            data-sfx-hover="hover"
          >
            <Icon size={22} weight="bold" />
          </a>
        );
      })}
    </div>
  );
}

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function CompanyMark({ item }) {
  if (item.companyHref) {
    return (
      <a className="company-link" href={item.companyHref} target="_blank" rel="noreferrer" data-sfx="click">
        {item.org} <ArrowUpRight size={16} weight="bold" />
      </a>
    );
  }

  return <strong>{item.org}</strong>;
}

const defaultContactCornerLines = [
  "catified",
  "fuwafuwa",
  "bring the PRD",
  "whism of whiff with a touch of whimsy",
  "ship the odd idea",
];

export default function PortfolioPage({ content = defaultContent }) {
  const {
    certificates = [],
    chapters = [],
    contactCornerLines = defaultContactCornerLines,
    experience = [],
    makerSignals = [],
    metrics = [],
    projects = [],
    resumeSourceUrl,
    skillStacks = [],
    socialLinks = [],
    typography = {},
  } = content;
  const finaleLines = Array.isArray(contactCornerLines) && contactCornerLines.length ? contactCornerLines : defaultContactCornerLines;
  const cornerLoop = [...finaleLines, ...finaleLines, ...finaleLines, ...finaleLines];

  return (
    <main style={getTypographyStyle(typography)}>
      <SfxLayer />
      <SplashExperience />
      <PortfolioMotion />

      <nav className="top-nav" aria-label="Primary">
        <a className="brand-mark" href="#top" data-sfx="click">
          <span>Debyte</span>
          <strong>Expo</strong>
        </a>
        <div className="nav-links">
          <a href="#story" data-sfx="click">
            Story
          </a>
          <a href="#projects" data-sfx="click">
            Builds
          </a>
          <a href="#experience" data-sfx="click">
            Experience
          </a>
          <a href="#proof" data-sfx="click">
            Proof
          </a>
          <a href="#contact" data-sfx="click">
            Contact
          </a>
        </div>
        <a className="nav-resume" href={resumeSourceUrl} target="_blank" rel="noreferrer" data-sfx="click">
          Resume <ArrowUpRight size={16} weight="bold" />
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy" data-reveal>
          <p className="hero-kicker">Ankit Chetri / Debyte404</p>
          <h1 className="hero-title" aria-label="Debyte Expo">
            <span className="word">Debyte</span>
            <span className="word">Expo</span>
          </h1>
          <p className="hero-subtitle">
            I build systems with a heart for whimsy, with a designer's eye and a shader-brained heart i can make websites, apps and architectures. the world lacks whimsy.
          </p>
          <div className="hero-actions">
            <a className="neo-button" href="#projects" data-sfx="click">
              View builds
            </a>
            <a className="neo-button neo-button-ghost" href={resumeSourceUrl} target="_blank" rel="noreferrer" data-sfx="click">
              Download Resume <ArrowUpRight size={18} weight="bold" />
            </a>
          </div>
          <SocialRail socialLinks={socialLinks} />
        </div>

        <div className="hero-stage" data-reveal>
          <MakerScene />
          <div className="profile-poster" data-float>
            <ExpandableImage
              src="/assets/profile.jpeg"
              alt="Edited profile portrait of Ankit Chetri"
              className="profile-poster-image"
              popoutLabel="Inspect profile portrait"
            />
            <div>
              <span>phone (2)</span>
              <strong>nothing 2</strong>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="metrics-strip" aria-label="Portfolio metrics">
        {metrics.map((metric) => (
          <div key={metric.label} data-reveal>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="section story-section" id="story">
        <div className="section-heading" data-reveal>
          <p>Maker lore</p>
          <h2>Sketchbook with a GPU attached.</h2>
        </div>
        <div className="story-grid">
          {chapters.map((chapter) => (
            <article key={chapter.title} className="story-card" data-reveal>
              <SectionLabel>{chapter.kicker}</SectionLabel>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
            </article>
          ))}
        </div>
        <MakerStickers items={makerSignals.slice(0, 6)} />
      </section>

      <ProjectShowcase projects={projects} />

      <section className="section stack-section">
        <div className="section-heading" data-reveal>
          <p>Workbench</p>
          <h2>Tools scattered on the table.</h2>
        </div>
        <div className="stack-grid">
          {skillStacks.map((stack, index) => (
            <div className="stack-column" key={stack.title || stack.items?.[0] || index} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stack.title}</h3>
              {stack.subtitle ? <p className="stack-subtitle">{stack.subtitle}</p> : null}
              {(stack.items || []).map((skill) => (
                <strong key={skill}>{skill}</strong>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="experience-copy" data-reveal>
          <p>Real work</p>
          <h2>Production gets its own table.</h2>
          <span>Roles where I shipped interfaces, debugged real product flows, and learned what survives outside the lab.</span>
        </div>
        <div className="timeline work-timeline">
          {experience.map((item) => (
            <article key={`${item.role}-${item.org}`} data-reveal>
              <SectionLabel>{item.period}</SectionLabel>
              <h3>{item.role}</h3>
              <CompanyMark item={item} />
              <p>{item.body}</p>
              {item.tech?.length ? (
                <div className="work-tech-tags" aria-label={`${item.role} tech stack`}>
                  {item.tech.map((tag) => (
                    <span key={`${item.role}-${tag}`}>{tag}</span>
                  ))}
                </div>
              ) : null}
              {item.certificate ? (
                <ExpandableImage
                  src={item.certificate}
                  alt={item.certificateTitle || `${item.role} certificate`}
                  className="work-certificate-button"
                  popoutLabel={`View ${item.certificateTitle || item.role} certificate`}
                >
                  <span>{item.certificateTitle || "View certificate"}</span>
                  <ArrowUpRight size={18} weight="bold" />
                </ExpandableImage>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section certificate-section" id="proof">
        <div className="certificate-copy" data-reveal>
          <p>Receipts wall</p>
          <h2>Hackathons, ranks, and proof slots.</h2>
          <span>Proof cards sized like the actual documents, with the useful context kept close to the image.</span>
        </div>
        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <article key={certificate.title} className="certificate-frame" data-reveal>
              {certificate.image ? (
                <ExpandableImage
                  src={certificate.image}
                  alt={`${certificate.title} certificate`}
                  loading="lazy"
                  popoutLabel={`Inspect ${certificate.title} certificate`}
                />
              ) : (
                <div className="empty-proof">
                  <span>{certificate.note}</span>
                </div>
              )}
              {certificate.subtitle ? (
                <div className="certificate-lip">
                  <span>{certificate.subtitle}</span>
                </div>
              ) : null}
              <h3>{certificate.title}</h3>
              {certificate.details ? (
                <div className="certificate-meta">
                  <span>{certificate.details}</span>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-corner-marquee" aria-hidden="true">
          <div className="contact-corner-track">
            {cornerLoop.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </div>
        </div>
        <div data-reveal>
          <p>Contact</p>
          <h2>Bring me something with whimsy.</h2>
        </div>
        <div className="contact-actions" data-reveal>
          <a className="neo-button" href="mailto:ankit.byte.404@gmail.com" data-sfx="click">
            Mail me
          </a>
          <a className="neo-button neo-button-ghost" href="https://github.com/Debyte404" target="_blank" rel="noreferrer" data-sfx="click">
            GitHub <ArrowUpRight size={18} weight="bold" />
          </a>
          <a className="neo-button neo-button-ghost" href={resumeSourceUrl} target="_blank" rel="noreferrer" data-sfx="click">
            Resume <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>
      </section>
    </main>
  );
}
