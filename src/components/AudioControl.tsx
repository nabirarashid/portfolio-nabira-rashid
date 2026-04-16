import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const AudioControl: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      {/* Lights Off Toggle */}
      <button
        onClick={toggleTheme}
        className="w-12 h-12 rounded-full bg-cafe-cream dark:bg-cafe-espresso border border-cafe-espresso dark:border-cafe-cream hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
        title={isDark ? "turn lights on" : "turn lights off"}
        aria-label="toggle lights"
      >
        <div className="text-lg">
          {isDark ? '☾\uFE0E' : '☀\uFE0E'}
        </div>
      </button>
    </div>
  );
};

export default AudioControl;
