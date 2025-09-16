import { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'recent' | 'trending';
  url?: string;
}

interface SearchWithSuggestionsProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchWithSuggestions = ({ 
  placeholder = "Search products...", 
  onSearch,
  className = ""
}: SearchWithSuggestionsProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [recentSearches] = useState<string[]>(['Cool Master', 'Desert Cooler', 'Spare Parts']);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Fetch products from Supabase for search suggestions
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, brand, model, category')
          .eq('is_active', true)
          .limit(20);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products for search:', error);
      }
    };

    fetchProducts();
  }, []);

  const trendingSearches = [
    'Arctic TC Series',
    'Personal Coolers',
    'Wintry Desert Coolers',
    'Cooling Pads',
    'Tower Coolers'
  ];

  useEffect(() => {
    if (query.length === 0) {
      // Show recent and trending when no query
      const recentSuggestions: SearchSuggestion[] = recentSearches.map((search, index) => ({
        id: `recent-${index}`,
        text: search,
        type: 'recent'
      }));

      const trendingSuggestions: SearchSuggestion[] = trendingSearches.slice(0, 3).map((search, index) => ({
        id: `trending-${index}`,
        text: search,
        type: 'trending'
      }));

      setSuggestions([...recentSuggestions, ...trendingSuggestions]);
    } else {
      // Filter products based on query
      const productSuggestions = products
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.brand && product.brand.toLowerCase().includes(query.toLowerCase())) ||
          (product.model && product.model.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 4)
        .map(product => ({
          id: product.id,
          text: product.name,
          type: 'product' as const,
          url: `/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`
        }));

      const categories = [
        { name: 'Personal Coolers', slug: 'personal-coolers' },
        { name: 'Desert Coolers', slug: 'desert-coolers' },
        { name: 'Tower Coolers', slug: 'tower-coolers' },
        { name: 'Industrial Coolers', slug: 'industrial-coolers' },
        { name: 'Spare Parts', slug: 'spare-parts' }
      ];

      const categorySuggestions = categories
        .filter(category => 
          category.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 2)
        .map((category, index) => ({
          id: `category-${index}`,
          text: category.name,
          type: 'category' as const,
          url: `/shop?category=${category.slug}`
        }));

      setSuggestions([...productSuggestions, ...categorySuggestions]);
    }
  }, [query, products]);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setQuery('');
      onSearch?.(searchQuery.trim());
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.url) {
      navigate(suggestion.url);
    } else {
      handleSearch(suggestion.text);
    }
    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'recent':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-accent" />;
      case 'product':
        return <Search className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 focus-ring bg-muted/50 border-0 focus:bg-card transition-all duration-300"
          autoComplete="off"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          <Card className="absolute top-full left-0 right-0 mt-1 z-20 max-h-80 overflow-y-auto animate-in slide-in-from-top-2 fade-in-0 duration-200">
            <CardContent className="p-2">
              {suggestions.length > 0 ? (
                <div className="space-y-1">
                  {query.length === 0 && recentSearches.length > 0 && (
                    <div className="px-2 py-1">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Recent searches</p>
                    </div>
                  )}
                  
                  {suggestions
                    .filter(s => query.length === 0 ? s.type === 'recent' : true)
                    .slice(0, query.length === 0 ? recentSearches.length : 6)
                    .map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-3 px-2 py-2 hover:bg-accent/10 rounded-md transition-colors text-left"
                    >
                      {getSuggestionIcon(suggestion.type)}
                      <span className="flex-1 text-sm">{suggestion.text}</span>
                      {suggestion.type === 'trending' && (
                        <Badge variant="outline" className="text-xs">
                          Trending
                        </Badge>
                      )}
                      {suggestion.type === 'category' && (
                        <Badge variant="secondary" className="text-xs">
                          Category
                        </Badge>
                      )}
                    </button>
                  ))}

                  {query.length === 0 && trendingSearches.length > 0 && (
                    <>
                      <div className="px-2 py-1 mt-3">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Trending searches</p>
                      </div>
                      {suggestions
                        .filter(s => s.type === 'trending')
                        .map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full flex items-center space-x-3 px-2 py-2 hover:bg-accent/10 rounded-md transition-colors text-left"
                        >
                          {getSuggestionIcon(suggestion.type)}
                          <span className="flex-1 text-sm">{suggestion.text}</span>
                          <Badge variant="outline" className="text-xs">
                            Trending
                          </Badge>
                        </button>
                      ))}
                    </>
                  )}

                  {query && (
                    <div className="px-2 py-2 border-t">
                      <button
                        onClick={() => handleSearch()}
                        className="w-full flex items-center space-x-3 px-2 py-2 hover:bg-accent/10 rounded-md transition-colors text-left text-accent font-medium"
                      >
                        <Search className="h-4 w-4" />
                        <span className="text-sm">Search for "{query}"</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : query ? (
                <div className="px-2 py-4 text-center text-muted-foreground text-sm">
                  No suggestions found
                </div>
              ) : null}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SearchWithSuggestions;