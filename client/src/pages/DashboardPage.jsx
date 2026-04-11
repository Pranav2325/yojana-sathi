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

  const handleStatusUpdate = async (schemeId, newStatus) => {
    try {
      await api.put(`/users/schemes/${schemeId}/status`, { status: newStatus });
      setSavedSchemes((prev) =>
        prev.map((item) =>
          item.scheme._id === schemeId ? { ...item, status: newStatus } : item,
        ),
      );
      toast.success(`Marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getSchemesByStatus = (status) => {
    return savedSchemes.filter((item) => item.status === status);
  };

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
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-500 mt-2">
            Track your government scheme applications
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-1">Qualified</p>
            <p className="text-3xl font-bold text-indigo-700">{matchedCount}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-1">Saved</p>
            <p className="text-3xl font-bold text-blue-600">
              {getSchemesByStatus("saved").length}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-1">Applied</p>
            <p className="text-3xl font-bold text-amber-600">
              {getSchemesByStatus("applied").length}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-1">Received</p>
            <p className="text-3xl font-bold text-green-600">
              {getSchemesByStatus("received").length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["saved", "applied", "received"].map((status) => (
            <div key={status}>
              <div
                className={`flex items-center gap-2 mb-4 pb-3 border-b-2 ${
                  status === "saved"
                    ? "border-blue-500"
                    : status === "applied"
                      ? "border-amber-500"
                      : "border-green-500"
                }`}
              >
                <h2 className="text-lg font-bold text-gray-900 capitalize">
                  {status}
                </h2>
                <span className="text-sm font-medium text-gray-500">
                  ({getSchemesByStatus(status).length})
                </span>
              </div>

              {getSchemesByStatus(status).length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm">
                    No {status} schemes yet
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {getSchemesByStatus(status).map((item) => (
                    <div
                      key={item._id}
                      className="bg-white border border-gray-200 rounded-xl p-5"
                    >
                      <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                        {item.scheme?.title}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize mb-3">
                        {item.scheme?.category}
                      </p>
                      <div className="flex flex-col gap-2">
                        {status === "saved" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(item.scheme._id, "applied")
                            }
                            className="w-full text-sm bg-amber-50 border border-amber-300 text-amber-700 py-2 rounded-lg hover:bg-amber-100"
                          >
                            Mark as applied
                          </button>
                        )}
                        {status === "applied" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(item.scheme._id, "received")
                            }
                            className="w-full text-sm bg-green-50 border border-green-300 text-green-700 py-2 rounded-lg hover:bg-green-100"
                          >
                            Mark as received
                          </button>
                        )}
                        {status === "received" && (
                          <span className="w-full text-sm text-center text-green-600 font-medium py-2">
                            Benefit received
                          </span>
                        )}
                        <Link
                          to={`/schemes/${item.scheme._id}`}
                          className="w-full text-sm text-center text-indigo-700 border border-indigo-200 py-2 rounded-lg hover:bg-indigo-50"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/schemes/matched"
            className="text-indigo-700 font-medium hover:underline"
          >
            Find more schemes →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
