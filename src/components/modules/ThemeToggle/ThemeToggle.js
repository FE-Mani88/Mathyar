import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 left-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg 
                hover:scale-110 hover:shadow-xl
                transform transition-all duration-400 ease-in-out"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <div className={`absolute inset-0 transform transition-transform duration-400 ${isDark ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
          <Sun className="w-5 h-5 text-yellow-500" />
        </div>
        <div className={`absolute inset-0 transform transition-transform duration-400 ${!isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
          <Moon className="w-5 h-5 text-gray-700" />
        </div>
      </div>
    </button>
  );
}