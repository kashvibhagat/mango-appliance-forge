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
import SearchWithSuggestions from '@/components/ui/SearchWithSuggestions';
import { supabase } from '@/integrations/supabase/client';

// Import category images
import personalCoolerImg from '@/assets/category-personal-cooler.jpg';
import towerCoolerImg from '@/assets/category-tower-cooler.jpg';
import desertCoolerImg from '@/assets/category-desert-cooler.jpg';
import industrialCoolerImg from '@/assets/category-industrial-cooler.jpg';
import sparePartsImg from '@/assets/category-spare-parts.jpg';

// Define categories locally since we're moving away from TypeScript data
const categories = [
  { id: '1', name: 'Personal Coolers', slug: 'personal-coolers', filters: [], image: personalCoolerImg },
  { id: '2', name: 'Tower Coolers', slug: 'tower-coolers', filters: [], image: towerCoolerImg },
  { id: '3', name: 'Desert Coolers', slug: 'desert-coolers', filters: [], image: desertCoolerImg },
  { id: '4', name: 'Industrial Coolers', slug: 'industrial-coolers', filters: [], image: industrialCoolerImg },
  { id: '5', name: 'Spare Parts', slug: 'spare-parts', filters: [], image: sparePartsImg },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('');

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
          slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
          sku: product.model,
          warranty: `${product.warranty_period || 12} months warranty`,
          powerConsumption: product.specifications?.['Power Consumption'] || '',
          tankCapacity: product.specifications?.['Tank Capacity'] || '',
          airThrow: product.specifications?.['Air Throw'] || '',
          coolingArea: product.specifications?.['Room Size'] || '',
          createdAt: product.created_at,
          updatedAt: product.updated_at,
          dimensions: { length: 0, width: 0, height: 0, weight: 0 },
          variants: [],
          // Transform category to match expected structure
          category: {
            id: product.category || 'unknown',
            name: product.category ? product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown',
            slug: product.category || 'unknown',
            filters: []
          },
          compatibleProducts: product.compatible_products || []
        }));
        
        setProducts(transformedProducts);
        
        // Store all main products (non-spare-parts) for filtering
        setAllProducts(transformedProducts.filter(p => p.category.slug !== 'spare-parts'));
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
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.brand && product.brand.toLowerCase().includes(query)) ||
        (product.model && product.model.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      // Map category slugs to match database values
      const categoryMap: Record<string, string> = {
        'personal-coolers': 'personal-coolers',
        'tower-coolers': 'tower-coolers', 
        'desert-coolers': 'desert-coolers',
        'industrial-coolers': 'industrial-coolers',
        'spare-parts': 'spare-parts'
      };
      
      const dbCategory = categoryMap[selectedCategory.slug];
      if (dbCategory) {
        filtered = filtered.filter(product => product.category.slug === dbCategory);
      }
    }

    // Filter spare parts by selected product
    if (selectedCategory?.slug === 'spare-parts' && selectedProductFilter) {
      filtered = filtered.filter(product => {
        const compatibleProducts = product.compatibleProducts || [];
        return compatibleProducts.includes('all') || 
               compatibleProducts.includes(selectedProductFilter) ||
               compatibleProducts.some((cp: string) => cp.toLowerCase() === selectedProductFilter.toLowerCase());
      });
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
  }, [products, selectedCategory, searchQuery, priceRange, sortBy, selectedProductFilter]);

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
    setSelectedProductFilter('');
  };

  const activeFilterCount = Object.values(selectedFilters).reduce((acc, filters) => acc + filters.length, 0);

  const FilterSidebar = () => (
    <div className="space-y-4">
      {/* Product Filter for Spare Parts */}
      {selectedCategory?.slug === 'spare-parts' && (
        <Card className="border-border/50 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              🔧 Filter by Product
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Select a product to view compatible spare parts
            </p>
            <Select value={selectedProductFilter} onValueChange={setSelectedProductFilter}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-background z-50">
                <SelectItem value="">All Products</SelectItem>
                {allProducts.map(product => (
                  <SelectItem key={product.id} value={product.name}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProductFilter && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedProductFilter('')}
                className="w-full hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Product Filter
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card className="border-border/50 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            💰 Price Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg border border-border/50">
            <span className="text-sm font-semibold text-foreground">₹{priceRange[0].toLocaleString()}</span>
            <span className="text-muted-foreground">—</span>
            <span className="text-sm font-semibold text-foreground">₹{priceRange[1].toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPriceRange([0, 10000])}
              className={`transition-all duration-300 ${
                priceRange[1] === 10000 && priceRange[0] === 0 
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                  : 'hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              Under ₹10K
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPriceRange([10000, 25000])}
              className={`transition-all duration-300 ${
                priceRange[0] === 10000 && priceRange[1] === 25000 
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                  : 'hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              ₹10K - ₹25K
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPriceRange([25000, 50000])}
              className={`transition-all duration-300 ${
                priceRange[0] === 25000 && priceRange[1] === 50000 
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                  : 'hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              ₹25K - ₹50K
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPriceRange([50000, 100000])}
              className={`transition-all duration-300 ${
                priceRange[0] === 50000 && priceRange[1] === 100000 
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                  : 'hover:border-primary/50 hover:bg-accent/50'
              }`}
            >
              Above ₹50K
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
      <div className="relative bg-gradient-hero overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2LTJoLTJ2Mmgyem0wLTR2LTJoLTJ2Mmgyem0yLTJ2LTJoLTJ2Mmgyem0wLTR2LTJoLTJ2Mmgyem0tMiAydi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="container mx-auto px-4 relative">
          {/* Hero Content */}
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Premium Cooling Solutions</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Discover Your Perfect
              <span className="block text-primary mt-2">Cooling Experience</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our complete range of innovative air coolers designed for every need
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSearchParams({ category: category.slug })}
                className="group relative flex flex-col items-center p-6 md:p-8 bg-card/80 backdrop-blur-sm rounded-2xl shadow-card hover:shadow-brand transition-all duration-500 hover:scale-105 hover:-translate-y-1 border border-border/50 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                {/* Category image */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4 rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-500">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 group-hover:to-black/20 transition-all duration-500"></div>
                </div>
                
                {/* Category name */}
                <h3 className="text-sm md:text-base font-semibold text-foreground text-center group-hover:text-primary transition-colors duration-300 relative z-10">
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8" aria-label="Breadcrumb">
          <a href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">Home</a>
          <span className="text-muted-foreground/50">/</span>
          <a href="/shop" className="text-muted-foreground hover:text-primary transition-colors font-medium">Shop</a>
          {selectedCategory && (
            <>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-foreground font-semibold">{selectedCategory.name}</span>
            </>
          )}
        </nav>

        {/* Header */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-card border border-border/50 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {searchQuery ? (
                  <>Search results for <span className="text-primary">"{searchQuery}"</span></>
                ) : selectedCategory ? selectedCategory.name : 'All Products'}
              </h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {filteredProducts.length}
                </span>
                {filteredProducts.length === 1 ? 'product' : 'products'} available
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="flex-1 lg:flex-initial lg:w-72">
                <SearchWithSuggestions 
                  placeholder="Search products..."
                  onSearch={(query) => {
                    const newParams = new URLSearchParams(searchParams);
                    if (query) {
                      newParams.set('search', query);
                    } else {
                      newParams.delete('search');
                    }
                    setSearchParams(newParams);
                  }}
                  className="w-full"
                />
              </div>
              
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-background shadow-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">✨ Featured</SelectItem>
                  <SelectItem value="price-low">💰 Price: Low to High</SelectItem>
                  <SelectItem value="price-high">💎 Price: High to Low</SelectItem>
                  <SelectItem value="rating">⭐ Highest Rated</SelectItem>
                  <SelectItem value="newest">🆕 Newest First</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="hidden md:flex bg-background rounded-xl p-1 shadow-sm border border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-accent/50'}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`transition-all duration-300 ${viewMode === 'list' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-accent/50'}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden relative shadow-sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1.5 text-xs font-bold animate-scale-in">
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
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-3 mb-6 p-4 bg-accent/30 rounded-xl border border-border/50 animate-fade-in">
            <span className="text-sm font-medium text-foreground">Active filters:</span>
            <Badge variant="secondary" className="font-semibold">{activeFilterCount}</Badge>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto hover:bg-destructive/10 hover:text-destructive">
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="hover:bg-destructive/10 hover:text-destructive">
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <Card className="p-16 text-center shadow-card border-border/50 animate-fade-in">
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <SlidersHorizontal className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms to discover more products.</p>
                  </div>
                  <Button onClick={clearFilters} size="lg" className="shadow-md">
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                  </Button>
                </div>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? 'product-grid stagger-animation' : 'space-y-6 stagger-animation'}>
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    className="animate-fade-in"
                  >
                    <ProductCard 
                      product={product}
                      className={viewMode === 'list' ? 'flex-row' : ''}
                    />
                  </div>
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