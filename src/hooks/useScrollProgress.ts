'use client';

import { useState, useEffect } from 'react';
import { SectionId, PhoneState } from '@/lib/types';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<SectionId>('hero');
  const [phoneState, setPhoneState] = useState<PhoneState>('hidden');

  // 6-Phase Cinematic Experience - Extended & Fluidic Transitions (NO GAPS!)
  const PHASE_1_END = 0.10;      // End of hero section - phone hidden (shorter)
  const PHASE_2_START = 0.10;    // Nothing Phone back appears immediately - NO GAP!
  const PHASE_2_MID = 0.30;      // Back view zooming in gradually (much longer)
  const PHASE_2_END = 0.45;      // Back view fully zoomed and close (extended)
  const PHASE_3_START = 0.45;    // Start fade from back to front - NO GAP!
  const PHASE_3_MID = 0.50;      // Mid fade transition (gradual)
  const PHASE_3_END = 0.55;      // Complete fade, immersive begins
  const PHASE_4_END = 0.85;      // End of immersive content (longer experience)
  const PHASE_5_START = 0.85;    // Start fade from front to back - NO GAP!
  const PHASE_5_MID = 0.87;      // Mid fade back transition  
  const PHASE_5_END = 0.89;      // Complete fade to back
  const PHASE_6_START = 0.89;    // Phone disappears slowly - NO GAP!

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(scrollTop / Math.max(docHeight, 1), 1));
      setProgress(scrollProgress);

      // Debug logging
      // console.log('Scroll progress:', Math.round(scrollProgress * 100) + '%', 'Phone state:', phoneState);

      // 6-Phase State Management - Fixed to prevent phone disappearing
      if (scrollProgress < PHASE_1_END) {
        // Phase 1: Hero section - phone hidden
        setCurrentSection('hero');
        if (phoneState !== 'hidden') {
          setPhoneState('hidden');
        }
      } else if (scrollProgress >= PHASE_2_START && scrollProgress < PHASE_2_MID) {
        // Phase 2: Nothing Phone back view appears gradually
        setCurrentSection('about');
        if (phoneState !== 'backView') {
          setPhoneState('backView');
        }
      } else if (scrollProgress >= PHASE_2_MID && scrollProgress < PHASE_2_END) {
        // Phase 2: Back view getting closer
        setCurrentSection('about');
        if (phoneState !== 'backView') {
          setPhoneState('backView');
        }
      } else if (scrollProgress >= PHASE_3_START && scrollProgress < PHASE_3_MID) {
        // Phase 3: Rotation from back to front - REMOVED setTimeout
        setCurrentSection('about');
        if (phoneState !== 'flipping') {
          setPhoneState('flipping');
        }
      } else if (scrollProgress >= PHASE_3_MID && scrollProgress < PHASE_3_END) {
        // Phase 3: Mid rotation
        setCurrentSection('about');
        if (phoneState !== 'flipping') {
          setPhoneState('flipping');
        }
      } else if (scrollProgress >= PHASE_3_END && scrollProgress < PHASE_4_END) {
        // Phase 4: Immersive content experience - Cycle through sections
        if (phoneState !== 'immersive') {
          setPhoneState('immersive');
        }
        
        // Smooth section progression during immersive mode
        const immersiveSections: SectionId[] = ['about', 'projects', 'tech-stack'];
        const immersiveProgress = (scrollProgress - PHASE_3_END) / (PHASE_4_END - PHASE_3_END);
        const sectionIndex = Math.floor(immersiveProgress * immersiveSections.length);
        const clampedIndex = Math.min(sectionIndex, immersiveSections.length - 1);
        const newSection = immersiveSections[clampedIndex];
        
        if (currentSection !== newSection) {
          setCurrentSection(newSection);
        }
      } else if (scrollProgress >= PHASE_5_START && scrollProgress < PHASE_5_MID) {
        // Phase 5: Fade from front to back - Keep tech-stack visible during transition
        setCurrentSection('tech-stack');
        if (phoneState !== 'flippingBack') {
          setPhoneState('flippingBack');
        }
      } else if (scrollProgress >= PHASE_5_MID && scrollProgress < PHASE_5_END) {
        // Phase 5: Complete fade to back - Show clean back view
        setCurrentSection('tech-stack');  // Keep last section during fade
        if (phoneState !== 'flippingBack') {
          setPhoneState('flippingBack');
        }
      } else {
        // Phase 6: ONLY NOW - phone gradually disappears from close to far (89%+)
        setCurrentSection('tech-stack');  // Keep clean state
        if (phoneState !== 'disappearing' && phoneState !== 'hidden') {
          setPhoneState('disappearing');
        }
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll);
    calculateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [phoneState, currentSection]);

  return { 
    progress, 
    currentSection, 
    phoneState,
    isImmersive: phoneState === 'immersive',
    zoomTriggers: {
      phase1End: PHASE_1_END,
      phase2Start: PHASE_2_START,
      phase2Mid: PHASE_2_MID,
      phase2End: PHASE_2_END,
      phase3Start: PHASE_3_START,
      phase3Mid: PHASE_3_MID,
      phase3End: PHASE_3_END,
      phase4End: PHASE_4_END,
      phase5Start: PHASE_5_START,
      phase5Mid: PHASE_5_MID,
      phase5End: PHASE_5_END,
      phase6Start: PHASE_6_START,
    }
  };
};
