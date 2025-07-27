'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PROJECTS } from '@/lib/constants';
import { ExternalLink, Github, Play, Calendar } from 'lucide-react';

interface ProjectsScreenProps {
  progress: number;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ progress }) => {
  const getCurrentProject = () => {
    // Calculate progress within the Projects section specifically
    // Projects section runs from 0.25 to 0.50 of immersive phase
    const projectsStart = 0.25;
    const projectsEnd = 0.50;
    
    // Normalize progress to 0-1 range for Projects section
    const projectsProgress = Math.max(0, Math.min(1, (progress - projectsStart) / (projectsEnd - projectsStart)));
    
    // Map to project index - make first project appear earlier
    let projectIndex = 0;
    if (projectsProgress < 0.6) {
      projectIndex = 0; // Aura App - much more space
    } else if (projectsProgress < 0.8) {
      projectIndex = 1; // Fresh Save
    } else {
      projectIndex = 2; // Toolshare App
    }
    

    
    return PROJECTS[projectIndex];
  };

  const currentProject = getCurrentProject();

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/20 px-4 py-4 backdrop-blur-sm">
        <h2 className="font-display text-white text-lg font-semibold tracking-wide">Projects</h2>
      </div>

      {/* Project Demo Area */}
      <div className="flex-1 relative bg-black">
        <div
          key={currentProject.id}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Demo Video Placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <Play size={48} className="mx-auto mb-4 opacity-80" />
              <p className="font-body text-sm opacity-80">Demo Video</p>
              <p className="font-body text-xs opacity-60 mt-1">{currentProject.title}</p>
            </div>
          </div>
          </div>

        {/* Project Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {PROJECTS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === PROJECTS.indexOf(currentProject)
                  ? 'bg-white'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white px-4 py-6 space-y-4">
        <div>
          <h3 className="font-display text-lg font-bold text-gray-900 mb-2 tracking-wide">{currentProject.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <Calendar size={14} className="text-gray-500" />
            <span className="font-body text-sm text-gray-500">{currentProject.timeline}</span>
          </div>
          <p className="font-body text-gray-600 text-sm leading-relaxed">
            {currentProject.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="font-display text-sm font-semibold text-gray-900 mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {currentProject.techStack.map((tech, index) => (
              <span
                key={index}
                className="font-body bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors hover:scale-105 active:scale-95"
            onClick={() => handleLinkClick(currentProject.liveUrl)}
          >
            <ExternalLink size={16} />
            <span className="font-body">View Live</span>
          </button>

          <button
            className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors hover:scale-105 active:scale-95"
            onClick={() => handleLinkClick(currentProject.githubUrl)}
          >
            <Github size={16} />
            <span className="font-body">Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
