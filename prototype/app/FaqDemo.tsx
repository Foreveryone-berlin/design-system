"use client";

import { useState } from "react";

const faqItems = [
  {
    id: "faq-1",
    question: "Do I need experience to attend a workshop?",
    answer:
      "Absolutely not! All our workshops are designed to be beginner-friendly. We invite everyone to just be in the moment and experience without any expectations.",
  },
  {
    id: "faq-2",
    question: "How do I book a spot?",
    answer:
      "Use the Book Now button on any workshop card. You'll receive a confirmation email with details.",
  },
  {
    id: "faq-3",
    question: "Where are workshops held?",
    answer:
      "Most workshops take place at Boxhagener Platz, 10245 Berlin. The exact address is in your booking confirmation.",
  },
];

export default function FaqDemo() {
  const [activeId, setActiveId] = useState<string | null>("faq-1");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-2)",
      }}
    >
      {faqItems.map((item) => (
        <div
          key={item.id}
          className={`fe-faq-item${activeId === item.id ? " is-active" : ""}`}
        >
          <button
            type="button"
            className="fe-faq-item__trigger"
            onClick={() => setActiveId(activeId === item.id ? null : item.id)}
            aria-expanded={activeId === item.id}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-trigger`}
          >
            {item.question}
            <span aria-hidden>{activeId === item.id ? "−" : "+"}</span>
          </button>
          <div
            id={`${item.id}-content`}
            className="fe-faq-item__content-wrapper"
            role="region"
            aria-labelledby={`${item.id}-trigger`}
            inert={activeId !== item.id}
          >
            <div className="fe-faq-item__content">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
