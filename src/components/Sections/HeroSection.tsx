'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero transition-colors">
      <div className="container mx-auto px-4 text-center">
        {/* Centered Content */}
        <motion.div
          className="space-y-10 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-block"
            >
              <span className="px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-lg font-semibold border border-green-200 dark:border-green-800/50 shadow-sm">
                Available for opportunities
              </span>
            </motion.div>
            
            <motion.h1
              className="font-display text-6xl lg:text-8xl text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {PORTFOLIO_CONFIG.personal.name}
            </motion.h1>
            
            <motion.p
              className="font-body text-2xl lg:text-4xl text-gray-600 dark:text-gray-400 font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {PORTFOLIO_CONFIG.personal.title}
            </motion.p>
            
            <motion.p
              className="font-body text-xl text-gray-500 dark:text-gray-500 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Android Developer with hands-on experience building full-stack, AI-powered applications using Kotlin and Jetpack Compose. 
              Specializing in modern Android development with GCP integration and MVVM architecture.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col items-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              onClick={() => {
                window.scrollTo({ 
                  top: window.innerHeight * 0.2, 
                  behavior: 'smooth' 
                });
              }}
              className="btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Portfolio
            </motion.button>
            
            <motion.div
              className="flex flex-col items-center space-y-6 pt-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-body text-lg text-gray-600 dark:text-gray-400 font-medium">
                Scroll to experience my Nothing Phone interface
              </p>
              <motion.div
                className="flex flex-col items-center space-y-3"
              >
                <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
                  <motion.div
                    className="w-1 h-3 bg-gray-600 dark:bg-gray-400 rounded-full mt-2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Scroll</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
