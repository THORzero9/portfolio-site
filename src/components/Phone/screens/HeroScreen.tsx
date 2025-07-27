'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { ChevronDown, Unlock } from 'lucide-react';

export const HeroScreen: React.FC = () => {
  const timeDisplayRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const unlockRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create orchestrated timeline for phone screen
    const tl = gsap.timeline();

    // Smooth time display entrance
    tl.fromTo(timeDisplayRef.current,
      { opacity: 0, y: -30, scale: 0.9, filter: 'blur(2px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'back.out(1.2)' }
    );

    // Profile section with bouncy entrance
    tl.fromTo(profileRef.current,
      { opacity: 0, scale: 0.7, y: 20, rotation: -3 },
      { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1.0, ease: 'elastic.out(1, 0.4)' },
      '-=0.4'
    );

    // Unlock indicator with smooth flow
    tl.fromTo(unlockRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.1)' },
      '-=0.3'
    );

    // Smooth continuous indicator animation
    gsap.to(indicatorRef.current, {
      scaleX: 1.3,
      opacity: 0.9,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Add subtle floating to profile
    gsap.to(profileRef.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full h-full bg-black text-white relative overflow-hidden">
      {/* Nothing OS Wallpaper Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Lock Screen Time Display */}
      <div ref={timeDisplayRef} className="text-center pt-16 mb-8">
        <div className="font-display text-6xl font-thin mb-1 tracking-wide">12:30</div>
        <div className="font-body text-base font-light opacity-70">Friday, January 18</div>
      </div>

      {/* Profile Section - Nothing OS Style */}
      <div ref={profileRef} className="absolute bottom-28 left-1/2 transform -translate-x-1/2 text-center">
        {/* Profile Picture with Nothing design language */}
        <div className="w-20 h-20 rounded-full border border-white/20 mb-4 mx-auto relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10">
            <span className="font-display text-xl font-medium text-white">BG</span>
          </div>
        </div>
        
        <h1 className="font-display text-xl font-medium mb-1 tracking-wide">{PORTFOLIO_CONFIG.personal.name}</h1>
        <p className="font-body text-sm opacity-70 font-light">{PORTFOLIO_CONFIG.personal.title}</p>
        
        {/* Nothing OS style indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2 opacity-60">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-50" />
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-30" />
        </div>
      </div>

      {/* Android/Nothing OS Unlock Indicator */}
      <div ref={unlockRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="flex items-center space-x-2 text-xs opacity-60 mb-2">
          <Unlock size={12} />
          <span className="font-body font-light">Scroll to unlock</span>
        </div>
        <div
          ref={indicatorRef}
          className="w-10 h-0.5 bg-white rounded-full opacity-40"
        />
      </div>

      {/* Ambient light effects - Nothing Phone signature */}
      <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
      <div className="absolute bottom-20 left-0 w-16 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
};
