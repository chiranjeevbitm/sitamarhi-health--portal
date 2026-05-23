import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginScreen from './pages/LoginScreen';
import Dashboard from './pages/Dashboard';
import AncMonitoring from './pages/AncMonitoring';
import AnaemiaTracker from './pages/AnaemiaTracker';
import DeliveryMonitoring from './pages/DeliveryMonitoring';
import ZeroBoard from './pages/ZeroBoard';
import AiSummary from './pages/AiSummary';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/anc" element={<ProtectedRoute><AncMonitoring /></ProtectedRoute>} />
      <Route path="/anaemia" element={<ProtectedRoute><AnaemiaTracker /></ProtectedRoute>} />
      <Route path="/delivery" element={<ProtectedRoute><DeliveryMonitoring /></ProtectedRoute>} />
      <Route path="/zero-board" element={<ProtectedRoute><ZeroBoard /></ProtectedRoute>} />
      <Route path="/ai-summary" element={<ProtectedRoute><AiSummary /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}