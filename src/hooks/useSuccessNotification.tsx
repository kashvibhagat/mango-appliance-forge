import { useState, useCallback } from 'react';

export interface SuccessNotificationData {
  title: string;
  message: string;
  type?: 'order' | 'auth' | 'general' | 'wishlist' | 'achievement';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const useSuccessNotification = () => {
  const [notification, setNotification] = useState<SuccessNotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showSuccess = useCallback((data: SuccessNotificationData) => {
    setNotification(data);
    setIsVisible(true);
  }, []);

  const hideSuccess = useCallback(() => {
    setIsVisible(false);
    // Clear notification data after animation completes
    setTimeout(() => {
      setNotification(null);
    }, 300);
  }, []);

  const showOrderSuccess = useCallback((orderNumber?: string) => {
    showSuccess({
      title: '🎉 Order Placed Successfully!',
      message: orderNumber 
        ? `Your order #${orderNumber} has been confirmed. Thank you for choosing Mango Appliances!`
        : 'Your order has been confirmed. Thank you for choosing Mango Appliances!',
      type: 'order',
      autoClose: true,
      autoCloseDelay: 5000
    });
  }, [showSuccess]);

  const showAuthSuccess = useCallback((type: 'signin' | 'signup' | 'signout') => {
    const messages = {
      signin: {
        title: '🎉 Welcome Back!',
        message: 'You have successfully signed in to your account.'
      },
      signup: {
        title: '🎉 Account Created!',
        message: 'Welcome to Mango Appliances! Your account has been created successfully.'
      },
      signout: {
        title: '👋 See You Soon!',
        message: 'You have been successfully signed out.'
      }
    };

    showSuccess({
      ...messages[type],
      type: 'auth',
      autoClose: true,
      autoCloseDelay: 3000
    });
  }, [showSuccess]);

  const showWishlistSuccess = useCallback((action: 'added' | 'removed', productName: string) => {
    const messages = {
      added: {
        title: '❤️ Added to Wishlist!',
        message: `${productName} has been added to your wishlist.`
      },
      removed: {
        title: '💔 Removed from Wishlist',
        message: `${productName} has been removed from your wishlist.`
      }
    };

    showSuccess({
      ...messages[action],
      type: 'wishlist',
      autoClose: true,
      autoCloseDelay: 2500
    });
  }, [showSuccess]);

  const showAchievementSuccess = useCallback((title: string, message: string) => {
    showSuccess({
      title: `🏆 ${title}`,
      message,
      type: 'achievement',
      autoClose: true,
      autoCloseDelay: 4000
    });
  }, [showSuccess]);

  const showCartSuccess = useCallback((productName: string) => {
    showSuccess({
      title: '🛒 Added to Cart!',
      message: `${productName} has been added to your cart.`,
      type: 'general',
      autoClose: true,
      autoCloseDelay: 2000
    });
  }, [showSuccess]);

  return {
    notification,
    isVisible,
    showSuccess,
    hideSuccess,
    showOrderSuccess,
    showAuthSuccess,
    showWishlistSuccess,
    showAchievementSuccess,
    showCartSuccess
  };
};