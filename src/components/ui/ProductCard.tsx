import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <Card className={`group card-interactive overflow-hidden ${className}`}>
      <div className="relative">
        {/* Product Image */}
        <Link to={`/product/${product.slug}`}>
          <div className="aspect-square overflow-hidden bg-muted/30 relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {product.tags.includes('bestseller') && (
            <Badge className="bg-accent text-accent-foreground text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Bestseller
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:scale-110 transition-all duration-300"
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 transition-all duration-300 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500 scale-110' : 'hover:scale-110'}`} />
        </Button>

        {/* Quick Actions - appear on hover */}
        <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <Button 
            variant="hero"
            size="sm"
            className="w-full animate-shimmer"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.brand}</span>
          <span>{product.category.name}</span>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-foreground line-clamp-2 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {!product.inStock && (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Key Features */}
        {product.specifications && (
          <div className="text-xs text-muted-foreground">
            {product.tankCapacity && (
              <span className="mr-3">Tank: {product.tankCapacity}</span>
            )}
            {product.coolingArea && (
              <span>Area: {product.coolingArea}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;