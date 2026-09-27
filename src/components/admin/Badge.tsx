import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface BadgeProps {
  status?: string;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status = 'default', children, className = '' }) => {
  const { isDark } = useTheme();
  const getBadgeStyle = () => {
    switch (status?.toUpperCase()) {
      case 'PUBLISHED':
      case 'ACTIVE':
      case 'SUPER_ADMIN':
      case 'HARDWARE':
        return isDark ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-800 border border-emerald-200';
      case 'DRAFT':
      case 'PENDING':
      case 'EDITOR':
      case 'IN_REVIEW':
        return isDark ? 'bg-amber-950/40 text-amber-400 border border-amber-500/30' : 'bg-amber-50 text-amber-800 border border-amber-200';
      case 'ARCHIVED':
      case 'INACTIVE':
      case 'CLOSED':
        return isDark ? 'bg-slate-900/60 text-[var(--admin-muted)] border border-slate-700/40' : 'bg-slate-100 text-slate-700 border border-slate-200';
      case 'SOFTWARE':
      case 'ADMIN':
      case 'CONTACTED':
        return isDark ? 'bg-blue-950/40 text-blue-400 border border-blue-500/30' : 'bg-blue-50 text-blue-800 border border-blue-200';
      case 'NEW':
        return isDark ? 'bg-purple-950/40 text-purple-400 border border-purple-500/30' : 'bg-purple-50 text-purple-800 border border-purple-200';
      default:
        return isDark ? 'bg-slate-900/50 text-[var(--admin-copy)] border border-slate-700/30' : 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide font-mono ${getBadgeStyle()} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
