import {
  hero as heroCopy,
  mission as missionCopy,
  stats as statsCopy,
  designSystemIntro,
} from "@/content/site-copy";
import packageJson from "@/package.json";
import Image from "next/image";
import Link from "next/link";
import StatCounter from "./_components/StatCounter";

export default function Home() {
  const version = packageJson.version;

  return (
    <>
      <section className="ds-hero-with-image">
        <div>
          <h1 className="ds-hero-title">
            {heroCopy.headline.split(" ")[0]}
            <br />
            {heroCopy.headline.split(" ").slice(1).join(" ")}
          </h1>
          <img
            src="/illustrations/headline-underline.svg"
            alt=""
            aria-hidden="true"
            className="ds-headline-underline"
          />
          <span className="ds-hero-version">v{version}</span>
          <p className="ds-intro">{heroCopy.tagline}</p>
        </div>
        <div className="ds-hero-image-wrap">
          <Image
            src="/images/community-cafe.png"
            alt="Three people sit and chat at a wooden table in the ForEveryone community cafe, lit by afternoon sun."
            width={1090}
            height={1094}
            priority
            sizes="(max-width: 1024px) 100vw, 320px"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>

      <p className="ds-intro">{designSystemIntro}</p>

      <section className="ds-section" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="ds-section-title">
          {missionCopy.title}
        </h2>
        <p className="fe-body">{missionCopy.bodyLine1}</p>
        <p className="fe-body">{missionCopy.bodyLine2}</p>
      </section>

      <section className="ds-stats" aria-label="Design system at a glance">
        {statsCopy.map((stat) => (
          <div key={stat.label} className="ds-stat">
            <p className="ds-stat-value">
              <StatCounter value={stat.value} />
            </p>
            <p className="ds-stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Explore the system</h2>
        <div className="ds-overview-grid">
          <Link href="/foundations" className="ds-overview-card">
            <h3 className="ds-overview-card__title">Foundations</h3>
            <p className="ds-overview-card__desc">
              Colour, typography, spacing, radius, and shadows: the visual
              foundation, as design tokens.
            </p>
            <span className="ds-overview-card__link">
              View foundations &rarr;
            </span>
          </Link>
          <Link href="/components" className="ds-overview-card">
            <h3 className="ds-overview-card__title">Components</h3>
            <p className="ds-overview-card__desc">
              Buttons, inputs, cards, tags, accordion, and other interactive
              elements.
            </p>
            <span className="ds-overview-card__link">
              View components &rarr;
            </span>
          </Link>
          <Link href="/patterns" className="ds-overview-card">
            <h3 className="ds-overview-card__title">Patterns</h3>
            <p className="ds-overview-card__desc">
              Header, footer, workshop cards, events, and composite layouts that
              combine tokens and components.
            </p>
            <span className="ds-overview-card__link">View patterns &rarr;</span>
          </Link>
          <Link href="/guidelines" className="ds-overview-card">
            <h3 className="ds-overview-card__title">Guidelines</h3>
            <p className="ds-overview-card__desc">
              Voice, content, and usage rules: how to combine colour, type, and
              illustration on-brand.
            </p>
            <span className="ds-overview-card__link">View guidelines &rarr;</span>
          </Link>
          <Link href="/governance" className="ds-overview-card">
            <h3 className="ds-overview-card__title">Governance</h3>
            <p className="ds-overview-card__desc">
              Versioning, contribution, and the changelog: how the system
              evolves and stays consistent.
            </p>
            <span className="ds-overview-card__link">View governance &rarr;</span>
          </Link>
          <Link href="/accessibility" className="ds-overview-card">
            <h3 className="ds-overview-card__title">Accessibility</h3>
            <p className="ds-overview-card__desc">
              Our commitment, conformance target, what is built in, and how we
              test for an inclusive experience.
            </p>
            <span className="ds-overview-card__link">
              View accessibility &rarr;
            </span>
          </Link>
          <Link href="/credits" className="ds-overview-card">
            <h3 className="ds-overview-card__title">Credits</h3>
            <p className="ds-overview-card__desc">
              The people, tools, and licences behind the ForEveryone design
              system.
            </p>
            <span className="ds-overview-card__link">View credits &rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
