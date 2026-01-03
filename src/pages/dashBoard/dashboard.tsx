import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  BarChart3,
  ShoppingBag,
  Users,
  Package,
  CreditCard,
  ArrowUpRight,
  MoreVertical,
  Search,
  Menu,
  ChevronDown,
  Bell
} from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-100",
      trend: "up"
    },
    {
      title: "Total Orders",
      value: "12,234",
      change: "+12.5%",
      icon: ShoppingBag,
      color: "from-purple-500 to-pink-500",
      iconColor: "text-purple-100",
      trend: "up"
    },
    {
      title: "Active Users",
      value: "4,238",
      change: "+18.3%",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-100",
      trend: "up"
    },
    {
      title: "Inventory",
      value: "8,452",
      change: "-2.3%",
      icon: Package,
      color: "from-orange-500 to-red-500",
      iconColor: "text-orange-100",
      trend: "down"
    }
  ];

  const recentOrders = [
    { id: 1, customer: "Alex Johnson", date: "2024-01-15", amount: "$249.99", status: "completed", items: 3 },
    { id: 2, customer: "Maria Garcia", date: "2024-01-14", amount: "$149.50", status: "processing", items: 2 },
    { id: 3, customer: "David Smith", date: "2024-01-14", amount: "$89.99", status: "completed", items: 1 },
    { id: 4, customer: "Sarah Wilson", date: "2024-01-13", amount: "$329.00", status: "shipped", items: 4 },
    { id: 5, customer: "James Brown", date: "2024-01-13", amount: "$199.99", status: "pending", items: 2 },
  ];

  const topProducts = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$129.99", sales: 342, revenue: "$44,456.58" },
    { id: 2, name: "Leather Backpack", category: "Fashion", price: "$89.99", sales: 287, revenue: "$25,826.13" },
    { id: 3, name: "Smart Watch Pro", category: "Electronics", price: "$249.99", sales: 198, revenue: "$49,498.02" },
    { id: 4, name: "Coffee Machine", category: "Home", price: "$179.99", sales: 156, revenue: "$28,078.44" },
    { id: 5, name: "Yoga Mat", category: "Fitness", price: "$34.99", sales: 423, revenue: "$14,800.77" },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      pending: "bg-yellow-100 text-yellow-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 md:mt-2 truncate">{stat.value}</p>
                  <div className="flex items-center gap-2 mt-2 md:mt-3 flex-wrap">
                    <span className={`flex items-center gap-1 text-xs md:text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                      ) : (
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 rotate-180" />
                      )}
                      {stat.change}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">from last month</span>
                  </div>
                </div>
                <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${stat.color} flex-shrink-0 ml-2`}>
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Recent Orders - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Revenue Overview</h2>
              <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-48 md:h-80 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-1 md:mb-2">$45.2k</div>
                  <div className="text-green-600 flex items-center justify-center gap-1 text-sm md:text-base">
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">+20.1%</span>
                    <span className="text-gray-600 ml-1 hidden sm:inline">from last month</span>
                    <span className="text-gray-600 ml-1 sm:hidden">vs last month</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 md:h-40 bg-gradient-to-t from-blue-50 to-transparent rounded-b-xl" />
            </div>
          </div>

          {/* Recent Orders - Mobile Optimized */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Orders</h2>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition whitespace-nowrap">
                View all →
              </button>
            </div>
            <div className="space-y-3 md:space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 md:p-4 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg flex-shrink-0">
                      <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm md:text-base">{order.customer}</p>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        {order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
                    <div className="text-right">
                      <p className="font-medium text-gray-900 text-sm md:text-base">{order.amount}</p>
                      <span className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded hidden sm:block">
                      <MoreVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products - Responsive Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Top Selling Products</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition">
              View all →
            </button>
          </div>
          
          {/* Mobile View - Cards */}
          <div className="lg:hidden space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm md:text-base">{product.name}</p>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs mt-1 inline-block">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="font-medium text-gray-900">{product.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Units Sold</p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{product.sales}</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${(product.sales / 500) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Units Sold</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{product.price}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{product.sales}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${(product.sales / 500) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{product.revenue}</td>
                    <td className="py-4 px-4">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-blue-100 text-sm md:text-base">Conversion Rate</p>
                <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">3.24%</p>
                <p className="text-blue-100 text-xs md:text-sm mt-2 md:mt-3 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                  +0.5% from last month
                </p>
              </div>
              <BarChart3 className="w-8 h-8 md:w-12 md:h-12 opacity-80 flex-shrink-0 ml-2" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-purple-100 text-sm md:text-base">Average Order Value</p>
                <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">$89.64</p>
                <p className="text-purple-100 text-xs md:text-sm mt-2 md:mt-3 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                  +$4.21 from last month
                </p>
              </div>
              <CreditCard className="w-8 h-8 md:w-12 md:h-12 opacity-80 flex-shrink-0 ml-2" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-green-100 text-sm md:text-base">Customer Satisfaction</p>
                <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2">4.8/5</p>
                <p className="text-green-100 text-xs md:text-sm mt-2 md:mt-3 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                  +0.2 from last quarter
                </p>
              </div>
              <Users className="w-8 h-8 md:w-12 md:h-12 opacity-80 flex-shrink-0 ml-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center p-2 text-blue-600">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-600">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs mt-1">Orders</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-600">
            <Package className="w-5 h-5" />
            <span className="text-xs mt-1">Products</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-600">
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Customers</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-600">
            <MoreVertical className="w-5 h-5" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div>
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">Admin</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              {['Dashboard', 'Analytics', 'Orders', 'Products', 'Customers', 'Settings'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;