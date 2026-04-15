import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import Typewriter from "typewriter-effect";

const Projects = () => {
  return (
    <div className="coffee-bg min-h-screen transition-colors duration-500">
      {/* Chalkboard Header */}
      <div className="chalkboard py-20 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-8 z-10">
          <h1 className="text-5xl lg:text-6xl font-serif font-light tracking-wide text-cafe-cream mb-4" 
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
            the full menu
          </h1>
          <div className="h-0.5 w-20 bg-cafe-cream mx-auto opacity-40 mb-6"></div>
          
          {/* Typewriter */}
          <div className="backdrop-blur-sm">
            <p className="text-cafe-cream/60 text-xs mb-2 font-light uppercase tracking-widest">what's cooking</p>
            <Typewriter
              options={{
                strings: [
                  "learning dsa and web dev magic",
                  "exploring rag and langchain",
                  "building cool projects",
                  "crafting the perfect stack",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 20,
                cursor: "‸",
                wrapperClassName: "text-base font-serif text-cafe-cream font-light drop-shadow-md",
              }}
            />
          </div>
        </div>
      </div>

      {/* Projects Content */}
      <div className="max-w-6xl mx-auto px-8 py-20">
        <p className="coffee-text text-center text-xs mb-12 uppercase tracking-widest font-light">
          {projects.length} items on the menu
        </p>

        <div className="space-y-6">
          {projects.map((project: {
            title: string;
            description: string;
            link: string;
            techStack: string[];
            details?: string;
          }, index: number) => (
            <ProjectCard
              key={index}
              name={project.title}
              description={project.description}
              link={project.link}
              techStack={project.techStack}
              details={project.details}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
