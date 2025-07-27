'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TECH_STACK } from '@/lib/constants';

export const TechStackScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      // Skip GSAP animation for Tech Stack to avoid interference with scrolling
      gsap.set(containerRef.current, { 
        opacity: 1, 
        y: 0,
        clearProps: "all"
      });
    }
  }, []);

  // Initialize scroll container with proper dimensions
  useEffect(() => {
    if (scrollContainerRef.current) {
      const target = scrollContainerRef.current;
      
      // Force a reflow to ensure proper dimensions
      const forceReflow = () => {
        target.offsetHeight; // Force reflow
        target.scrollTop = 0; // Reset scroll position
        
        // Force the container to have proper dimensions
        target.style.height = 'calc(100% - 120px)';
        target.style.maxHeight = 'calc(100% - 120px)';
      };
      
      // Initial check
      forceReflow();
      
      // Check again after a short delay to ensure dimensions are correct
      const timeoutId = setTimeout(() => {
        forceReflow();
        setIsInitialized(true);
      }, 100);
      
      // Additional check after a longer delay
      const longTimeoutId = setTimeout(forceReflow, 500);
      
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(longTimeoutId);
      };
    }
  }, []);

  // Additional initialization when component becomes active
  useEffect(() => {
    if (isInitialized && scrollContainerRef.current) {
      const target = scrollContainerRef.current;
      
      // Force another reflow after animation completes
      const animationTimeout = setTimeout(() => {
        target.offsetHeight; // Force reflow
      }, 600); // After GSAP animation completes
      
      return () => clearTimeout(animationTimeout);
    }
  }, [isInitialized]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 shadow-lg flex-shrink-0">
        <h2 className="font-display text-2xl font-bold text-white mb-2 tracking-wide">Tech Stack</h2>
        <p className="font-body text-white/90">Technologies I work with</p>
      </div>

      {/* Content */}
      <div 
        ref={scrollContainerRef}
        className="px-3 py-3 overflow-y-auto"
        style={{
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',  // Prevent scroll chaining
          height: 'calc(100% - 120px)', // Fixed height minus header
          maxHeight: 'calc(100% - 120px)' // Ensure consistent height
        }}


      >


        {TECH_STACK.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="mb-12"
          >
            <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
              {category.category}
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {category.technologies.map((tech, techIndex) => (
                <div
                  key={tech.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:scale-105 hover:-translate-y-1"
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
        
        {/* Extra spacing at bottom to ensure scrollable content */}
        <div className="h-20"></div>
        

        

      </div>
    </div>
  );
};
