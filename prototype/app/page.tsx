import { hero as heroCopy } from "@/content/site-copy";
import packageJson from "@/package.json";
import Image from "next/image";
import Link from "next/link";
import HomeStory from "./_components/HomeStory";
import PhotoCredit from "./_components/PhotoCredit";
import HomeStats from "./_components/HomeStats";

export const metadata = {
  alternates: { canonical: "/" },
};

type OverviewCard = { href: string; title: string; desc: string; link: string };

const chapters: { title: string; cards: OverviewCard[] }[] = [
  {
    title: "Meet the brand",
    cards: [
      {
        href: "/brand",
        title: "About & Brand",
        desc: "Who we are, mission and vision, values, personality, and voice and tone.",
        link: "View about & brand",
      },
      {
        href: "/logo",
        title: "Logo",
        desc: "Logo variants, clear space, background combinations, and incorrect usage.",
        link: "View logo",
      },
      {
        href: "/guidelines",
        title: "Guidelines",
        desc: "Voice, content, and usage rules: how to combine colour, type, and illustration on-brand.",
        link: "View guidelines",
      },
    ],
  },
  {
    title: "Build with it",
    cards: [
      {
        href: "/foundations",
        title: "Foundations",
        desc: "Colour, typography, spacing, radius, and shadows: the visual foundation, as design tokens.",
        link: "View foundations",
      },
      {
        href: "/components",
        title: "Components",
        desc: "Buttons, inputs, cards, tags, accordion, and other interactive elements.",
        link: "View components",
      },
      {
        href: "/patterns",
        title: "Patterns",
        desc: "Header, footer, workshop cards, events, and composite layouts that combine tokens and components.",
        link: "View patterns",
      },
    ],
  },
  {
    title: "Use it well",
    cards: [
      {
        href: "/accessibility",
        title: "Accessibility",
        desc: "Our commitment, conformance target, what is built in, and how we test for an inclusive experience.",
        link: "View accessibility",
      },
      {
        href: "/agent-skills",
        title: "Agent skills",
        desc: "Installable guides for AI agents: core rules, tokens, components, accessibility, redesign, and OG images.",
        link: "View agent skills",
      },
      {
        href: "/governance",
        title: "Governance",
        desc: "Versioning, contribution, and the changelog: how the system evolves and stays consistent.",
        link: "View governance",
      },
    ],
  },
];

export default function Home() {
  const version = packageJson.version;
  const [headlineFirst, ...headlineRest] = heroCopy.headline.split(" ");

  return (
    <>
      <section className="ds-hero-with-image ds-home-hero">
        <div>
          <div className="ds-headline-with-underline">
            <h1 className="ds-hero-title">
              {headlineFirst}
              <br />
              {headlineRest.join(" ")}
            </h1>
            <span className="ds-headline-underline" aria-hidden="true">
              <span className="ds-headline-underline__mark" />
            </span>
          </div>
          <span className="ds-hero-version">v{version}</span>
          <p className="ds-intro">{heroCopy.tagline}</p>
          <HomeStats />
        </div>
        <div className="ds-home-hero-photo">
          <div className="ds-hero-image-wrap">
            <Image
              src="/images/hero-cafe.jpg"
              alt="Five friends sitting around a wooden table talking over coffee."
              width={1090}
              height={1094}
              preload
              sizes="(max-width: 1024px) 100vw, 24rem"
            />
          </div>
          <PhotoCredit />
        </div>
      </section>

      <HomeStory />

      <section className="ds-section" aria-labelledby="explore-heading">
        <h2 id="explore-heading" className="ds-home-heading">
          Explore the system
        </h2>
        {chapters.map((chapter) => (
          <div className="ds-chapter" key={chapter.title}>
            <h3 className="ds-chapter__title">{chapter.title}</h3>
            <div className="ds-overview-grid">
              {chapter.cards.map((card) => (
                <Link key={card.href} href={card.href} className="ds-overview-card">
                  <h4 className="ds-overview-card__title">{card.title}</h4>
                  <p className="ds-overview-card__desc">{card.desc}</p>
                  <span className="ds-overview-card__link">
                    {card.link} &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
