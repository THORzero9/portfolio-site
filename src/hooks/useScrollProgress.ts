'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SectionId, PhoneState } from '@/lib/types';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<SectionId>('hero');
  const [phoneState, setPhoneState] = useState<PhoneState>('hidden');
  const [isImmersive, setIsImmersive] = useState(false);
  
  // Performance optimization refs
  const rafId = useRef<number>(0);
  const lastScrollTime = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  // Optimized phase boundaries - Prioritize content over transitions
  const PHASE_1_END = 0.05;      // End of hero section - phone hidden (shorter)
  const PHASE_2_START = 0.05;    // Nothing Phone back appears immediately - NO GAP!
  const PHASE_2_MID = 0.15;      // Back view zooming in gradually (shorter for content)
  const PHASE_2_END = 0.20;      // Back view fully zoomed and close (shorter)
  const PHASE_3_START = 0.20;    // Start flip from back to front - NO GAP!
  const PHASE_3_MID = 0.22;      // Mid flip transition (MUCH SHORTER)
  const PHASE_3_END = 0.25;      // Complete flip, immersive begins (MUCH SHORTER)
  const PHASE_4_END = 0.80;      // End of immersive content (MUCH LONGER - 55% of scroll!)
  const PHASE_5_START = 0.80;    // Start flip from front to back - NO GAP!
  const PHASE_5_MID = 0.82;      // Mid flip back transition (SHORTER)  
  const PHASE_5_END = 0.85;      // Complete flip to back (shorter)
  const PHASE_6_START = 0.85;    // Phone disappears slowly - NO GAP!

  // Enhanced mobile scroll support - ensure smooth progression
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // Optimized scroll calculation with RAF
  const calculateProgress = useCallback(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(scrollTop / Math.max(docHeight, 1), 1));
    
    // Track scroll direction for optimizations
    scrollDirection.current = scrollTop > lastScrollY.current ? 'down' : 'up';
    lastScrollY.current = scrollTop;
    
      setProgress(scrollProgress);

    // Optimized state management with early returns
      if (scrollProgress < PHASE_1_END) {
        // Phase 1: Hero section - phone hidden
        setCurrentSection('hero');
        if (phoneState !== 'hidden') {
          setPhoneState('hidden');
        setIsImmersive(false);
      }
      return;
        }

    if (scrollProgress >= PHASE_2_START && scrollProgress < PHASE_2_END) {
      // Phase 2: Nothing Phone back view appears and zooms
        setCurrentSection('about');
        if (phoneState !== 'backView') {
          setPhoneState('backView');
        setIsImmersive(false);
      }
      return;
        }

    if (scrollProgress >= PHASE_3_START && scrollProgress < PHASE_3_END) {
      // Phase 3: Flip from back to front (SHORTENED duration)
        setCurrentSection('about');
        if (phoneState !== 'flipping') {
          setPhoneState('flipping');
        setIsImmersive(false);
      }
      return;
        }

    if (scrollProgress >= PHASE_3_END && scrollProgress < PHASE_4_END) {
      // Phase 4: Immersive phone content experience - Single scroll controlled
        if (phoneState !== 'immersive') {
          setPhoneState('immersive');
        setIsImmersive(true);
        }
        
      // Single scroll: Content progression is now handled by CSS transforms
      // Keep current section as 'about' for the immersive phase
      setCurrentSection('about');
      return;
    }

    if (scrollProgress >= PHASE_5_START && scrollProgress < PHASE_5_END) {
      // Phase 5: Flip from front to back (SHORTENED duration)
        setCurrentSection('tech-stack');
        if (phoneState !== 'flippingBack') {
          setPhoneState('flippingBack');
        setIsImmersive(false);
      }
      return;
    }

    if (scrollProgress >= PHASE_6_START) {
      // Phase 6: Phone disappears, show regular content
      setCurrentSection('tech-stack');
      if (phoneState !== 'disappearing') {
          setPhoneState('disappearing');
        setIsImmersive(false);
      }
      return;
      }
  }, [phoneState]);

  // Debounced scroll handler with RAF for optimal performance
  const handleScroll = useCallback(() => {
    const now = performance.now();
    
    // Throttle to max 60fps for smooth experience
    if (now - lastScrollTime.current < 16) {
      return;
    }
    
    lastScrollTime.current = now;
    
    // Cancel previous RAF if still pending
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    // Use RAF for smooth animation updates
    rafId.current = requestAnimationFrame(calculateProgress);
  }, [calculateProgress]);

  useEffect(() => {
    // Initial calculation
    calculateProgress();

    // Add passive scroll listener for better performance
    const scrollOptions: AddEventListenerOptions = {
      passive: true,  // Passive listener for better performance
      capture: false
    };

    window.addEventListener('scroll', handleScroll, scrollOptions);
    window.addEventListener('resize', calculateProgress, scrollOptions);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
      
      // Cancel any pending RAF
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, calculateProgress]);

  // Performance monitoring (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'measure' && entry.name.includes('scroll')) {
            if (entry.duration > 16) {
              console.warn(`Slow scroll performance: ${entry.duration}ms`);
            }
          }
        });
      });
      
      try {
        performanceObserver.observe({ entryTypes: ['measure'] });
      } catch (e) {
        // Performance API not supported
      }
      
      return () => {
        performanceObserver.disconnect();
      };
    }
  }, []);

  return { 
    progress, 
    currentSection, 
    phoneState,
    isImmersive,
    // Additional performance data
    scrollDirection: scrollDirection.current
  };
};
