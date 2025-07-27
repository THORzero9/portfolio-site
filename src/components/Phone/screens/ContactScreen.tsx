'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { Mail, Phone, MapPin, Github, Linkedin, FileText } from 'lucide-react';
import { createOptimizedAnimation, createStaggerAnimation, cleanupAnimation } from '@/lib/gsap';

export const ContactScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  
  // Animation refs for cleanup
  const animationsRef = useRef<(gsap.core.Tween | gsap.core.Timeline | null)[]>([]);

  useEffect(() => {
    // Initial entrance animations with stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.contact-card');
      const staggerAnim = createStaggerAnimation(cards, 'slideIn', 0.1);
      animationsRef.current.push(staggerAnim);
    }

    if (socialLinksRef.current) {
      const links = socialLinksRef.current.querySelectorAll('.social-link');
      const socialAnim = createStaggerAnimation(links, 'scaleIn', 0.05);
      animationsRef.current.push(socialAnim);
    }

    if (ctaButtonsRef.current) {
      const buttons = ctaButtonsRef.current.querySelectorAll('.cta-button');
      const buttonAnim = createStaggerAnimation(buttons, 'fadeIn', 0.1);
      animationsRef.current.push(buttonAnim);
    }

    // Cleanup function
    return () => {
      animationsRef.current.forEach(anim => cleanupAnimation(anim));
      animationsRef.current = [];
    };
  }, []);

  // Enhanced button interaction handlers
  const handleButtonHover = (e: React.MouseEvent<HTMLElement>) => {
    // Check if it's the white button (email) or transparent button (resume)
    const isWhiteButton = e.currentTarget.classList.contains('bg-white');
    const glowColor = isWhiteButton ? 'rgba(59, 130, 246, 0.6)' : 'rgba(255, 255, 255, 0.6)'; // Blue glow for white, white for transparent
    
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -2,
      boxShadow: `0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1), 0 0 20px ${glowColor}`,
      filter: 'brightness(1.1) saturate(1.1)',
      duration: 0.15,
      ease: 'power2.out',
      force3D: true
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      filter: 'brightness(1) saturate(1)',
      duration: 0.2,
      ease: 'power2.out',
      force3D: true
    });
  };

  const handleButtonPress = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power3.inOut',
      force3D: true
    });
  };

  const handleButtonRelease = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.15,
      ease: 'back.out(1.7)',
      force3D: true
    });
  };

  // Card hover effects
  const handleCardHover = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      y: -4,
      scale: 1.02,
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2), 0 6px 15px rgba(0, 0, 0, 0.15), 0 0 25px rgba(59, 130, 246, 0.4)',
      filter: 'brightness(1.15) saturate(1.2)',
      duration: 0.3,
      ease: 'power2.out',
      force3D: true
    });
    
    // Enhance the icon with colored glow
    const icon = e.currentTarget.querySelector('.contact-icon');
    if (icon) {
      gsap.to(icon, {
        scale: 1.15,
        rotation: 5,
        filter: 'brightness(1.3) drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))',
        duration: 0.3,
        ease: 'back.out(1.7)',
        force3D: true
      });
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      filter: 'brightness(1) saturate(1)',
      duration: 0.3,
      ease: 'power2.out',
      force3D: true
    });
    
    // Reset the icon
    const icon = e.currentTarget.querySelector('.contact-icon');
    if (icon) {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        filter: 'brightness(1) drop-shadow(none)',
        duration: 0.3,
        ease: 'power2.out',
        force3D: true
      });
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-3 shadow-lg">
        <h2 className="font-display text-xl font-bold text-center">Contact</h2>
        <p className="font-body text-sm text-center opacity-90 mt-1">Let's connect</p>
      </div>

      {/* Content */}
      <div 
        ref={containerRef}
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
        {/* Contact Cards */}
        <div ref={cardsRef} className="space-y-4 mb-6">
          {/* Email Card */}
          <div 
            className="contact-card bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 cursor-pointer transition-all duration-300"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="flex items-center space-x-3">
              <div className="contact-icon w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-display font-semibold">Email</h3>
                <p className="font-body text-sm opacity-80">{PORTFOLIO_CONFIG.personal.email}</p>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div 
            className="contact-card bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 cursor-pointer transition-all duration-300"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="flex items-center space-x-3">
              <div className="contact-icon w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-display font-semibold">Phone</h3>
                <p className="font-body text-sm opacity-80">{PORTFOLIO_CONFIG.personal.phone}</p>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div 
            className="contact-card bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 cursor-pointer transition-all duration-300"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="flex items-center space-x-3">
              <div className="contact-icon w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-display font-semibold">Location</h3>
                <p className="font-body text-sm opacity-80">{PORTFOLIO_CONFIG.personal.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div ref={socialLinksRef} className="space-y-3 mb-6">
          <h3 className="font-display font-semibold text-lg mb-3">Connect with me</h3>
          
          <a 
            href={PORTFOLIO_CONFIG.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 cursor-pointer transition-all duration-300"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="contact-icon w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Github size={16} />
            </div>
            <span className="font-body text-sm">GitHub</span>
          </a>

          <a 
            href={PORTFOLIO_CONFIG.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 cursor-pointer transition-all duration-300"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <div className="contact-icon w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Linkedin size={16} />
            </div>
            <span className="font-body text-sm">LinkedIn</span>
          </a>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaButtonsRef} className="space-y-3">
          <a 
            href={`mailto:${PORTFOLIO_CONFIG.personal.email}`}
            className="cta-button block w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-display font-semibold text-center shadow-lg transition-all duration-300"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onFocus={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.3)',
                duration: 0.2,
                ease: 'power2.out'
              });
            }}
            onBlur={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                duration: 0.2,
                ease: 'power2.out'
              });
            }}
            >
            <div className="flex items-center justify-center space-x-2">
              <Mail size={18} />
              <span>Send Email</span>
          </div>
          </a>

          <a 
            href={PORTFOLIO_CONFIG.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button block w-full bg-white/20 backdrop-blur-sm border border-white/30 py-3 px-4 rounded-lg font-display font-semibold text-center shadow-lg transition-all duration-300"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onFocus={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.3)',
                duration: 0.2,
                ease: 'power2.out'
              });
            }}
            onBlur={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                duration: 0.2,
                ease: 'power2.out'
              });
            }}
          >
            <div className="flex items-center justify-center space-x-2">
              <FileText size={18} />
              <span>Download Resume</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
