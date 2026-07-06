import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { Landing } from './pages/Landing';
import { FanDashboard } from './pages/FanDashboard';
import { OperationsDashboard } from './pages/OperationsDashboard';
import { AccessibilityCenter } from './pages/AccessibilityCenter';
import { Sustainability } from './pages/Sustainability';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { ROUTES } from './shared/constants';

function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path={ROUTES.LANDING} element={<Landing />} />
            <Route path={ROUTES.FAN_DASHBOARD} element={<FanDashboard />} />
            <Route path={ROUTES.OPS_DASHBOARD} element={<OperationsDashboard />} />
            <Route path={ROUTES.ACCESSIBILITY} element={<AccessibilityCenter />} />
            <Route path={ROUTES.SUSTAINABILITY} element={<Sustainability />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </Router>
    </AppProvider>
  );
}

export default App;

