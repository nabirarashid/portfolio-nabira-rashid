export interface ExperienceEntry {
  role: string;
  org: string;
  dates: string;
  location?: "remote" | "hybrid" | "on-site";
  description: string;
}

export interface ProgramEntry {
  name: string;
  org: string;
  date: string;
}

const experience: ExperienceEntry[] = [
  {
    role: "research engineer",
    org: "MIT Computer Science and Artificial Intelligence Laboratory (CSAIL)",
    dates: "present",
    location: "remote",
    description: "agent reasoning, retrieval evaluation & benchmarking",
  },
  {
    role: "software engineer intern",
    org: "DevFortress",
    dates: "2025",
    location: "hybrid",
    description: "developed obsidian plugin & explored mcp integrations",
  },
  {
    role: "ml research intern",
    org: "Harvard Medical School and Massachusetts General Hospital",
    dates: "2025",
    location: "remote",
    description:
      "medical registration and segmentation | joint project with carnegie mellon university",
  },
  {
    role: "co-director",
    org: "RythmHacks",
    dates: "2025",
    location: "hybrid",
    description: "algorithm-themed hackathon | 100+ attendees, 20+ sponsors",
  },
  {
    role: "research assistant",
    org: "University of Toronto",
    dates: "2025",
    location: "hybrid",
    description: "multimodal sentiment analysis",
  },
];

export const programs: ProgramEntry[] = [
  { name: "WiSE NYC", org: "Jane Street", date: "jul 2026" },
  { name: "Startup School", org: "Y Combinator", date: "jul 2026" },
];

export default experience;
