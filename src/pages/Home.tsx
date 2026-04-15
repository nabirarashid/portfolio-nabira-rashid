import ProjectCard from "../components/ProjectCard";
import projects, { Project } from "../data/projects";
import Typewriter from "typewriter-effect";
import MusicPlayer from "../components/MusicPlayer";
import { useState, useEffect } from "react";

const Home = () => {
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const shuffledProjects = [...projects].sort(() => 0.5 - Math.random());
    setDisplayedProjects(shuffledProjects.slice(0, 2));
  }, []);

  return (
    <div className="coffee-bg min-h-screen transition-colors duration-500 relative">
      {/* Coffee stain decorations */}
      <img 
        src="/assets/website/coffee stain.png" 
        alt="coffee stain" 
        className="coffee-stain w-32 h-32 pointer-events-none"
        style={{ top: '80px', right: '40px', width: '128px', height: '128px' }}
      />
      <img 
        src="/assets/website/coffee stain.png" 
        alt="coffee stain" 
        className="coffee-stain w-24 h-24 pointer-events-none transform -scale-x-100"
        style={{ bottom: '160px', left: '32px', width: '96px', height: '96px' }}
      />
      <img 
        src="/assets/website/coffee stain.png" 
        alt="coffee stain" 
        className="coffee-stain w-20 h-20 pointer-events-none opacity-10"
        style={{ bottom: '80px', right: '80px', width: '80px', height: '80px' }}
      />
      <img 
        src="/assets/website/coffee stain.png" 
        alt="coffee stain" 
        className="coffee-stain pointer-events-none"
        style={{ top: '45%', left: '5%', width: '110px', height: '110px', opacity: 0.12 }}
      />
      <img 
        src="/assets/website/coffee stain.png" 
        alt="coffee stain" 
        className="coffee-stain pointer-events-none transform -scale-x-100"
        style={{ top: '65%', right: '8%', width: '90px', height: '90px', opacity: 0.1 }}
      />
      <img 
        src="/assets/website/coffee stain.png" 
        alt="coffee stain" 
        className="coffee-stain pointer-events-none"
        style={{ bottom: '20%', left: '50%', width: '70px', height: '70px', opacity: 0.08 }}
      />
      {/* Chalkboard Hero Section */}
      <div className="relative overflow-hidden">
        <div className="chalkboard py-20 flex items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute bottom-12 left-12 opacity-10 text-8xl animate-float-slow">🎵</div>

          <div className="max-w-4xl mx-auto text-center px-8 z-10 pt-8">
            {/* Main Title */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-serif font-light tracking-wide text-cafe-cream mb-2" 
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
                today's special
              </h1>
              <div className="h-0.5 w-24 bg-cafe-cream mx-auto opacity-40 mb-0"></div>
            </div>

            {/* Intro Text */}
            <div className="mb-16">
              <p className="text-sm text-cafe-cream opacity-70 mb-1 tracking-widest uppercase">now brewing</p>
              <div className="flex items-center justify-center gap-6 mb-2">
                {/* Coffee Cup with Face on Top */}
                <div className="relative w-40 h-48 hidden sm:flex items-center justify-center">
                  {/* Coffee cup image */}
                  <img 
                    src="/assets/website/new coffee cup.webp" 
                    alt="coffee cup"
                    className="w-full h-full object-contain cup-spin"
                  />
                  {/* Face positioned above coffee cup */}
                  <img 
                    src="/assets/website/pfp.jpg" 
                    alt="nabira"
                    className="absolute left-1/2 w-24 h-24 rounded-full object-cover shadow-lg border-4"
                    style={{ borderColor: '#A0826D', transform: 'translateX(-46%)', top: '2.875rem' }}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-5xl lg:text-7xl font-serif font-light tracking-wide text-cafe-cream">
                    nabira rashid
                  </h2>
                  <p className="text-lg text-cafe-cream opacity-80 font-light mt-2 self-end">
                    developer, creator, and coffee enthusiast
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-black/20 border border-cafe-cream/20 rounded-sm p-8 mb-12 backdrop-blur-sm">
              <p className="text-base text-cafe-cream leading-relaxed opacity-90 font-light">
                an ib student from oakville with a passion for computer science, technology, and music. i love making new friends and creating cool things. let's chat!
              </p>
            </div>

            {/* Typewriter */}
            <div className="mb-4 flex justify-center">
              <div className="min-h-12 flex items-center">
                <Typewriter
                  options={{
                    strings: [
                      "brewing personal projects",
                      "exploring hackathons",
                      "crafting with code",
                      "making new friends",
                      "finding coffee chats"
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 25,
                    cursor: "‸",
                    wrapperClassName: "text-lg font-serif text-cafe-matcha",
                  }}
                />
              </div>
            </div>

            {/* CTA Buttons */}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="max-w-6xl mx-auto px-8 pt-24 pb-16">
        <div className="text-center mb-0 relative h-32">
          {/* Animated steam puffs from right side - continuous flow */}
          <img 
            src="/assets/website/steam.webp" 
            alt="steam"
            className="steam-puff absolute"
            style={{
              right: '430px',
              top: '-28px',
              width: '100px',
              height: '100px',
              animation: 'steamRise 2s ease-out infinite',
              '--drift': '40px',
            } as React.CSSProperties & { '--drift': string }}
          />
          <img 
            src="/assets/website/steam.webp" 
            alt="steam"
            className="steam-puff absolute"
            style={{
              right: '390px',
              top: '-23px',
              width: '90px',
              height: '90px',
              animation: 'steamRise 2.2s ease-out infinite 0.15s',
              '--drift': '60px',
            } as React.CSSProperties & { '--drift': string }}
          />
          <img 
            src="/assets/website/steam.webp" 
            alt="steam"
            className="steam-puff absolute"
            style={{
              right: '360px',
              top: '-25px',
              width: '85px',
              height: '85px',
              animation: 'steamRise 2s ease-out infinite 0.3s',
              '--drift': '50px',
            } as React.CSSProperties & { '--drift': string }}
          />
          <h2 className="text-3xl font-serif font-light coffee-text mb-2 tracking-wide">
            daily special
          </h2>
          <p className="coffee-text font-light text-sm">featured projects fresh from the kitchen</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr -mt-2">
          {displayedProjects.map((project: Project, index: number) => (
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

        <div className="text-center mt-12">
          <button
            onClick={() => {
              window.location.href = "/projects";
            }}
            className="px-6 py-2 border border-cafe-espresso dark:border-cafe-cream coffee-text hover:bg-cafe-espresso/10 dark:hover:bg-cafe-cream/10 transition-all duration-300 font-light tracking-wide text-sm"
          >
            view full menu
          </button>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default Home;
