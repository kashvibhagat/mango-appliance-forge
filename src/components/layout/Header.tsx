import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, LogOut, Settings, ChevronDown, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import SearchWithSuggestions from '@/components/ui/SearchWithSuggestions';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSuccessNotificationContext } from '@/contexts/SuccessNotificationContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, signOut } = useAuth();
  const { showAuthSuccess } = useSuccessNotificationContext();
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Warranty Registration', href: '/warranty-registration' },
  ];

  const coolerCategories = [
    { name: 'Personal Coolers', href: '/shop?category=personal-coolers' },
    { name: 'Desert Coolers', href: '/shop?category=desert-coolers' },
    { name: 'Tower Coolers', href: '/shop?category=tower-coolers' },
    { name: 'Industrial Coolers', href: '/shop?category=industrial-coolers' },
    { name: 'Spare Parts', href: '/shop?category=spare-parts' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-xl shadow-lg supports-[backdrop-filter]:bg-background/75 transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 transition-all duration-500 hover:scale-105 cursor-pointer z-10 group" 
            onClick={() => {
              console.log('Logo clicked');
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative h-12 w-12 bg-gradient-brand rounded-xl flex items-center justify-center shadow-md group-hover:shadow-brand transition-all duration-500 group-hover:rotate-[360deg]">
              <span className="text-2xl font-bold text-white transform group-hover:scale-110 transition-transform duration-500">M</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative">
              <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">Mango</h1>
              <p className="text-xs text-muted-foreground -mt-0.5 group-hover:text-primary/70 transition-colors duration-300">Appliances</p>
            </div>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchWithSuggestions 
              placeholder="Search products, brands, categories..."
              onSearch={(query) => {
                navigate(`/shop?search=${encodeURIComponent(query)}`);
                setIsMenuOpen(false);
              }}
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* AI Assistant */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="relative group hover:bg-primary/10 hover:scale-110 transition-all duration-300 rounded-xl" 
              onClick={() => window.dispatchEvent(new Event('mango-chat-toggle'))}
              title="AI Assistant"
            >
              <Bot className="h-5 w-5 text-primary group-hover:animate-pulse" />
              <div className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon-sm" className="relative group hover:scale-110 transition-all duration-300 rounded-xl hover:bg-error/10" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5 text-muted-foreground group-hover:text-error group-hover:fill-error/20 transition-all duration-300" />
                {wishlistItems.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center text-[10px] font-bold shadow-lg animate-in zoom-in-50 duration-200 ring-2 ring-background"
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon-sm" className="relative group hover:scale-110 transition-all duration-300 rounded-xl hover:bg-primary/10" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center text-[10px] font-bold shadow-lg animate-in zoom-in-50 duration-200 ring-2 ring-background"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="group flex items-center gap-2 hover:bg-primary/10 transition-all duration-300 rounded-xl">
                    <div className="p-1.5 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                      {user.user_metadata?.first_name || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-all duration-300 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 shadow-xl border-border/50 bg-background/95 backdrop-blur-lg">
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                    <Link to="/profile" className="flex items-center py-2.5">
                      <User className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                    <Link to="/dashboard" className="flex items-center py-2.5">
                      <Settings className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem 
                    onClick={async () => {
                      await signOut();
                      showAuthSuccess('signout');
                    }} 
                    className="cursor-pointer flex items-center py-2.5 text-destructive hover:bg-destructive/10 transition-colors duration-200 focus:text-destructive"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="group hover:bg-primary/10 transition-all duration-300 rounded-xl" asChild>
                <Link to="/auth" className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Sign In</span>
                </Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden relative min-h-[44px] min-w-[44px] touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative">
                <Menu className={`h-5 w-5 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`h-5 w-5 absolute top-0 left-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden md:flex border-t border-border/30 py-4">
          <div className="flex items-center gap-8">
            {navigation.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-bold transition-all duration-300 relative group py-1 ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-brand rounded-full transition-all duration-300 ${
                  isActive(item.href) ? 'w-full shadow-brand' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            
            {/* Category Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-bold text-foreground/70 hover:text-primary data-[state=open]:text-primary transition-all duration-300 py-1">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2 bg-background/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-border/30">
                      {coolerCategories.map((category, index) => (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link
                            to={category.href}
                            className="group block rounded-xl px-4 py-3.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-primary/20 hover:shadow-sm"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <div className="flex items-center justify-between">
                              <span>{category.name}</span>
                              <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Comparison Link */}
            <Link
              to="/comparison"
              className={`text-sm font-bold transition-all duration-300 relative group py-1 ${
                isActive('/comparison')
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-primary'
              }`}
            >
              Comparison
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-brand rounded-full transition-all duration-300 ${
                isActive('/comparison') ? 'w-full shadow-brand' : 'w-0 group-hover:w-full'
              }`} />
            </Link>

            {navigation.slice(2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-bold transition-all duration-300 relative group py-1 whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-brand rounded-full transition-all duration-300 ${
                  isActive(item.href) ? 'w-full shadow-brand' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu backdrop */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile menu */}
        <div className={`
          fixed top-16 left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border/30 shadow-2xl z-50 md:hidden
          transform transition-all duration-500 ease-out
          ${isMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
          }
        `}>
          <div className="container mx-auto px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Mobile search */}
            <div className="mb-6">
              <SearchWithSuggestions 
                placeholder="Search products..."
                onSearch={(query) => {
                  navigate(`/shop?search=${encodeURIComponent(query)}`);
                  setIsMenuOpen(false);
                }}
                className="w-full"
              />
            </div>

            {/* Mobile navigation */}
            <nav>
              <ul className="space-y-1">
                {navigation.slice(0, 2).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center py-4 px-4 -mx-4 rounded-xl text-base font-bold transition-all duration-300
                        active:scale-[0.98] border border-transparent
                        ${isActive(item.href)
                          ? 'text-primary bg-primary/10 border-primary/20 shadow-sm'
                          : 'text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/10'
                        }
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {/* Category submenu for mobile */}
                <li className="py-3">
                  <div className="px-4 -mx-4">
                    <span className="text-sm font-bold text-muted-foreground mb-3 block uppercase tracking-wider">Categories</span>
                    <ul className="space-y-1.5 ml-2">
                      {coolerCategories.map((category) => (
                        <li key={category.name}>
                          <Link
                            to={category.href}
                            className="
                              group flex items-center justify-between py-3.5 px-4 -mx-3 rounded-xl text-sm font-semibold
                              text-foreground/80 hover:text-primary hover:bg-primary/10
                              transition-all duration-300 active:scale-[0.98] border border-transparent hover:border-primary/20
                            "
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span>{category.name}</span>
                            <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                {/* Comparison Link for mobile */}
                <li>
                  <Link
                    to="/comparison"
                    className={`
                      flex items-center py-4 px-4 -mx-4 rounded-xl text-base font-bold transition-all duration-300
                      active:scale-[0.98] border border-transparent
                      ${isActive('/comparison')
                        ? 'text-primary bg-primary/10 border-primary/20 shadow-sm'
                        : 'text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/10'
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Comparison
                  </Link>
                </li>

                {navigation.slice(2).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center py-4 px-4 -mx-4 rounded-xl text-base font-bold transition-all duration-300
                        active:scale-[0.98] border border-transparent
                        ${isActive(item.href)
                          ? 'text-primary bg-primary/10 border-primary/20 shadow-sm'
                          : 'text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/10'
                        }
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile menu footer */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="hover:bg-error/10 hover:border-error/50 hover:text-error transition-all duration-300" asChild>
                  <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="h-4 w-4 mr-2" />
                    <span className="font-semibold">Wishlist</span>
                    <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1.5 text-xs">{wishlistItems.length}</Badge>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300" asChild>
                  <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    <span className="font-semibold">Cart</span>
                    <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1.5 text-xs">{itemCount}</Badge>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;