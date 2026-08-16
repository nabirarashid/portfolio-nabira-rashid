import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const AudioControl: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      {/*
        Lights toggle. The disc inverts against whatever background it sits on:
        dark on the cream page, cream on the dark page. The ring always takes
        the opposite colour to the fill so it stays visible in both modes.
      */}
      <button
        onClick={toggleTheme}
        className="w-12 h-12 rounded-full border bg-cafe-espresso border-cafe-cream dark:bg-cafe-cream dark:border-cafe-espresso hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
        title={isDark ? "turn lights on" : "turn lights off"}
        aria-label="toggle lights"
      >
        <div className="text-lg text-cafe-cream dark:text-cafe-espresso">
          {isDark ? '☾\uFE0E' : '☀\uFE0E'}
        </div>
      </button>
    </div>
  );
};

export default AudioControl;
