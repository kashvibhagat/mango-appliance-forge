// Domain and subdomain detection utilities
export const getDomainInfo = () => {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  
  // For development
  if (isLocalhost) {
    const searchParams = new URLSearchParams(window.location.search);
    const adminParam = searchParams.get('admin');
    return {
      isAdmin: adminParam === 'true',
      isCustomer: adminParam !== 'true',
      domain: hostname,
      subdomain: adminParam === 'true' ? 'admin' : 'www'
    };
  }
  
  // For production - detect subdomain
  const parts = hostname.split('.');
  const subdomain = parts.length > 2 ? parts[0] : 'www';
  
  return {
    isAdmin: subdomain === 'admin',
    isCustomer: subdomain !== 'admin',
    domain: hostname,
    subdomain
  };
};

export const getRedirectUrl = (isAdmin: boolean = false) => {
  const { hostname, protocol, port } = window.location;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  
  if (isLocalhost) {
    // For development, use query parameter
    const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
    return isAdmin ? `${baseUrl}?admin=true` : baseUrl;
  }
  
  // For production, use subdomains
  const parts = hostname.split('.');
  if (parts.length > 2) {
    // Replace subdomain
    parts[0] = isAdmin ? 'admin' : 'www';
  } else {
    // Add subdomain
    parts.unshift(isAdmin ? 'admin' : 'www');
  }
  
  return `${protocol}//${parts.join('.')}`;
};

export const enforceSubdomainAccess = () => {
  const { isAdmin, isCustomer } = getDomainInfo();
  const currentPath = window.location.pathname;
  
  // If on admin subdomain but not on admin routes
  if (isAdmin && !currentPath.startsWith('/admin')) {
    window.location.href = '/admin';
    return false;
  }
  
  // If on customer subdomain but trying to access admin routes
  if (isCustomer && currentPath.startsWith('/admin')) {
    window.location.href = '/';
    return false;
  }
  
  return true;
};

export const isValidAdminDomain = (): boolean => {
  const { isAdmin } = getDomainInfo();
  return isAdmin;
};

// Security headers and admin access validation
export const validateAdminAccess = (): boolean => {
  const { isAdmin } = getDomainInfo();
  
  if (!isAdmin) {
    console.warn('Admin access attempted from non-admin domain');
    return false;
  }
  
  return true;
};