import { useMemo } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Writing from "../components/Writing";
import CurrentlyConsuming from "../components/CurrentlyConsuming";
import HouseRules from "../components/HouseRules";
import ProjectCard from "../components/ProjectCard";
import MenuSign from "../components/MenuSign";
import Reveal from "../components/Reveal";
import CoffeeStains from "../components/CoffeeStains";
import projects, { Project } from "../data/projects";

/** How many dishes the front page shows. The rest are on /projects. */
const SPECIALS = 3;

/** Fisher-Yates, so the pick is uniform. */
const shuffle = <T,>(items: T[]) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Home = () => {
  // A different handful each visit, fixed for the life of the page so the
  // cards don't reshuffle on re-render.
  const specials = useMemo<Project[]>(() => shuffle(projects).slice(0, SPECIALS), []);

  return (
    <div className="coffee-bg">
      <Hero />

      <Experience />

      <Writing />

      <CurrentlyConsuming />

      {/* ===== THE FULL MENU ===== */}
      <section id="projects-section" className="coffee-bg relative">
        <MenuSign to="/projects" tagline="a few things from the board" typewriter={false} />

        <CoffeeStains variant="projects" />

        <div className="section-shell section-shell--wide section-shell--tight relative">
          <Reveal>
            <p className="eyebrow coffee-text mb-12 text-center">
              {SPECIALS} of {projects.length} items on the menu
            </p>
          </Reveal>

          <div className="menu-list space-y-6">
            {specials.map((project, index) => (
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

          <Reveal className="mt-12 text-center">
            <Link
              to="/projects"
              className="coffee-text border-b border-cafe-espresso/30 dark:border-cafe-cream/30 pb-1 text-sm font-normal tracking-[0.04em] transition-colors duration-300 hover:border-cafe-espresso dark:hover:border-cafe-cream"
            >
              see the full menu
            </Link>
          </Reveal>
        </div>
      </section>

      <HouseRules />
    </div>
  );
};

export default Home;
