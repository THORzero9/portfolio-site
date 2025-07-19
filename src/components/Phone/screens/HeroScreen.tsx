'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { ChevronDown, Unlock } from 'lucide-react';

export const HeroScreen: React.FC = () => {
  return (
    <div className="w-full h-full bg-black text-white relative overflow-hidden">
      {/* Nothing OS Wallpaper Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Lock Screen Time Display */}
      <motion.div
        className="text-center pt-16 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="font-display text-6xl font-thin mb-1 tracking-wide">12:30</div>
        <div className="font-body text-base font-light opacity-70">Friday, January 18</div>
      </motion.div>

      {/* Profile Section - Nothing OS Style */}
      <motion.div
        className="absolute bottom-28 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
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
      </motion.div>

      {/* Android/Nothing OS Unlock Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center space-x-2 text-xs opacity-60 mb-2">
          <Unlock size={12} />
          <span className="font-body font-light">Scroll to unlock</span>
        </div>
        <motion.div
          className="w-10 h-0.5 bg-white rounded-full opacity-40"
          animate={{ 
            scaleX: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Ambient light effects - Nothing Phone signature */}
      <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
      <div className="absolute bottom-20 left-0 w-16 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
};
