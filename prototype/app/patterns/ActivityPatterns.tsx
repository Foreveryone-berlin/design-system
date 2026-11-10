import PatternSection from "./PatternSection";
import styles from "./patterns.module.css";

export default function ActivityPatterns() {
  return (
    <PatternSection id="evening-agenda" title="Evening agenda"
      description="Use for the flow within one visit. Unlike the week-by-week progression, this is a compact sequence without invented timings.">
      <ol className={styles.agenda}>
        {[
          ["Arrive", "Meet the group and settle in."],
          ["Explore", "See a technique and try it yourself."],
          ["Make", "Work at your own pace, with support nearby."],
          ["Wrap up", "Share what you made and hear what happens next."],
        ].map(([title, text], i) => (
          <li className={styles.card} key={title}><span className={styles.number}>{i + 1}</span><h4>{title}</h4><p>{text}</p></li>
        ))}
      </ol>
    </PatternSection>
  );
}
