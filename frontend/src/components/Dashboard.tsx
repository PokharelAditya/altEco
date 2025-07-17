import { useState } from 'react';
import { 
  Leaf, 
  Package, 
  BarChart3,
  PieChart,
  Activity,
  Globe,
  TreePine,
} from 'lucide-react';

const Dashboard = () => {
  // Sample data for the dashboard
  const [dashboardData] = useState({
    totalProducts: 1247,
    sustainableProducts: 892,
    carbonSaved: 2340,
    treesEquivalent: 156,
    userImpact: 73,
    monthlyGrowth: 12.5
  });

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
                <p className="text-gray-500 dark:text-gray-400">Chart visualization</p>
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
    </div>
  );
};

export default Dashboard;