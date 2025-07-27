import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { animations, GSAP_CONFIG } from '@/lib/gsap';

interface UseGSAPAnimationOptions {
  duration?: number;
  ease?: string;
  delay?: number;
  onComplete?: () => void;
}

export const useGSAPAnimation = (options: UseGSAPAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const animate = useCallback((animationType: keyof typeof animations, customOptions?: UseGSAPAnimationOptions) => {
    if (!elementRef.current) return;

    const mergedOptions = { ...options, ...customOptions };
    
    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create new animation based on type
    switch (animationType) {
      case 'fadeIn':
        animationRef.current = animations.fadeIn(elementRef.current, mergedOptions.duration);
        break;
      case 'fadeOut':
        animationRef.current = animations.fadeOut(elementRef.current, mergedOptions.duration);
        break;
      case 'slideInUp':
        animationRef.current = animations.slideInUp(elementRef.current, mergedOptions.duration);
        break;
      case 'slideInDown':
        animationRef.current = animations.slideInDown(elementRef.current, mergedOptions.duration);
        break;
      case 'scaleIn':
        animationRef.current = animations.scaleIn(elementRef.current, mergedOptions.duration);
        break;
      case 'scaleOut':
        animationRef.current = animations.scaleOut(elementRef.current, mergedOptions.duration);
        break;
      default:
        animationRef.current = animations.fadeIn(elementRef.current, mergedOptions.duration);
    }

    // Add delay if specified
    if (mergedOptions.delay && animationRef.current) {
      animationRef.current.delay(mergedOptions.delay);
    }

    // Add completion callback
    if (mergedOptions.onComplete && animationRef.current) {
      animationRef.current.eventCallback('onComplete', mergedOptions.onComplete);
    }

    return animationRef.current;
  }, [options]);

  const hoverScale = useCallback((scale = 1.05) => {
    if (!elementRef.current) return;
    return animations.hoverScale(elementRef.current, scale);
  }, []);

  const resetScale = useCallback(() => {
    if (!elementRef.current) return;
    return animations.resetScale(elementRef.current);
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
    gsap,
    animations
  };
};

// Hook for stagger animations on multiple elements
export const useGSAPStagger = (selector: string, options: UseGSAPAnimationOptions = {}) => {
  const containerRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const staggerIn = useCallback((stagger = GSAP_CONFIG.stagger) => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = animations.staggerIn(selector, 'fadeIn', stagger);
    
    if (options.onComplete) {
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