import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { validateAdminAccess } from '@/utils/domainUtils';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [domainAccessValid, setDomainAccessValid] = useState(false);

  useEffect(() => {
    // First check domain access
    const hasValidDomainAccess = validateAdminAccess();
    setDomainAccessValid(hasValidDomainAccess);
    
    if (!hasValidDomainAccess) {
      setLoading(false);
      return;
    }

    const checkAdminRole = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        return;
      }
      
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin');

        // Check if we found at least one admin role record
        const hasAdminRole = !error && data && data.length > 0;
        setIsAdmin(hasAdminRole);
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user, authLoading]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!domainAccessValid) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Domain Access Denied</h1>
        <p className="text-muted-foreground mb-4">
          Admin access must be through the admin subdomain.
        </p>
        <p className="text-sm text-muted-foreground">
          Please access the admin dashboard at: <strong>admin.mangocoolers.com</strong>
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Admin Access Denied</h1>
        <p className="text-muted-foreground mb-4">You do not have admin privileges.</p>
        <p className="text-sm text-muted-foreground">
          Contact your system administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};