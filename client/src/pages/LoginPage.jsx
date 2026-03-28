import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { setCredentials } from '../redux/authSlice.js'

const LoginPage = () => {
    const [formData, setFormData] = useState({
   
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", formData);
      dispatch(
        setCredentials({
          user: data,
          token: data.token,
        }),
      );
      toast.success("Welcom back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.messages || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-xl border border-gray-200 w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
             Welcome back
            </h1>
            <p className="text-gray-500 mb-8">
              Login to see your matched schemes
            </p>
    
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pranav@gmail.com"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-indigo-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-indigo-700"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-center text-gray-500 mt-6">
              Don't have an account? {" "}
              <Link to="/register" className="text-indigo-700 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>
  )
}

export default LoginPage