'use client';

import { PhoneScreen } from './PhoneScreen';
import { useScrollContext } from '@/providers/ScrollProvider';
import { PORTFOLIO_CONFIG } from '@/lib/constants';

export const PhoneContentLayer: React.FC = () => {
  const { currentSection, phoneState, progress, setPhoneContentActive } = useScrollContext();

  // Show content during immersive state - but now it's controlled by main scroll
  if (phoneState !== 'immersive') {
    return null;
  }

  // Calculate immersive progress for content positioning
  const PHASE_3_END = 0.52;  // Start of immersive
  const PHASE_4_END = 0.82;  // End of immersive
  const immersiveProgress = (progress - PHASE_3_END) / (PHASE_4_END - PHASE_3_END);
  
  // Calculate content offset based on main scroll progress
  const contentOffset = immersiveProgress * 100; // 0% to 100% of content

  return (
    <div 
      className="fixed inset-0 z-[99] flex items-center justify-center pointer-events-none"
      style={{
        // Position behind the phone visual frame
        transform: 'translateZ(-1px)' // Slightly behind to ensure frame is on top
      }}
    >
      <div 
        className="relative pointer-events-auto"
        style={{
          width: PORTFOLIO_CONFIG.phone.width,
          height: PORTFOLIO_CONFIG.phone.height,
          transform: 'scale(1.2)', // Match the visual phone scale during immersive
          transformOrigin: 'center center'
        }}
        onMouseEnter={() => setPhoneContentActive(true)}
        onMouseLeave={() => setPhoneContentActive(false)}
        onFocus={() => setPhoneContentActive(true)}
        onBlur={() => setPhoneContentActive(false)}
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
            background: 'transparent'
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
            {/* Single-scroll content container */}
            <div 
              className="w-full transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(-${contentOffset}%)`,
                height: '300%' // 3x height to accommodate all sections
              }}
            >
              {/* About Section */}
              <div className="h-full">
                <PhoneScreen 
                  currentSection="about"
                  progress={progress}
                  phoneState={phoneState}
                />
              </div>
              
              {/* Projects Section */}
              <div className="h-full">
                <PhoneScreen 
                  currentSection="projects"
                  progress={progress}
                  phoneState={phoneState}
                />
              </div>
              
              {/* Tech Stack Section */}
              <div className="h-full">
                <PhoneScreen 
                  currentSection="tech-stack"
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