import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      badge: null
    },
    {
      icon: Search,
      label: 'Shop',
      path: '/shop',
      badge: null
    },
    {
      icon: ShoppingCart,
      label: 'Cart',
      path: '/cart',
      badge: itemCount > 0 ? itemCount : null
    },
    {
      icon: Heart,
      label: 'Wishlist',
      path: '/wishlist',
      badge: wishlistItems.length > 0 ? wishlistItems.length : null
    },
    {
      icon: User,
      label: user ? 'Profile' : 'Sign In',
      path: user ? '/profile' : '/auth',
      badge: null
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border mobile-safe-area md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex flex-col items-center justify-center py-2 px-3 rounded-lg
                min-h-[60px] min-w-[60px] transition-all duration-200 touch-manipulation
                active:scale-95 active:bg-accent/20
                ${active 
                  ? 'text-accent bg-accent/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
                }
              `}
            >
              <div className="relative">
                <IconComponent className={`h-5 w-5 transition-transform duration-200 ${active ? 'scale-110' : ''}`} />
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${active ? 'text-accent' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};