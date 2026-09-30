import { useEffect, useState } from 'react';
import defaultLogo from '@/assets/logo.png';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';

interface BrandLogoProps {
  className?: string;
  alt?: string;
  variant?: 'auto' | 'light' | 'dark';
  useImgOnly?: boolean;
}

export function BrandLogo({
  className = 'h-10 sm:h-11 w-auto max-w-[190px] object-contain',
  alt = 'Vetest',
  variant = 'auto',
  useImgOnly = false,
}: BrandLogoProps) {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const customLogo = settings?.general?.logo?.trim();

  const isDarkMode = variant === 'dark' ? true : variant === 'light' ? false : isDark;

  const sources = [
    ...(customLogo ? [customLogo] : []),
    isDarkMode ? '/logo-dark.png' : '/logo-light.png',
    defaultLogo,
    '/logo.png',
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [isDarkMode, customLogo]);

  const handleError = () => {
    if (index < sources.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  // If a custom logo URL is uploaded or image mode explicitly requested, render img element
  if (customLogo || useImgOnly) {
    return (
      <img
        src={sources[index]}
        alt={alt}
        className={className}
        onError={handleError}
        loading="eager"
        decoding="async"
      />
    );
  }

  // Vector Brand Logo — Transparent, Theme-Adaptive, Vector-Sharp, Perfectly Aligned
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';

  return (
    <div className={`inline-flex items-center justify-start select-none shrink-0 align-middle ${className}`}>
      <svg
        viewBox="0 0 148 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-h-full transition-colors duration-200"
        aria-label={alt}
        role="img"
      >
        <defs>
          <linearGradient id="brand_check_grad" x1="6" y1="24" x2="44" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#2ECC71" />
          </linearGradient>
          {isDarkMode && (
            <filter id="brand_check_glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#10B981" floodOpacity="0.4" />
            </filter>
          )}
        </defs>

        {/* Checkmark Icon ('V') */}
        <g filter={isDarkMode ? 'url(#brand_check_glow)' : undefined}>
          <path
            d="M 8 26 L 22 42 L 44 10"
            stroke="url(#brand_check_grad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 'etest' Wordmark — aligned baseline with V checkmark fold */}
        <text
          x="41"
          y="42"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="35"
          letterSpacing="-0.04em"
          fill={textColor}
        >
          etest
        </text>
      </svg>
    </div>
  );
}

export default BrandLogo;

