import Typewriter from "typewriter-effect";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import Writing from "../components/Writing";
import CurrentlyConsuming from "../components/CurrentlyConsuming";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import projects, { Project } from "../data/projects";

const Home = () => {
  return (
    <div className="coffee-bg">
      <Hero />

      <Experience />

      <Writing />

      <CurrentlyConsuming />

      {/* ===== THE FULL MENU ===== */}
      <section id="projects-section" className="coffee-bg relative">
        <SectionHeading title="the full menu" tagline="everything on the board">
          <div className="mt-8">
            <p className="eyebrow text-cafe-cream mb-3">what's cooking</p>
            <div className="typewriter-slot">
              {/*
                Hidden width reservation, so the board never resizes as the
                typewriter cycles. Deliberately wider than the longest live
                string ("exploring rag and langchain", 179px) to hold the board
                at the width it had before "magic" was trimmed.
              */}
              <span
                className="typewriter-sizer font-serif text-base font-light tracking-[0.02em]"
                aria-hidden="true"
              >
                learning dsa and web dev magic‸
              </span>
              <Typewriter
                options={{
                  strings: [
                    "learning dsa and web dev",
                    "exploring rag and langchain",
                    "building cool projects",
                    "crafting the perfect stack",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 20,
                  cursor: "‸",
                  wrapperClassName:
                    "font-serif text-base font-light text-cafe-cream/90 tracking-[0.02em]",
                }}
              />
            </div>
          </div>
        </SectionHeading>

        {/* One stain, placed deliberately */}
        <img
          src="/assets/website/coffee stain.png"
          alt=""
          aria-hidden="true"
          className="coffee-stain hidden md:block"
          style={{ top: "18%", right: "5%", width: "120px", height: "120px" }}
        />

        <div className="section-shell section-shell--wide section-shell--tight relative">
          <Reveal>
            <p className="eyebrow coffee-text mb-12 text-center">
              {projects.length} items on the menu
            </p>
          </Reveal>

          <div className="space-y-6">
            {projects.map((project: Project, index: number) => (
              <Reveal key={project.title} delay={Math.min(index, 4) * 60}>
                <ProjectCard
                  name={project.title}
                  description={project.description}
                  link={project.link}
                  techStack={project.techStack}
                  details={project.details}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
