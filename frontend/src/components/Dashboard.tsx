import { useState } from 'react';
import { 
  Leaf, 
  Package, 
  BarChart3,
  PieChart,
  Activity,
  Globe,
  TreePine,
  Heart,
  Eye,
  Star,
  TrendingUp,
  Award,
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell,
  ComposedChart
} from 'recharts';

const Dashboard = () => {
  // Sample data based on your database schema
  const [dashboardData] = useState({
    totalProducts: 1247,
    sustainableProducts: 892,
    carbonSaved: 2340,
    treesEquivalent: 156,
    userImpact: 73,
    monthlyGrowth: 12.5,
    totalFavorites: 45,
    avgRating: 4.2,
    totalViewed: 234
  });

  // User interaction data (from user_interaction table)
  const userInteractionData = [
    { day: 'Mon', viewed: 45, rated: 12, favorites: 8 },
    { day: 'Tue', viewed: 52, rated: 15, favorites: 6 },
    { day: 'Wed', viewed: 38, rated: 9, favorites: 12 },
    { day: 'Thu', viewed: 61, rated: 18, favorites: 9 },
    { day: 'Fri', viewed: 55, rated: 14, favorites: 11 },
    { day: 'Sat', viewed: 42, rated: 11, favorites: 7 },
    { day: 'Sun', viewed: 48, rated: 13, favorites: 5 }
  ];

  // Sustainability attributes distribution (from attributes and product_sustainability tables)
  const sustainabilityData = [
    { name: 'Organic', value: 35, color: '#10B981' },
    { name: 'Recyclable', value: 28, color: '#3B82F6' },
    { name: 'Low Carbon', value: 22, color: '#8B5CF6' },
    { name: 'Fair Trade', value: 15, color: '#F59E0B' }
  ];

  // EcoScore distribution (from product table ecoscore)
  const ecoScoreData = [
    { range: '90-100', count: 124, color: '#10B981' },
    { range: '80-89', count: 198, color: '#84CC16' },
    { range: '70-79', count: 245, color: '#EAB308' },
    { range: '60-69', count: 156, color: '#F97316' },
    { range: '<60', count: 89, color: '#EF4444' }
  ];

  // User preference alignment data
  const preferenceAlignment = [
    { category: 'Organic Foods', alignment: 85, userPrefs: 12 },
    { category: 'Eco Packaging', alignment: 72, userPrefs: 8 },
    { category: 'Carbon Neutral', alignment: 68, userPrefs: 15 },
    { category: 'Fair Trade', alignment: 91, userPrefs: 6 },
    { category: 'Recyclable', alignment: 79, userPrefs: 10 }
  ];

  // User engagement metrics over time
  const engagementData = [
    { month: 'Jan', duration: 125, interactions: 45, ratings: 12 },
    { month: 'Feb', duration: 145, interactions: 52, ratings: 18 },
    { month: 'Mar', duration: 132, interactions: 48, ratings: 15 },
    { month: 'Apr', duration: 167, interactions: 61, ratings: 22 },
    { month: 'May', duration: 189, interactions: 58, ratings: 19 },
    { month: 'Jun', duration: 201, interactions: 67, ratings: 25 }
  ];

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

  const ChartCard = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );

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

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value={dashboardData.totalProducts.toLocaleString()}
            subtitle="Available items"
            icon={Package}
          />
          <StatCard
            title="Favorites"
            value={dashboardData.totalFavorites}
            subtitle="Saved products"
            icon={Heart}
            color="red"
          />
          <StatCard
            title="Products Viewed"
            value={dashboardData.totalViewed}
            subtitle="This month"
            icon={Eye}
            color="blue"
          />
          <StatCard
            title="Avg Rating"
            value={dashboardData.avgRating}
            subtitle="User ratings"
            icon={Star}
            color="yellow"
          />
          <StatCard
            title="Carbon Saved"
            value={`${dashboardData.carbonSaved} kg`}
            subtitle="This month"
            icon={Globe}
            color="green"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Interaction Trends */}
          <ChartCard title="Weekly User Interactions">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userInteractionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="viewed" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="rated" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="favorites" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Sustainability Attributes Distribution */}
          <ChartCard title="Sustainability Categories">
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={sustainabilityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sustainabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* EcoScore Distribution */}
          <ChartCard title="Product EcoScore Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ecoScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]}>
                  {ecoScoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* User Preference Alignment */}
          <ChartCard title="Preference Alignment Score">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={preferenceAlignment} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="category" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="alignment" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Engagement Metrics Over Time */}
        <div className="mb-8">
          <ChartCard title="User Engagement Metrics Over Time">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="duration" fill="#3B82F6" name="Avg Duration (sec)" />
                <Line yAxisId="right" type="monotone" dataKey="interactions" stroke="#10B981" strokeWidth={3} name="Total Interactions" />
                <Line yAxisId="right" type="monotone" dataKey="ratings" stroke="#F59E0B" strokeWidth={3} name="Ratings Given" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Enhanced Environmental Impact Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4">
              <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Environmental Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Based on your product interactions and preferences, here's your sustainability journey
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {dashboardData.userImpact}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Preference Match
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {dashboardData.totalFavorites}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Eco Favorites
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {dashboardData.avgRating}★
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Rating
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
    </div>
  );
};

export default Dashboard;