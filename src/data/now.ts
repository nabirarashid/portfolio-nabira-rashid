export interface NowEntry {
  title: string;
  /** Chip beside the year. Both are current, so this stays "currently". */
  status: string;
  description: string;
  link: string;
  linkLabel: string;
}

const now: NowEntry[] = [
  {
    title: "precedent",
    status: "currently",
    description:
      "an open source tool that searches agent runs by what the agent did, not how the log is worded. indexes by the shape of the behavior.",
    link: "https://github.com/nabirarashid/precedent",
    linkLabel: "github",
  },
  {
    title: "rankllm",
    status: "currently",
    description:
      "an open source reranking library in jimmy lin's castorini group. a model sees a set of results together and puts the ones that answer the query on top.",
    link: "https://github.com/castorini/rank_llm",
    linkLabel: "github",
  },
];

export default now;
