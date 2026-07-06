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
        <Routes>
          <Route path={ROUTES.LANDING} element={<Landing />} />
          <Route path={ROUTES.FAN_DASHBOARD} element={<AppLayout><FanDashboard /></AppLayout>} />
          <Route path={ROUTES.OPS_DASHBOARD} element={<AppLayout><OperationsDashboard /></AppLayout>} />
          <Route path={ROUTES.ACCESSIBILITY} element={<AppLayout><AccessibilityCenter /></AppLayout>} />
          <Route path={ROUTES.SUSTAINABILITY} element={<AppLayout><Sustainability /></AppLayout>} />
          <Route path={ROUTES.SETTINGS} element={<AppLayout><Settings /></AppLayout>} />
          <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

