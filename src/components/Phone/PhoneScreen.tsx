'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SectionId, PhoneState } from '@/lib/types';
import { HeroScreen } from './screens/HeroScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { TechStackScreen } from './screens/TechStackScreen';
import { ContactScreen } from './screens/ContactScreen';

interface PhoneScreenProps {
  currentSection: SectionId;
  progress: number;
  phoneState?: PhoneState;
}

export const PhoneScreen: React.FC<PhoneScreenProps> = ({ currentSection, progress, phoneState }) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const prevSectionRef = useRef<SectionId>(currentSection);

  useEffect(() => {
    if (!screenRef.current) return;

    // Skip animation on initial load
    if (prevSectionRef.current === currentSection) return;

    // Smooth screen transition with enhanced effects
    const tl = gsap.timeline();
    
    // Smooth transition that preserves scrolling functionality
    tl.to(screenRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        // Clear transforms after exit to reset for entrance
        gsap.set(screenRef.current, { clearProps: "transform" });
      }
    })
    // Enhanced entrance animation
    .fromTo(screenRef.current, {
      opacity: 0,
      scale: 0.98
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.1)',
      onComplete: () => {
        // Clear all transforms once animation is complete to restore normal scrolling
        gsap.set(screenRef.current, { clearProps: "all" });
      }
    });

    prevSectionRef.current = currentSection;
  }, [currentSection]);

  const renderScreen = () => {
    switch (currentSection) {
      case 'hero':
        return <HeroScreen key="hero" />;
      case 'about':
        return <AboutScreen key="about" />;
      case 'projects':
        return <ProjectsScreen key="projects" progress={progress} />;
      case 'tech-stack':
        return <TechStackScreen key="tech-stack" />;
      case 'contact':
        return <ContactScreen key="contact" />;
      default:
        return <HeroScreen key="hero" />;
    }
  };

  return (
    <div className="w-full h-full relative">
      <div
        ref={screenRef}
        key={currentSection}
        className="w-full h-full"
        style={{ 
          pointerEvents: 'auto',
          touchAction: 'auto'
        }}
      >
        {renderScreen()}
      </div>
    </div>
  );
};
