'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG, ABOUT_ME } from '@/lib/constants';
import { Download, ExternalLink, Github, Linkedin, MapPin, Calendar } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col transition-colors">
      {/* Enhanced Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 shadow-lg">
        <div className="flex items-center space-x-4">
          {/* Enhanced Profile Picture */}
          <motion.div 
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="font-display text-white text-2xl font-bold">BG</span>
          </motion.div>
          
          <div className="flex-1">
            <motion.h2 
              className="font-display text-2xl font-bold text-white tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {PORTFOLIO_CONFIG.personal.name}
            </motion.h2>
            <motion.p 
              className="font-body text-white/90 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {PORTFOLIO_CONFIG.personal.title}
            </motion.p>
            
            {/* Quick Stats */}
            <motion.div 
              className="flex items-center space-x-4 mt-2 text-white/80 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span className="font-body">{PORTFOLIO_CONFIG.personal.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span className="font-body">Android Developer</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Content with Cards */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* About Summary Card */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
            About Me
          </h3>
          <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed">
            {ABOUT_ME.summary}
          </p>
        </motion.div>

        {/* Education Card */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></div>
            Education
          </h3>
          <div className="space-y-2">
            <h4 className="font-display font-semibold text-gray-900 dark:text-gray-100">{ABOUT_ME.education.degree}</h4>
            <p className="font-body text-gray-700 dark:text-gray-300">{ABOUT_ME.education.institution}</p>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400">{ABOUT_ME.education.location} • {ABOUT_ME.education.duration}</p>
          </div>
        </motion.div>

        {/* Enhanced Highlights Card */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
            Key Highlights
          </h3>
          <div className="space-y-3">
            {ABOUT_ME.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-body text-gray-700 dark:text-gray-300 leading-relaxed">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <motion.button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            onClick={() => handleLinkClick(PORTFOLIO_CONFIG.personal.resumeUrl)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={20} />
            <span className="font-body">Download Resume</span>
          </motion.button>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              className="bg-[#0077B5] text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-[#006399] transition-all shadow-md hover:shadow-lg"
              onClick={() => handleLinkClick(PORTFOLIO_CONFIG.personal.linkedin)}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Linkedin size={18} />
              <span className="font-body">LinkedIn</span>
            </motion.button>

            <motion.button
              className="bg-gray-900 dark:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
              onClick={() => handleLinkClick(PORTFOLIO_CONFIG.personal.github)}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={18} />
              <span className="font-body">GitHub</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
