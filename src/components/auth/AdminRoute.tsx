import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [isValidAdmin, setIsValidAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminCredentials = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        return;
      }
      
      if (!user) {
        setIsValidAdmin(false);
        setLoading(false);
        return;
      }

      // Check if the user email matches the exact admin credentials
      const isAdminEmail = user.email === 'DoNotReply@mangoappliances.com';
      setIsValidAdmin(isAdminEmail);
      setLoading(false);
    };

    checkAdminCredentials();
  }, [user, authLoading]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isValidAdmin) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid credentials – Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};