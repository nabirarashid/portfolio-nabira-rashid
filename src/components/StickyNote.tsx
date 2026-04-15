import React from 'react';

interface StickyNoteProps {
  title: string;
  content: string;
  color?: 'yellow' | 'pink' | 'blue' | 'green' | 'orange';
  rotation?: number;
  alignment?: 'left' | 'right';
}

const colorMap = {
  yellow: { border: '#9B7653', light: '#E8D5C4', text: '#6B5436' },
  pink: { border: '#9B7653', light: '#D9C7B8', text: '#6B5436' },
  blue: { border: '#9B7653', light: '#D4BFB0', text: '#6B5436' },
  green: { border: '#9B7653', light: '#C9B5A6', text: '#6B5436' },
  orange: { border: '#9B7653', light: '#DEC9B6', text: '#6B5436' }
};

const StickyNote: React.FC<StickyNoteProps> = ({ 
  title, 
  content,
  color = 'yellow',
}) => {
  const colors = colorMap[color as keyof typeof colorMap];

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
            backgroundColor: colors.light,
            ...(document.documentElement.classList.contains('dark') ? { borderLeftColor: colors.border } : {})
          }}
          className="p-6 dark:bg-slate-800 dark:border-l-4"
        >
          <h3 
            style={{ color: colors.text }}
            className="text-xl font-serif font-light mb-2 tracking-wide dark:text-cafe-cream"
          >
            {title}
          </h3>
          <p className="text-sm font-light leading-relaxed coffee-text"
            style={{ color: colors.text }}
            dangerouslySetInnerHTML={{__html: content}} 
          />
        </div>
      </div>
    </div>
  );
};

export default StickyNote;