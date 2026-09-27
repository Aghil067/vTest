import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { settingService } from '@/services/admin/settingService';
import defaultLogoAsset from '@/assets/logo.jpeg';

interface SettingsContextType {
  settings: any;
  logoUrl: string;
  defaultLogoAsset: string;
  loading: boolean;
  reloadSettings: () => Promise<void>;
  updateSettingsState: (newSettings: any) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await settingService.getSettings();
      if (res.success && res.data) {
        setSettings(res.data);
      }
    } catch (err) {
      console.warn('Could not load site settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
    const handleStoreChange = (e: any) => {
      if (!e.detail?.key || e.detail.key === 'vtest_store_settings') {
        fetchSettings();
      }
    };
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, [fetchSettings]);

  const logoUrl =
    settings?.general?.logo && settings.general.logo.trim() !== ''
      ? settings.general.logo
      : defaultLogoAsset;

  const updateSettingsState = (newSettings: any) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        logoUrl,
        defaultLogoAsset,
        loading,
        reloadSettings: fetchSettings,
        updateSettingsState,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
