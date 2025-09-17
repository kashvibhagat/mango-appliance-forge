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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, signOut } = useAuth();
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in slide-in-from-top-4 duration-300">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer z-10" 
            onClick={() => {
              console.log('Logo clicked');
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="h-8 w-8 bg-gradient-brand rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Mango</h1>
              <p className="text-xs text-muted-foreground -mt-1">Appliances</p>
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

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
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
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline text-sm">
                      {user.user_metadata?.first_name || user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm">Sign In</span>
                </Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden md:flex border-t border-border py-4">
          <div className="flex items-center space-x-8">
            {navigation.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.href)
                    ? 'text-accent border-b-2 border-accent pb-1'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Category Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-accent data-[state=open]:text-accent">
                    Category
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-2">
                      {coolerCategories.map((category) => (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link
                            to={category.href}
                            className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                          >
                            {category.name}
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
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive('/comparison')
                  ? 'text-accent border-b-2 border-accent pb-1'
                  : 'text-muted-foreground'
              }`}
            >
              Comparison
            </Link>

            {navigation.slice(2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.href)
                    ? 'text-accent border-b-2 border-accent pb-1'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            {/* Mobile search */}
            <SearchWithSuggestions 
              placeholder="Search products..."
              onSearch={(query) => {
                navigate(`/shop?search=${encodeURIComponent(query)}`);
                setIsMenuOpen(false);
              }}
              className="mb-4"
            />

            {/* Mobile navigation */}
            <nav>
              <ul className="space-y-2">
                {navigation.slice(0, 2).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`block py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-accent'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {/* Category submenu for mobile */}
                <li>
                  <div className="py-2">
                    <span className="text-sm font-medium text-muted-foreground">Category</span>
                    <ul className="mt-2 ml-4 space-y-1">
                      {coolerCategories.map((category) => (
                        <li key={category.name}>
                          <Link
                            to={category.href}
                            className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category.name}
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
                    className={`block py-2 text-sm font-medium transition-colors ${
                      isActive('/comparison')
                        ? 'text-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Comparison
                  </Link>
                </li>

                {navigation.slice(2).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`block py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-accent'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;