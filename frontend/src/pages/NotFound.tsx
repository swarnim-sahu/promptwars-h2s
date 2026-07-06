import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/constants';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-20">
      <div className="p-4 bg-red-950/40 text-red-500 rounded-full">
        <ShieldAlert className="w-12 h-12 animate-pulse" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">404 - Area Off-Bounds</h1>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          The tactical zone you are attempting to access does not exist or has been locked down by Stadium Command.
        </p>
      </div>

      <Link
        to={ROUTES.LANDING}
        className="flex items-center space-x-2 bg-gradient-to-r from-fifa-green-600 to-fifa-green-700 hover:from-fifa-green-500 hover:to-fifa-green-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-glow-green transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Command Center</span>
      </Link>
    </div>
  );
};
