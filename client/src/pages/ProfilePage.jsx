import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { updateUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    state: "",
    annualIncome: "",
    caste: "",
    isStudent: false,
    isFarmer: false,
    isWomen: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type == "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.put("/users/profile", formData);
      dispatch(updateUser(data));
      toast.success("Profile saved successfully");
      navigate("/schemes/matched");
    } catch (error) {
      console.log("Full error:", error);
      console.log("Response:", error.response);
      console.log("Message:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-lg mx-auto bg-white rounded-xl border border-gray-200 p-8">
        {/* progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep} of 3 </span>
            <span>{Math.round((currentStep / 3) * 100)}% complete</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-gray-900">
              Personal details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              >
                <option value="">Select state</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="West Bengal">West Bengal</option>
                <option value="all">Other</option>
              </select>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-gray-900">
              Financial details
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual household income (in rupees)
              </label>
              <input
                type="number"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                placeholder="e.g 250000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caste category
              </label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              >
                <option value="">Select caste category</option>
                <option value="general">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="all">Prefer not to say</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-gray-900">
              Occupation details
            </h2>
            <p className="text-gray-500 text-sm">
              Select all that apply to you
            </p>

            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                name="isStudent"
                checked={formData.isStudent}
                onChange={handleChange}
                className="w-4 h-4 accent-indigo-700"
              />
              <div>
                <p className="font-medium text-gray-900">I am a student</p>
                <p className="text-sm text-gray-500">
                  currently enrolled in school or college
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                name="isFarmer"
                checked={formData.isFarmer}
                onChange={handleChange}
                className="w-4 h-4 accent-indigo-700"
              />
              <div>
                <p className="font-medium text-gray-900">I am a farmer</p>
                <p className="text-sm text-gray-500">
                  Engaged in agricultural activities
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                name="isWomen"
                checked={formData.isWomen}
                onChange={handleChange}
                className="w-4 h-4 accent-indigo-700"
              />
              <div>
                <p className="font-medium text-gray-900">
                  I identify as a woman
                </p>
                <p className="text-sm text-gray-500">
                  Eligible for women specific schemes
                </p>
              </div>
            </label>

            <div className="flex gap-3">
              <button
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Find My Schemes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
