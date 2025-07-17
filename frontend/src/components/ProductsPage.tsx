import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useAuthContext } from '../context/AuthContext';

const ProductsPage = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return; // Wait for user to be available
      
      setIsLoading(true);
      try {
        const response = await fetch('/api/get-sample-products', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setProducts(data);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [user?.isLoggedin]);

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
          <div className="flex justify-center items-center mb-7 pb-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {products.length} sustainable products available
            </span>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96 text-gray-600 dark:text-gray-400">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin mb-4"></div>
              <p>Setting up recommendations...</p>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
              {products.map(product => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
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