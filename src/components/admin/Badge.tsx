import React from 'react';

interface BadgeProps {
  status?: string;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status = 'default', children, className = '' }) => {
  const getBadgeStyle = () => {
    switch (status?.toUpperCase()) {
      case 'PUBLISHED':
      case 'ACTIVE':
      case 'SUPER_ADMIN':
      case 'HARDWARE':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30';
      case 'DRAFT':
      case 'PENDING':
      case 'EDITOR':
      case 'IN_REVIEW':
        return 'bg-amber-950/40 text-amber-400 border border-amber-500/30';
      case 'ARCHIVED':
      case 'INACTIVE':
      case 'CLOSED':
        return 'bg-slate-900/60 text-[var(--admin-muted)] border border-slate-700/40';
      case 'SOFTWARE':
      case 'ADMIN':
      case 'CONTACTED':
        return 'bg-blue-950/40 text-blue-400 border border-blue-500/30';
      case 'NEW':
        return 'bg-purple-950/40 text-purple-400 border border-purple-500/30';
      default:
        return 'bg-slate-900/50 text-[var(--admin-copy)] border border-slate-700/30';
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
