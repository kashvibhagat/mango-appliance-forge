import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QuickSuccessProps {
  message: string;
  type?: 'success' | 'info' | 'warning';
  showConfetti?: boolean;
}

export const showQuickSuccess = ({ 
  message, 
  type = 'success', 
  showConfetti = true 
}: QuickSuccessProps) => {
  // Show toast notification
  toast.success(message, {
    icon: <CheckCircle className="h-4 w-4" />,
    duration: 3000,
  });

  // Trigger confetti if requested
  if (showConfetti) {
    const colors = ['#4F46E5', '#059669', '#F59E0B', '#EF4444'];
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: colors,
      startVelocity: 25,
      ticks: 200,
      zIndex: 999999
    });
  }
};

// Quick success notifications for common actions
export const showCartSuccess = (productName: string) => {
  showQuickSuccess({
    message: `${productName} added to cart!`,
    showConfetti: false
  });
};

export const showWishlistSuccess = (productName: string, action: 'added' | 'removed') => {
  showQuickSuccess({
    message: `${productName} ${action === 'added' ? 'added to' : 'removed from'} wishlist!`,
    showConfetti: false
  });
};

export const showAuthSuccess = (type: 'signin' | 'signup' | 'signout') => {
  const messages = {
    signin: 'Welcome back! Successfully signed in.',
    signup: 'Account created successfully! Welcome to Mango Appliances.',
    signout: 'Successfully signed out. See you soon!'
  };
  
  showQuickSuccess({
    message: messages[type],
    showConfetti: type !== 'signout'
  });
};