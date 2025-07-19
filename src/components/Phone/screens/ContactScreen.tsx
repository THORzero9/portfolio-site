'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/lib/constants';
import { Mail, Phone, MapPin, Linkedin, Github, Download } from 'lucide-react';

export const ContactScreen: React.FC = () => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${PORTFOLIO_CONFIG.personal.email}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${PORTFOLIO_CONFIG.personal.phone}`, '_blank');
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 shadow-lg">
        <h2 className="font-display text-2xl font-bold text-white mb-2 tracking-wide">Contact</h2>
        <p className="font-body text-white/90">Let&apos;s get in touch</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Contact Info Cards */}
        <div className="space-y-4 mb-8">
          {/* Email Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={handleEmailClick}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Mail size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm">{PORTFOLIO_CONFIG.personal.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={handlePhoneClick}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Phone size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100">Phone</h3>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm">{PORTFOLIO_CONFIG.personal.phone}</p>
              </div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <MapPin size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100">Location</h3>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm">{PORTFOLIO_CONFIG.personal.location}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect</h3>
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

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
        </motion.div>
      </div>
    </div>
  );
};
