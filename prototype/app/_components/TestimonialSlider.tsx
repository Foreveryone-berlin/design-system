import ContentSlider from "./ContentSlider";

export default function TestimonialSlider({ items, label = "Testimonials" }: {
  items: { quote: string; attribution?: string }[];
  label?: string;
}) {
  return (
    <ContentSlider label={label} itemLabel="Testimonial" items={items.map((item) => ({
      id: item.quote,
      content: (
        <figure className="fe-testimonial fe-testimonial--quote">
          <span className="fe-testimonial__marks" aria-hidden="true">&ldquo;&rdquo;</span>
          <blockquote className="fe-testimonial__quote">&ldquo;{item.quote}&rdquo;</blockquote>
          {item.attribution && <figcaption className="fe-testimonial__attribution">{item.attribution}</figcaption>}
        </figure>
      ),
    }))} />
  );
}
