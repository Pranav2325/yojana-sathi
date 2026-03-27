import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isOpen,setIsOpen]=useState(false)


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false)
  };
  return (
    // outer div
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      {/* inner div */}
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* logo */}
        <Link to="/" className="text-xl font-bold text-indigo-700">
          YojnaSathi
        </Link>

        {/* menu for large screens */}

        <div className="hidden md:flex items-center gap-6">
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
         {/* hamburger menu for mobiles */}
        <button className="md:hidden flex flex-col gap-1" onClick={()=>setIsOpen(!isOpen)}>
          <span  className="w-6 h-0.5 bg-gray-700"></span>
          <span  className="w-6 h-0.5 bg-gray-700"></span>
          <span  className="w-6 h-0.5 bg-gray-700"></span>
          
        </button>
      </div>
      {/* hamburger menu logic */}

      {isOpen&&(
        <div className="md:hidden mt-4 flex flex-col gap-4 px-2 pb-4">
          <Link
            to="/schemes"
            className="text-gray-600  font-medium"
            onClick={() => setIsOpen(false)}
          >
            Browse Schemes
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600  font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                className="text-left text-gray-600 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
