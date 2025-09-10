import { Card, CardContent } from '@/components/ui/card';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'product' | 'text';
  count?: number;
}

const LoadingSkeleton = ({ variant = 'card', count = 1 }: LoadingSkeletonProps) => {
  const skeletons = Array.from({ length: count });

  const ProductSkeleton = () => (
    <Card className="overflow-hidden">
      <div className="aspect-square skeleton rounded-lg"></div>
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="skeleton h-3 w-16 rounded"></div>
          <div className="skeleton h-3 w-20 rounded"></div>
        </div>
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-3/4 rounded"></div>
        <div className="flex items-center space-x-2">
          <div className="skeleton h-3 w-20 rounded"></div>
          <div className="skeleton h-3 w-16 rounded"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="skeleton h-5 w-24 rounded"></div>
          <div className="skeleton h-3 w-16 rounded"></div>
        </div>
      </CardContent>
    </Card>
  );

  const CardSkeleton = () => (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="skeleton h-6 w-3/4 rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-5/6 rounded"></div>
        <div className="skeleton h-8 w-1/3 rounded"></div>
      </div>
    </Card>
  );

  const ListSkeleton = () => (
    <div className="space-y-4">
      {skeletons.map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-card rounded-lg">
          <div className="skeleton h-12 w-12 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4 rounded"></div>
            <div className="skeleton h-3 w-1/2 rounded"></div>
          </div>
          <div className="skeleton h-8 w-20 rounded"></div>
        </div>
      ))}
    </div>
  );

  const TextSkeleton = () => (
    <div className="space-y-2">
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton h-4 w-full rounded"></div>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'product':
        return (
          <div className="product-grid">
            {skeletons.map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        );
      case 'card':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skeletons.map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        );
      case 'list':
        return <ListSkeleton />;
      case 'text':
        return <TextSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  return (
    <div className="animate-pulse">
      {renderSkeleton()}
    </div>
  );
};

export default LoadingSkeleton;