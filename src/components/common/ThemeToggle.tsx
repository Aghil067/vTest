import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`h-[38px] ${showLabel ? 'px-3' : 'w-[38px]'} inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 border cursor-pointer backdrop-blur-md ${
        isDark
          ? 'bg-white/[0.04] hover:bg-[#2ECC71]/10 border-white/10 hover:border-[#2ECC71]/40 text-[#2ECC71] hover:shadow-[0_0_14px_rgba(46,204,113,0.25)] shadow-[0_2px_6px_rgba(0,0,0,0.15)]'
          : 'bg-black/[0.03] hover:bg-green-50 border-slate-200 text-slate-800 hover:text-black shadow-xs hover:border-green-500/40 hover:shadow-[0_0_12px_rgba(34,197,94,0.2)]'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold uppercase tracking-wider">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
