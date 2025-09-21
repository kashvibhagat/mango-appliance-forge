import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { MobileBottomNav } from '@/components/ui/MobileBottomNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;