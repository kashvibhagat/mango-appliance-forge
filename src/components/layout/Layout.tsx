import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { MobileBottomNav } from '@/components/ui/MobileBottomNav';
import { ScrollToTop, FloatingShapes } from '@/components/ui/FloatingElements';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingShapes />
      <Header />
      <main className="flex-grow pb-16 md:pb-0 relative z-10">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <ScrollToTop />
    </div>
  );
};

export default Layout;