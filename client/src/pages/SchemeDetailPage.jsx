import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const SchemeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const { data } = await api.get(`/schemes/${id}`);
        setScheme(data);
      } catch (error) {
        toast.error("Scheme not found");
        navigate("/schemes");
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/users/save/${id}`);
    } catch (error) {
      toast.error("Failed to save scheme");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading scheme details...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{scheme.title}</h1>
            <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full whitespace-nowrap">
              {scheme.category}
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {scheme.description}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Benifits
              </h2>
              <p className="text-gray-700 leading-relaxed">{scheme.benefits}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Documents required
              </h2>
              <ul className="flex flex-col gap-2">
                {scheme.documentsRequired.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-indigo-700 rounded-full"></span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {scheme.deadline && (
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Deadline
                </h2>
                <p className="text-gray-700">
                  {new Date(scheme.deadline).toLocaleDateString("en-IN")}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
              {scheme.applicationLink && (
                <a
                  href={scheme.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-indigo-700 text-white py-3 rounded-lg font-semibold text-center hover:bg-indigo-800"
                >
                  Apply Now
                </a>
              )}

              <button className="flex-1 border border-indigo-700 py-3 rounded-lg font-semibold hover:bg-indigo-50 disabled:opacity-50" disabled={saving} onClick={handleSave}>
                {saving ? "Saving..." : "Save to Dashboard"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailPage;
