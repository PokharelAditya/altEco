import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, AreaChart, Area } from 'recharts';
import { Heart, Clock, X, TrendingUp, Leaf, Droplets, Recycle, Star, Eye, Calendar, Award, Target } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext'

const Dashboard = () => {
  const {user} = useAuthContext();

  const [userDashboardData] = useState({
    // My Collections (favorites, review_later, exclusion_list tables)
    myCollections: [
      { name: 'Favorites', value: 23, color: '#ef4444', icon: Heart },
      { name: 'Review Later', value: 15, color: '#3b82f6', icon: Clock },
      { name: 'Not Interested', value: 8, color: '#6b7280', icon: X }
    ],

    // My Categories Interest (from user's product interactions)
    myCategoryPreferences: [
      { category: 'Personal Care', interacted: 28, favorited: 8, avgRating: 4.2 },
      { category: 'Household', interacted: 22, favorited: 6, avgRating: 3.8 },
      { category: 'Food & Beverages', interacted: 18, favorited: 5, avgRating: 4.0 },
      { category: 'Clothing', interacted: 12, favorited: 3, avgRating: 3.5 },
      { category: 'Beauty', interacted: 8, favorited: 1, avgRating: 3.2 }
    ],

    // My EcoScore Journey (products I've favorited by ecoscore)
    myEcoScoreProfile: [
      { range: '90-100', count: 8, label: 'Excellent', percentage: 35 },
      { range: '80-89', count: 7, label: 'Very Good', percentage: 30 },
      { range: '70-79', count: 5, label: 'Good', percentage: 22 },
      { range: '60-69', count: 2, label: 'Fair', percentage: 9 },
      { range: '<60', count: 1, label: 'Poor', percentage: 4 }
    ],

    // My Activity Timeline (user_interaction table - user's activity over time)
    myActivityTimeline: [
      { date: '2024-01', viewed: 12, favorited: 3, rated: 8, avgDuration: 120 },
      { date: '2024-02', viewed: 18, favorited: 5, rated: 12, avgDuration: 150 },
      { date: '2024-03', viewed: 25, favorited: 7, rated: 18, avgDuration: 180 },
      { date: '2024-04', viewed: 32, favorited: 4, rated: 22, avgDuration: 160 },
      { date: '2024-05', viewed: 28, favorited: 2, rated: 19, avgDuration: 140 },
      { date: '2024-06', viewed: 41, favorited: 2, rated: 28, avgDuration: 200 }
    ],

    // My Ratings Pattern (from user_interaction table)
    myRatingsDistribution: [
      { rating: 5, count: 35, percentage: 38 },
      { rating: 4, count: 28, percentage: 31 },
      { rating: 3, count: 18, percentage: 20 },
      { rating: 2, count: 7, percentage: 8 },
      { rating: 1, count: 3, percentage: 3 }
    ],

    // My Sustainability Preferences (from user_preferences + attributes tables)
    mySustainabilityFocus: [
      { attribute: 'Recyclable', preference: true, productsFound: 18, priority: 'High' },
      { attribute: 'Organic', preference: true, productsFound: 12, priority: 'High' },
      { attribute: 'Cruelty Free', preference: true, productsFound: 15, priority: 'Medium' },
      { attribute: 'Fair Trade', preference: true, productsFound: 8, priority: 'Medium' },
      { attribute: 'Carbon Neutral', preference: false, productsFound: 5, priority: 'Low' },
      { attribute: 'Biodegradable', preference: true, productsFound: 10, priority: 'High' }
    ],

    // My Interaction Patterns (duration vs rating correlation)
    myEngagementPattern: [
      { duration: 45, rating: 2.5, products: 3 },
      { duration: 90, rating: 3.2, products: 8 },
      { duration: 120, rating: 3.8, products: 12 },
      { duration: 180, rating: 4.2, products: 15 },
      { duration: 240, rating: 4.6, products: 8 },
      { duration: 300, rating: 4.8, products: 5 }
    ],

    // My Discovery Journey (how I found products I liked)
    myDiscoveryStats: {
      totalProductsViewed: 156,
      averageViewDuration: 167, // seconds
      conversionToFavorites: 14.7, // percentage
      averageRating: 3.8,
      mostActiveHour: "7-8 PM",
      favoriteDay: "Sunday"
    }
  });

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get first name for greeting
  const getFirstName = (name) => {
    if (!name) return 'User';
    return name.split(' ')[0];
  };

  // Format join date
  const formatJoinDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'];

  const PersonalMetricCard = ({ title, value, icon: Icon, subtitle, color = 'text-green-600' }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  // Show loading state if user data is not available
  if (!user) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Personal Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
             {user.photoURL ? (                
              <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-4 border-green-600"
                />) : (<span className="text-white font-bold text-lg">
                {getUserInitials(user.displayName)}
              </span>)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {getFirstName(user.displayName)}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your personal eco-journey dashboard • Member since {formatJoinDate(user.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PersonalMetricCard 
            title="Products Explored" 
            value={userDashboardData.myDiscoveryStats.totalProductsViewed}
            subtitle="lifetime views"
            icon={Eye} 
          />
          <PersonalMetricCard 
            title="My Favorites" 
            value={userDashboardData.myCollections[0].value}
            subtitle="saved products"
            icon={Heart} 
            color="text-red-600"
          />
          <PersonalMetricCard 
            title="My Avg Rating" 
            value={userDashboardData.myDiscoveryStats.averageRating}
            subtitle="out of 5 stars"
            icon={Star} 
            color="text-yellow-600"
          />
          <PersonalMetricCard 
            title="Eco Commitment" 
            value={`${userDashboardData.myDiscoveryStats.conversionToFavorites}%`}
            subtitle="products favorited"
            icon={Leaf} 
            color="text-green-600"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* My Collections */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              My Product Collections
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDashboardData.myCollections}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userDashboardData.myCollections.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              {userDashboardData.myCollections.map((collection, index) => {
                const Icon = collection.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className={`w-5 h-5 mx-auto mb-1`} style={{color: collection.color}} />
                    <p className="text-sm font-medium">{collection.value}</p>
                    <p className="text-xs text-gray-500">{collection.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Category Preferences */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              My Category Interests
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userDashboardData.myCategoryPreferences}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="interacted" fill="#3b82f6" name="Viewed" />
                <Bar dataKey="favorited" fill="#ef4444" name="Favorited" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* My EcoScore Profile */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-green-500" />
              My EcoScore Profile
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart data={userDashboardData.myEcoScoreProfile} innerRadius="30%" outerRadius="80%">
                <RadialBar dataKey="count" cornerRadius={10} fill="#10b981" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userDashboardData.myEcoScoreProfile[0].percentage}% of your favorites are excellent eco products!
              </p>
            </div>
          </div>

          {/* My Activity Timeline */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              My Activity Journey
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userDashboardData.myActivityTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="viewed" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="favorited" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* My Rating Patterns */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              My Rating Patterns
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userDashboardData.myRatingsDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You're quite positive! {userDashboardData.myRatingsDistribution[0].percentage + userDashboardData.myRatingsDistribution[1].percentage}% of your ratings are 4+ stars
              </p>
            </div>
          </div>

          {/* My Sustainability Focus */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-500" />
              My Sustainability Priorities
            </h3>
            <div className="space-y-4">
              {userDashboardData.mySustainabilityFocus
                .filter(item => item.preference)
                .sort((a, b) => b.productsFound - a.productsFound)
                .map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.priority === 'High' ? 'bg-green-500' :
                      item.priority === 'Medium' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="font-medium text-gray-900 dark:text-white">{item.attribute}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{item.productsFound} products</p>
                    <p className="text-xs text-gray-500">{item.priority} priority</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Insights Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            Your Eco Journey Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Eco Champion</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                You prefer high-quality eco products with 85% of favorites scoring 80+ on sustainability
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Thoughtful Explorer</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                You spend {Math.round(userDashboardData.myDiscoveryStats.averageViewDuration / 60)} minutes on average exploring each product
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Growing Interest</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Most active on {userDashboardData.myDiscoveryStats.favoriteDay}s around {userDashboardData.myDiscoveryStats.mostActiveHour}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;