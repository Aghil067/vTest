import React, { useEffect, useState } from 'react';
import { settingService } from '@/services/admin/settingService';
import { mediaService } from '@/services/admin/mediaService';
import { useToast } from '@/contexts/ToastContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useTheme } from '@/contexts/ThemeContext';
import Skeleton from '@/components/admin/Skeleton';
import FileUpload from '@/components/admin/FileUpload';
import {
  Settings as SettingsIcon,
  Save,
  Globe,
  Share2,
  PhoneCall,
  HardDrive,
  Loader2,
  Upload,
  RotateCcw,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'contact' | 'social'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { isDark } = useTheme();

  const { logoUrl, updateSettingsState, reloadSettings } = useSettings();
  const toast = useToast();

  const [settings, setSettings] = useState<any>({
    general: { siteName: 'Vtest', logo: '', tagline: 'Engineering Smarter Testing & Inspection Solutions', copyrightText: '© 2026 Vtest Technologies Inc.' },
    seo: { defaultSeoTitle: 'Vtest | Vehicle Testing & Inspection Technology', defaultMetaDescription: 'Turnkey vehicle testing lanes, hardware, and inspection software.', metaKeywords: 'vehicle testing, PTI, inspection' },
    contact: { email: 'info@vtest.com', phone: '+1 (800) 555-TEST', address: 'Vtest Global Innovation Campus', workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM EST' },
    socialMedia: { linkedin: 'https://linkedin.com/company/vtest', twitter: 'https://twitter.com/vtest', facebook: '', youtube: 'https://youtube.com/@vtest' },
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await settingService.getSettings();
      if (res.success && res.data) {
        setSettings(res.data);
      }
    } catch {
      toast.error('Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await settingService.updateSettings(settings);
      if (res.success) {
        toast.success('Site settings saved successfully!');
        updateSettingsState(res.data || settings);
        reloadSettings();
      }
    } catch {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Global Platform Settings</h1>
          <p className="text-xs text-[var(--admin-muted)] mt-1">
            Configure site metadata, brand identity, contact channels, and search engine parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div
        className={`flex items-center gap-2 p-1.5 rounded-2xl border ${
          isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        {[
          { key: 'general', label: 'General & Brand', icon: Globe },
          { key: 'seo', label: 'Search & SEO', icon: SettingsIcon },
          { key: 'contact', label: 'Corporate Contact', icon: PhoneCall },
          { key: 'social', label: 'Social Networks', icon: Share2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                active
                  ? isDark
                    ? 'bg-[#2ECC71]/15 text-[#2ECC71] border border-[#2ECC71]/30 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                  : 'text-[var(--admin-muted)] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSave}
        className={`p-6 sm:p-8 rounded-3xl border transition-colors space-y-6 ${
          isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {activeTab === 'general' && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--admin-muted)] font-mono">
              General Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.general?.siteName || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, siteName: e.target.value },
                    })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.general?.tagline || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, tagline: e.target.value },
                    })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                  }`}
                />
              </div>
            </div>

            <FileUpload
              label="Brand Logo Upload"
              value={settings.general?.logo || ''}
              onChange={(url) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, logo: url },
                })
              }
            />

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Copyright Notice
              </label>
              <input
                type="text"
                value={settings.general?.copyrightText || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, copyrightText: e.target.value },
                  })
                }
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                }`}
              />
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--admin-muted)] font-mono">
              Search Engine Optimization
            </h3>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Default Page Title
              </label>
              <input
                type="text"
                value={settings.seo?.defaultSeoTitle || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, defaultSeoTitle: e.target.value },
                  })
                }
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.seo?.defaultMetaDescription || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, defaultMetaDescription: e.target.value },
                  })
                }
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                }`}
              />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--admin-muted)] font-mono">
              Corporate Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                  General Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contact?.email || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, email: e.target.value },
                    })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                  Telephone Line
                </label>
                <input
                  type="text"
                  value={settings.contact?.phone || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone: e.target.value },
                    })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                Headquarters Address
              </label>
              <input
                type="text"
                value={settings.contact?.address || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, address: e.target.value },
                  })
                }
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                  isDark
                    ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                }`}
              />
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--admin-muted)] font-mono">
              Social Media Accounts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={settings.socialMedia?.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: { ...settings.socialMedia, linkedin: e.target.value },
                    })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                  Twitter / X URL
                </label>
                <input
                  type="url"
                  value={settings.socialMedia?.twitter || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: { ...settings.socialMedia, twitter: e.target.value },
                    })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-copy)] uppercase tracking-wider mb-1.5">
                  YouTube Channel
                </label>
                <input
                  type="url"
                  value={settings.socialMedia?.youtube || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: { ...settings.socialMedia, youtube: e.target.value },
                    })
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white focus:border-[#2ECC71]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2ECC71]'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#1E3325]/40 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
