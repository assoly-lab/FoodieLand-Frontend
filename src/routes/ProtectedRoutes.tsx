import  { useAuth }  from '@/hooks/useAuth';
import { Navigate, useLocation, Outlet } from 'react-router';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <Outlet />;
};
