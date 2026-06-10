"use client";

import { useEffect, useRef, useState } from "react";
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
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code]);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); leave state unchanged.
    }
  }

  return (
    <div className="ds-code-block-wrap">
      <button
        type="button"
        className="ds-code-copy"
        onClick={copy}
        aria-label={copied ? "Code copied" : "Copy code"}
      >
        <span aria-hidden="true">
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </span>
        <span className="ds-code-copy__label">{copied ? "Copied" : "Copy"}</span>
      </button>
      <pre
        className={`ds-code-block language-${language}`}
        tabIndex={0}
        role="region"
        aria-label={`${language} code sample`}
      >
        <code ref={ref} className={`language-${language}`}>
          {code}
        </code>
      </pre>
      <span aria-live="polite" className="ds-visually-hidden">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
