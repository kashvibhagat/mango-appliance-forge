import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ProductCard from '@/components/ui/ProductCard';
import { supabase } from '@/integrations/supabase/client';

// Define categories locally since we're moving away from TypeScript data
const categories = [
  { id: '1', name: 'Personal Coolers', slug: 'personal-coolers', filters: [] },
  { id: '2', name: 'Tower Coolers', slug: 'tower-coolers', filters: [] },
  { id: '3', name: 'Desert Coolers', slug: 'desert-coolers', filters: [] },
  { id: '4', name: 'Industrial Coolers', slug: 'industrial-coolers', filters: [] },
  { id: '5', name: 'Spare Parts', slug: 'spare-parts', filters: [] },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categorySlug = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = categories.find(cat => cat.slug === categorySlug);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('name');

        if (error) throw error;
        
        // Transform Supabase products to match our expected structure
        const transformedProducts = (data || []).map(product => ({
          ...product,
          images: Array.isArray(product.images) ? product.images : [product.images].filter(Boolean),
          specifications: product.specifications || {},
          rating: 4.5, // Default rating since it's not in DB yet
          reviewCount: Math.floor(Math.random() * 100) + 10, // Mock review count
          inStock: product.stock_quantity > 0,
          stockQuantity: product.stock_quantity,
          originalPrice: product.price + Math.floor(product.price * 0.2), // Mock original price
          shortDescription: product.description?.substring(0, 100) + '...' || '',
          features: [], // Empty for now
          tags: [], // Empty for now
          slug: product.name.toLowerCase().replace(/\s+/g, '-'),
          sku: product.model,
          warranty: `${product.warranty_period || 12} months warranty`,
          powerConsumption: product.specifications?.['Power Consumption'] || '',
          tankCapacity: product.specifications?.['Tank Capacity'] || '',
          airThrow: product.specifications?.['Air Throw'] || '',
          coolingArea: product.specifications?.['Room Size'] || '',
          createdAt: product.created_at,
          updatedAt: product.updated_at,
          dimensions: { length: 0, width: 0, height: 0, weight: 0 },
          variants: []
        }));
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory.slug);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      default:
        return filtered;
    }
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[filterId]) newFilters[filterId] = [];
      
      if (checked) {
        newFilters[filterId].push(value);
      } else {
        newFilters[filterId] = newFilters[filterId].filter(v => v !== value);
      }
      
      if (newFilters[filterId].length === 0) {
        delete newFilters[filterId];
      }
      
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setPriceRange([0, 100000]);
  };

  const activeFilterCount = Object.values(selectedFilters).reduce((acc, filters) => acc + filters.length, 0);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-sm">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>-</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
          {/* Price range slider would go here - simplified for now */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPriceRange([0, 10000])}
              className={priceRange[1] === 10000 ? 'bg-accent text-accent-foreground' : ''}
            >
              Under ₹10K
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPriceRange([10000, 25000])}
              className={priceRange[0] === 10000 && priceRange[1] === 25000 ? 'bg-accent text-accent-foreground' : ''}
            >
              ₹10K - ₹25K
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground mb-2">Find the right Cooler for you</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Ultimate Cooling Solutions By Mango
            </h1>
            
            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto mb-12">
              <img 
                src="/src/assets/hero-landscape-coolers.jpg" 
                alt="Mango Coolers Collection" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSearchParams({ category: category.slug })}
                className="group flex flex-col items-center p-6 bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full"></div>
                </div>
                <h3 className="text-sm md:text-base font-medium text-foreground text-center group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Shop</span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span className="text-foreground">{selectedCategory.name}</span>
            </>
          )}
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {searchQuery ? `Search results for "${searchQuery}"` : 
               selectedCategory ? selectedCategory.name : 'All Products'}
            </h2>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="hidden md:flex border rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-accent text-accent-foreground' : ''}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-accent text-accent-foreground' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <SlidersHorizontal className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                  </div>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? 'product-grid stagger-animation' : 'space-y-6 stagger-animation'}>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;