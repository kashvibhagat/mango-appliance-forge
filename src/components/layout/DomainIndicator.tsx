import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { getDomainInfo } from '@/utils/domainUtils';
import { Monitor, Shield, Globe } from 'lucide-react';

export const DomainIndicator = () => {
  const [domainInfo, setDomainInfo] = useState({
    isAdmin: false,
    isCustomer: true,
    subdomain: 'www',
    domain: 'localhost'
  });

  useEffect(() => {
    setDomainInfo(getDomainInfo());
  }, []);

  if (domainInfo.domain.includes('localhost')) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Badge 
          variant="outline" 
          className={`${
            domainInfo.isAdmin 
              ? 'bg-red-50 text-red-700 border-red-200' 
              : 'bg-blue-50 text-blue-700 border-blue-200'
          }`}
        >
          {domainInfo.isAdmin ? (
            <>
              <Shield className="h-3 w-3 mr-1" />
              Admin Mode
            </>
          ) : (
            <>
              <Globe className="h-3 w-3 mr-1" />
              Customer Mode
            </>
          )}
        </Badge>
      </div>
    );
  }

  return null; // Don't show indicator in production
};