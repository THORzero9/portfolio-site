'use client';

import { PhoneScreen } from './PhoneScreen';
import { useScrollContext } from '@/providers/ScrollProvider';
import { PORTFOLIO_CONFIG } from '@/lib/constants';

export const PhoneContentLayer: React.FC = () => {
  const { currentSection, phoneState, progress } = useScrollContext();

  // Show content during immersive state - but now it's controlled by main scroll
  if (phoneState !== 'immersive') {
    return null;
  }



  return (
    <div 
      className="fixed inset-0 z-[99] flex items-center justify-center"
      style={{
        // Position behind the phone visual frame
        transform: 'translateZ(-1px)' // Slightly behind to ensure frame is on top
      }}
    >
      <div 
        className="relative"
        style={{
          width: PORTFOLIO_CONFIG.phone.width,
          height: PORTFOLIO_CONFIG.phone.height,
          transform: 'scale(1.2)', // Match the visual phone scale during immersive
          transformOrigin: 'center center'
        }}
      >
        {/* Content area with precise positioning */}
        <div 
          className="absolute overflow-hidden"
          style={{
            // Precise positioning to match your PNG's transparent area
            top: '18px',        // Adjusted for your PNG's top spacing
            left: '15px',       // Adjusted for your PNG's side spacing
            right: '15px',      // Adjusted for your PNG's side spacing  
            bottom: '18px',     // Adjusted for your PNG's bottom spacing
            width: 'calc(100% - 30px)',  // Width accounting for side spacing (15px + 15px)
            height: 'calc(100% - 36px)', // Height accounting for top/bottom spacing (18px + 18px)
            borderRadius: '42px', // The radius that worked perfectly
            background: 'transparent',
            pointerEvents: 'auto' // Allow pointer events for scrolling
          }}
        >
          {/* Scaled content - edge-to-edge backgrounds, padded text */}
          <div 
            className="w-full h-full relative overflow-hidden"
            style={{
              transform: 'scale(0.85)', // Scale down content to fit comfortably
              transformOrigin: 'top left',
              width: '117.6%', // Compensate for scale reduction (100/0.85)
              height: '117.6%' // Compensate for scale reduction (100/0.85)
            }}
          >
            {/* Single section container */}
            <div 
              className="w-full h-full"
            >
              

                          {/* Single Section Display - Only show current section */}
            <div className="h-full relative flex items-center justify-center">
                <PhoneScreen 
                  currentSection={currentSection}
                  progress={progress}
                  phoneState={phoneState}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 