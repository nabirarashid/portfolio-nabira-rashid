/**
 * The smallest front-matter parser that covers what the writing folder needs:
 * a leading `---` block of `key: value` lines, optionally quoted. No YAML
 * nesting, no lists. Anything fancier belongs in the body as markdown.
 */
export interface Parsed {
  data: Record<string, string>;
  body: string;
}

export const parseFrontmatter = (raw: string): Parsed => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) data[key] = value;
  }

  return { data, body: raw.slice(match[0].length) };
};
