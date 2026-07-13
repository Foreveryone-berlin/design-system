import { slugify } from "./slugify";

export type PageHeading = {
  id: string;
  text: string;
  level: 2 | 3;
  node: HTMLElement;
};

export const HEADING_SELECTOR = "h2.ds-section-title, h3.ds-subsection-title";

/** Heading label without injected permalink anchors. */
export function getHeadingText(node: HTMLElement): string {
  const clone = node.cloneNode(true) as HTMLElement;
  clone.querySelectorAll(".ds-heading-anchor").forEach((el) => el.remove());
  return (clone.textContent ?? "").trim();
}

export function queryPageHeadings(main: HTMLElement): HTMLElement[] {
  return Array.from(main.querySelectorAll<HTMLElement>(HEADING_SELECTOR));
}

export function collectPageHeadings(main: HTMLElement): PageHeading[] {
  const nodes = queryPageHeadings(main);
  const used = new Set<string>();

  // Reserve ids already on the page (e.g. section wrappers) so headings never
  // duplicate them — invalid HTML and broken hash navigation otherwise.
  main.querySelectorAll<HTMLElement>("[id]").forEach((el) => {
    if (el.id && !nodes.includes(el)) used.add(el.id);
  });

  return nodes.map((node) => {
    const text = getHeadingText(node);
    let id = node.id || slugify(text);
    if (!id) id = "section";
    let unique = id;
    let n = 2;
    while (used.has(unique)) unique = `${id}-${n++}`;
    used.add(unique);
    node.id = unique;
    return {
      id: unique,
      text,
      level: node.tagName === "H3" ? 3 : 2,
      node,
    };
  });
}

function createCheckIcon(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "ds-heading-anchor__icon");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", "20 6 9 17 4 12");
  svg.appendChild(polyline);
  return svg;
}

function buildHeadingAnchor(id: string, text: string): HTMLAnchorElement {
  const anchor = document.createElement("a");
  anchor.href = `#${id}`;
  anchor.className = "ds-heading-anchor";
  anchor.setAttribute("aria-label", `Copy link to ${text}`);

  const defaultMark = document.createElement("span");
  defaultMark.className = "ds-heading-anchor__default";
  defaultMark.setAttribute("aria-hidden", "true");
  defaultMark.textContent = "#";

  const copiedMark = document.createElement("span");
  copiedMark.className = "ds-heading-anchor__copied";
  copiedMark.setAttribute("aria-hidden", "true");
  copiedMark.appendChild(createCheckIcon());
  const copiedLabel = document.createElement("span");
  copiedLabel.className = "ds-heading-anchor__label";
  copiedLabel.textContent = "Link copied";
  copiedMark.appendChild(copiedLabel);

  anchor.append(defaultMark, copiedMark);
  return anchor;
}

export function setHeadingAnchorCopied(anchor: HTMLAnchorElement): void {
  anchor.classList.add("is-copied");
  anchor.setAttribute("aria-label", "Link copied");
}

export function resetHeadingAnchor(anchor: HTMLAnchorElement, text: string): void {
  anchor.classList.remove("is-copied");
  anchor.setAttribute("aria-label", `Copy link to ${text}`);
}

function navigateToHeading(id: string): void {
  history.replaceState(null, "", `#${id}`);
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ block: "start" });
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

export function ensureHeadingAnchors(
  headings: PageHeading[],
  onCopy: (id: string, anchor: HTMLAnchorElement, text: string) => void,
): void {
  for (const { id, text, node } of headings) {
    let anchor = node.querySelector<HTMLAnchorElement>(".ds-heading-anchor");
    if (!anchor) {
      anchor = buildHeadingAnchor(id, text);
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        void navigator.clipboard.writeText(url).then(
          () => {
            history.replaceState(null, "", `#${id}`);
            onCopy(id, anchor!, text);
          },
          () => {
            // Clipboard unavailable (e.g. insecure context); keep link behavior.
            navigateToHeading(id);
          },
        );
      });
      node.appendChild(anchor);
    } else {
      resetHeadingAnchor(anchor, text);
    }
  }
}
