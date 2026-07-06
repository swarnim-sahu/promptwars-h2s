import { useApp } from '../context/AppContext';
import { Shield, Sun, Moon, Sliders } from 'lucide-react';
import type { UserRole } from '../types';

export const Settings: React.FC = () => {
  const { theme, setTheme, role, setRole } = useApp();

  const roles: { value: UserRole; label: string; desc: string }[] = [
    { value: 'fan', label: 'Fan Mode', desc: 'Standard ticket holder navigation, concessions wait times, and helper bot.' },
    { value: 'organizer', label: 'Organizer Mode', desc: 'Crowd control heatmaps, vendor management, and full operation panels.' },
    { value: 'volunteer', label: 'Volunteer Mode', desc: 'Incident responder interface and task lists for crowd assistance.' },
    { value: 'emergency', label: 'Emergency Mode', desc: 'Priority notifications, medical dispatch, and fast route routing.' },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="border-b border-[#1f293d] pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
        <p className="text-gray-400 mt-1">Configure your active command profile and display preferences.</p>
      </div>

      {/* Theme Settings */}
      <div className="p-6 rounded-xl border border-[#1f293d] bg-[#121826]/40 space-y-4">
        <div className="flex items-center space-x-3 text-fifa-gold-400">
          <Sliders className="w-5 h-5" />
          <h2 className="text-lg font-bold">Display Preferences</h2>
        </div>
        <p className="text-sm text-gray-400">Switch between dark mode (recommended for high-end premium contrast) and light mode.</p>
        <div className="flex space-x-4">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              theme === 'light'
                ? 'bg-fifa-green-50 border-fifa-green-200 text-fifa-green-700 font-semibold'
                : 'border-[#1f293d] hover:bg-[#121826] text-gray-400'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Light Mode</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'bg-[#121826] border-fifa-gold-500 text-[#ffd700] font-semibold'
                : 'border-gray-200 hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      {/* Role Settings */}
      <div className="p-6 rounded-xl border border-[#1f293d] bg-[#121826]/40 space-y-4">
        <div className="flex items-center space-x-3 text-fifa-green-400">
          <Shield className="w-5 h-5" />
          <h2 className="text-lg font-bold">Active Command Role</h2>
        </div>
        <p className="text-sm text-gray-400">Simulate how the app dynamically refactors options and dashboard feeds according to user authentication clearance.</p>
        
        <div className="grid grid-cols-1 gap-4">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`p-4 rounded-lg border text-left transition-all flex flex-col space-y-1 ${
                role === r.value
                  ? 'border-fifa-green-500 bg-fifa-green-950/20'
                  : 'border-[#1f293d] hover:bg-[#121826]/60'
              }`}
            >
              <span className={`font-semibold ${role === r.value ? 'text-fifa-green-400' : 'text-gray-300'}`}>
                {r.label} {role === r.value && '✓ (Active)'}
              </span>
              <span className="text-xs text-gray-400 leading-relaxed">{r.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
