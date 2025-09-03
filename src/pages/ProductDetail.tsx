import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Zap, 
  Star, 
  Shield, 
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ProductCard from '@/components/ui/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { allProducts } from '@/data/products';

const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const product = allProducts.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => 
    p.category.id === product.category.id && p.id !== product.id
  ).slice(0, 4);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const mockReviews = [
    {
      id: '1',
      userName: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent cooling performance! Really happy with this purchase. The honeycomb pads work great.',
      date: '2024-02-15',
      verified: true
    },
    {
      id: '2',
      userName: 'Priya Singh',
      rating: 4,
      comment: 'Good quality air cooler. Installation was easy and cooling is effective.',
      date: '2024-02-10',
      verified: true
    },
    {
      id: '3',
      userName: 'Amit Sharma',
      rating: 5,
      comment: 'Best cooler in this price range. Highly recommended!',
      date: '2024-02-08',
      verified: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-accent">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category.slug}`} className="hover:text-accent">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted/30 rounded-2xl overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-accent' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{product.brand}</Badge>
              <Badge variant="outline">{product.category.name}</Badge>
              {product.tags.includes('bestseller') && (
                <Badge className="bg-accent text-accent-foreground">
                  <Zap className="h-3 w-3 mr-1" />
                  Bestseller
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <Badge variant="destructive">
                    Save {discountPercentage}%
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Inclusive of all taxes. Free shipping on orders above ₹999.
            </p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <>
                <CheckCircle className="h-4 w-4 text-ok" />
                <span className="text-sm text-ok font-medium">In Stock ({product.stockQuantity} available)</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-danger" />
                <span className="text-sm text-danger font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-card/50 rounded-xl">
            {product.tankCapacity && (
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{product.tankCapacity}</div>
                <div className="text-xs text-muted-foreground">Tank Capacity</div>
              </div>
            )}
            {product.coolingArea && (
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{product.coolingArea}</div>
                <div className="text-xs text-muted-foreground">Cooling Area</div>
              </div>
            )}
            {product.powerConsumption && (
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{product.powerConsumption}</div>
                <div className="text-xs text-muted-foreground">Power Consumption</div>
              </div>
            )}
            {product.airThrow && (
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{product.airThrow}</div>
                <div className="text-xs text-muted-foreground">Air Throw</div>
              </div>
            )}
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stockQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="flex-1 btn-hero"
                disabled={!product.inStock}
                onClick={() => addToCart(product, quantity)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? 'text-danger border-danger' : ''}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="outline" size="lg" className="w-full" disabled={!product.inStock}>
              Buy Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <Shield className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-xs font-medium">{product.warranty}</div>
            </div>
            <div className="text-center">
              <Truck className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-xs font-medium">Free Shipping</div>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-xs font-medium">Easy Returns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Card className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({mockReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border/50">
                  <span className="font-medium text-foreground">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-ok mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="p-6">
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{review.userName}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">Verified Purchase</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;