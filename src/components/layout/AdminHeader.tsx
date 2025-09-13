import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { getDomainInfo, getRedirectUrl } from '@/utils/domainUtils';
import {
  Bell,
  User,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Monitor
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AdminHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [notifications] = useState(3); // This would come from your notification system
  const { domain, subdomain } = getDomainInfo();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const goToCustomerSite = () => {
    const customerUrl = getRedirectUrl(false);
    window.open(customerUrl, '_blank');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Mango Appliances
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Admin Dashboard
              </p>
            </div>
          </div>
          
          {/* Domain Badge */}
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Monitor className="h-3 w-3 mr-1" />
            {subdomain}.mangocoolers.com
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Customer Site Link */}
          <Button
            variant="outline"
            size="sm"
            onClick={goToCustomerSite}
            className="hidden md:flex"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Customer Site
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="hidden md:block">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={goToCustomerSite}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Customer Site
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};