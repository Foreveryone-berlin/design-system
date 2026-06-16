"use client";

import { useState } from "react";

// Live motion demos. Each specimen runs at a real --transition-* token so the
// page documents the actual feel, not a description of it. The hover demos are
// CSS-only; the timed demos toggle a class on a Replay press. Everything sits
// under the global prefers-reduced-motion guard in globals.css.
export default function MotionSpecimens() {
  // A single nonce re-mounts the timed specimens so the animation replays.
  const [nonce, setNonce] = useState(0);

  return (
    <div className="ds-motion-specimens">
      <div className="ds-motion-demo">
        <span className="ds-motion-demo__caption">
          Hover-lift · <code className="ds-code">base</code> (250ms)
        </span>
        <div className="ds-motion-demo__stage">
          <div className="ds-motion-card" tabIndex={0}>
            Hover or focus me
          </div>
        </div>
      </div>

      <div className="ds-motion-demo">
        <span className="ds-motion-demo__caption">
          Colour swap · <code className="ds-code">fast</code> (150ms)
        </span>
        <div className="ds-motion-demo__stage">
          <button type="button" className="fe-btn-primary">
            Hover me
          </button>
        </div>
      </div>

      <div className="ds-motion-demo">
        <div className="ds-motion-demo__header">
          <span className="ds-motion-demo__caption">
            Fade &amp; rise · <code className="ds-code">slow</code> (400ms)
          </span>
          <button
            type="button"
            className="ds-motion-replay"
            onClick={() => setNonce((n) => n + 1)}
          >
            Replay
          </button>
        </div>
        <div className="ds-motion-demo__stage">
          <div key={nonce} className="ds-motion-rise">
            Mounted content
          </div>
        </div>
      </div>
    </div>
  );
}
