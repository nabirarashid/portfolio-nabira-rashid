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
    dates: "2026",
    location: "remote",
    description:
      "first-authored a paper on surface-form bias in structural retrieval, from math problems to agent trajectories. retrieval over those trajectories lands below chance once the wording is controlled.",
    paper: {
      fullTitle:
        "Retrieved but not ranked: surface-form bias in structural retrieval, from mathematics to agent trajectories",
      venue: "arxiv",
      url: "https://arxiv.org/abs/2609.01556",
    },
  },
  {
    role: "software engineer intern",
    org: "DevFortress",
    dates: "2025",
    location: "hybrid",
    description:
      "built the obsidian surface for a multi-app ai assistant, then a langgraph pipeline for the notes. shipped to paying customers.",
  },
  {
    role: "ml research intern",
    org: "Harvard Medical School and Massachusetts General Hospital",
    dates: "2025",
    location: "remote",
    description:
      "sole-authored an ablation of medical image registration and segmentation on brain mri, with carnegie mellon. regularization on the deformation field mattered more than the extra architecture.",
    paper: {
      fullTitle:
        "Architectural and Regularization Components in Deep Learning Medical Image Registration: Systematic Ablation Study",
      venue: "arxiv",
      url: "https://arxiv.org/abs/2609.05484",
    },
  },
  {
    role: "co-director",
    org: "RythmHacks",
    dates: "2025",
    location: "hybrid",
    description:
      "an algorithm-themed hackathon for high schoolers. 100+ attendees, 20+ sponsors.",
  },
  {
    role: "research assistant",
    org: "University of Toronto and Sunnybrook",
    dates: "2025",
    location: "hybrid",
    description:
      "turned movie dialogue into a second-by-second emotion signal on the fmri scanner's clock, so the team could line language up against brain responses.",
  },
];

export const programs: ProgramEntry[] = [
  { name: "WiSE NYC", org: "Jane Street", date: "jul 2026" },
  { name: "Startup School", org: "Y Combinator", date: "jul 2026" },
];

export default experience;
