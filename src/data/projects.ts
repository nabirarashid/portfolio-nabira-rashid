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
    details: `automates social media content using cohere for captions and stable diffusion for visuals, then posts via twitter api. built to simplify branding for companies.`,
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
    details: `a quirky vscode extension with an animated goose that reacts to code, provides hints, and makes learning to debug more fun.`,
  },
  {
    title: "homegrown",
    description: "swipe local, support community.",
    techStack: ["react", "typescript", "tailwindcss", "firebase", "firestore"],
    link: "https://homegrownapp.shop/",
    details: `discover local shops, restaurants, and services like swiping social media. 120+ local businesses with profiles and deals. like what you love, get personalized recommendations, support your community.`,
  },
  {
    title: "snapquest",
    description: "location-based photography prompts and submissions.",
    link: "prettyplease.work",
    techStack: [
      "oracle cloud",
      "mongodb",
      "tailwindcss",
      "bun",
      "mapbox",
      "auth0",
    ],
    details: `generates local photo prompts and lets users upload location-based shots. designed to inspire creativity through exploration.`,
  },
  {
    title: "segmentation registration research",
    description:
      "systematic ablation study on medical image registration architectures and regularization.",
    link: "https://github.com/nabirarashid/medical-image-registration-ablation",
    techStack: ["python", "pytorch", "numpy", "scipy", "nibabel", "wandb"],
    details: `evaluated deep learning model variants on oasis brain mri dataset to isolate architectural vs regularization impacts. found regularization losses drive 21.3% mse improvement with 99% reduction in unrealistic deformations while maintaining computational efficiency.`,
  },
  {
    title: "codecompass",
    description: "ai-powered tech stack recommender with detailed analysis and cost estimates.",
    link: "https://github.com/nabirarashid/langgraph-codecompass",
    techStack: ["next.js", "python", "fastapi", "langgraph", "deepseek ai", "firecrawl", "tailwindcss"],
    details: `describe your project in natural language and get personalized tech stack recommendations with component analysis, cost estimates, learning curves, and industry-specific insights. built with langgraph for multi-step ai workflows, deepseek for language processing, and firecrawl for real-time web research.`,
  },
  {
    title: "mcp-complex",
    description: "advanced web scraping with deepseek ai and bright data.",
    link: "https://github.com/nabirarashid/mcp-scrape",
    techStack: ["python", "deepseek ai", "bright data", "mcp", "langgraph"],
    details: `intelligent web scraper that combines deepseek ai with bright data's mcp tools for sophisticated web automation. bypasses captchas, handles javascript-heavy sites, manages authentication, and performs complex browser interactions. integrated with claude desktop and works as a standalone python script.`,
  },
  {
    title: "rythmhacks",
    description: "modern hackathon platform and hacker dashboard.",
    link: "https://rythmhacks-site.vercel.app/",
    techStack: ["next.js", "react", "typescript", "tailwindcss", "mongodb", "jwt auth"],
    details: `complete hackathon platform streamlining applications, hacker dashboards, scheduling, and event logistics. features guided application flows, personalized dashboards, and intuitive admin tools for organizers to manage participants and event data.`,
  },
];

export default projects;
