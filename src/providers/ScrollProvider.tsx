'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { SectionId, PhoneState } from '@/lib/types';

interface ScrollContextType {
  // Main scroll state (READ-ONLY for phone content)
  progress: number;
  currentSection: SectionId;
  phoneState: PhoneState;
  isImmersive: boolean;
  
  // Phone interaction state
  isPhoneContentActive: boolean;
  setPhoneContentActive: (active: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const scrollData = useScrollProgress();
  
  // Phone content interaction state (independent of main scroll)
  const [isPhoneContentActive, setIsPhoneContentActive] = useState(false);
  
  const value: ScrollContextType = {
    ...scrollData,
    isPhoneContentActive,
    setPhoneContentActive: setIsPhoneContentActive
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within ScrollProvider');
  }
  return context;
}; 