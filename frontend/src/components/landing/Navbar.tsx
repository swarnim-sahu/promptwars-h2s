import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { APP_NAME, ROUTES } from '../../shared/constants';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  const { theme, setTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { label: 'Features', targetId: 'features' },
    { label: 'Solutions', targetId: 'solutions' },
    { label: 'How It Works', targetId: 'how-it-works' },
    { label: 'Benefits', targetId: 'benefits' },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-lg ${
      theme === 'dark' 
        ? 'bg-[#090d16]/80 border-[#1f293d] text-white' 
        : 'bg-white/80 border-gray-200 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onScrollToSection('hero')}>
            <div className="p-2.5 bg-gradient-to-tr from-fifa-green-600 to-fifa-gold-500 rounded-xl shadow-glow-green">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-fifa-green-500 to-fifa-gold-400 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onScrollToSection(link.targetId)}
                className={`text-sm font-semibold tracking-wide transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Controls & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                theme === 'dark'
                  ? 'border-[#1f293d] hover:bg-[#121826] text-[#ffd700]'
                  : 'border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Launch Dashboard Button */}
            <Link
              to={ROUTES.OPS_DASHBOARD}
              className="bg-gradient-to-r from-fifa-green-600 to-fifa-green-700 hover:from-fifa-green-500 hover:to-fifa-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-glow-green transition-all duration-300 hover:scale-[1.03]"
            >
              Launch Command Center
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border mr-2 ${
                theme === 'dark' ? 'border-[#1f293d] text-[#ffd700]' : 'border-gray-200 text-gray-700'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${
                theme === 'dark' ? 'border-[#1f293d] hover:bg-[#121826]' : 'border-gray-200 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t py-4 px-6 space-y-3 transition-colors ${
          theme === 'dark' ? 'bg-[#090d16]/95 border-[#1f293d]' : 'bg-white border-gray-200'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                onScrollToSection(link.targetId);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-semibold text-sm hover:text-fifa-green-500 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-800">
            <Link
              to={ROUTES.OPS_DASHBOARD}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-fifa-green-600 to-fifa-green-700 text-white font-bold py-3 rounded-xl"
            >
              Launch Command Center
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
