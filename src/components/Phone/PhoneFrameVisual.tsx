'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { PhoneState } from '@/lib/types';
import { Wifi, Signal, Battery, Bluetooth, Volume } from 'lucide-react';

interface PhoneFrameVisualProps {
  phoneState: PhoneState;
  progress: number;
  children?: React.ReactNode;
}

export const PhoneFrameVisual: React.FC<PhoneFrameVisualProps> = ({ 
  phoneState, 
  progress, 
  children 
}) => {
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const backViewRef = useRef<HTMLDivElement>(null);
  const frontViewRef = useRef<HTMLDivElement>(null);

  // Visual state calculations (no event handling)
  const getViewOpacities = () => {
    if (phoneState === 'flipping') {
      const fadeProgress = (progress - 0.42) / (0.52 - 0.42); // Updated to new shorter timing
      const easedProgress = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);
      return {
        backOpacity: 1 - easedProgress,
        frontOpacity: easedProgress
      };
    }
    if (phoneState === 'flippingBack') {
      const fadeProgress = (progress - 0.82) / (0.90 - 0.82); // Updated to new timing
      const easedProgress = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);
      return {
        backOpacity: easedProgress,
        frontOpacity: 1 - easedProgress
      };
    }
    return {
      backOpacity: phoneState === 'immersive' ? 0 : 1,
      frontOpacity: phoneState === 'immersive' ? 1 : 0
    };
  };

  // Visual animations only - no touch/scroll concerns
  useEffect(() => {
    if (!phoneContainerRef.current) return;

    const currentScale = phoneState === 'backView' ? 0.94 + (progress * 0.6) :
                        phoneState === 'flipping' || phoneState === 'immersive' ? 1.2 :  // Reduced from 1.5 to 1.2
                        phoneState === 'disappearing' ? 1.2 - (progress - 0.90) * 4 : 0.94;

    const currentOpacity = phoneState === 'disappearing' ? (progress > 0.95 ? 0 : 1) : 1;
    
    // Progressive rotation during flipping state - SHORTENED for snappier animation
    const getRotationY = () => {
      if (phoneState === 'flipping') {
        // Smooth rotation during flip (42% to 52% progress) - SHORTER duration
        const flipProgress = (progress - 0.42) / (0.52 - 0.42);
        return Math.min(Math.max(flipProgress, 0), 1) * 180; // 0° to 180°
      }
      if (phoneState === 'flippingBack') {
        // Smooth rotation back from front to back (82% to 90% progress) - SHORTER duration
        const flipBackProgress = (progress - 0.82) / (0.90 - 0.82);
        return 180 - (Math.min(Math.max(flipBackProgress, 0), 1) * 180); // 180° to 0°
      }
      return phoneState === 'immersive' ? 180 : 0;
    };
    
    const currentRotationY = getRotationY();
    const currentZ = phoneState === 'backView' ? -200 :
                     phoneState === 'immersive' ? 50 :
                     phoneState === 'disappearing' ? -500 : -200;

    gsap.to(phoneContainerRef.current, {
      scale: currentScale,
      opacity: currentOpacity,
      rotationY: currentRotationY,
      z: currentZ,
      duration: phoneState === 'flipping' ? 0.8 : 1.2, // Faster animation during flip for responsiveness
      ease: phoneState === 'flipping' ? 'power2.inOut' : 'power1.inOut',
      transformOrigin: 'center center',
      transformStyle: 'preserve-3d'
    });
  }, [phoneState, progress]);

  // Opacity animations for front/back views
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

  if (phoneState === 'hidden') return null;

  return (
    <div
      ref={phoneContainerRef}
      className="relative phone-3d-element"
      style={{
        width: PORTFOLIO_CONFIG.phone.width,
        height: PORTFOLIO_CONFIG.phone.height,
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        scale: 0.94,
        opacity: 1,
        pointerEvents: 'none'  // Visual only - no interactions
      }}
    >
      {/* Nothing Phone 2a BACK VIEW */}
      <div 
        ref={backViewRef}
        className="absolute inset-0 phone-animation"
        style={{
          transform: 'rotateY(0deg)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/images/phone-2a-back.png)',
              backgroundSize: 'contain'
            }}
          />
        </div>
      </div>

      {/* Nothing Phone 2a FRONT VIEW */}
      <div 
        ref={frontViewRef}
        className="absolute inset-0 phone-animation"
        style={{
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
            style={{
              backgroundImage: 'url(/assets/images/phone-2a-front.png)',
              backgroundSize: 'contain'
            }}
          />
          {/* Content Area - This will be overlaid by separate content layer */}
          <div className="absolute inset-0 pointer-events-none">
            {children}
          </div>
        </div>
      </div>


    </div>
  );
}; 