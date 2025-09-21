import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`
      fixed bottom-20 right-6 z-50 transition-all duration-500 transform
      ${isVisible 
        ? 'translate-y-0 opacity-100 scale-100' 
        : 'translate-y-16 opacity-0 scale-0 pointer-events-none'
      }
    `}>
      <Button
        onClick={scrollToTop}
        size="icon"
        className="
          bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg
          min-h-[56px] min-w-[56px] rounded-full
          hover:shadow-xl hover:scale-110 active:scale-95
          transition-all duration-300 animate-float
          relative overflow-hidden group
        "
      >
        <ChevronUp className="h-6 w-6 transition-transform group-hover:-translate-y-1" />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
      </Button>
    </div>
  );
};

export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large morphing shapes */}
      <div 
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-accent/10 to-brand/5 blur-2xl animate-morph animate-liquid" 
        style={{ animationDelay: '0s' }} 
      />
      <div 
        className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-brand/10 to-accent/5 blur-xl animate-morph animate-liquid" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-accent/5 to-brand/10 blur-3xl animate-morph animate-liquid" 
        style={{ animationDelay: '4s' }} 
      />
      <div 
        className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-brand/5 to-accent/10 blur-2xl animate-morph animate-liquid" 
        style={{ animationDelay: '6s' }} 
      />
      
      {/* Small floating particles */}
      <div 
        className="absolute top-1/4 left-1/3 w-4 h-4 bg-accent/20 rounded-full animate-float blur-sm" 
        style={{ animationDelay: '1s' }} 
      />
      <div 
        className="absolute top-3/4 right-1/4 w-3 h-3 bg-brand/30 rounded-full animate-float blur-sm" 
        style={{ animationDelay: '3s' }} 
      />
      <div 
        className="absolute top-1/2 left-1/5 w-5 h-5 bg-accent/15 rounded-full animate-float blur-sm" 
        style={{ animationDelay: '5s' }} 
      />
    </div>
  );
};