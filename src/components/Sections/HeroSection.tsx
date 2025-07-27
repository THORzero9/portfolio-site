'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { useScrollContext } from '@/providers/ScrollProvider';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameSpanRef = useRef<HTMLSpanElement>(null);
  const glowLayerRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollDotRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);
  const floatingShape1Ref = useRef<HTMLDivElement>(null);
  const floatingShape2Ref = useRef<HTMLDivElement>(null);
  const floatingShape3Ref = useRef<HTMLDivElement>(null);

  // Get scroll context for parallax
  const { progress, phoneState } = useScrollContext();

  useEffect(() => {
    // Initialize background shapes for production-safe animations
    const shapes = [floatingShape1Ref.current, floatingShape2Ref.current, floatingShape3Ref.current];
    shapes.forEach(shape => {
      if (shape) {
        // Force hardware acceleration and proper transform setup
        gsap.set(shape, {
          transformOrigin: 'center center',
          force3D: true,
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        });
        
        // Ensure CSS classes are applied
        shape.classList.add('floating-shape', 'transform-gpu');
      }
    });

    // Initial entrance animations with stagger - new order
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.2)' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30, x: -20 },
      { opacity: 1, y: 0, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power1.inOut' },
      '-=0.4'
    )
    .fromTo(badgeRef.current,
      { opacity: 0, y: 30, scale: 0.8, rotation: -3 },
      { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' },
      '-=0.3'
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.1)' },
      '-=0.2'
    );

    // Continuous floating animation for scroll dot
    gsap.to(scrollDotRef.current, {
      y: 20,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Continuous floating for background shapes with production-safe transforms
    if (floatingShape1Ref.current) {
      gsap.to(floatingShape1Ref.current, {
        y: -15,
        x: 10,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true,
        transformOrigin: 'center center'
      });
    }

    if (floatingShape2Ref.current) {
      gsap.to(floatingShape2Ref.current, {
        y: 20,
        x: -15,
        rotation: -3,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
        force3D: true,
        transformOrigin: 'center center'
      });
    }

    if (floatingShape3Ref.current) {
      gsap.to(floatingShape3Ref.current, {
        y: -10,
        x: 8,
        rotation: 2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
        force3D: true,
        transformOrigin: 'center center'
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Parallax effects based on scroll progress and phone state
  useEffect(() => {
    if (!backgroundElementsRef.current) return;

    // Calculate parallax intensity based on phone state
    let parallaxIntensity = 1;
    let depthShift = 0;

    if (phoneState === 'backView') {
      // Subtle movement during back view
      parallaxIntensity = 0.3;
      depthShift = progress * 20;
    } else if (phoneState === 'flipping') {
      // More dramatic movement during flip
      parallaxIntensity = 0.6;
      depthShift = progress * 30;
    } else if (phoneState === 'immersive') {
      // Gentle background movement during immersive
      parallaxIntensity = 0.2;
      depthShift = progress * 15;
    }

    // Apply parallax to main content
    gsap.to(titleRef.current, {
      y: progress * 50 * parallaxIntensity,
      x: progress * 20 * parallaxIntensity,
      duration: 0.3,
      ease: 'none'
    });

    gsap.to(subtitleRef.current, {
      y: progress * 30 * parallaxIntensity,
      x: progress * -15 * parallaxIntensity,
      duration: 0.3,
      ease: 'none'
    });

    // Apply different parallax speeds to background shapes with production-safe transforms
    if (floatingShape1Ref.current) {
      gsap.set(floatingShape1Ref.current, {
        y: -progress * 80 * parallaxIntensity + depthShift,
        x: progress * 40 * parallaxIntensity,
        rotation: progress * 15,
        scale: 1 - progress * 0.1,
        opacity: Math.max(0.1, 1 - progress * 0.7),
        force3D: true,
        transformOrigin: 'center center',
        immediateRender: true
      });
    }

    if (floatingShape2Ref.current) {
      gsap.set(floatingShape2Ref.current, {
        y: -progress * 60 * parallaxIntensity + depthShift,
        x: progress * -30 * parallaxIntensity,
        rotation: progress * -20,
        scale: 1 - progress * 0.15,
        opacity: Math.max(0.1, 1 - progress * 0.8),
        force3D: true,
        transformOrigin: 'center center',
        immediateRender: true
      });
    }

    if (floatingShape3Ref.current) {
      gsap.set(floatingShape3Ref.current, {
        y: -progress * 100 * parallaxIntensity + depthShift,
        x: progress * 25 * parallaxIntensity,
        rotation: progress * 10,
        scale: 1 - progress * 0.2,
        opacity: Math.max(0.1, 1 - progress * 0.9),
        force3D: true,
        transformOrigin: 'center center',
        immediateRender: true
      });
    }

    // Fade out scroll indicator as phone appears
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        opacity: Math.max(0, 1 - progress * 3),
        y: progress * 20,
        duration: 0.3,
        ease: 'none'
      });
    }
  }, [progress, phoneState]);

  // Text-shape following glow effect
  const handleNameMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!nameSpanRef.current || !glowLayerRef.current) return;
    
    const rect = nameSpanRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate relative position (0-100%)
    const relativeX = (x / rect.width) * 100;
    const relativeY = (y / rect.height) * 100;
    
    // Create dynamic glow intensity based on cursor position
    const centerDistance = Math.sqrt(
      Math.pow((relativeX - 50) / 50, 2) + 
      Math.pow((relativeY - 50) / 50, 2)
    );
    const glowIntensity = Math.max(0.3, 1 - centerDistance * 0.5);
    
    // Dynamic text-stroke and glow that follows cursor
    gsap.to(glowLayerRef.current, {
      opacity: glowIntensity,
      filter: `
        drop-shadow(${(relativeX - 50) * 0.1}px ${(relativeY - 50) * 0.1}px 4px rgba(59, 130, 246, ${glowIntensity * 0.9}))
        drop-shadow(${(relativeX - 50) * 0.2}px ${(relativeY - 50) * 0.2}px 8px rgba(147, 51, 234, ${glowIntensity * 0.7}))
        drop-shadow(${(relativeX - 50) * 0.3}px ${(relativeY - 50) * 0.3}px 12px rgba(59, 130, 246, ${glowIntensity * 0.5}))
      `,
      duration: 0.1,
      ease: 'none'
    });
  };

  const handleNameHover = () => {
    if (glowLayerRef.current) {
      gsap.to(glowLayerRef.current, {
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleNameLeave = () => {
    if (glowLayerRef.current) {
      gsap.to(glowLayerRef.current, {
        opacity: 0,
        filter: `
          drop-shadow(0 0 4px rgba(59, 130, 246, 0))
          drop-shadow(0 0 8px rgba(147, 51, 234, 0))
          drop-shadow(0 0 12px rgba(59, 130, 246, 0))
        `,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950"
    >
      {/* Parallax Background Elements */}
      <div ref={backgroundElementsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Shape 1 */}
        <div 
          ref={floatingShape1Ref}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-800/20 dark:to-purple-800/20 blur-sm floating-shape transform-gpu float-animation-1"
        />
        
        {/* Floating Shape 2 */}
        <div 
          ref={floatingShape2Ref}
          className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 dark:from-purple-800/30 dark:to-pink-800/30 blur-sm floating-shape transform-gpu float-animation-2"
        />
        
        {/* Floating Shape 3 */}
        <div 
          ref={floatingShape3Ref}
          className="absolute bottom-40 left-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-blue-300/30 to-cyan-300/30 dark:from-blue-700/20 dark:to-cyan-700/20 blur-sm floating-shape transform-gpu float-animation-3"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="font-display text-6xl lg:text-8xl text-gray-900 dark:text-gray-100 leading-tight tracking-tight mb-6"
        >
          Hey, I'm{' '}
                    <span 
            ref={nameSpanRef}
            className="cursor-pointer inline-block"
            onMouseMove={handleNameMouseMove}
            onMouseEnter={handleNameHover}
            onMouseLeave={handleNameLeave}
            style={{
              willChange: 'filter, text-shadow',
              position: 'relative'
            }}
          >
            {/* Base text with gradient */}
            <span 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
              style={{
                WebkitTextStroke: '0px transparent',
                transition: 'all 0.1s ease'
              }}
            >
              {PORTFOLIO_CONFIG.personal.name.split(' ')[0]}
              </span>
            
            {/* Glowing text layer that follows cursor */}
            <span 
              ref={glowLayerRef}
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent opacity-0 pointer-events-none"
              style={{
                WebkitTextStroke: '1px rgba(59, 130, 246, 0.8)',
                filter: `
                  drop-shadow(0 0 4px rgba(59, 130, 246, 0.8))
                  drop-shadow(0 0 8px rgba(147, 51, 234, 0.6))
                  drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))
                `,
                willChange: 'opacity, filter'
              }}
            >
              {PORTFOLIO_CONFIG.personal.name.split(' ')[0]}
            </span>
          </span>
        </h1>
            
        <p
          ref={subtitleRef}
          className="font-body text-xl lg:text-2xl text-gray-600 dark:text-gray-400 font-medium tracking-wide mb-6"
            >
              {PORTFOLIO_CONFIG.personal.title}
        </p>
            
        <p
          ref={descriptionRef}
          className="font-body text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8"
            >
              Passionate about building full-stack, AI-powered applications using Kotlin and Jetpack Compose. 
              Specializing in modern Android development with GCP integration and MVVM architecture.
        </p>

        {/* Available Badge - Now at the end */}
        <div ref={badgeRef} className="inline-block mb-12">
          <span className="px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-lg font-semibold border border-green-200 dark:border-green-800/50 shadow-sm">
            Available for opportunities
          </span>
          </div>

        {/* Enhanced scroll indicator */}
        <div
          ref={scrollIndicatorRef}
              className="flex flex-col items-center space-y-6 pt-8"
            >
              <p className="font-body text-lg text-gray-600 dark:text-gray-400 font-medium">
            Scroll to experience
              </p>
          <div className="flex flex-col items-center space-y-3">
                <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
              <div
                ref={scrollDotRef}
                    className="w-1 h-3 bg-gray-600 dark:bg-gray-400 rounded-full mt-2"
                  />
                </div>
                                 <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
