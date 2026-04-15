import React, { useEffect, useState } from 'react';

interface SteamParticleProps {
  x: number;
  y: number;
  delay: number;
}

const SteamParticle: React.FC<SteamParticleProps> = ({ x, y, delay }) => {
  return (
    <div
      className="steam-particle absolute rounded-full bg-white/40 blur-md"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: '40px',
        height: '40px',
        animationDelay: `${delay}s`,
        pointerEvents: 'none',
      }}
    />
  );
};

export const SteamEffect: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 50,
        delay: (i * 0.5) % 3,
      }))
    );
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-64 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <SteamParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          delay={particle.delay}
        />
      ))}
    </div>
  );
};

export default SteamEffect;
