export const formatDate = (iso: string) => {
  if (!iso) return "";
  // A bare YYYY-MM-DD parses as utc midnight and lands on the previous day
  // anywhere west of greenwich. Pin it to local noon so the day is the day.
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T12:00:00` : iso);
  if (Number.isNaN(date.getTime())) return "";
  return date
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toLowerCase();
};

const EXCERPT_LENGTH = 165;

/** Cut on a word boundary and drop a trailing comma or period before the ellipsis. */
export const truncate = (text: string, length = EXCERPT_LENGTH) => {
  if (text.length <= length) return text;
  const clipped = text.slice(0, length);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 60 ? lastSpace : clipped.length).replace(/[,.;:]$/, "")}...`;
};

export const stripHtml = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

/** Markdown to plain-ish text, for excerpts and reading time. */
export const stripMarkdown = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
