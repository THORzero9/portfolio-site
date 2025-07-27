'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { PORTFOLIO_CONFIG, ABOUT_ME } from '@/lib/constants';
import { Download, ExternalLink, Github, Linkedin, MapPin, Calendar } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const educationCardRef = useRef<HTMLDivElement>(null);
  const highlightsCardRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Create master timeline for smooth orchestration
    const tl = gsap.timeline();

    // Enhanced profile picture entrance
    tl.fromTo(profileRef.current,
      { scale: 0, rotation: -10, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.3)' }
    );

    // Flowing text animations
    tl.fromTo(nameRef.current,
      { opacity: 0, x: -30, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.2)' },
      '-=0.5'
    )
    .fromTo(titleRef.current,
      { opacity: 0, x: -25, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(statsRef.current,
      { opacity: 0, y: 15, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power1.inOut' },
      '-=0.3'
    );

    // Staggered card animations with enhanced effects
    const cards = [aboutCardRef.current, educationCardRef.current, highlightsCardRef.current];
    cards.forEach((card, index) => {
      if (card) {
        tl.fromTo(card,
          { opacity: 0, y: 30, scale: 0.95, rotation: index % 2 === 0 ? -1 : 1 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotation: 0,
            duration: 0.8, 
            ease: 'back.out(1.1)' 
          },
          `-=${0.6 - index * 0.1}`
        );
      }
    });

    // Smooth button entrance
    tl.fromTo(buttonsRef.current,
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.1)' },
      '-=0.4'
    );

    // Enhanced highlight items with wave effect
    tl.fromTo('.highlight-item',
      { opacity: 0, x: -20, scale: 0.9 },
      { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        duration: 0.6, 
        stagger: {
          amount: 0.4,
          from: 'start',
          ease: 'power1.inOut'
        },
        ease: 'back.out(1.1)' 
      },
      '-=0.5'
    );

    // Add subtle floating animations
    gsap.to(profileRef.current, {
      y: -3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col transition-colors">
      {/* Enhanced Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 shadow-lg">
        <div className="flex items-center space-x-4">
          {/* Enhanced Profile Picture */}
          <div 
            ref={profileRef}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-xl"
          >
            <span className="font-display text-white text-2xl font-bold">BG</span>
          </div>
          
          <div className="flex-1">
            <h2 
              ref={nameRef}
              className="font-display text-2xl font-bold text-white tracking-wide"
            >
              {PORTFOLIO_CONFIG.personal.name}
            </h2>
            <p 
              ref={titleRef}
              className="font-body text-white/90 text-lg"
            >
              {PORTFOLIO_CONFIG.personal.title}
            </p>
            
            {/* Quick Stats */}
            <div 
              ref={statsRef}
              className="flex items-center space-x-4 mt-2 text-white/80 text-sm"
            >
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span className="font-body">{PORTFOLIO_CONFIG.personal.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span className="font-body">Android Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content with Cards */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 px-3 py-3 overflow-y-auto"
        style={{
          // Pure native scrolling - no interference
          touchAction: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        }}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          setScrollPosition(target.scrollTop);
        }}
      >
        {/* About Summary Card */}
        <div 
          ref={aboutCardRef}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
            About Me
          </h3>
          <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed">
            {ABOUT_ME.summary}
          </p>
        </div>

        {/* Education Card */}
        <div 
          ref={educationCardRef}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></div>
            Education
          </h3>
          <div className="space-y-2">
            <h4 className="font-display font-semibold text-gray-900 dark:text-gray-100">{ABOUT_ME.education.degree}</h4>
            <p className="font-body text-gray-700 dark:text-gray-300">{ABOUT_ME.education.institution}</p>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400">{ABOUT_ME.education.location} • {ABOUT_ME.education.duration}</p>
          </div>
        </div>

        {/* Enhanced Highlights Card */}
        <div 
          ref={highlightsCardRef}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
            Key Highlights
          </h3>
          <div className="space-y-3">
            {ABOUT_ME.highlights.map((highlight, index) => (
              <div
                key={index}
                className="highlight-item flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-body text-gray-700 dark:text-gray-300 leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div 
          ref={buttonsRef}
          className="space-y-4"
        >
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            onClick={() => handleLinkClick(PORTFOLIO_CONFIG.personal.resumeUrl)}
          >
            <Download size={20} />
            <span className="font-body">Download Resume</span>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-[#0077B5] text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-[#006399] transition-all shadow-md hover:shadow-lg"
              onClick={() => handleLinkClick(PORTFOLIO_CONFIG.personal.linkedin)}
            >
              <Linkedin size={18} />
              <span className="font-body">LinkedIn</span>
            </button>

            <button
              className="bg-gray-900 dark:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
              onClick={() => handleLinkClick(PORTFOLIO_CONFIG.personal.github)}
            >
              <Github size={18} />
              <span className="font-body">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
