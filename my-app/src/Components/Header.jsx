import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCart, LayoutGrid, LogOut, User } from "lucide-react";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition-colors ${isActive ? "text-indigo-400" : "text-slate-400 hover:text-white"}`;

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
            <ShoppingCart className="text-white w-5 h-5" />
          </div>

        </Link>

        <div className="flex items-center gap-8">
          {currentUser ? (
            <>
              <div className="hidden md:flex items-center gap-8">
                <NavLink to="/" className={navLinkClass}>
                  <LayoutGrid size={18} />
                  <span className="text-sm font-bold uppercase tracking-wider">Dashboard</span>
                </NavLink>
                <NavLink to="/product" className={navLinkClass}>
                  <ShoppingCart size={18} />
                  <span className="text-sm font-bold uppercase tracking-wider">Catalog</span>
                </NavLink>
              </div>
              <div className="h-6 w-[1px] bg-slate-800" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white leading-none">{currentUser.name}</p>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mt-1">{currentUser.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <User size={20} className="text-slate-400" />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className=" hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all  shadow-indigo-500/20">
                Login
              </Link>
              <Link to="/signup" className=" hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all  shadow-indigo-500/20">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;