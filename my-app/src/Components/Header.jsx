import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {

  const { currentUser, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
      : "text-gray-300 hover:text-white transition";

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blue-950 border-b border-white/20 text-white">
      <h1 className="text-xl font-semibold">My Dashboard</h1>

      <div className="flex items-center gap-6">


        {currentUser && (
          <>
           <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
          <NavLink to="/product" className={linkClass}>
            Product List
          </NavLink>
          </>
          
  
        )}

        {!currentUser && (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>

            <NavLink to="/signup" className={linkClass}>
              Signup
            </NavLink>
          </>
        )}

        {currentUser && (
          <>
            <span className="text-sm text-gray-300">
              {currentUser?.name || currentUser?.email}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}