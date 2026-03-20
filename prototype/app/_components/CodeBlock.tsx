"use client";

import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-tomorrow.css";

export default function CodeBlock({
  code,
  language = "css",
}: {
  code: string;
  language?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code]);

  return (
    <pre className="ds-code-block">
      <code ref={ref} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
}
