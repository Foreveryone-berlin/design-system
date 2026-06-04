const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel sapien a nulla fermentum tincidunt. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.",
    attribution: "Jane Doe, Placeholder Role",
  },
  {
    quote:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    attribution: "John Smith, Placeholder Role",
  },
  {
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    attribution: "Alex Johnson, Placeholder Role",
  },
];

export default function TestimonialCard() {
  return (
    <div className="fe-testimonial-grid">
      {testimonials.map((t) => (
        <figure key={t.attribution} className="fe-testimonial">
          <span className="fe-testimonial__marks" aria-hidden="true">
            &ldquo;&rdquo;
          </span>
          <blockquote className="fe-testimonial__quote">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="fe-testimonial__attribution">
            {t.attribution}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
