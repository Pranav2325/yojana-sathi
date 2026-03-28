import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="bg-indigo-700 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stop missing out schemes you deserve
        </h2>
        <p className="text-indigo-200 text-lg mb-8 max-w-2xl mx-auto">
          Thousands of Indians miss government benefits every year simply
          because they don't know they qualify. Check yours for free today.
        </p>
        <Link to="/register" className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50">
        Get Started For Free

        </Link>
      </div>
    </div>
  );
};

export default CTA;
