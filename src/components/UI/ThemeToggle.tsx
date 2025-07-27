'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  const handleClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Show loading state until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed top-8 right-8 z-50 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse shadow-lg border border-gray-300 dark:border-gray-600" />
    );
  }

  return (
    <button
      onClick={handleClick}
      className="fixed top-8 right-8 z-50 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="transition-transform duration-200">
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-600" />
        )}
      </div>
    </button>
  );
};
