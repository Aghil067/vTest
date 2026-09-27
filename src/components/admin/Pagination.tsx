import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasPrev = currentPage > 1,
  hasNext = currentPage < totalPages,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between px-4 py-3 border-t border-[var(--admin-border)] sm:px-6">
      <div className="text-xs text-[var(--admin-muted)]">
        Page <span className="font-bold text-[var(--admin-heading)]">{currentPage}</span> of{' '}
        <span className="font-bold text-[var(--admin-heading)]">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] text-xs font-medium text-[var(--admin-copy)] hover:text-[var(--admin-heading)] hover:border-[#2ECC71]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] text-xs font-medium text-[var(--admin-copy)] hover:text-[var(--admin-heading)] hover:border-[#2ECC71]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
