export interface Project {
  title: string;
  description: string;
  link: string;
  techStack: string[];
  details: string;
}

const projects: Project[] = [
  {
    title: "brand reach",
    description: "an ai-powered content generator and auto-poster.",
    link: "https://devpost.com/software/brandbreach",
    techStack: ["python", "flask", "cohere api", "stable diffusion", "tweepy"],
    details: `cohere writes the captions, stable diffusion makes the visuals, and the twitter api posts them.`,
  },
  {
    title: "mr. goose",
    description: "a vscode extension that guides coders with humor and hints.",
    link: "https://dorahacks.io/buidl/26391/",
    techStack: [
      "typescript",
      "vscode api",
      "elysiajs",
      "bun",
      "docker",
      "websockets",
    ],
    details: `an animated goose that reacts to your code, drops hints, and makes debugging less lonely.`,
  },
  {
    title: "homegrown",
    description: "swipe local, support community.",
    techStack: ["react", "typescript", "tailwindcss", "firebase", "firestore"],
    link: "https://github.com/nabirarashid/homegrown-new",
    details: `swipe through 120+ local shops and restaurants, like what you love, and get recommendations that keep money nearby.`,
  },
  {
    title: "snapquest",
    description: "location-based photography prompts and submissions.",
    link: "https://github.com/nabirarashid/snapquest",
    techStack: [
      "oracle cloud",
      "mongodb",
      "tailwindcss",
      "bun",
      "mapbox",
      "auth0",
    ],
    details: `generates photo prompts tied to where you are, then collects the shots people take chasing them.`,
  },
  {
    title: "segmentation registration research",
    description: "an ablation study on medical image registration.",
    link: "https://github.com/nabirarashid/medical-image-registration-ablation",
    techStack: ["python", "pytorch", "numpy", "scipy", "nibabel", "wandb"],
    details: `ablation on oasis brain mri separating architecture from regularization: 21.3% better mse, 99% fewer unrealistic deformations.`,
  },
  {
    title: "codecompass",
    description: "an ai tech stack recommender with cost estimates.",
    link: "https://github.com/nabirarashid/langgraph-codecompass",
    techStack: ["next.js", "python", "fastapi", "langgraph", "deepseek ai", "firecrawl", "tailwindcss"],
    details: `describe a project in plain english and a langgraph agent returns a stack with costs, tradeoffs, and learning curves.`,
  },
  {
    title: "mcp-complex",
    description: "advanced web scraping with deepseek ai and bright data.",
    link: "https://github.com/nabirarashid/mcp-scrape",
    techStack: ["python", "deepseek ai", "bright data", "mcp", "langgraph"],
    details: `a deepseek + bright data scraper that gets past captchas, javascript-heavy pages, and logins on its own.`,
  },
  {
    title: "rythmhacks",
    description: "modern hackathon platform and hacker dashboard.",
    link: "https://rythmhacks-site.vercel.app/",
    techStack: ["next.js", "react", "typescript", "tailwindcss", "mongodb", "jwt auth"],
    details: `applications, hacker dashboards, schedules, and organizer tooling for a hackathon, in one platform.`,
  },
];

export default projects;
