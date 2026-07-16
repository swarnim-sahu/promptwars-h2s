import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { Landing } from './pages/Landing';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { ROUTES } from './shared/constants';

// Lazy-load all dashboard and auxiliary page components to reduce initial landing bundle sizes
const OperationsDashboard = lazy(() =>
  import('./pages/OperationsDashboard').then((m) => ({ default: m.OperationsDashboard }))
);
const AccessibilityCenter = lazy(() =>
  import('./pages/AccessibilityCenter').then((m) => ({ default: m.AccessibilityCenter }))
);
const Sustainability = lazy(() =>
  import('./pages/Sustainability').then((m) => ({ default: m.Sustainability }))
);
const Settings = lazy(() =>
  import('./pages/Settings').then((m) => ({ default: m.Settings }))
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound }))
);

// Lightweight operations fallback loading indicator
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] text-fifa-gold-400 font-sans font-extrabold text-sm tracking-wide animate-pulse">
    <span>Synchronizing AI System Modules...</span>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path={ROUTES.LANDING} element={<Landing />} />
            <Route
              path={ROUTES.OPS_DASHBOARD}
              element={
                <AppLayout>
                  <ErrorBoundary>
                    <OperationsDashboard />
                  </ErrorBoundary>
                </AppLayout>
              }
            />
            <Route path={ROUTES.ACCESSIBILITY} element={<AppLayout><AccessibilityCenter /></AppLayout>} />
            <Route path={ROUTES.SUSTAINABILITY} element={<AppLayout><Sustainability /></AppLayout>} />
            <Route path={ROUTES.SETTINGS} element={<AppLayout><Settings /></AppLayout>} />
            <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

export default App;
