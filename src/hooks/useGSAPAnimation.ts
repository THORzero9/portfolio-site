import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { 
  createOptimizedAnimation, 
  createStaggerAnimation, 
  createScrollTriggerAnimation,
  cleanupAnimation,
  GSAP_CONFIG 
} from '@/lib/gsap';

interface UseGSAPAnimationOptions {
  duration?: number;
  ease?: string;
  delay?: number;
  onComplete?: () => void;
}

export const useGSAPAnimation = (options: UseGSAPAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const animate = useCallback((animationType: string, customOptions?: UseGSAPAnimationOptions) => {
    if (!elementRef.current) return;

    const mergedOptions = { ...options, ...customOptions };
    
    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create animation using the optimized function
    const animation = createOptimizedAnimation(elementRef.current, animationType);
    
    if (animation) {
      // Call the animation function with delay if specified
      animationRef.current = animation(mergedOptions.delay || 0);
      
      // Add completion callback
      if (mergedOptions.onComplete && animationRef.current) {
        animationRef.current.eventCallback('onComplete', mergedOptions.onComplete);
      }
    }

    return animationRef.current;
  }, [options]);

  const hoverScale = useCallback((scale = 1.05) => {
    if (!elementRef.current) return;
    return gsap.to(elementRef.current, {
      scale,
      duration: GSAP_CONFIG.duration.micro,
      ease: GSAP_CONFIG.ease.smooth,
      force3D: true
    });
  }, []);

  const resetScale = useCallback(() => {
    if (!elementRef.current) return;
    return gsap.to(elementRef.current, {
      scale: 1,
      duration: GSAP_CONFIG.duration.micro,
      ease: GSAP_CONFIG.ease.smooth,
      force3D: true
    });
  }, []);

  const killAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      killAnimation();
    };
  }, [killAnimation]);

  return {
    elementRef,
    animate,
    hoverScale,
    resetScale,
    killAnimation,
    gsap
  };
};

// Hook for stagger animations on multiple elements
export const useGSAPStagger = (selector: string, options: UseGSAPAnimationOptions = {}) => {
  const containerRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const staggerIn = useCallback((animationType: 'slideIn' | 'fadeIn' | 'scaleIn' = 'fadeIn', stagger = 0.1) => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = createStaggerAnimation(elements, animationType, stagger);
    
    if (options.onComplete && animationRef.current) {
      animationRef.current.eventCallback('onComplete', options.onComplete);
    }

    return animationRef.current;
  }, [selector, options]);

  const killAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      killAnimation();
    };
  }, [killAnimation]);

  return {
    containerRef,
    staggerIn,
    killAnimation
  };
}; 