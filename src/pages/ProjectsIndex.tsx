import { useEffect } from "react";
import MenuSign from "../components/MenuSign";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import CoffeeStains from "../components/CoffeeStains";
import projects from "../data/projects";
import site from "../../site.config.json";

/** The whole menu. */
const ProjectsIndex = () => {
  useEffect(() => {
    document.title = `projects · ${site.name}`;
  }, []);

  return (
    <main>
      <section className="coffee-bg relative">
        <MenuSign />

        <CoffeeStains variant="projects" />

        <div className="section-shell section-shell--wide section-shell--tight relative">
          <Reveal>
            <p className="eyebrow coffee-text mb-12 text-center">
              {projects.length} items on the menu
            </p>
          </Reveal>

          <div className="menu-list space-y-6">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={Math.min(index, 4) * 60}>
                <ProjectCard
                  name={project.title}
                  description={project.description}
                  link={project.link}
                  techStack={project.techStack}
                  details={project.details}
                  tag={project.tag}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsIndex;
