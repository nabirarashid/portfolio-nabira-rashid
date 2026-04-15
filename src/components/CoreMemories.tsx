import { Heart } from "lucide-react";

const photos = [
  {
    src: "/assets/website/ramen.jpg",
    caption: "live love laugh band",
  },
  {
    src: "/assets/website/eureka.jpg",
    caption: "organizing eurekahacks!",
  },

  {
    src: "/assets/website/canada.jpg",
    caption: "lli @ canada day",
  },
  {
    src: "/assets/website/news.jpg",
    caption: "on the news!",
  },
  {
    src: "/assets/website/band.jpg",
    caption: "spring concert!",
  },
  {
    src: "/assets/website/maya.jpg",
    caption: "gr 11 semi formal",
  },
  {
    src: "/assets/website/laugh.jpg",
    caption: "tech bros",
  },
  {
    src: "/assets/website/htn.jpg",
    caption: "hack the north 24",
  },
  {
    src: "/assets/website/jes.jpg",
    caption: "me and jessie <3",
  },
  {
    src: "/assets/website/krispy.jpg",
    caption: "lli & krispy kreme sale",
  },
  {
    src: "/assets/website/gasp.jpg",
    caption: "teen builders",
  },
  {
    src: "/assets/website/hotchoc.jpg",
    caption: "lli & hot choco",
  },
  {
    src: "/assets/website/relayuni.jpg",
    caption: "relay university",
  },
  {
    src: "/assets/website/prom.JPG",
    caption: "prom 24",
  },
  {
    src: "/assets/website/semi.jpg",
    caption: "semi 25 with my babies",
  },
];

const CoreMemories = () => {
  return (
    <div className="w-full px-4 py-6 coffee-bg">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-3">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif font-light coffee-text mb-3 tracking-wide">
            ⋆୨୧˚ wall of memories ˚୨୧⋆
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cafe-matcha to-cafe-terracotta dark:from-cafe-terracotta dark:to-cafe-matcha mx-auto" />
        </div>
        <p className="coffee-text dark:text-cafe-cream font-light text-center text-sm opacity-60 dark:opacity-100 mb-8">
          snapshots from moments that matter
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-sm shadow-md hover:shadow-lg transition-all duration-300 aspect-square border border-cafe-espresso/10 dark:border-cafe-cream/10 hover:border-cafe-espresso/30 dark:hover:border-cafe-cream/30"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector(".error-placeholder")) {
                    const placeholder = document.createElement("div");
                    placeholder.className =
                      "error-placeholder w-full h-full bg-cafe-cream/30 dark:bg-cafe-espresso/30 flex items-center justify-center";
                    placeholder.innerHTML = `
                      <div class="text-center">
                        <div class="text-2xl">📸</div>
                      </div>
                    `;
                    parent.appendChild(placeholder);
                  }
                }}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                <p className="text-white text-xs font-light text-center drop-shadow-lg">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreMemories;
