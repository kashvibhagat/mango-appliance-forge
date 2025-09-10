import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

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