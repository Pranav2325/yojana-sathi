import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const AdminPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "student",
    benefits: "",
    applicationLink: "",
    documentsRequired: "",
    eligibility: {
      minAge: 0,
      maxAge: 100,
      gender: "any",
      maxAnnualIncome: 1000000,
      casteRequired: ["all"],
      states: ["all"],
      isStudentRequired: false,
      isFarmerRequired: false,
      isWomanRequired: false,
    },
  });
  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const { data } = await api.get('/admin/schemes');
      setSchemes(data.schemes);
    } catch (error) {
      toast.error("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEligibilityChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      eligibility: {
        ...formData.eligibility,
        [e.target.name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const schemeData = {
        ...formData,
        documentsRequired: formData.documentsRequired
          .split(",")
          .map((doc) => doc.trim()),
      };
      await api.post("/admin/schemes", schemeData);
      toast.success("Scheme added successfully");
      fetchSchemes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add scheme");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are your sure you want to delete this scheme?"))
      return;
    try {
      await api.delete(`/admin/schemes/${id}`);
      toast.success("Scheme deleted");
      fetchSchemes();
    } catch (error) {
      toast.error("Failed to delete scheme");
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.put(`/admin/schemes/${id}/toggle`);
      toast.success("Scheme status updated");
      fetchSchemes();
    } catch (error) {
      toast.error("Failed to update scheme");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
        <div className="bg-white border border=gray-200 rounded-xl p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Add new scheme
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
                >
                  <option value="student">Student</option>
                  <option value="farmer">Farmer</option>
                  <option value="women">Women</option>
                  <option value="scst">SC/ST</option>
                  <option value="business">Business</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
                rows={3}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefits
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
                rows={2}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application link
              </label>
              <input
                type="text"
                name="applicationLink"
                value={formData.applicationLink}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documents required (comma seperated)
              </label>
              <input
                type="text"
                name="documentsRequired"
                value={formData.documentsRequired}
                onChange={handleChange}
                placeholder="Aadhar Card, Income Certificate"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              />
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Eligibility criteria
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Min age
                  </label>
                  <input
                    type="number"
                    name="minAge"
                    value={formData.eligibility.minAge}
                    onChange={handleEligibilityChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-700"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Max age
                  </label>
                  <input
                    type="number"
                    name="maxAge"
                    value={formData.eligibility.maxAge}
                    onChange={handleEligibilityChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-700"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Max annual income
                  </label>
                  <input
                    type="number"
                    name="maxAnnualIncome"
                    value={formData.eligibility.maxAnnualIncome}
                    onChange={handleEligibilityChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-700"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.eligibility.gender}
                    onChange={handleEligibilityChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
                  >
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-6 mt-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="isStudentRequired"
                    checked={formData.eligibility.isStudentRequired}
                    onChange={handleEligibilityChange}
                    className="accent-indigo-700"
                  />
                  Student only
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="isFarmerRequired"
                    checked={formData.eligibility.isFarmerRequired}
                    onChange={handleEligibilityChange}
                    className="accent-indigo-700"
                  />
                  Farmer only
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="isWomanRequired"
                    checked={formData.eligibility.isWomanRequired}
                    onChange={handleEligibilityChange}
                    className="accent-indigo-700"
                  />
                  Woman only
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800"
            >
              Add Scheme
            </button>
          </form>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          All schemes ({schemes.length})
        </h2>

        <div className="flex flex-col gap-4">
          {schemes.map((scheme) => (
            <div
              key={scheme._id}
              className="bg-white border-gray-200 rounded-xl p-6 flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {scheme.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${scheme.isActive?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}
                  >
                    {scheme.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 capitalize">
                  {scheme.category}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleToggle(scheme._id)}
                  className="text-sm border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  {scheme.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(scheme._id)}
                  className="text-sm border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
