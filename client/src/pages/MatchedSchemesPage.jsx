import React, { useEffect, useState } from "react";
import SchemeCard from "../components/SchemeCard";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MatchedSchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedMatchedSchemes = async () => {
      try {
        const { data } = await api.get("/schemes/matched");
        setSchemes(data.schemes);
      } catch (error) {
        toast.error("Failed to load schemes");
      } finally {
        setLoading(false);
      }
    };
    fetchedMatchedSchemes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Finding your schemes...</p>
      </div>
    );
  }
  console.log('schemes:', schemes)

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your matched schemes
          </h1>
          <p className="text-gray-500 mt-2">
            You qualify for{" "}
            <span className="text-indigo-700 font-semibold">
              {schemes.length} schemes
            </span>{" "}
            based on your profile
          </p>
        </div>

        {schemes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No schemes found for your profile
            </p>
            <Link
              to="/profile"
              className="text-indigo-700 font-medium hover:underline"
            >
              Update your profile
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme._id} scheme={scheme} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedSchemesPage;
