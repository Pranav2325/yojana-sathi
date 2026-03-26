import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-700">
          YojnaSathi
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/schemes"
            className="text-gray-600 hover:text-indigo-700 font-medium"
          >
            Browse Schemes
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-indigo-700 font-medium"
              >
                Dashboard
              </Link>
              <button
                className="bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-700 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
