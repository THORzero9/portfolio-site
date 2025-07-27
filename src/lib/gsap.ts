// Enhanced GSAP utilities with performance optimizations
import { gsap } from 'gsap';

// Performance-optimized animation configurations
export const GSAP_CONFIG = {
  // Smoother easing curves for better feel
  ease: {
    smooth: 'power2.out',
    bouncy: 'back.out(1.4)',
    elastic: 'elastic.out(1, 0.4)',
    flow: 'sine.inOut',
    snap: 'power3.inOut'
  },
  
  // Performance settings
  performance: {
    force3D: true,
    transformOrigin: 'center center',
    transformStyle: 'preserve-3d'
  },
  
  // Optimized durations
  duration: {
    micro: 0.15,    // Button hovers, small interactions
    quick: 0.3,     // Card flips, state changes
    smooth: 0.6,    // Page transitions
    dramatic: 1.2   // Major state changes
  }
};

// Performance-optimized animation presets
export const createOptimizedAnimation = (element: HTMLElement | null, type: string) => {
  if (!element) return null;
  
  // Add performance optimizations
  gsap.set(element, {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    perspective: 1000,
    transformStyle: 'preserve-3d'
  });
  
  const animations = {
    // Micro-interactions (super fast, GPU optimized)
    buttonHover: () => gsap.to(element, {
      scale: 1.05,
      duration: GSAP_CONFIG.duration.micro,
      ease: GSAP_CONFIG.ease.smooth,
      force3D: true
    }),
    
    buttonPress: () => gsap.to(element, {
      scale: 0.95,
      duration: GSAP_CONFIG.duration.micro,
      ease: GSAP_CONFIG.ease.snap,
      force3D: true
    }),
    
    // Card animations with stagger support
    cardIn: (delay = 0) => gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 30, 
        scale: 0.9,
        rotationX: -10,
        force3D: true
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationX: 0,
        duration: GSAP_CONFIG.duration.smooth,
        ease: GSAP_CONFIG.ease.bouncy,
        delay,
        force3D: true
      }
    ),
    
    // Floating animation for continuous movement
    float: () => gsap.to(element, {
      y: -8,
      duration: 2,
      ease: GSAP_CONFIG.ease.flow,
      repeat: -1,
      yoyo: true,
      force3D: true
    }),
    
    // Parallax effect
    parallax: (progress: number, intensity = 0.5) => gsap.to(element, {
      y: progress * intensity * 100,
      duration: 0.1,
      ease: 'none',
      force3D: true
    })
  };
  
  return animations[type as keyof typeof animations];
};

// Optimized stagger animations
export const createStaggerAnimation = (
  elements: NodeListOf<Element> | Element[],
  animationType: 'slideIn' | 'fadeIn' | 'scaleIn' = 'slideIn',
  staggerDelay = 0.1
) => {
  if (!elements.length) return null;
  
  const timeline = gsap.timeline();
  
  // Set initial states with performance optimizations
  gsap.set(elements, {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    force3D: true
  });
  
  const animations = {
    slideIn: {
      from: { opacity: 0, y: 40, rotationX: -5 },
      to: { opacity: 1, y: 0, rotationX: 0, duration: GSAP_CONFIG.duration.smooth, ease: GSAP_CONFIG.ease.bouncy }
    },
    fadeIn: {
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1, duration: GSAP_CONFIG.duration.quick, ease: GSAP_CONFIG.ease.smooth }
    },
    scaleIn: {
      from: { opacity: 0, scale: 0.5, rotation: -5 },
      to: { opacity: 1, scale: 1, rotation: 0, duration: GSAP_CONFIG.duration.smooth, ease: GSAP_CONFIG.ease.elastic }
    }
  };
  
  const config = animations[animationType];
  
  // Set initial state
  gsap.set(elements, { ...config.from, force3D: true });
  
  // Animate with stagger
  timeline.to(elements, {
    ...config.to,
    stagger: staggerDelay,
    force3D: true
  });
  
  return timeline;
};

// Cleanup function for performance
export const cleanupAnimation = (animation: gsap.core.Tween | gsap.core.Timeline | null) => {
  if (animation) {
    animation.kill();
    return null;
  }
  return null;
};

// Optimized scroll-triggered animation
export const createScrollTriggerAnimation = (
  element: HTMLElement,
  animationType: 'slideUp' | 'fadeIn' | 'scaleIn' = 'slideUp'
) => {
  if (!element) return null;
  
  // Performance optimization
  gsap.set(element, {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    force3D: true
  });
  
  const animations = {
    slideUp: {
      from: { opacity: 0, y: 50, scale: 0.95 },
      to: { opacity: 1, y: 0, scale: 1 }
    },
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    scaleIn: {
      from: { opacity: 0, scale: 0.8, rotation: -2 },
      to: { opacity: 1, scale: 1, rotation: 0 }
    }
  };
  
  const config = animations[animationType];
  
  // Set initial state
  gsap.set(element, { ...config.from, force3D: true });
  
  // Create intersection observer for performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(element, {
            ...config.to,
            duration: GSAP_CONFIG.duration.smooth,
            ease: GSAP_CONFIG.ease.bouncy,
            force3D: true
          });
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.1, rootMargin: '50px' }
  );
  
  observer.observe(element);
  
  return observer;
}; 