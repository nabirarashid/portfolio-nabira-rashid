import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface StickyNoteProps {
  title: string;
  content: string;
  color?: 'yellow' | 'pink' | 'blue' | 'green' | 'orange';
  rotation?: number;
  alignment?: 'left' | 'right';
}

const colorMap = {
  yellow: { border: '#9B7653', light: '#E8D5C4', text: '#6B5436', dark: '#4a3728' },
  pink: { border: '#9B7653', light: '#D9C7B8', text: '#6B5436', dark: '#4a3728' },
  blue: { border: '#9B7653', light: '#D4BFB0', text: '#6B5436', dark: '#4a3728' },
  green: { border: '#9B7653', light: '#C9B5A6', text: '#6B5436', dark: '#4a3728' },
  orange: { border: '#9B7653', light: '#DEC9B6', text: '#6B5436', dark: '#4a3728' }
};

const StickyNote: React.FC<StickyNoteProps> = ({ 
  title, 
  content,
  color = 'yellow',
}) => {
  const colors = colorMap[color as keyof typeof colorMap];
  const { isDark } = useTheme();

  return (
    <div className="w-full max-w-sm">
      {/* Menu-style card with colored accent */}
      <div 
        className="rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-cafe-espresso/10 dark:border-cafe-cream/10"
      >
        {/* Colored top accent bar */}
        <div 
          style={{ backgroundColor: colors.border }}
          className="h-2 w-full"
        />
        
        {/* Content area with subtle background */}
        <div 
          style={{
            backgroundColor: isDark ? colors.dark : colors.light,
            borderLeftColor: colors.border
          }}
          className="p-6 border-l-4"
        >
          <h3 
            style={{ color: isDark ? '#F5F5DC' : colors.text }}
            className="text-xl font-serif font-light mb-2 tracking-wide"
          >
            {title}
          </h3>
          <p className="text-sm font-light leading-relaxed"
            style={{ color: isDark ? '#F5F5DC' : colors.text }}
            dangerouslySetInnerHTML={{__html: content}} 
          />
        </div>
      </div>
    </div>
  );
};

export default StickyNote;