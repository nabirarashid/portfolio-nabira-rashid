import React from 'react';

export const MusicPlayer: React.FC = () => {
  return (
    <div className="py-16 px-8 coffee-bg">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-light coffee-text mb-2 tracking-wide">
            what's brewing
          </h2>
          <p className="coffee-text font-light mb-6">my go-to playlist: gracie's acoustic vibes</p>
        </div>

        {/* Spotify Playlist */}
        <div className="flex justify-center mb-8">
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
          acoustic, study beats, and late nights with good friends ☕
        </p>
      </div>
    </div>
  );
};

export default MusicPlayer;
