import type { ReactNode } from "react";
import styles from "./patterns.module.css";

export default function PatternSection({ id, title, description, children }: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`ds-section ${styles.pattern}`} data-pattern-preview>
      <h3 className="ds-subsection-title">{title}</h3>
      <p className={styles.description}>{description}</p>
      {children}
    </section>
  );
}
