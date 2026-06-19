import StatCounter from "../_components/StatCounter";

export const metadata = {
  title: "About & Brand",
  description:
    "Who ForEveryone is, our brand personality, and how we sound: voice, tone by context, and naming rules from the Brand Book.",
};

const stats = [
  { value: "3,000+", label: "real connections made since 2022" },
  { value: "200+", label: "monthly participants as of 2026" },
  { value: "12+", label: "workshops & events per month" },
  { value: "100+", label: "volunteers active as of 2026" },
];

const values = [
  {
    title: "Community & Belonging",
    body: "We foster environments where everyone feels seen, valued, and connected.",
  },
  {
    title: "Inclusion & Diversity",
    body: "We celebrate differences and ensure people of all backgrounds and identities are embraced.",
  },
  {
    title: "Wellbeing",
    body: "We nurture emotional resilience and create spaces where people can recharge and flourish.",
  },
  {
    title: "Empowerment",
    body: "We encourage individuals to explore their creativity, build confidence, and realise their potential.",
  },
  {
    title: "Creativity",
    body: "We champion art, music, and movement as powerful tools for expression, connection, and growth.",
  },
  {
    title: "Accessibility",
    body: "We remove financial and practical barriers so cost is never a reason to stay away, and everyone can take part.",
  },
];

const weAre = [
  "Inclusive",
  "Warm",
  "Empowering",
  "Collaborative",
  "Conversational",
  "Expert but approachable",
  "Authentic",
  "Supportive",
  "Optimistic",
];

const weAreNot = ["Fake", "Forceful", "Smug", "Corporate", "Preachy", "Detached"];

const voiceTraits = [
  "Lightly Playful",
  "Empowering",
  "Welcoming",
  "Authentic",
  "Emotionally Engaging",
];

const copyPairs = [
  {
    context: "Workshop invite",
    use: "Never drawn before? No problem! No experience needed, just come as you are and enjoy the moment with new faces!",
    avoid:
      "This workshop is suitable for all skill levels, including those with no prior drawing experience. Attendees are encouraged to participate regardless of their background.",
  },
  {
    context: "Volunteer call",
    use: "We're looking for people who want to help build something real. No experience needed, just a bit of time and a lot of heart.",
    avoid:
      "We are currently seeking motivated individuals to join our volunteer programme and contribute to our organisational objectives.",
  },
  {
    context: "Impact update",
    use: "We've welcomed over 200 people through our doors every month this year, and most of them come back. That's the kind of community we're building, one cup of coffee and one workshop at a time.",
    avoid:
      "Our organisation has achieved a monthly engagement rate of 200+ participants, demonstrating strong retention metrics and programme efficacy across our service offerings.",
  },
];

const toneByContext = [
  { context: "Workshop invites", tone: "Warm, playful, low-pressure" },
  { context: "Social media", tone: "Conversational, energetic, brief" },
  {
    context: "Donor or partner communications",
    tone: "Warm but measured, evidence-led",
  },
  {
    context: "Event announcements",
    tone: "Excited, welcoming, action-oriented",
  },
  { context: "Community updates", tone: "Honest, direct, personal" },
];

export default function BrandPage() {
  return (
    <>
      <h1 className="ds-page-title">About &amp; Brand</h1>
      <p className="ds-intro">
        Who ForEveryone is, how we show up, and how we sound. This is the digital,
        always-current home of the Brand Book&rsquo;s introduction, personality,
        and voice sections. Source of truth: the{" "}
        <a href="https://github.com/Foreveryone-berlin/design-system/blob/main/docs/brand-book-references.md">
          ForEveryone Brand Book v1.0
        </a>
        .
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Who we are</h2>
        <p className="fe-body">
          ForEveryone is a volunteer-run, community-focused NGO in the heart of
          Berlin. Founded in 2022, we started with a straightforward belief: that
          joy, belonging, and resilience through creative connection should be
          open to everyone.
        </p>
        <p className="fe-body">
          We build places and programmes where Berliners of all backgrounds,
          locals and internationals alike, can find belonging, form real
          friendships, and step into civic life. We are building the Berlin we
          want to see: creative, inclusive, engaged, and kind.
        </p>
      </section>

      <section className="ds-stats" aria-label="ForEveryone in numbers">
        {stats.map((stat) => (
          <div key={stat.label} className="ds-stat">
            <p className="ds-stat-value">
              <StatCounter value={stat.value} />
            </p>
            <p className="ds-stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Mission &amp; vision</h2>
        <div className="ds-mv-grid">
          <div className="ds-mv-card">
            <p className="ds-mv-card__label">Our mission</p>
            <p className="fe-body">
              To build a web of places and programmes across Berlin where people
              from all backgrounds can find belonging, build real friendships, and
              discover their place in the city.
            </p>
          </div>
          <div className="ds-mv-card">
            <p className="ds-mv-card__label">Our vision</p>
            <p className="fe-body">
              A diverse and resilient Berlin where everyone, regardless of
              background or identity, feels at home, plays an active role in
              community life, and has the freedom to grow and belong.
            </p>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Our values</h2>
        <div className="ds-value-grid">
          {values.map((value) => (
            <div key={value.title} className="ds-value-card">
              <p className="ds-value-card__title">{value.title}</p>
              <p className="ds-value-card__body">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Brand personality</h2>
        <p className="fe-body">
          ForEveryone acts as a friendly, creative host: welcoming people in,
          helping them feel at ease, and giving them the confidence to participate
          fully. Every word we write and every design we produce should feel like
          it came from a person who genuinely wants you there.
        </p>
        <div className="ds-personality">
          <div className="ds-personality__col ds-personality__col--are">
            <p className="ds-personality__label">We are</p>
            <ul className="ds-chip-grid ds-chip-grid--list">
              {weAre.map((trait) => (
                <li key={trait} className="ds-chip">
                  {trait}
                </li>
              ))}
            </ul>
          </div>
          <div className="ds-personality__col ds-personality__col--not">
            <p className="ds-personality__label">We are not</p>
            <ul className="ds-chip-grid ds-chip-grid--list">
              {weAreNot.map((trait) => (
                <li key={trait} className="ds-chip ds-chip--negative">
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Voice &amp; tone</h2>
        <p className="fe-body">
          Our voice is consistent across everything we publish. We write in plain,
          everyday language that feels personal and is easy to understand. We
          avoid jargon, buzzwords, and anything that sounds corporate or distant.
          These five qualities describe how our personality comes through in
          written copy.
        </p>
        <ul className="ds-chip-grid ds-chip-grid--list ds-voice-traits">
          {voiceTraits.map((trait) => (
            <li key={trait} className="ds-chip ds-chip--voice">
              {trait}
            </li>
          ))}
        </ul>

        <h3 className="ds-subsection-title">In practice</h3>
        <p className="fe-body">
          Hover or focus each example to see the difference between how we write
          and how we avoid writing.
        </p>
        <div className="ds-voice-pairs">
          {copyPairs.map((pair) => (
            <div key={pair.context} className="ds-voice-pair" tabIndex={0}>
              <p className="ds-voice-pair__context">{pair.context}</p>
              <p className="ds-voice-pair__use">
                <span className="ds-voice-pair__tag ds-voice-pair__tag--use">
                  Use
                </span>
                {pair.use}
              </p>
              <p className="ds-voice-pair__avoid">
                <span className="ds-voice-pair__tag ds-voice-pair__tag--avoid">
                  Avoid
                </span>
                {pair.avoid}
              </p>
            </div>
          ))}
        </div>

        <h3 className="ds-subsection-title">How tone shifts by context</h3>
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th scope="col">Context</th>
                <th scope="col">Tone</th>
              </tr>
            </thead>
            <tbody>
              {toneByContext.map((row) => (
                <tr key={row.context}>
                  <th scope="row">{row.context}</th>
                  <td>{row.tone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">How to represent us</h2>

        <h3 className="ds-subsection-title">Our brand name</h3>
        <p className="fe-body">
          Always write <strong>ForEveryone</strong> as one word, with a capital F
          and capital E, and no space. This applies to every platform, material,
          and context without exception. Legal name{" "}
          <strong>ForEveryone Civic gGmbH</strong> is for legal and formal
          documents only.
        </p>
        <p className="fe-body">
          <strong>Incorrect:</strong> For Everyone &middot; for everyone &middot;
          Foreveryone &middot; FOREVERYONE
        </p>

        <h3 className="ds-subsection-title">Our cafe</h3>
        <p className="fe-body">
          Always write <strong>No. 52 Cafe</strong> or <strong>No. 52</strong> for
          short. Cafe is spelled <strong>without an accent</strong>, and there is a
          space between &lsquo;No.&rsquo; and &lsquo;52&rsquo;.
        </p>
        <p className="fe-body">
          <strong>Incorrect:</strong> No.52 Caf&eacute; &middot; No52 &middot;
          No.52 &middot; Pavillon Caf&eacute; &middot; KARUNA Pavillon
        </p>

        <h3 className="ds-subsection-title">Social media &amp; digital</h3>
        <ul className="ds-rule-list">
          <li>
            <strong>Handle:</strong> @foreveryone.berlin
          </li>
          <li>
            <strong>Hashtags:</strong> #ForEveryone &middot; #ForEveryoneBerlin
          </li>
          <li>
            <strong>Website:</strong> foreveryone.berlin
          </li>
        </ul>

        <h3 className="ds-subsection-title">Spelling standard</h3>
        <p className="fe-body">
          We use <strong>UK English</strong> across all communications. When in
          doubt, refer to the Oxford English Dictionary. Examples: colour,
          organisation, programme, realise, recognise.
        </p>
      </section>
    </>
  );
}
