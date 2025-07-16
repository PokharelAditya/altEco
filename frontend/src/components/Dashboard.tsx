import { useState } from 'react';
import Logoo from "../assets/logo.png";
import { 
  Leaf, 
  Package, 
  BarChart3,
  PieChart,
  Activity,
  Globe,
  TreePine,
  Star,
  Filter,
  Search,
} from 'lucide-react';

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for the dashboard
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 1247,
    sustainableProducts: 892,
    carbonSaved: 2340,
    treesEquivalent: 156,
    userImpact: 73,
    monthlyGrowth: 12.5
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Coconut Oil",
      brand: "EcoLife",
      rating: 4.8,
      price: "$12.99",
      category: "plant-based",
      certifications: ["usda-organic", "fair-trade"],
      carbonFootprint: "Low",
      image: "🥥",
      sustainabilityScore: 95
    },
    {
      id: 2,
      name: "Recyclable Water Bottle",
      brand: "GreenFlow",
      rating: 4.6,
      price: "$24.99",
      category: "plastic-free",
      certifications: ["recyclable"],
      carbonFootprint: "Very Low",
      image: "🍃",
      sustainabilityScore: 88
    },
    {
      id: 3,
      name: "Bamboo Toothbrush Set",
      brand: "EcoSmile",
      rating: 4.9,
      price: "$8.99",
      category: "biodegradable",
      certifications: ["fsc", "compostable"],
      carbonFootprint: "Very Low",
      image: "🎋",
      sustainabilityScore: 92
    },
    {
      id: 4,
      name: "Plant-Based Protein Powder",
      brand: "VegaPower",
      rating: 4.7,
      price: "$34.99",
      category: "plant-based",
      certifications: ["vegan", "usda-organic"],
      carbonFootprint: "Low",
      image: "🌱",
      sustainabilityScore: 89
    }
  ]);

  const StatCard = ({ title, value, subtitle, icon: Icon, color = "green" }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/30 rounded-xl`}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{product.image}</div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{product.rating}</span>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.brand}</p>
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-green-600 dark:text-green-400">{product.price}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{product.carbonFootprint} Impact</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {product.certifications.slice(0, 2).map((cert, index) => (
          <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
            {cert.replace('-', ' ').toUpperCase()}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.sustainabilityScore}% Sustainable
          </span>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
          View Details
        </button>
      </div>
    </div>
  );

  const ChartCard = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || product.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sustainability Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your environmental impact and discover sustainable products
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value={dashboardData.totalProducts.toLocaleString()}
            subtitle="Available items"
            icon={Package}
          />
          <StatCard
            title="Sustainable Options"
            value={dashboardData.sustainableProducts.toLocaleString()}
            subtitle={`${Math.round((dashboardData.sustainableProducts / dashboardData.totalProducts) * 100)}% of total`}
            icon={Leaf}
          />
          <StatCard
            title="Carbon Saved"
            value={`${dashboardData.carbonSaved} kg`}
            subtitle="This month"
            icon={Globe}
            color="blue"
          />
          <StatCard
            title="Trees Equivalent"
            value={dashboardData.treesEquivalent}
            subtitle="Environmental impact"
            icon={TreePine}
            color="green"
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Environmental Impact Over Time">
            <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Chart visualization </p>
              </div>
            </div>
          </ChartCard>
          
          <ChartCard title="Sustainability Categories">
            <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Pie chart</p>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Product Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="plant-based">Plant-Based</option>
                <option value="plastic-free">Plastic-Free</option>
                <option value="biodegradable">Biodegradable</option>
                <option value="recyclable">Recyclable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Featured Sustainable Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Environmental Impact Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4">
              <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Environmental Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              By choosing sustainable products, you've made a positive impact on our planet. 
              Keep up the great work!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {dashboardData.userImpact}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  More Sustainable
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {dashboardData.carbonSaved}kg
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  CO₂ Reduced
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  +{dashboardData.monthlyGrowth}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Monthly Growth
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl mr-3">
                            <img
              src={Logoo}
              className="h-12 transition-transform group-hover:scale-105"
              alt="Logo"
            />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">AltEco</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Making sustainable choices accessible and impactful for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Products</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Browse All</a></li>
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Categories</a></li>
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Certifications</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Impact</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Environmental</a></li>
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Analytics</a></li>
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Reports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Help Center</a></li>
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-green-600 dark:hover:text-green-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 AltEco. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;