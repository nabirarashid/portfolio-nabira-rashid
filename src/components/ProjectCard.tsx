import { useState } from "react";
import { ChevronDown, ExternalLink, Code } from "lucide-react";

interface Props {
  name: string;
  description: string;
  link: string;
  techStack?: string[];
  details?: string;
}

const ProjectCard = ({ name, description, link, techStack = [], details }: Props) => {
  const [showTechStack, setShowTechStack] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-sm border border-cafe-espresso/10 dark:border-cafe-cream/10 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="h-3 w-full bg-cafe-mocha" />

      <div className="flex flex-1 flex-col bg-cafe-latte dark:bg-coffee-900 p-7">
        <div className="flex h-full flex-col items-start gap-5">
          <h3 className="entry-title coffee-text text-xl md:text-2xl">
            {name}
          </h3>

          <p className="body-copy coffee-text text-sm opacity-80">{description}</p>

          {details && (
            <p className="body-copy coffee-text text-sm opacity-60">{details}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost coffee-text"
            >
              view project
              <ExternalLink size={14} />
            </a>

            {techStack.length > 0 && (
              <button
                onClick={() => setShowTechStack(!showTechStack)}
                aria-expanded={showTechStack}
                className="btn-ghost coffee-text"
              >
                <Code size={14} />
                tech stack
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    showTechStack ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {showTechStack && techStack.length > 0 && (
            <div className="mt-auto w-full border-t border-cafe-espresso/10 dark:border-cafe-cream/10 pt-5">
              <p className="eyebrow coffee-text mb-3">technologies</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="coffee-text rounded-sm bg-cafe-espresso/8 dark:bg-cafe-cream/10 px-3 py-1 text-xs font-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
