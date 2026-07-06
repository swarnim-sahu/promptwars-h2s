import React from 'react';
import { GitFork, Mail, Shield } from 'lucide-react';
import { APP_NAME } from '../../shared/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1f293d] bg-[#090d16]/40 text-gray-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-tr from-fifa-green-600 to-fifa-gold-500 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-wider">{APP_NAME}</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Leading artificial intelligence interface for stadium safety, accessibility, and operational flow at the FIFA World Cup 2026.
          </p>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-fifa-gold-500/30 bg-fifa-gold-950/20 text-fifa-gold-400 text-[10px] font-bold tracking-wide uppercase">
            Built for PromptWars 2026
          </div>
        </div>

        {/* Links: Features */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Features</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#features" className="hover:text-fifa-green-400 transition-colors">Crowd Intelligence</a></li>
            <li><a href="#features" className="hover:text-fifa-green-400 transition-colors">Emergency Dispatch</a></li>
            <li><a href="#features" className="hover:text-fifa-green-400 transition-colors">Sustainability Tracker</a></li>
            <li><a href="#features" className="hover:text-fifa-green-400 transition-colors">Accessibility Guides</a></li>
          </ul>
        </div>

        {/* Links: Resources */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#how-it-works" className="hover:text-fifa-green-400 transition-colors">How It Works</a></li>
            <li><a href="#benefits" className="hover:text-fifa-green-400 transition-colors">Operations Value</a></li>
            <li><span className="text-gray-600">API Documentation (Sandbox)</span></li>
            <li><span className="text-gray-600">Terms & Conditions</span></li>
          </ul>
        </div>

        {/* Links: Connect */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Connect</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center space-x-2">
              <GitFork className="w-4 h-4 text-gray-400" />
              <span className="cursor-pointer hover:text-white transition-all">github.com/promptwars-h2s/stadiummind</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="cursor-pointer hover:text-white transition-all">support@stadiummind.ai</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1f293d]/50 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p>Developed for Google's PromptWars Hackathon 2026. Mock Platform Demonstration.</p>
      </div>
    </footer>
  );
};
