// import { useState, useEffect } from 'react';
import ProductCard from './subcomponents/ProductCard';
// import { useAuthContext } from '../context/AuthContext';

interface props {
  products: object[],
  isLoading: boolean
}

const ProductsPage:React.FC<props> = ({ products, isLoading }) => {
//   const { user } = useAuthContext();
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//
//   useEffect(() => {
//   const fetchProducts = async () => {
//     if (!user) return;
//
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/get-sample-products', {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       const data = await response.json();
//
//       const shuffle = (arr: any[]) => {
//         const copy = [...arr];
//         for (let i = copy.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [copy[i], copy[j]] = [copy[j], copy[i]];
//         }
//         return copy;
//       };
//
//       const high = data.filter((p: any) => p.similarity > 0.5);
//       const medium = data.filter((p: any) => p.similarity > 0.09 && p.similarity <= 0.5);
//       const low = data.filter((p: any) => p.similarity <= 0.09);
//
//       const shuffledHigh = shuffle(high);
//       const shuffledMedium = shuffle(medium);
//       const shuffledLow = shuffle(low);
//       const finalList = [...shuffledHigh, ...shuffledMedium, ...shuffledLow];
//       setProducts(finalList);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   fetchProducts();
// }, [user?.isLoggedin]);



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
              {products.map((product, i) => (
                <ProductCard key={i} product={product} />
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
