import { ReactNode } from 'react';
import { AdminHeader } from './AdminHeader';
import { DomainBasedRoute } from '@/components/auth/DomainBasedRoute';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <DomainBasedRoute adminOnly>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </DomainBasedRoute>
  );
};