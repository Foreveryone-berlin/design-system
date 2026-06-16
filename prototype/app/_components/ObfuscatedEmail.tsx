"use client";

import { useEffect, useRef } from "react";

// Reversed-hex of the contact address; decoded client-side so the plaintext
// never appears in the served HTML (resists email harvesting). To regenerate:
//   node -e "console.log(Buffer.from([...'addr'].reverse().join('')).toString('hex'))"
const HEX = "6e696c7265622e656e6f7972657665726f66406f6c6c6568";

export default function ObfuscatedEmail() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const email =
      HEX.match(/.{1,2}/g)
        ?.map((h) => String.fromCharCode(parseInt(h, 16)))
        .reverse()
        .join("") ?? "";
    const link = ref.current;
    if (!email || !link) return;
    link.href = `mailto:${email}`;
    link.textContent = email;
  }, []);

  return (
    <span
      className="fe-body"
      style={{ margin: 0, fontSize: "var(--font-size-sm)" }}
    >
      {/* aria-label gives the link an accessible name before JS fills the
          obfuscated address, so it satisfies link-name without exposing the
          plaintext email in the served HTML. */}
      <a ref={ref} className="fe-nav-link" href="#" aria-label="Email us" />
      <noscript>hello[at]foreveryone[dot]berlin</noscript>
    </span>
  );
}
