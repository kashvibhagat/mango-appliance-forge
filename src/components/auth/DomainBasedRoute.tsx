import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getDomainInfo, enforceSubdomainAccess } from '@/utils/domainUtils';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface DomainBasedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  customerOnly?: boolean;
}

export const DomainBasedRoute: React.FC<DomainBasedRouteProps> = ({ 
  children, 
  adminOnly = false, 
  customerOnly = false 
}) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkDomainAccess = () => {
      const { isAdmin, isCustomer } = getDomainInfo();
      
      // Enforce subdomain access
      if (!enforceSubdomainAccess()) {
        return;
      }
      
      let accessGranted = true;
      
      // Check admin-only routes
      if (adminOnly && !isAdmin) {
        accessGranted = false;
      }
      
      // Check customer-only routes
      if (customerOnly && !isCustomer) {
        accessGranted = false;
      }
      
      setHasAccess(accessGranted);
      setLoading(false);
    };

    checkDomainAccess();
  }, [adminOnly, customerOnly]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!hasAccess) {
    const { isAdmin } = getDomainInfo();
    
    if (adminOnly && !isAdmin) {
      // Redirect to admin subdomain
      const adminUrl = window.location.hostname.includes('localhost') 
        ? `${window.location.origin}?admin=true`
        : `https://admin.${window.location.hostname.replace(/^(www\.|admin\.)/, '')}`;
      
      window.location.href = adminUrl;
      return null;
    }
    
    if (customerOnly && isAdmin) {
      // Redirect to customer site
      const customerUrl = window.location.hostname.includes('localhost')
        ? window.location.origin.replace('?admin=true', '')
        : `https://www.${window.location.hostname.replace(/^(www\.|admin\.)/, '')}`;
      
      window.location.href = customerUrl;
      return null;
    }
    
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};