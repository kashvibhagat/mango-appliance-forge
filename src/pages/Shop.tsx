import { useState, useMemo } from 'react';
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
import { featuredProducts, categories } from '@/data/products';
import { spareProducts } from '@/data/spareProducts';
import { Product } from '@/types/product';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const categorySlug = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = categories.find(cat => cat.slug === categorySlug);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const allProducts = [...featuredProducts, ...spareProducts];
    let filtered = allProducts;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.features.some(feature => feature.toLowerCase().includes(query)) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        Object.values(product.specifications).some(spec => spec.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category.id === selectedCategory.id);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply other filters
    Object.entries(selectedFilters).forEach(([filterId, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(product => {
          const filter = selectedCategory?.filters.find(f => f.id === filterId);
          if (!filter) return true;

          switch (filter.id) {
            case 'cooling-area':
              return values.some(value => {
                if (value === 'small') return product.coolingArea && product.coolingArea.includes('150-300');
                if (value === 'medium') return product.coolingArea && product.coolingArea.includes('300-600');
                if (value === 'large') return product.coolingArea && product.coolingArea.includes('600+');
                return false;
              });
            case 'tank-capacity':
              return values.some(value => {
                if (value === '20-30') return product.tankCapacity && parseInt(product.tankCapacity) >= 20 && parseInt(product.tankCapacity) <= 30;
                if (value === '30-50') return product.tankCapacity && parseInt(product.tankCapacity) >= 30 && parseInt(product.tankCapacity) <= 50;
                if (value === '50+') return product.tankCapacity && parseInt(product.tankCapacity) >= 50;
                return false;
              });
            case 'part-type':
              return values.some(value => {
                if (value === 'cooling-pads') return product.tags.includes('cooling-pads') || product.name.toLowerCase().includes('pad');
                if (value === 'motors') return product.tags.includes('motors') || product.name.toLowerCase().includes('motor');  
                if (value === 'pumps') return product.tags.includes('pumps') || product.name.toLowerCase().includes('pump');
                if (value === 'remote') return product.tags.includes('remote') || product.name.toLowerCase().includes('remote');
                if (value === 'filters') return product.tags.includes('filters') || product.name.toLowerCase().includes('filter');
                return product.tags.includes(value);
              });
            case 'compatibility':
              return values.some(value => {
                if (value === 'personal') return product.specifications['Compatibility']?.includes('Personal') || product.description.toLowerCase().includes('personal');
                if (value === 'tower') return product.specifications['Compatibility']?.includes('Tower') || product.description.toLowerCase().includes('tower');
                if (value === 'desert') return product.specifications['Compatibility']?.includes('Desert') || product.description.toLowerCase().includes('desert');
                if (value === 'industrial') return product.specifications['Compatibility']?.includes('Industrial') || product.description.toLowerCase().includes('industrial');
                return false;
              });
            case 'price-range':
              return values.some(value => {
                if (value === 'under-1000') return product.price < 1000;
                if (value === '1000-2500') return product.price >= 1000 && product.price <= 2500;
                if (value === '2500-5000') return product.price >= 2500 && product.price <= 5000;
                if (value === 'above-5000') return product.price > 5000;
                return false;
              });
            default:
              return true;
          }
        });
      }
    });

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
  }, [featuredProducts, spareProducts, selectedCategory, searchQuery, priceRange, selectedFilters, sortBy]);

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

      {/* Category Filters */}
      {selectedCategory?.filters.map((filter) => (
        <Card key={filter.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">{filter.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.id}-${option.value}`}
                  checked={selectedFilters[filter.id]?.includes(option.value) || false}
                  onCheckedChange={(checked) => 
                    handleFilterChange(filter.id, option.value, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`${filter.id}-${option.value}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {option.label}
                  {option.count && (
                    <span className="text-muted-foreground ml-1">({option.count})</span>
                  )}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSearchParams({ category: category.slug })}
                className="group flex flex-col items-center p-6 bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <img 
                    src={category.image || '/placeholder.svg'} 
                    alt={category.name}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  />
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
            {Object.entries(selectedFilters).map(([filterId, values]) =>
              values.map((value) => {
                const filter = selectedCategory?.filters.find(f => f.id === filterId);
                const option = filter?.options?.find(o => o.value === value);
                return (
                  <Badge key={`${filterId}-${value}`} variant="secondary" className="gap-1">
                    {option?.label || value}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => handleFilterChange(filterId, value, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })
            )}
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
                  <ProductCard key={product.id} product={product} />
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