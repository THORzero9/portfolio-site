'use client';

import { motion } from 'framer-motion';
import { TECH_STACK } from '@/lib/constants';

export const TechStackScreen: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 shadow-lg">
        <h2 className="font-display text-2xl font-bold text-white mb-2 tracking-wide">Tech Stack</h2>
        <p className="font-body text-white/90">Technologies I work with</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {TECH_STACK.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
              {category.category}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {category.technologies.map((tech, techIndex) => (
                <motion.div
                  key={tech.name}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{tech.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-gray-900 dark:text-gray-100 text-sm">
                        {tech.name}
                      </h4>
                      <p className="font-body text-xs text-gray-600 dark:text-gray-400">
                        Expert
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
