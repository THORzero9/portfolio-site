'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TECH_STACK } from '@/lib/constants';

export const TechStackScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power2.out',
          onComplete: () => {
            // Clear all GSAP properties after animation to ensure no interference
            gsap.set(containerRef.current, { clearProps: "all" });
          }
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 shadow-lg">
        <h2 className="font-display text-2xl font-bold text-white mb-2 tracking-wide">Tech Stack</h2>
        <p className="font-body text-white/90">Technologies I work with</p>
      </div>

      {/* Content */}
      <div 
        className="flex-1 px-3 py-3 overflow-y-auto"
                        style={{
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain'  // Prevent scroll chaining
        }}
        onWheel={(e) => {
          e.stopPropagation();
        }}
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
 
 
      >
        {TECH_STACK.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="mb-8"
          >
            <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
              {category.category}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {category.technologies.map((tech, techIndex) => (
                <div
                  key={tech.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:scale-105 hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{tech.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-gray-900 dark:text-gray-100 text-sm">
                        {tech.name}
                      </h4>

                    </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
