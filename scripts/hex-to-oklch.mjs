// One-shot helper: convert the palette hex values to OKLCH with round-trip
// fidelity (each OKLCH must re-render to the identical sRGB hex), and pick a
// darker keyboard-focus gold at hue ~70 that clears 3:1 non-text contrast on
// white. Not part of the build; run manually. Pure math, no deps.

/* ---------- sRGB <-> linear ---------- */
const srgbToLin = (c) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const linToSrgb = (c) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

/* ---------- linear sRGB <-> OKLab (Björn Ottosson) ---------- */
function linToOklab(r, g, b) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ];
}
function oklabToLin(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/* ---------- hex <-> OKLCH ---------- */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}
function rgbToHex(r, g, b) {
  const to = (c) =>
    Math.round(Math.min(1, Math.max(0, c)) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
  return `#${to(r)}${to(g)}${to(b)}`;
}
function hexToOklch(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbToLin);
  const [L, a, bb] = linToOklab(r, g, b);
  const C = Math.hypot(a, bb);
  let H = (Math.atan2(bb, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, H];
}
function oklchToHex(L, C, H) {
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const [lr, lg, lb] = oklabToLin(L, a, b);
  return rgbToHex(linToSrgb(lr), linToSrgb(lg), linToSrgb(lb));
}

/* Format OKLCH, then verify it round-trips to the same hex; if not, bump the
   precision until it does (max 4 decimals on L/C). */
function oklchString(hex) {
  const [L, C, H] = hexToOklch(hex);
  for (let p = 3; p <= 5; p++) {
    const Lr = +L.toFixed(p);
    const Cr = +C.toFixed(p);
    const Hr = +H.toFixed(1);
    const out = `oklch(${Lr} ${Cr} ${Hr})`;
    if (oklchToHex(Lr, Cr, Hr) === hex.toUpperCase()) return out;
  }
  // Fallback: full precision (still exact).
  return `oklch(${+L.toFixed(5)} ${+C.toFixed(5)} ${+H.toFixed(2)})`;
}

/* ---------- WCAG contrast (for the focus gold) ---------- */
function relLum(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbToLin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(hexA, hexB) {
  const a = relLum(hexA), b = relLum(hexB);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------- all palette hexes ---------- */
const HEXES = {
  "brand-primary": "#FF7A3A", "brand-secondary": "#3F00EB", "brand-dark": "#1E1E1E",
  accent: "#FDFCF6", "focus-button": "#CC622E", "light-purple": "#D5C5FF",
  "soft-lavender": "#E5DCFF", "lavender-official": "#E5D0FF", "light-green": "#D4E6AB",
  "light-orange": "#FFD7C4", pink: "#F39EBC", teal: "#03C9D3", purple: "#DA83DA",
  "very-light-gray": "#F7F7F7", "light-gray": "#D9D9D9",
  "teal-deep": "#0F6E6E", magenta: "#BE2A6B", navy: "#1F3A6E",
  blush: "#FADCD2", yellow: "#F6C445", red: "#C43A2E",
  "warm-grey-light": "#C9BFAE", "warm-grey": "#989389",
  "background-default": "#FDFCF6", "background-soft": "#E5DCFF", "background-title": "#D4E6AB",
  "background-alert": "#3F00EB", "accent-icon": "#FF7A3A", "accent-border": "#FF7A3A",
  "focus-ring": "#1E1E1E",
  "theme-1": "#0170B9", "theme-2": "#1E1E1E", "theme-4": "#4B4F58", "theme-5": "#F5F5F5",
  "theme-7": "#E5E5E5", "theme-8": "#1E1E1E",
  "status.error": "#DC2626", "status.success": "#D4E6AB", "status.warning": "#FFAF89",
  "base.white": "#FFFFFF", "base.black": "#0A0A0A",
  "neutral.50": "#FAFAFA", "neutral.100": "#F5F5F5", "neutral.200": "#E5E5E5",
  "neutral.300": "#D4D4D4", "neutral.400": "#A3A3A3", "neutral.500": "#737373",
  "neutral.600": "#525252", "neutral.700": "#404040", "neutral.800": "#262626", "neutral.900": "#1E1E1E",
  "orange.50": "#FFF2EB", "orange.100": "#FFE4D8", "orange.150": "#FFD7C4", "orange.200": "#FFCAB0",
  "orange.300": "#FFAF89", "orange.400": "#FF9561", "orange.500": "#FF7A3A", "orange.600": "#CC622E",
  "orange.700": "#994923", "orange.800": "#663117", "orange.900": "#33180C",
  "green.50": "#FBFCF6", "green.100": "#F6FAEE", "green.150": "#F2F7E5", "green.200": "#EEF5DC",
  "green.300": "#E5F0CB", "green.400": "#DDEBB9", "green.500": "#D4E6AB", "green.600": "#AAB886",
  "green.700": "#7F8A65", "green.800": "#555C43", "green.900": "#2A2E22",
  "blue.50": "#ECE5FD", "blue.100": "#D9CCFB", "blue.150": "#C5B2F9", "blue.200": "#B299F7",
  "blue.300": "#8C66F3", "blue.400": "#6533EF", "blue.500": "#3F00EB", "blue.600": "#3200BC",
  "blue.700": "#26008D", "blue.800": "#19005E", "blue.900": "#0D002F",
  "lavender.50": "#FBF9FF", "lavender.100": "#F7F3FF", "lavender.150": "#F2EEFF", "lavender.200": "#EEE8FF",
  "lavender.300": "#E6DCFF", "lavender.400": "#DDD1FF", "lavender.500": "#D5C5FF", "lavender.600": "#AA9ECC",
  "lavender.700": "#807699", "lavender.800": "#554F66", "lavender.900": "#2B2733",
};

let bad = 0;
console.log("=== OKLCH conversions (round-trip verified) ===");
for (const [name, hex] of Object.entries(HEXES)) {
  const oklch = oklchString(hex);
  const back = oklchToHex(...oklch.match(/[\d.]+/g).map(Number));
  const ok = back === hex.toUpperCase();
  if (!ok) bad++;
  console.log(`${ok ? "OK " : "XX "} ${name.padEnd(20)} ${hex} -> ${oklch}${ok ? "" : `  (back=${back})`}`);
}
console.log(`\nRound-trip failures: ${bad}`);

/* ---------- darker focus gold at hue ~70, >= 3:1 on white ---------- */
console.log("\n=== focus-visible gold candidates (hue 70, vs #FFFFFF) ===");
const H = 70, C = 0.15;
for (let L = 0.79; L >= 0.5; L -= 0.01) {
  const hex = oklchToHex(L, C, H);
  const cr = contrast(hex, "#FFFFFF");
  const tag = cr >= 3 ? "  <-- clears 3:1" : "";
  console.log(`L=${L.toFixed(2)} C=${C} H=${H} -> ${hex}  contrast=${cr.toFixed(2)}:1${tag}`);
}
