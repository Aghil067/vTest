import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-[#16251b]/60 border border-[#1e3325]/50 rounded-xl ${className}`}
    />
  );
};

export default Skeleton;
