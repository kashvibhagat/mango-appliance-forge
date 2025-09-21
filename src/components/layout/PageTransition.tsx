import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <div 
      key={location.pathname} 
      className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
    >
      {children}
    </div>
  );
};

export default PageTransition;