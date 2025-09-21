import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, Star, Heart, ShoppingBag, User, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessConfettiProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'order' | 'auth' | 'general' | 'wishlist' | 'achievement';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const SuccessConfetti = ({
  isVisible,
  onClose,
  title,
  message,
  type = 'general',
  autoClose = true,
  autoCloseDelay = 4000
}: SuccessConfettiProps) => {
  const hasTriggered = useRef(false);

  const getIcon = () => {
    switch (type) {
      case 'order':
        return ShoppingBag;
      case 'auth':
        return User;
      case 'wishlist':
        return Heart;
      case 'achievement':
        return Award;
      default:
        return CheckCircle;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'order':
        return ['#4F46E5', '#7C3AED', '#EC4899']; // Purple/Pink
      case 'auth':
        return ['#059669', '#10B981', '#34D399']; // Green
      case 'wishlist':
        return ['#EF4444', '#F87171', '#FCA5A5']; // Red/Pink
      case 'achievement':
        return ['#F59E0B', '#FBBF24', '#FCD34D']; // Yellow/Gold
      default:
        return ['#4F46E5', '#059669', '#F59E0B']; // Mixed
    }
  };

  const triggerConfetti = () => {
    const colors = getColors();
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // Initial burst
    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: colors
    });
    
    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: colors
    });

    // Continuous smaller bursts
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: colors
      });
    }, 250);

    // Star confetti for special occasions
    if (type === 'achievement' || type === 'order') {
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#FFD700', '#FFA500', '#FF69B4'],
          shapes: ['star'],
          scalar: 1.2,
          zIndex: 999999
        });
      }, 500);
    }
  };

  useEffect(() => {
    if (isVisible && !hasTriggered.current) {
      hasTriggered.current = true;
      triggerConfetti();
      
      if (autoClose) {
        const timer = setTimeout(() => {
          onClose();
          hasTriggered.current = false;
        }, autoCloseDelay);
        
        return () => clearTimeout(timer);
      }
    }
    
    if (!isVisible) {
      hasTriggered.current = false;
    }
  }, [isVisible, autoClose, autoCloseDelay, onClose]);

  if (!isVisible) return null;

  const IconComponent = getIcon();

  return (
    <div className="fixed inset-0 z-[999998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md mx-auto card-morph animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <CardContent className="pt-8 pb-6 text-center relative overflow-hidden">
          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-brand/10 animate-pulse-glow" />
          
          <div className="relative z-10 space-y-6">
            {/* Icon with animation */}
            <div className="flex justify-center">
              <div className="p-4 bg-accent/20 rounded-full animate-bounce">
                <IconComponent className="h-12 w-12 text-accent animate-pulse" />
              </div>
            </div>

            {/* Success content */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground animate-text-glow">
                {title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {message}
              </p>
            </div>

            {/* Floating elements */}
            <div className="absolute top-4 left-4">
              <Star className="h-4 w-4 text-accent/60 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="absolute top-8 right-6">
              <Star className="h-3 w-3 text-brand/60 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="absolute bottom-8 left-8">
              <Star className="h-5 w-5 text-accent/40 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Close button */}
            <div className="pt-4">
              <Button 
                onClick={onClose}
                variant="hero"
                size="lg"
                className="w-full group relative overflow-hidden"
              >
                <span className="relative z-10">Continue</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};