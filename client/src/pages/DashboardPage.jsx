import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SchemeCard from "../components/SchemeCard";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [savedRes, matchedRes] = await Promise.all([
          api.get("/users/saved"),
          api.get("/schemes/matched"),
        ]);
        setSavedSchemes(savedRes.data);
        setMatchedCount(matchedRes.data.count);
      } catch (error) {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading dashboard...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-gray-500 mt-2">Here is your scheme summary</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-500 text-sm mb-1">
              Schemes you qualify for
            </p>
            <p className="text-4xl font-bold text-indigo-700">{matchedCount}</p>
            <Link
              to="/schemes/matched"
              className="text-sm text-indigo-700 font-medium hover:underline mt-3 inline-block"
            >
              View all →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-500 text-sm mb-1">Schemes you saved</p>
            <p className="text-4xl font-bold text-indigo-700">
              {savedSchemes.length}
            </p>
            <Link
              to="/profile"
              className="text-sm text-indigo-700 font-medium hover:underline mt-3 inline-block"
            >
              Update profile →
            </Link>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Saved schemes</h2>
          <Link
            to="/schemes"
            className="text-indigo-700 font-medium text-sm hover:underline"
          >
            Browse more →
          </Link>
        </div>

        {savedSchemes.length === 0 ? (
          <div className="text-center p-16 bg-white border border-gray-200 rounded-xl">
            <p className="text-gray-500 text-lg mb-4">No saved schemes yet</p>
            <Link
              to="/schemes/matched"
              className="text-indigo-700 font-medium hover:underline"
            >
              Browse your matched schemes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedSchemes.map((scheme) => (
              <SchemeCard key={scheme._id} scheme={scheme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
