import React from "react";

const Category = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Schemes for everyone
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Students",
              desc: "Scholarships, education loans, skill development schemes",
              color: "bg-blue-50 border-blue-200",
            },
            {
              title: "Farmers",
              desc: "Crop insurance, PM-Kisan, irrigation and agriculture schemes",
              color: "bg-green-50 border-green-200",
            },
            {
              title: "Women",
              desc: "Ujjwala, Sukanya Samriddhi, Beti Bachao schemes",
              color: "bg-pink-50 border-pink-200",
            },
            {
              title: "SC / ST",
              desc: "Pre and post matric scholarships, special welfare schemes",
              color: "bg-orange-50 border-orange-200",
            },
            {
              title: "Business",
              desc: "Mudra loan, Startup India, MSME support schemes",
              color: "bg-purple-50 border-purple-200",
            },
            {
              title: "General",
              desc: "Health, housing, pension and social security schemes",
              color: "bg-indigo-50 border-indigo-200",
            },
          ].map((cat) => (
            <div
              key={cat.title}
              className={`p-6 rounded-xl border ${cat.color}`}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {cat.title}
              </h3>
              <p className="text-gray-500 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
