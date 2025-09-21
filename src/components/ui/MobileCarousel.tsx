import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

interface MobileCarouselProps {
  children: React.ReactNode[];
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

export const MobileCarousel = ({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 16,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  className = ''
}: MobileCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.mobile;
    
    const width = window.innerWidth;
    if (width >= 1024) return itemsPerView.desktop;
    if (width >= 768) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [itemsVisible, setItemsVisible] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsVisible(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const totalSlides = Math.ceil(children.length / itemsVisible);
  const maxIndex = totalSlides - 1;

  // Swipe gesture handling
  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => nextSlide(),
    onSwipeRight: () => prevSlide(),
    minSwipeDistance: 50,
    preventScroll: false
  });

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    if (autoPlay && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayInterval);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      resetAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, maxIndex, isDragging]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className={`relative ${className}`}>
      {/* Main carousel container */}
      <div
        ref={(el) => {
          if (el) {
            containerRef.current = el;
            swipeRef.current = el;
          }
        }}
        className="overflow-hidden rounded-lg touch-pan-y"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            gap: `${gap}px`
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="flex-shrink-0 w-full flex"
              style={{ gap: `${gap}px` }}
            >
              {children
                .slice(slideIndex * itemsVisible, (slideIndex + 1) * itemsVisible)
                .map((child, itemIndex) => (
                  <div
                    key={slideIndex * itemsVisible + itemIndex}
                    className="flex-shrink-0"
                    style={{ width: `calc((100% - ${gap * (itemsVisible - 1)}px) / ${itemsVisible})` }}
                  >
                    {child}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      {showControls && totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm 
                       hover:bg-background/95 shadow-lg z-10 min-h-[44px] min-w-[44px] 
                       touch-manipulation active:scale-95"
            onClick={prevSlide}
            disabled={currentIndex === 0 && !autoPlay}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm 
                       hover:bg-background/95 shadow-lg z-10 min-h-[44px] min-w-[44px] 
                       touch-manipulation active:scale-95"
            onClick={nextSlide}
            disabled={currentIndex === maxIndex && !autoPlay}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 touch-manipulation
                ${index === currentIndex 
                  ? 'bg-accent scale-110' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }
              `}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};