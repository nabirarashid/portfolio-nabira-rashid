import React from 'react';
import { CurrentlyConsuming } from './CurrentlyConsuming';

export const MusicPlayer: React.FC = () => {
  return (
    <div className="py-16 px-8 coffee-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-light coffee-text mb-2 tracking-wide">
            what's brewing ⸝⸝
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Spotify Playlist */}
          <div>
            <p className="coffee-text font-light mb-6 text-center">my go-to playlist ⋆♪˚</p>
            <div className="flex justify-center mb-6">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/playlist/1VnqEsccQYCN7CxCUYwWBx?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="max-w-xl"
              ></iframe>
            </div>

            <p className="coffee-text font-light text-xs text-center">
              study beats that keep me up on late nights when coffee can't ♬
            </p>
          </div>

          {/* Currently Consuming */}
          <CurrentlyConsuming />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
