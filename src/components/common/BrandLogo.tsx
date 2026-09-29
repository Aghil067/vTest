import { useEffect, useState } from 'react';
import defaultLogo from '@/assets/vtest-logo.svg';
import lightLogo from '@/assets/vtest-logo-light.svg';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';

interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export function BrandLogo({ className = 'h-10 sm:h-11 w-auto max-w-[190px] object-contain', alt = 'Vetest' }: BrandLogoProps) {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const customLogo = settings?.general?.logo?.trim();

  const sources = [
    ...(customLogo ? [customLogo] : []),
    ...(isDark
      ? ['/VTEST_WHITE_LOGO.png', '/VTEST DARK LOGO.png', '/logo.png', '/logo.svg', defaultLogo]
      : ['/VTEST DARK LOGO.png', '/VTEST LIGHT LOGO.jpeg', '/logo-light.svg', lightLogo])
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [isDark, customLogo]);

  const handleError = () => {
    if (index < sources.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

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

export default BrandLogo;
