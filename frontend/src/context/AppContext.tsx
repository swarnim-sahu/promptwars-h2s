import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ThemeMode, UserRole, AppState } from '../types';

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as ThemeMode) || 'dark'; // default to premium dark mode
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('role');
    return (saved as UserRole) || 'operations_manager';
  });

  // Sync theme class to document element for Tailwind dark mode support
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync role to localStorage
  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  const setTheme = (newTheme: ThemeMode) => setThemeState(newTheme);
  const setRole = (newRole: UserRole) => setRoleState(newRole);

  const contextValue = useMemo(() => ({
    theme,
    role,
    setTheme,
    setRole
  }), [theme, role]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
