import React from "react";
import { Link } from "react-router-dom";

const categoryColors = {
  student: "bg-blue-100 text-blue-700",
  farmer: "bg-green-100 text-green-700",
  women: "bg-pink-100 text-pink-700",
  scst: "bg-orange-100 text-orange-700",
  business: "bg-purple-100 text-purple-700",
  general: "bg-indigo-100 text-indigo-700",
};

const SchemeCard = ({ scheme }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 hover:border-indigo-300 transition-all">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          {scheme.title}
        </h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${categoryColors[scheme.category] || categoryColors.general}`}
        >
          {scheme.category}
        </span>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{scheme.benefits}</p>
      <div className="flex items-center justify-between mt-auto">
        {scheme.deadline && (
          <p className="text-xs text-gray-400">
            Deadline:{new Date(scheme.deadline).toLocaleDateString("en-IN")}
          </p>
        )}

        <Link
          to={`/schemes/${scheme._id}`}
          className="text-indigo-700 font-medium text-sm hover:underline ml-auto"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default SchemeCard;
