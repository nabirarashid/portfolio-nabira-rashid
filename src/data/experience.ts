export interface Paper {
  /** Read out by the tooltip and the screen reader label, not printed. */
  fullTitle: string;
  venue: string;
  url: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  dates: string;
  location?: "remote" | "hybrid" | "on-site";
  description: string;
  paper?: Paper;
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
    dates: "since 2026",
    location: "remote",
    description: "agent reasoning, retrieval evaluation & benchmarking",
    paper: {
      fullTitle:
        "Retrieved but not ranked: surface-form bias in structural retrieval, from mathematics to agent trajectories",
      venue: "arxiv 2026",
      url: "https://arxiv.org/abs/2609.01556",
    },
  },
  {
    role: "software engineer intern",
    org: "DevFortress",
    dates: "2025",
    location: "hybrid",
    description: "built an obsidian plugin & agent workflows",
  },
  {
    role: "ml research intern",
    org: "Harvard Medical School and Massachusetts General Hospital",
    dates: "2025",
    location: "remote",
    description:
      "medical registration and segmentation | joint project with carnegie mellon university",
    paper: {
      fullTitle:
        "Architectural and Regularization Components in Deep Learning Medical Image Registration: Systematic Ablation Study",
      venue: "jmir preprint 2025",
      url: "https://preprints.jmir.org/preprint/84519",
    },
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
    description: "neuroimaging data preprocessing for sentiment analysis research",
  },
];

export const programs: ProgramEntry[] = [
  { name: "WiSE NYC", org: "Jane Street", date: "jul 2026" },
  { name: "Startup School", org: "Y Combinator", date: "jul 2026" },
];

export default experience;
