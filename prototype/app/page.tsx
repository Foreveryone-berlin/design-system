import {
  hero as heroCopy,
  mission as missionCopy,
  stats as statsCopy,
  designSystemIntro,
} from "@/content/site-copy";
import packageJson from "@/package.json";
import Link from "next/link";

export default function Home() {
  const version = packageJson.version;

  return (
    <>
      <section className="ds-hero-with-image">
        <div>
          <h1 className="ds-hero-title">
            {heroCopy.headline.split(" ")[0]}
            <br />
            <span className="ds-hero-accent">
              {heroCopy.headline.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <span className="ds-hero-version">v{version}</span>
          <p className="ds-intro">{heroCopy.tagline}</p>
        </div>
        <div className="ds-hero-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/community-cafe.png"
            alt="Three people sit and chat at a wooden table in the ForEveryone community café, lit by afternoon sun."
            width={1090}
            height={1094}
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
            <p className="ds-stat-value">{stat.value}</p>
            <p className="ds-stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Explore the system</h2>
        <div className="ds-overview-grid">
          <Link href="/tokens" className="ds-overview-card">
            <h3 className="ds-overview-card__title">Tokens</h3>
            <p className="ds-overview-card__desc">
              Colors, typography, spacing, radius, shadows, and motion — the
              visual foundation.
            </p>
            <span className="ds-overview-card__link">View tokens &rarr;</span>
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
              Header, footer, workshop cards, and composite layouts that combine
              tokens and components.
            </p>
            <span className="ds-overview-card__link">View patterns &rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
