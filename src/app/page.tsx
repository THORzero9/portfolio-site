'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import { HeroSection } from '@/components/Sections/HeroSection';
import { PhoneFrame } from '@/components/Phone/PhoneFrame';
import { PhoneScreen } from '@/components/Phone/PhoneScreen';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { progress, currentSection, phoneState } = useScrollProgress();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Enhanced Background Overlay for Immersive Mode */}
      <AnimatePresence>
        {phoneState === 'immersive' && (
          <>
            <motion.div
              className="fixed inset-0 z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background: 'radial-gradient(ellipse 400px 600px at center, transparent 0%, transparent 35%, rgba(0,0,0,0.9) 50%)'
              }}
            />
            <motion.div
              className="fixed inset-0 z-40 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 500px 700px at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 60%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, delay: 0.3 }}
            />
            <motion.div
              className="fixed inset-0 z-40 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 450px 650px at center, transparent 0%, transparent 38%, rgba(59,130,246,0.05) 55%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Portfolio Content */}
      <div className="relative">
        {/* 3D Nothing Phone */}
        {phoneState !== 'hidden' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <PhoneFrame currentSection={currentSection} phoneState={phoneState} progress={progress}>
                <PhoneScreen currentSection={currentSection} progress={progress} />
              </PhoneFrame>
            </div>
          </div>
        )}

        {/* Spacer for scroll content - Extra long for dramatic zoom-in dissolve */}
        <div className="h-[1000vh]"></div>

        {/* Centered Get In Touch Section */}
        <motion.section
          id="contact"
          className="min-h-screen flex items-center justify-center gradient-hero transition-colors"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-5xl mx-auto px-4 text-center">
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2 
                className="font-display text-5xl lg:text-7xl text-gray-900 dark:text-gray-100 mb-8 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Get In Touch
              </motion.h2>
              
              <motion.p 
                className="font-body text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                I&apos;m always open to discussing new opportunities and interesting projects. 
                Let&apos;s connect and see how we can work together to create something amazing.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <motion.a
                  href={`mailto:${PORTFOLIO_CONFIG.personal.email}`}
                  className="btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Email
                </motion.a>
                <motion.a
                  href={PORTFOLIO_CONFIG.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0077B5] hover:bg-[#006399] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  LinkedIn
                </motion.a>
                <motion.a
                  href={PORTFOLIO_CONFIG.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  GitHub
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
