import { useState, useEffect } from 'react';
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
import ProductPoliciesSection from '@/components/ui/ProductPoliciesSection';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';

const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        
        // Fetch the product by slug
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (productError || !productData) {
          console.error('Error fetching product:', productError);
          setProduct(null);
          return;
        }

        // Transform product to match expected structure
        const transformedProduct = {
          ...productData,
          images: Array.isArray(productData.images) ? productData.images : [productData.images].filter(Boolean),
          specifications: productData.specifications || {},
          rating: 4.5,
          reviewCount: Math.floor(Math.random() * 100) + 10,
          inStock: productData.stock_quantity > 0,
          stockQuantity: productData.stock_quantity,
          originalPrice: productData.price + Math.floor(productData.price * 0.2),
          shortDescription: productData.description?.substring(0, 100) + '...' || '',
          features: [],
          tags: [],
          slug: productData.slug,
          sku: productData.model,
          warranty: `${productData.warranty_period || 12} months warranty`,
          powerConsumption: productData.specifications?.['Power Consumption'] || '',
          tankCapacity: productData.specifications?.['Tank Capacity'] || '',
          airThrow: productData.specifications?.['Air Throw'] || '',
          coolingArea: productData.specifications?.['Room Size'] || '',
          createdAt: productData.created_at,
          updatedAt: productData.updated_at,
          dimensions: { length: 0, width: 0, height: 0, weight: 0 },
          variants: [],
          category: {
            id: productData.category || 'unknown',
            name: productData.category ? productData.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown',
            slug: productData.category || 'unknown',
            filters: []
          }
        };

        setProduct(transformedProduct);

        // Fetch related products
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .eq('is_active', true)
          .neq('id', productData.id)
          .limit(4);

        if (relatedData) {
          const transformedRelated = relatedData.map(p => ({
            ...p,
            images: Array.isArray(p.images) ? p.images : [p.images].filter(Boolean),
            inStock: p.stock_quantity > 0,
            originalPrice: p.price + Math.floor(p.price * 0.2),
            slug: p.slug,
            category: {
              id: p.category,
              name: p.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
              slug: p.category
            }
          }));
          setRelatedProducts(transformedRelated);
        }
      } catch (error) {
        console.error('Error:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      // Add multiple items based on quantity
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app, this would redirect to checkout
    window.location.href = '/cart';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading product...</p>
      </div>
    );
  }

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
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 overflow-x-auto">
        <Link to="/" className="hover:text-accent whitespace-nowrap">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-accent whitespace-nowrap">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category.slug}`} className="hover:text-accent whitespace-nowrap">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
        {/* Product Images */}
        <div className="space-y-3 sm:space-y-4">
          <div className="aspect-square bg-muted/30 rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md sm:rounded-lg overflow-hidden border-2 ${
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
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs sm:text-sm">{product.brand}</Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">{product.category.name}</Badge>
              {product.tags.includes('bestseller') && (
                <Badge className="bg-accent text-accent-foreground text-xs sm:text-sm">
                  <Zap className="h-3 w-3 mr-1" />
                  Bestseller
                </Badge>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-xs sm:text-sm text-muted-foreground ml-2">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg sm:text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <Badge variant="destructive" className="text-xs sm:text-sm">
                    Save {discountPercentage}%
                  </Badge>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
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
          <div className="grid grid-cols-2 gap-2 sm:gap-4 p-3 sm:p-4 bg-card/50 rounded-lg sm:rounded-xl">
            {product.tankCapacity && (
              <div className="text-center">
                <div className="text-sm sm:text-lg font-semibold text-foreground">{product.tankCapacity}</div>
                <div className="text-xs text-muted-foreground">Tank Capacity</div>
              </div>
            )}
            {product.coolingArea && (
              <div className="text-center">
                <div className="text-sm sm:text-lg font-semibold text-foreground">{product.coolingArea}</div>
                <div className="text-xs text-muted-foreground">Cooling Area</div>
              </div>
            )}
            {product.powerConsumption && (
              <div className="text-center">
                <div className="text-sm sm:text-lg font-semibold text-foreground">{product.powerConsumption}</div>
                <div className="text-xs text-muted-foreground">Power Consumption</div>
              </div>
            )}
            {product.airThrow && (
              <div className="text-center">
                <div className="text-sm sm:text-lg font-semibold text-foreground">{product.airThrow}</div>
                <div className="text-xs text-muted-foreground">Air Throw</div>
              </div>
            )}
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg w-fit">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium text-sm sm:text-base min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stockQuantity}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4">
              <Button 
                size="lg" 
                className="flex-1 btn-hero text-sm sm:text-base py-3"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-3 sm:px-4 ${isWishlisted ? 'text-danger border-danger' : ''}`}
              >
                <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="lg" className="px-3 sm:px-4">
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full text-sm sm:text-base py-3" 
              disabled={!product.inStock}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
            <div className="text-center">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-accent mx-auto mb-1 sm:mb-2" />
              <div className="text-xs font-medium">{product.warranty}</div>
            </div>
            <div className="text-center">
              <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-accent mx-auto mb-1 sm:mb-2" />
              <div className="text-xs font-medium">Free Shipping</div>
            </div>
            <div className="text-center">
              <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 text-accent mx-auto mb-1 sm:mb-2" />
              <div className="text-xs font-medium">Easy Returns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Card className="mb-8 sm:mb-12 lg:mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="description" className="text-xs sm:text-sm py-2 sm:py-3">
              <span className="hidden sm:inline">Description</span>
              <span className="sm:hidden">Details</span>
            </TabsTrigger>
            <TabsTrigger value="specifications" className="text-xs sm:text-sm py-2 sm:py-3">
              <span className="hidden sm:inline">Specifications</span>
              <span className="sm:hidden">Specs</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="text-xs sm:text-sm py-2 sm:py-3">Features</TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs sm:text-sm py-2 sm:py-3">
              Reviews ({mockReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="p-3 sm:p-4 lg:p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-4 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-6 sm:space-y-0">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/50 gap-1 sm:gap-0">
                  <span className="font-medium text-foreground text-sm sm:text-base">{key}</span>
                  <span className="text-muted-foreground text-sm sm:text-base">{String(value)}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-3 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 sm:space-y-0">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-ok mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm sm:text-base">{feature}</span>
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

      {/* Product Policies & Information */}
      <ProductPoliciesSection product={product} />

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