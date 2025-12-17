import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';

export const PublicRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard"  replace />;
  }

  return <Outlet />;
};
