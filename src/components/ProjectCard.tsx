import { useState } from 'react';
import { ChevronDown, ExternalLink, Code } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Props {
  name: string;
  description: string;
  link: string;
  techStack?: string[];
  details?: string;
}

const drinkColors = {
  accent: '#8B6F47', // mocha brown
  light: '#F4E8D8'
};

const ProjectCard = ({ name, description, link, techStack = [], details }: Props) => {
  const [showTechStack, setShowTechStack] = useState(false);
  const { isDark } = useTheme();
  const colors = drinkColors;

  return (
    <div className="w-full h-full rounded-sm shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-cafe-espresso/10 dark:border-cafe-cream/10 flex flex-col">
      {/* Colored top bar - represents drink type */}
      <div 
        style={{ backgroundColor: colors.accent }}
        className="h-3 w-full"
      />
      
      {/* Content area */}
      <div 
        style={!isDark ? { backgroundColor: colors.light } : {}}
        className="p-6 bg-white dark:bg-slate-800 flex-1 flex flex-col">
        <div className="flex flex-col justify-start items-start gap-6 h-full">
          {/* Title */}
          <div className="coffee-text dark:text-cafe-cream text-2xl font-serif font-light">
            {name}
          </div>
          
          {/* Description */}
          <div className="coffee-text dark:text-cafe-cream text-base font-light leading-relaxed">
            {description}
          </div>
          
          {/* Details if present */}
          {details && (
            <div className="coffee-text dark:text-cafe-cream text-sm font-light leading-relaxed">
              {details}
            </div>
          )}
          
          {/* Buttons */}
          <div className="flex gap-3 items-center flex-wrap pt-2">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={!isDark ? { color: colors.accent, borderColor: colors.accent } : {}}
              className="px-6 py-2 border coffee-text dark:border-cafe-cream dark:text-cafe-cream hover:bg-cafe-espresso/10 dark:hover:bg-cafe-cream/10 transition-all duration-300 font-light tracking-wide text-sm flex items-center gap-2"
            >
              view project
              <ExternalLink size={16} />
            </a>
            
            {techStack.length > 0 && (
              <button
                onClick={() => setShowTechStack(!showTechStack)}
                style={!isDark ? { color: colors.accent, borderColor: colors.accent } : {}}
                className="px-6 py-2 border coffee-text dark:text-cafe-cream dark:border-cafe-cream transition-all duration-300 font-light tracking-wide text-sm flex items-center gap-2"
              >
                <Code size={16} />
                tech stack
                <ChevronDown size={18} className={`transform transition-transform duration-300 ${showTechStack ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
          
          {/* Tech Stack List */}
          {showTechStack && techStack.length > 0 && (
            <div className="w-full border-t border-cafe-espresso/10 dark:border-cafe-cream/10 pt-4 mt-auto">
              <div className="coffee-text dark:text-cafe-cream text-xs font-light uppercase tracking-widest mb-3">
                technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    style={!isDark ? { backgroundColor: colors.light, color: colors.accent } : {}}
                    className="px-3 py-1 bg-cafe-cream/30 dark:bg-cafe-espresso/30 coffee-text dark:text-cafe-cream text-xs font-light rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;