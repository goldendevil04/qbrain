import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Palette, Type, Layout, Zap } from 'lucide-react';
import { getThemeConfig, updateThemeConfig, applyThemeToDOM, ThemeConfig } from '../../services/themeService';
import toast from 'react-hot-toast';

const ThemeCustomizer = () => {
  const [theme, setTheme] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('colors');

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    setLoading(true);
    const themeConfig = await getThemeConfig();
    setTheme(themeConfig);
    applyThemeToDOM(themeConfig);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!theme) return;
    
    setSaving(true);
    const result = await updateThemeConfig(theme);
    
    if (result.success) {
      applyThemeToDOM(theme);
      toast.success('Theme updated successfully!');
    } else {
      toast.error('Failed to update theme');
    }
    setSaving(false);
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset to default theme?')) {
      await fetchTheme();
      toast.success('Theme reset to default');
    }
  };

  const updateTheme = (path: string, value: string) => {
    if (!theme) return;
    
    const keys = path.split('.');
    const newTheme = { ...theme };
    let current: any = newTheme;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setTheme(newTheme);
    applyThemeToDOM(newTheme);
  };

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'fonts', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Layout },
    { id: 'effects', label: 'Effects', icon: Zap }
  ];

  if (loading || !theme) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading theme...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Theme Customizer</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-400/20 to-green-400/20 border border-cyan-400/30 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Color Palette</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(theme.colors).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateTheme(`colors.${key}`, e.target.value)}
                          className="w-12 h-12 rounded-lg border border-slate-600 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateTheme(`colors.${key}`, e.target.value)}
                          className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fonts' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Typography</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Heading Font</label>
                    <select
                      value={theme.fonts.heading}
                      onChange={(e) => updateTheme('fonts.heading', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                    >
                      <option value="Inter, system-ui, sans-serif">Inter</option>
                      <option value="Poppins, system-ui, sans-serif">Poppins</option>
                      <option value="Roboto, system-ui, sans-serif">Roboto</option>
                      <option value="Montserrat, system-ui, sans-serif">Montserrat</option>
                      <option value="Open Sans, system-ui, sans-serif">Open Sans</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Body Font</label>
                    <select
                      value={theme.fonts.body}
                      onChange={(e) => updateTheme('fonts.body', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                    >
                      <option value="Inter, system-ui, sans-serif">Inter</option>
                      <option value="Poppins, system-ui, sans-serif">Poppins</option>
                      <option value="Roboto, system-ui, sans-serif">Roboto</option>
                      <option value="Montserrat, system-ui, sans-serif">Montserrat</option>
                      <option value="Open Sans, system-ui, sans-serif">Open Sans</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'spacing' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Spacing Scale</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(theme.spacing).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 uppercase">
                        {key}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateTheme(`spacing.${key}`, e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-mono"
                        placeholder="e.g., 1rem, 16px"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Border Radius</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(theme.borderRadius).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 uppercase">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateTheme(`borderRadius.${key}`, e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-mono"
                          placeholder="e.g., 0.5rem, 8px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'effects' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Animation & Effects</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Animation Duration</label>
                    <input
                      type="text"
                      value={theme.animations.duration}
                      onChange={(e) => updateTheme('animations.duration', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-mono"
                      placeholder="e.g., 300ms, 0.3s"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Animation Easing</label>
                    <select
                      value={theme.animations.easing}
                      onChange={(e) => updateTheme('animations.easing', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                    >
                      <option value="cubic-bezier(0.4, 0, 0.2, 1)">Ease Out</option>
                      <option value="cubic-bezier(0.4, 0, 1, 1)">Ease In</option>
                      <option value="cubic-bezier(0.4, 0, 0.6, 1)">Ease In Out</option>
                      <option value="linear">Linear</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Layout Settings</h4>
                  <div className="space-y-4">
                    {Object.entries(theme.layout).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateTheme(`layout.${key}`, e.target.value)}
                          className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-mono"
                          placeholder="e.g., 1200px, 80px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Live Preview</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.surface }}>
            <h4 className="text-2xl font-bold mb-2" style={{ 
              color: theme.colors.text,
              fontFamily: theme.fonts.heading 
            }}>
              Sample Heading
            </h4>
            <p style={{ 
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body 
            }}>
              This is a sample paragraph to show how your theme looks in practice.
            </p>
            <button 
              className="mt-4 px-6 py-2 rounded-lg font-semibold transition-all duration-300"
              style={{ 
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                borderRadius: theme.borderRadius.md
              }}
            >
              Sample Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;