function ProductDashBoard({ product, onClose }) {
    // Function to get eco score color
    const getEcoScoreColor = (score) => {
      if (score >= 8) return "bg-emerald-500";
      if (score >= 6) return "bg-green-500";
      if (score >= 4) return "bg-yellow-500";
      return "bg-orange-500";
    };
  
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <div className="fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-slate-50 to-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50">
            <h2 className="text-xl font-bold text-slate-800">Product Details</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-emerald-600 text-2xl font-bold transition-colors duration-200 hover:bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto h-full pb-20">
            {/* Product Image */}
            <div className="mb-6">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl shadow-md border border-emerald-100"
              />
            </div>
            
            {/* Product Name */}
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              {product.name}
            </h3>
            
            {/* Brand */}
            <p className="text-lg text-emerald-600 font-medium mb-4">{product.brand}</p>
            
            {/* Eco Score */}
            <div className="mb-6 bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-slate-700 mr-3">
                  Eco Score:
                </span>
                <div className={`px-4 py-2 rounded-full text-white text-sm font-bold ${getEcoScoreColor(product.eco_score || 7)} shadow-sm`}>
                  {product.eco_score || "N/A"}
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(product.eco_score || 7) * 10}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Category */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Category
              </h4>
              <p className="text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                {product.category}
              </p>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Description
              </h4>
              <div className="bg-gradient-to-br from-slate-50 to-emerald-50 p-4 rounded-xl border border-emerald-100">
                <p className="text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
            
            {/* Additional Details */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Product ID
                </h4>
                <p className="text-slate-600 font-mono text-sm bg-white px-2 py-1 rounded border">
                  {product.product_id}
                </p>
              </div>
              
              {/* Sustainability Features */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Sustainability Features
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                    Eco-friendly materials
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                    Recyclable packaging
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                    Carbon neutral shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default ProductDashBoard;