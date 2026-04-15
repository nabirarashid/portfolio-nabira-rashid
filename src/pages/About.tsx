import CoreMemories from "../components/CoreMemories";
import aboutinfo from "../data/aboutinfo";
import StickyNote from "../components/StickyNote";
import InstagramPost from "../components/InstagramPost";
import MusicVideo from "../components/MusicVideo";

const About = () => {
  return (
    <div className="coffee-bg min-h-screen transition-colors duration-500">
      {/* Chalkboard Header */}
      <div className="chalkboard py-20 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-8 z-10">
          <h1 className="text-5xl lg:text-6xl font-serif font-light tracking-wide text-cafe-cream mb-3" 
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
            behind the counter
          </h1>
          <div className="h-0.5 w-20 bg-cafe-cream mx-auto opacity-40"></div>
          <p className="text-cafe-cream font-light mt-4 drop-shadow-md">get to know the person behind this cafe</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 pb-16">
        {aboutinfo.map(
          (
            info: {
              title: string;
              content: string;
              mediaType: "image" | "video" | "frame";
              media: string;
            },
            index: number
          ) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 mb-20 py-8 border-b-2 border-cafe-espresso/20 dark:border-cafe-cream last:border-b-0`}
            >
              {/* Content */}
              <div className="flex-1">
                <StickyNote
                  title={info.title}
                  content={info.content}
                  color={index % 2 === 0 ? "yellow" : "pink"}
                  alignment={index % 2 === 0 ? "left" : "right"}
                />
              </div>

              {/* Media */}
              <div className="flex-1 flex items-center justify-center">
                {info.mediaType === "image" ? (
                  <div className="relative w-full aspect-square max-w-sm">
                    <div className="absolute -inset-4 bg-cafe-espresso/5 dark:bg-cafe-cream/5 rounded-lg blur-lg" />
                    <img
                      src={info.media}
                      alt={`Media for ${info.title}`}
                      className="w-full h-full
                      object-cover
                      rounded-sm shadow-lg
                      hover:shadow-xl
                      transition-all duration-300
                      cursor-pointer
                      border border-cafe-espresso/20 dark:border-cafe-cream/20
                      relative z-10"
                    />
                  </div>
                ) : info.mediaType === "video" ? (
                  <div className="w-full max-w-sm">
                    <div className="rounded-sm overflow-hidden shadow-lg border border-cafe-espresso/20 dark:border-cafe-cream/20">
                      <MusicVideo />
                    </div>
                  </div>
                ) : info.mediaType === "frame" ? (
                  <div className="rounded-sm overflow-hidden shadow-lg border border-cafe-espresso/20 dark:border-cafe-cream/20">
                    <InstagramPost />
                  </div>
                ) : null}
              </div>
            </div>
          )
        )}
      </div>

      {/* Wall of Memories */}
      <div className="mb-16">
        <CoreMemories />
      </div>
    </div>
  );
};

export default About;
