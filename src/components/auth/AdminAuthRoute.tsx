import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface AdminAuthRouteProps {
  children: React.ReactNode;
}

export const AdminAuthRoute: React.FC<AdminAuthRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = sessionStorage.getItem('adminAuth');
      const loginTime = sessionStorage.getItem('adminLoginTime');
      
      if (!adminAuth || adminAuth !== 'authenticated') {
        setIsAuthenticated(false);
        return;
      }

      // Check if session is expired (24 hours)
      if (loginTime) {
        const now = Date.now();
        const loginTimestamp = parseInt(loginTime);
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (now - loginTimestamp > twentyFourHours) {
          // Session expired
          sessionStorage.removeItem('adminAuth');
          sessionStorage.removeItem('adminLoginTime');
          setIsAuthenticated(false);
          return;
        }
      }

      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};