import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Shield, Users, Activity, Eye, Leaf, Settings as SettingsIcon, AlertCircle } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, ROUTES } from '../shared/constants';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useApp();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { name: 'Home Portal', path: ROUTES.LANDING, icon: Shield },
    { name: 'Operations Center (Core)', path: ROUTES.OPS_DASHBOARD, icon: Activity },
    { name: 'Fan App (Prototype)', path: ROUTES.FAN_DASHBOARD, icon: Users },
    { name: 'A11y Center (Sandbox)', path: ROUTES.ACCESSIBILITY, icon: Eye },
    { name: 'Eco Tracking (Sandbox)', path: ROUTES.SUSTAINABILITY, icon: Leaf },
    { name: 'System Settings', path: ROUTES.SETTINGS, icon: SettingsIcon },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#090d16] text-[#f3f4f6]' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-300 ${theme === 'dark' ? 'bg-[#090d16]/80 border-[#1f293d]' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-fifa-green-600 to-fifa-gold-500 rounded-lg shadow-glow-green">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-fifa-green-500 to-fifa-gold-400 bg-clip-text text-transparent m-0" style={{ fontSize: '1.25rem' }}>
                {APP_NAME}
              </h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase leading-none mt-0.5">{APP_TAGLINE}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3  h-9 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-fifa-green-950/50 text-fifa-green-400 border border-fifa-green-800'
                        : 'bg-fifa-green-50 text-fifa-green-700 border border-fifa-green-100'
                      : theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-[#121826]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <div className={`hidden sm:flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${
              theme === 'dark' ? 'bg-[#121826] border border-[#1f293d] text-fifa-gold-400' : 'bg-amber-50 border border-amber-200 text-amber-800'
            }`}>
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              Role: OPERATIONS MANAGER
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors ${
                theme === 'dark'
                  ? 'border-[#1f293d] hover:bg-[#121826] text-[#ffd700]'
                  : 'border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-300">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 mt-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-[#090d16]/50 border-[#1f293d] text-gray-500' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {APP_NAME} - FIFA World Cup 2026 AI Command Center. PromptWars Hackathon Foundation.</p>
        </div>
      </footer>
    </div>
  );
};
