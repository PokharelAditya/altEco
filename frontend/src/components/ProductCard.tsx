import {Link} from 'react-router-dom'

const ProductCard = ({ product }) => {
  const formatEcoScore = (score) => {
    if (score == null || score == undefined || isNaN(Number(score)))
      return 'N/A';
    return Number(score).toFixed(1)
  }

  const getEcoScoreColor = (score) => {
    if (!score || score < 0) return '#9ca3af'; // Gray for invalid scores
    if (score >= 9) return '#22c55e'; // Green
    if (score >= 7) return '#84cc16'; // Light green
    if (score >= 5) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

  // Fallback image URL for when product images fail to load
  const fallbackImageUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop";

  return (
    <Link to={`/product/${product.product_id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        {/* Product Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img 
            src={product.image_url || fallbackImageUrl} 
            alt={product.name || 'Product image'} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {e.target.src = fallbackImageUrl}}
          />
          
          {/* Eco Score Badge */}
          <div 
            className="absolute top-3 left-3 text-white px-2.5 py-1.5 rounded-lg font-bold text-sm shadow-md backdrop-blur-sm"
            style={{ backgroundColor: getEcoScoreColor(product.ecoscore/10 || product.eco_score/10) }}
          >
            {formatEcoScore(product.ecoscore/10 || product.eco_score/10)}/10
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Brand */}
          <div className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">
            {product.brand || product.brands || 'Unknown Brand'}
          </div>
          
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 leading-tight line-clamp-2">
            {product.name || product.product_name || 'Product Name Not Available'}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {product.description || 'No description available for this product.'}
          </p>

          {/* Footer - Category */}
          <div className="mt-auto">
            <span className="inline-block bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-200 dark:border-green-800">
              {product.category || 'Uncategorized'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;