'use client';

import { gsap } from 'gsap';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { SectionId, PhoneState } from '@/lib/types';
import { Wifi, Signal, Battery, Bluetooth, Volume } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface PhoneFrameProps {
  currentSection: SectionId;
  phoneState: PhoneState;
  children: React.ReactNode;
  progress: number;  // Add progress for gradual zoom animations
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ currentSection, phoneState, children, progress }) => {
  const [responsiveScale, setResponsiveScale] = useState(1.4);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const backViewRef = useRef<HTMLDivElement>(null);
  const frontViewRef = useRef<HTMLDivElement>(null);
  
  // Calculate dramatic zoom for back view (10-45% - starts even bigger!)
  const getBackViewScale = () => {
    if (progress < 0.10) return 0.94;  // Start very big and prominent
    if (progress > 0.45) return 1.6;   // Zoom in dramatically to dissolve into screen
    // Dramatic zoom IN from 0.94 to 1.6 between 10-45% (dissolves into screen!)
    const zoomProgress = (progress - 0.10) / (0.45 - 0.10);
    // Use eased progression for more dramatic effect
    const easedProgress = zoomProgress * zoomProgress; // Quadratic easing
    return 0.94 + (easedProgress * 0.66);  // 0.94 → 1.6 (dramatic zoom to fill screen)
  };
  
  // Calculate fade opacities during transition (45-55% and 85-89% - NO GAPS!)
  const getViewOpacities = () => {
    if (phoneState === 'flipping') {
      const fadeProgress = (progress - 0.45) / (0.55 - 0.45);  // 0 to 1 during fade 
      // Use smooth easing for more blended transition
      const easedProgress = fadeProgress * fadeProgress * (3 - 2 * fadeProgress); // Smoothstep easing
      return {
        backOpacity: 1 - easedProgress,  // Fade out smoothly
        frontOpacity: easedProgress      // Fade in smoothly
      };
    }
    if (phoneState === 'flippingBack') {
      const fadeProgress = (progress - 0.85) / (0.89 - 0.85);  // 0 to 1 during fade back 
      // Use smooth easing for consistent blended transition
      const easedProgress = fadeProgress * fadeProgress * (3 - 2 * fadeProgress); // Smoothstep easing
      return {
        backOpacity: easedProgress,      // Fade in smoothly
        frontOpacity: 1 - easedProgress  // Fade out smoothly
      };
    }
    // Fixed visibility logic - front view only during immersive, back view for all other states
    return {
      backOpacity: phoneState === 'immersive' ? 0 : 1,  // Hide back only during immersive
      frontOpacity: phoneState === 'immersive' ? 1 : 0  // Show front only during immersive
    };
  };
  
  // Calculate disappearing scale (89-100% - from close to far, only at the very end)
  const getDisappearingScale = () => {
    if (progress < 0.89) return 1.0;   // Full size until 89%
    if (progress > 1.0) return 0;     // Completely gone
    // Gradual zoom out from 1.0 to 0.2 between 89-100% (more dramatic exit)
    const disappearProgress = (progress - 0.89) / (1.0 - 0.89);
    return 1.0 - (disappearProgress * 0.8);  // Scale down to 0.2
  };

  // Calculate responsive scale based on viewport
  const calculateResponsiveScale = () => {
    if (typeof window === 'undefined') return 1.4;
    
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const phoneHeight = PORTFOLIO_CONFIG.phone.height;
    const phoneWidth = PORTFOLIO_CONFIG.phone.width;
    
    // Calculate max scale based on both dimensions with padding
    const maxScaleHeight = (viewportHeight * 0.8) / phoneHeight; // 80% of viewport height
    const maxScaleWidth = (viewportWidth * 0.6) / phoneWidth; // 60% of viewport width
    
    // Use the smaller of the two to ensure it fits in both dimensions
    const maxScale = Math.min(maxScaleHeight, maxScaleWidth);
    
    // Set bounds: minimum 1.0, maximum 1.6, and respect viewport limits
    return Math.max(1.0, Math.min(1.6, maxScale));
  };

  // Update scale on mount and window resize
  useEffect(() => {
    const updateScale = () => {
      setResponsiveScale(calculateResponsiveScale());
    };

    updateScale(); // Initial calculation
    window.addEventListener('resize', updateScale);
    
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Enhanced GSAP animations for smooth phone state changes with 3D rotation
  useEffect(() => {
    if (!phoneContainerRef.current) return;

    const currentScale = phoneState === 'backView' ? getBackViewScale() :
                        phoneState === 'flipping' ? responsiveScale * 0.9 :
                        phoneState === 'immersive' ? responsiveScale :
                        phoneState === 'flippingBack' ? responsiveScale * 0.9 :
                        phoneState === 'disappearing' ? getDisappearingScale() : getBackViewScale();

    const currentOpacity = phoneState === 'disappearing' ? (progress > 0.95 ? 0 : 1) : 1;

    // Clean rotation logic - back at 0°, front at 180°
    const currentRotationY = (phoneState === 'immersive' || phoneState === 'flippingBack') ? 180 : 0;

    const currentZ = phoneState === 'backView' ? -200 :
                     phoneState === 'flipping' || phoneState === 'flippingBack' ? 0 :
                     phoneState === 'immersive' ? 50 :
                     phoneState === 'disappearing' ? -500 : -200;

    // Use different easing based on phone state for smoother transitions
    const easing = phoneState === 'backView' ? 'power1.inOut' :
                   phoneState === 'flipping' || phoneState === 'flippingBack' ? 'power2.inOut' :
                   phoneState === 'immersive' ? 'back.out(1.1)' :
                   phoneState === 'disappearing' ? 'power2.in' : 'power1.inOut';

    const duration = phoneState === 'flipping' || phoneState === 'flippingBack' ? 1.0 : 
                     phoneState === 'immersive' ? 1.8 :
                     phoneState === 'disappearing' ? 1.2 : 1.8;

          gsap.to(phoneContainerRef.current, {
        scale: currentScale,
        opacity: currentOpacity,
        rotationY: currentRotationY,
        z: currentZ,
        duration,
        ease: easing,
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
        force3D: true,
        // Explicitly disable 3D context for child elements during scroll-critical states
        onComplete: () => {
          if (phoneContainerRef.current) {
            // Always set to flat when in immersive to enable scrolling
            phoneContainerRef.current.style.transformStyle = phoneState === 'immersive' ? 'flat' : 'preserve-3d';
            phoneContainerRef.current.style.pointerEvents = 'auto';
            
            // Remove any transforms that might interfere with scrolling in immersive mode
            if (phoneState === 'immersive') {
              phoneContainerRef.current.style.willChange = 'auto';
            }
          }
        }
      });

      // Also animate the background image for better scaling effect
      if (backViewRef.current) {
        const backImageDiv = backViewRef.current.querySelector('.phone-image');
        if (backImageDiv) {
          // Calculate image scale based on phone state and progress
          let imageScale = 1;
          if (phoneState === 'backView') {
            // Dramatic zoom for the image itself
            if (progress < 0.10) imageScale = 1;
            else if (progress > 0.45) imageScale = 1.8;
            else {
              const zoomProgress = (progress - 0.10) / (0.45 - 0.10);
              const easedProgress = zoomProgress * zoomProgress;
              imageScale = 1 + (easedProgress * 0.8); // 1 → 1.8
            }
          }
          
          gsap.set(backImageDiv, {
            scale: imageScale,
            force3D: true,
            transformOrigin: 'center center',
            immediateRender: true
          });
        }
      }
  }, [phoneState, progress, responsiveScale]);

  // Opacity-based visibility control - backup for smooth transitions
  useEffect(() => {
    const opacities = getViewOpacities();
    
    if (backViewRef.current) {
      gsap.to(backViewRef.current, {
        opacity: opacities.backOpacity,
        duration: 0.6,
        ease: 'power1.inOut'
      });
    }

    if (frontViewRef.current) {
      gsap.to(frontViewRef.current, {
        opacity: opacities.frontOpacity,
        duration: 0.6,
        ease: 'power1.inOut'
      });
    }
  }, [phoneState, progress]);

  // 3D Animation variants for Nothing Phone states
  const phoneVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotateY: 0,
      z: -500
    },
    backView: {
      scale: 0.8,
      opacity: 1,
      rotateY: 0,        // Back facing user
      z: -200
    },
    flipping: {
      scale: responsiveScale * 0.9,
      opacity: 1,
      rotateY: 90,       // Mid-rotation 
      z: 0
    },
    immersive: {
      scale: responsiveScale,
      opacity: 1,
      rotateY: 180,      // Front div shows (180° + 180° = 360° = 0°, facing user)
      z: 50
    },
    flippingBack: {
      scale: responsiveScale * 0.9,
      opacity: 1,
      rotateY: 270,      // Mid-rotation back
      z: 0
    },
    disappearing: {
      scale: 0.5,
      opacity: 0,
      rotateY: 0,        // Back facing user (full rotation cycle)
      z: -500
    }
  };

  // Transition settings based on state
  const getTransition = (state: PhoneState) => {
    switch (state) {
      case 'hidden':
        return { duration: 0.1 };
      case 'backView':
        return { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const };
      case 'flipping':
        return { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as const };
      case 'immersive':
        return { duration: 0.5, ease: "easeOut" as const };
      case 'flippingBack':
        return { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as const };
      case 'disappearing':
        return { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const };
      default:
        return { duration: 0.8 };
    }
  };

  // Hide completely when state is hidden
  if (phoneState === 'hidden') {
    return null;
  }

  // Let backface-visibility handle showing/hiding automatically based on rotation

  return (
    <div className="relative flex items-center justify-center phone-3d-container" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
      {/* Nothing Phone 2a Container - Browser-Compatible Flip */}
      <div
        ref={phoneContainerRef}
        className={`relative phone-3d-element phone-container`}
        style={{
          width: PORTFOLIO_CONFIG.phone.width,
          height: PORTFOLIO_CONFIG.phone.height,
          transformOrigin: 'center center',
          transformStyle: phoneState === 'immersive' ? 'flat' : 'preserve-3d',
          willChange: 'transform',
          scale: 0.94,  // Start with bigger scale immediately
          opacity: 1,
          pointerEvents: 'auto'  // Ensure touch events work
        }}
      >
        {/* Nothing Phone 2a BACK VIEW - Using Authentic Image Asset */}
        <div 
          ref={backViewRef}
          className={`absolute inset-0 phone-animation`}
          style={{
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            pointerEvents: 'auto',  // Ensure this view can receive touch events
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        >
          {/* Authentic Nothing Phone 2a Back Image */}
          <div 
            className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl phone-image" 
            style={{ 
              transformOrigin: 'center center',
              backgroundImage: 'url(/assets/images/phone-2a-back.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: 'scale(1)',
              willChange: 'transform'
            }}
          />
        </div>

        {/* Nothing Phone 2a FRONT VIEW */}
        <div 
          ref={frontViewRef}
          className={`absolute inset-0 phone-animation`}
          style={{
            zIndex: 1,
            transform: 'rotateY(180deg)',  // Restore proper rotation for flip
            backfaceVisibility: 'hidden',
            pointerEvents: 'auto'  // Ensure this view can receive touch events
          }}
        >
          {/* Enhanced Front Frame - Dark Gray/Black */}
          <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-[2px] shadow-2xl">
            {/* Premium inner frame */}
            <div className="relative w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-[2.4rem] p-1 shadow-inner">
              {/* Phone Screen with enhanced bezel */}
              <div className="relative w-full h-full bg-white rounded-[2.2rem] overflow-hidden shadow-inner">
                {/* Android Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-black flex items-center justify-between px-4 z-10">
                  <div className="flex items-center space-x-2">
                    <div className="text-white text-xs font-medium">12:30</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Wifi size={12} className="text-white" />
                    <Signal size={12} className="text-white" />
                    <Battery size={12} className="text-white" />
                    <Bluetooth size={10} className="text-white opacity-60" />
                    <Volume size={10} className="text-white opacity-60" />
                  </div>
                </div>

                {/* Phone Screen Content */}
                <div 
                  className="absolute inset-0 pt-8 pb-12" 
                  style={{ 
                    pointerEvents: 'auto',
                    transform: 'translateZ(0)',  // Force new layer to escape 3D context
                    willChange: 'auto'
                  }}
                  onMouseEnter={(e) => e.stopPropagation()}
                  onMouseLeave={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div 
                    className="w-full h-full relative" 
                    style={{ 
                      pointerEvents: 'auto',
                      touchAction: 'pan-y',  // Only allow vertical scrolling
                      WebkitOverflowScrolling: 'touch',
                      transform: 'translateZ(0)',  // Force hardware acceleration on separate layer
                      isolation: 'isolate'
                    }}
                  >
                    {children}
                  </div>
                </div>

                {/* Android Navigation Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-black flex items-center justify-center space-x-12 z-10">
                  <div className="w-6 h-0.5 bg-white rounded-full opacity-80"></div>
                  <div className="w-6 h-0.5 bg-white rounded-full"></div>
                  <div className="w-6 h-0.5 bg-white rounded-full opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


