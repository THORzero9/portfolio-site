'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SectionId } from '@/lib/types';
import { HeroScreen } from './screens/HeroScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { TechStackScreen } from './screens/TechStackScreen';
import { ContactScreen } from './screens/ContactScreen';

interface PhoneScreenProps {
  currentSection: SectionId;
  progress: number;
}

export const PhoneScreen: React.FC<PhoneScreenProps> = ({ currentSection, progress }) => {
  const renderScreen = () => {
    switch (currentSection) {
      case 'hero':
        return <HeroScreen key="hero" />;
      case 'about':
        return <AboutScreen key="about" />;
      case 'projects':
        return <ProjectsScreen key="projects" progress={progress} />;
      case 'tech-stack':
        return <TechStackScreen key="tech-stack" />;
      case 'contact':
        return <ContactScreen key="contact" />;
      default:
        return <HeroScreen key="hero" />;
    }
  };

  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
