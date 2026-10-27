"use client";

import { useId, useState } from "react";
import Image from "next/image";
import FeIcon from "./FeIcon";
import { BLOB_PROFILES, WAVE_PROFILES } from "./shape-assets";
import styles from "./ShapeExamples.module.css";

export default function ShapeExamples({ mode }: { mode: "mask" | "wave" }) {
  const id = useId();
  const [blob, setBlob] = useState("4");
  const [wave, setWave] = useState<string>(WAVE_PROFILES[0].file);
  const [mirrored, setMirrored] = useState(false);
  const source = mode === "mask"
    ? `/illustrations/blobs/blob-${blob}.svg`
    : `/illustrations/waves/${wave}.svg`;

  return (
    <div className={styles.example}>
      <div className={styles.controls}>
        <label htmlFor={id}>{mode === "mask" ? "Photo mask" : "Wave profile"}</label>
        <div className="fe-select">
          <select id={id} className="fe-input" value={mode === "mask" ? blob : wave}
          onChange={(event) => mode === "mask" ? setBlob(event.target.value) : setWave(event.target.value)}>
          {mode === "mask"
            ? BLOB_PROFILES.map((n) => <option key={n} value={n}>Blob {n}</option>)
            : WAVE_PROFILES.map((profile) => <option key={profile.file} value={profile.file}>{profile.label}</option>)}
          </select>
          <FeIcon set="ui" name="chevron-down" size="sm" className="fe-select__icon" />
        </div>
        {mode === "wave" && <label className={styles.checkbox}>
          <input type="checkbox" checked={mirrored} onChange={(event) => setMirrored(event.target.checked)} />
          Mirror horizontally
        </label>}
        <code className={styles.path}>{source}</code>
        <a href={source} download>Download selected SVG</a>
      </div>
      {mode === "mask" ? (
        <div className={styles.photoStage}>
          <div className={styles.photo} style={{ maskImage: `url(${source})`, WebkitMaskImage: `url(${source})` }}>
            <Image src="/images/hero-cafe.jpg" alt="Friends talking over coffee, cropped inside the selected organic mask." width={1090} height={1094} sizes="(max-width: 640px) 100vw, 400px" />
          </div>
        </div>
      ) : (
        <div className={`${styles.waveStage} ${wave === "wave-soft" ? styles.filledTop : ""}`}>
          <div className={styles.before}>Previous section</div>
          <div className={styles.top} aria-hidden="true"><img src={source} alt="" className={mirrored ? styles.mirrored : undefined} /></div>
          <div className={styles.content}><strong>Section content</strong><span>One profile, two edges.</span></div>
          <div className={styles.bottom} aria-hidden="true"><img src={source} alt="" className={mirrored ? styles.mirrored : undefined} /></div>
          <div className={styles.after}>Next section</div>
        </div>
      )}
    </div>
  );
}
