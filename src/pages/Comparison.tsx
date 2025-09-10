import { useState } from 'react';
import { Search, X, Star, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { allProducts } from '@/data/products';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

const Comparison = () => {
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>([null, null]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlot, setActiveSlot] = useState<0 | 1 | null>(null);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Filter products based on search query
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductSelect = (product: Product, slot: 0 | 1) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[slot] = product;
    setSelectedProducts(newSelectedProducts);
    setActiveSlot(null);
    setSearchQuery('');
  };

  const handleRemoveProduct = (slot: 0 | 1) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[slot] = null;
    setSelectedProducts(newSelectedProducts);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product.id);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const ComparisonTable = () => {
    const product1 = selectedProducts[0];
    const product2 = selectedProducts[1];

    if (!product1 || !product2) return null;

    const comparisonRows = [
      { label: 'Price', key: 'price', format: (value: any) => `₹${value.toLocaleString()}` },
      { label: 'Brand', key: 'brand' },
      { label: 'Rating', key: 'rating', format: (value: any) => `${value}/5 ⭐` },
      { label: 'Reviews', key: 'reviewCount', format: (value: any) => `${value} reviews` },
      { label: 'Tank Capacity', key: 'tankCapacity', format: (value: any) => value || 'N/A' },
      { label: 'Cooling Area', key: 'coolingArea', format: (value: any) => value || 'N/A' },
      { label: 'Power Consumption', key: 'powerConsumption', format: (value: any) => value || 'N/A' },
      { label: 'Air Throw', key: 'airThrow', format: (value: any) => value || 'N/A' },
      { label: 'Warranty', key: 'warranty' },
      { label: 'Stock Status', key: 'inStock', format: (value: any) => value ? 'In Stock' : 'Out of Stock' },
    ];

    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 font-semibold">Feature</th>
                  <th className="text-center py-4 font-semibold">{product1.name}</th>
                  <th className="text-center py-4 font-semibold">{product2.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => {
                  const value1 = (product1 as any)[row.key];
                  const value2 = (product2 as any)[row.key];
                  const formatted1 = row.format ? row.format(value1) : value1;
                  const formatted2 = row.format ? row.format(value2) : value2;

                  return (
                    <tr key={row.label} className="border-b">
                      <td className="py-4 font-medium text-muted-foreground">{row.label}</td>
                      <td className="py-4 text-center">{formatted1}</td>
                      <td className="py-4 text-center">{formatted2}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Features Comparison */}
          <div className="mt-8">
            <h4 className="font-semibold mb-4">Features Comparison</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3 text-center">{product1.name}</h5>
                <div className="space-y-2">
                  {product1.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-3 text-center">{product2.name}</h5>
                <div className="space-y-2">
                  {product2.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Compare Air Coolers</h1>
        <p className="text-muted-foreground">
          Select two air coolers to compare their features, specifications, and prices
        </p>
      </div>

      {/* Product Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {[0, 1].map((slot) => (
          <Card key={slot} className="relative">
            <CardContent className="p-6">
              {selectedProducts[slot] ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 z-10"
                      onClick={() => handleRemoveProduct(slot as 0 | 1)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <img
                      src={selectedProducts[slot]!.images[0]}
                      alt={selectedProducts[slot]!.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Badge variant="secondary">{selectedProducts[slot]!.brand}</Badge>
                    <h3 className="font-semibold text-lg">{selectedProducts[slot]!.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{selectedProducts[slot]!.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({selectedProducts[slot]!.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      ₹{selectedProducts[slot]!.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAddToCart(selectedProducts[slot]!)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWishlistToggle(selectedProducts[slot]!)}
                    >
                      {isInWishlist(selectedProducts[slot]!.id) ? '❤️' : '🤍'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="space-y-4">
                    <div className="text-6xl text-muted-foreground">+</div>
                    <div>
                      <h3 className="font-semibold text-lg">Select Product {slot + 1}</h3>
                      <p className="text-muted-foreground text-sm">
                        Choose an air cooler to compare
                      </p>
                    </div>
                    <Button onClick={() => setActiveSlot(slot as 0 | 1)}>
                      Select Product
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Selection Modal */}
      {activeSlot !== null && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Select Product {activeSlot + 1}</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveSlot(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProductSelect(product, activeSlot)}
                >
                  <CardContent className="p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">{product.brand}</Badge>
                      <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{product.rating}</span>
                        </div>
                        <div className="font-semibold text-sm">
                          ₹{product.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Quick Comparison Cards */}
      {selectedProducts[0] && selectedProducts[1] && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="text-center p-6">
            <h3 className="font-semibold mb-4">Better Value</h3>
            <div className="text-4xl mb-2">
              {selectedProducts[0].price < selectedProducts[1].price ? '👑' : '💰'}
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedProducts[0].price < selectedProducts[1].price 
                ? `${selectedProducts[0].name} is ₹${(selectedProducts[1].price - selectedProducts[0].price).toLocaleString()} cheaper`
                : `${selectedProducts[1].name} is ₹${(selectedProducts[0].price - selectedProducts[1].price).toLocaleString()} cheaper`
              }
            </p>
          </Card>

          <Card className="text-center p-6">
            <h3 className="font-semibold mb-4">Higher Rated</h3>
            <div className="text-4xl mb-2">
              {selectedProducts[0].rating >= selectedProducts[1].rating ? '⭐' : '🌟'}
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedProducts[0].rating >= selectedProducts[1].rating 
                ? `${selectedProducts[0].name} has ${selectedProducts[0].rating}/5 rating`
                : `${selectedProducts[1].name} has ${selectedProducts[1].rating}/5 rating`
              }
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Comparison;