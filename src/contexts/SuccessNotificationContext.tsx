import { createContext, useContext, ReactNode } from 'react';
import { SuccessConfetti } from '@/components/ui/SuccessConfetti';
import { useSuccessNotification, SuccessNotificationData } from '@/hooks/useSuccessNotification';

interface SuccessNotificationContextType {
  showSuccess: (data: SuccessNotificationData) => void;
  showOrderSuccess: (orderNumber?: string) => void;
  showAuthSuccess: (type: 'signin' | 'signup' | 'signout') => void;
  showWishlistSuccess: (action: 'added' | 'removed', productName: string) => void;
  showAchievementSuccess: (title: string, message: string) => void;
  showCartSuccess: (productName: string) => void;
}

const SuccessNotificationContext = createContext<SuccessNotificationContextType | null>(null);

export const useSuccessNotificationContext = () => {
  const context = useContext(SuccessNotificationContext);
  if (!context) {
    throw new Error('useSuccessNotificationContext must be used within SuccessNotificationProvider');
  }
  return context;
};

interface SuccessNotificationProviderProps {
  children: ReactNode;
}

export const SuccessNotificationProvider = ({ children }: SuccessNotificationProviderProps) => {
  const {
    notification,
    isVisible,
    hideSuccess,
    showSuccess,
    showOrderSuccess,
    showAuthSuccess,
    showWishlistSuccess,
    showAchievementSuccess,
    showCartSuccess
  } = useSuccessNotification();

  return (
    <SuccessNotificationContext.Provider value={{
      showSuccess,
      showOrderSuccess,
      showAuthSuccess,
      showWishlistSuccess,
      showAchievementSuccess,
      showCartSuccess
    }}>
      {children}
      
      {notification && (
        <SuccessConfetti
          isVisible={isVisible}
          onClose={hideSuccess}
          title={notification.title}
          message={notification.message}
          type={notification.type}
          autoClose={notification.autoClose}
          autoCloseDelay={notification.autoCloseDelay}
        />
      )}
    </SuccessNotificationContext.Provider>
  );
};