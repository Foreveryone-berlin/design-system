"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Prism from "prismjs";
import "prismjs/components/prism-css";
import FeIcon from "./FeIcon";

export default function CodeBlock({
  code,
  language = "css",
}: {
  code: string;
  language?: string;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = code;
    Prism.highlightElement(el);
  }, [code, pathname]);

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
        aria-label="Copy code"
      >
        <span aria-hidden="true">
          {copied ? (
            <FeIcon set="ui" name="check" size="sm" />
          ) : (
            <FeIcon set="ui" name="copy" size="sm" />
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
        <code ref={ref} className={`language-${language}`} />
      </pre>
      <span aria-live="polite" className="ds-visually-hidden">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
