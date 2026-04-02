import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import SchemeCard from "../components/SchemeCard";

const SchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "all",
    "student",
    "farmer",
    "women",
    "scst",
    "business",
    "general",
  ];

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category && category !== "all") params.category = category;

        const { data } = await api.get("/schemes", { params });
        setSchemes(data.schemes);
      } catch (error) {
        toast.error("Failed to load schemes");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSchemes, 400);
    return () => clearTimeout(debounce);
  }, [search, category]);
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Schemes</h1>
          <p className="text-gray-500 mt-2">
            Explore all available goverment schemes
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schemes..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
          />
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                category === cat
                  ? "bg-indigo-700 text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:border-indigo-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Loading schemes...</p>
          </div>
        ) : schemes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No schemes found</p>
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

export default SchemesPage;
