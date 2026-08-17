import type { ReactNode } from "react";

/**
 * Turns a whole specimen into the download control for the asset it renders, so
 * a dense catalog gains no extra link row per item: the `SVG ↓` marker sits next
 * to the name and takes the label's own colour rather than link blue.
 *
 * Downloads the file the page just rendered, so the saved bytes are always real
 * SVG. Use instead of sending people to a GitHub file view to save from: that
 * view is an HTML page, and saving it writes HTML into a .svg file.
 */
export default function AssetTile({
  src,
  label,
  className = "",
  children,
}: {
  src: string;
  label: string;
  /** Layout class of the specimen this tile replaces, e.g. `ds-icon-specimen`. */
  className?: string;
  children: ReactNode;
}) {
  const filename = src.split("/").pop() ?? "asset.svg";

  return (
    <a
      className={`ds-asset-tile${className ? ` ${className}` : ""}`}
      href={src}
      download={filename}
    >
      {children}
      <span className="ds-asset-tile__label">
        {label}
        <span className="ds-asset-tile__hint" aria-hidden="true">
          (SVG&nbsp;&darr;)
        </span>
      </span>
      <span className="ds-visually-hidden">, download as SVG</span>
    </a>
  );
}

/**
 * The same download control reduced to its marker, for rows where the name
 * already sits in its own cell (the UI glyph table) and wrapping the whole row
 * in an anchor is not valid markup.
 */
export function AssetDownloadMarker({ src, label }: { src: string; label: string }) {
  const filename = src.split("/").pop() ?? "asset.svg";

  return (
    <a className="ds-asset-tile ds-asset-tile--marker" href={src} download={filename}>
      <span className="ds-visually-hidden">Download {label} as </span>
      <span className="ds-asset-tile__hint">(SVG&nbsp;&darr;)</span>
    </a>
  );
}
