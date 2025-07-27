'use client';

import { HeroSection } from '@/components/Sections/HeroSection';
import { PhoneFrameVisual } from '@/components/Phone/PhoneFrameVisual';
import { PhoneContentLayer } from '@/components/Phone/PhoneContentLayer';
import { ScrollProvider, useScrollContext } from '@/providers/ScrollProvider';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const HomeContent: React.FC = () => {
  const { progress, currentSection, phoneState } = useScrollContext();
  const overlayRef1 = useRef<HTMLDivElement>(null);
  const overlayRef2 = useRef<HTMLDivElement>(null);
  const overlayRef3 = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (phoneState === 'immersive') {
      // Smooth overlay entrance with staggered effect
      timelineRef.current = gsap.timeline();
      
      if (overlayRef1.current) {
        timelineRef.current.to(overlayRef1.current, { 
          opacity: 0.9, 
          duration: 1.2, 
          ease: 'power2.inOut'
        });
      }
      
      if (overlayRef2.current) {
        timelineRef.current.to(overlayRef2.current, { 
          opacity: 1, 
          duration: 1.4, 
          ease: 'power1.inOut' 
        }, '-=0.8');
      }
      
      if (overlayRef3.current) {
        timelineRef.current.to(overlayRef3.current, { 
          opacity: 1, 
          duration: 1.6, 
          ease: 'sine.inOut' 
        }, '-=1.0');
      }
    } else {
      // Smooth overlay exit with null checks
      const overlayElements = [overlayRef1.current, overlayRef2.current, overlayRef3.current].filter(Boolean);
      
      if (overlayElements.length > 0) {
        timelineRef.current = gsap.timeline();
        timelineRef.current.to(overlayElements, { 
          opacity: 0, 
          duration: 1.0,
          ease: 'power2.inOut',
          stagger: 0.1
        });
      }
    }

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [phoneState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 transition-colors duration-300">
      {/* Enhanced Background Overlay for Immersive Mode */}
          <>
        <div
          ref={overlayRef1}
              className="fixed inset-0 z-40 pointer-events-none"
              style={{
            background: 'radial-gradient(ellipse 400px 600px at center, transparent 0%, transparent 35%, rgba(0,0,0,0.9) 50%)',
            opacity: 0,
            display: phoneState === 'immersive' ? 'block' : 'none'
              }}
            />
        <div
          ref={overlayRef2}
              className="fixed inset-0 z-40 pointer-events-none"
              style={{
            background: 'radial-gradient(ellipse 500px 700px at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 60%)',
            opacity: 0,
            display: phoneState === 'immersive' ? 'block' : 'none'
              }}
            />
        <div
          ref={overlayRef3}
              className="fixed inset-0 z-40 pointer-events-none"
              style={{
            background: 'radial-gradient(ellipse 450px 650px at center, transparent 0%, transparent 38%, rgba(59,130,246,0.05) 55%)',
            opacity: 0,
            display: phoneState === 'immersive' ? 'block' : 'none'
              }}
            />
          </>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Portfolio Content */}
      <div className="relative">
        {/* Visual Phone Frame (3D animations only) */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <PhoneFrameVisual 
            phoneState={phoneState} 
            progress={progress}
          />
            </div>

        {/* Independent Phone Content Layer (scrollable content) */}
        <PhoneContentLayer />

        {/* Spacer for scroll content - Extra long for dramatic zoom-in dissolve */}
        <div className="h-[1000vh]"></div>

        {/* Centered Get In Touch Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center gradient-hero transition-colors"
        >
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="space-y-10">
              <h2 
                className="font-display text-5xl lg:text-7xl text-gray-900 dark:text-gray-100 mb-8 tracking-tight"
              >
                Get In Touch
              </h2>
              
              <p 
                className="font-body text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                I&apos;m always open to discussing new opportunities and interesting projects. 
                Let&apos;s connect and see how we can work together to create something amazing.
              </p>
              
              <div 
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <a
                  href={`mailto:${PORTFOLIO_CONFIG.personal.email}`}
                  className="btn-primary"
                >
                  Send Email
                </a>
                <a
                  href={PORTFOLIO_CONFIG.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0077B5] hover:bg-[#006399] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  LinkedIn
                </a>
                <a
                  href={PORTFOLIO_CONFIG.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <ScrollProvider>
      <HomeContent />
    </ScrollProvider>
  );
}
