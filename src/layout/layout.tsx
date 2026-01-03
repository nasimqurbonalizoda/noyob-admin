import { NavLink, Outlet } from "react-router-dom";
import { Package, Tag, ShoppingCart, Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-950 to-blue-900 text-white flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <ShoppingCart className="w-10 h-10 text-blue-400" />
            NoyobTech
          </h1>
          <p className="text-blue-300 text-sm mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <LayoutDashboard className="w-6 h-6" />
            DashBoard
          </NavLink>

          {/* <NavLink
            to="/orders"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <Package className="w-6 h-6" />
            Orders
          </NavLink> */}

           <NavLink
            to="/colors"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <Package className="w-6 h-6" />
            Colors
          </NavLink>

          <NavLink
            to="/brands"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <Tag className="w-6 h-6" />
            Brands
          </NavLink>

          <NavLink
            to="/category"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <ShoppingCart className="w-6 h-6" />
            Categories
          </NavLink>
          
          <NavLink
            to="/product"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <ShoppingCart className="w-6 h-6" />
            Product
          </NavLink>
        </nav>

        <div className="p-6 border-t border-blue-800">
          <p className="text-blue-300 text-xs text-center">
            © 2026 NoyobTech Admin
          </p>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <main className="flex-1 p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="h-16 lg:h-0"></div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;