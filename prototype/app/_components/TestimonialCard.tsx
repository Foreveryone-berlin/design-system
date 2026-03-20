const testimonials = [
  {
    quote:
      "Roxana from For Everyone ran a workshop for our team at Give Something Back to Berlin and it was great! We had the space to express ourselves freely and create authentic bonds as a team. Roxana facilitated the conversation that led to exploring our strength in collaborating with each other and establishing a self support system within the organisation. I fully recommend Roxana as a facilitator and workshop leader. You\u2019d benefit a lot from her expertise!",
    attribution: "Workshop member from the NGO Hejmo",
  },
  {
    quote:
      "The pottery workshop was the most relaxing afternoon I\u2019ve had in Berlin. I came alone and left with three new friends and a wonky mug I absolutely love.",
    attribution: "Sarah M. \u2014 Workshop Participant",
  },
  {
    quote:
      "As someone new to Berlin, ForEveryone gave me a community before I even had furniture. The cooking events are my favourite \u2014 real people, real conversations, real food.",
    attribution: "Tom\u00e1s R. \u2014 Regular Attendee",
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
