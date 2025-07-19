export type SectionId = 'hero' | 'about' | 'projects' | 'tech-stack' | 'contact';

export type PhoneState = 'hidden' | 'backView' | 'flipping' | 'immersive' | 'flippingBack' | 'disappearing';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoVideo: string;
  githubUrl: string;
  liveUrl: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface TechCategory {
  category: string;
  technologies: Technology[];
}

export interface PhoneScreenContent {
  type: 'hero' | 'about' | 'projects' | 'tech-stack' | 'contact';
  content: React.ReactNode;
}

export interface ScrollProgress {
  progress: number;
  currentSection: SectionId;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}

export interface AboutInfo {
  summary: string;
  highlights: string[];
}
