import { useEffect, useState } from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { featuredProducts } from '@/data/products';
import { spareProducts } from '@/data/spareProducts';
import { Product } from '@/types/product';
import ProductCard from '@/components/ui/ProductCard';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
  const { wishlistItems, loading } = useWishlist();
  const { user } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Filter products that are in the wishlist
    const allProducts = [...featuredProducts, ...spareProducts];
    const products = allProducts.filter(product =>
      wishlistItems.includes(product.id)
    );
    setWishlistProducts(products);
  }, [wishlistItems]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
            <p className="text-muted-foreground mb-8">Please login to view your wishlist</p>
            <Button asChild>
              <Link to="/auth">Login to Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
            <h1 className="text-2xl sm:text-3xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        <Separator className="mb-6 sm:mb-8" />

        {/* Wishlist Content */}
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <ShoppingBag className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Your wishlist is empty</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-sm mx-auto">
              Start adding products you love to your wishlist
            </p>
            <Button asChild className="text-sm sm:text-base py-2 sm:py-3">
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;