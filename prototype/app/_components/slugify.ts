// Shared slug generator. Used by the on-this-page rail and the search index so
// section IDs agree between them.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
