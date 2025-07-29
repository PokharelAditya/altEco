import { useEffect, useRef } from 'react';
import ProductCard from './subcomponents/ProductCard';

interface props {
  products: object[],
  isLoading: boolean,
  hasMore?: boolean,
  isLoadingMore?: boolean,
  onLoadMore?: () => void
}

const ProductsPage: React.FC<props> = ({ 
  products, 
  isLoading, 
  hasMore = false, 
  isLoadingMore = false, 
  onLoadMore 
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!onLoadMore) return; // Skip if no onLoadMore function provided

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore && !isLoading) {
          console.log('Loading more products...'); // Debug log
          onLoadMore();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before the element is visible
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef && hasMore) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoadingMore, onLoadMore, isLoading, products.length]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-5 py-5">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-green-500 text-4xl md:text-5xl font-bold mb-2.5">
            Sustainable Products
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-7">
            Discover eco-friendly alternatives that make a positive impact
          </p>
        </div>

        {/* Products Main */}
        <div className="w-full">
          {/* Products Info */}
          

          {/* Loading State - Initial Load */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96 text-gray-600 dark:text-gray-400">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin mb-4"></div>
              <p>Setting up recommendations...</p>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {products.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>

              {/* Load More Trigger - This element triggers infinite scroll */}
              {hasMore && (
                <div 
                  ref={loadMoreRef} 
                  className="text-center py-8"
                  style={{ minHeight: '50px' }}
                >
                  {isLoadingMore ? (
                    <div className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400">
                      <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin mb-4"></div>
                      <p>Loading more products...</p>
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400">
                      <p>Scroll to load more sustainable products...</p>
                    </div>
                  )}
                </div>
              )}

              {/* Manual Load More Button (fallback) */}
              {hasMore && !isLoadingMore && onLoadMore && (
                <div className="text-center mt-6 mb-10">
                  <button
                    onClick={() => {
                      console.log('Manual load more clicked'); // Debug log
                      onLoadMore();
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
                    disabled={isLoading}
                  >
                    Load More Products
                  </button>
                </div>
              )}

              {/* Status Messages */}
              {!hasMore && products.length > 0 && (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  <p>You've reached the end! No more products to load.</p>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {!isLoading && products.length === 0 && (
            <div className="text-center py-15 px-5 text-gray-600 dark:text-gray-400">
              <h3 className="mb-2.5 text-gray-700 dark:text-gray-300 text-lg font-semibold">
                No products available
              </h3>
              <p>Check back soon for new sustainable products!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;