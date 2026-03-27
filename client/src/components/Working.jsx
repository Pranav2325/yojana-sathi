import React from "react";

const Working = () => {
  return (
    <div className="bg-white py-16">
      
      <div className="max-w-6xl mx-auto px-6">
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-700 font-bold text-lg">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Create account
            </h3>
            <p className="text-gray-500">
              Sign up for free in less than a minute. No documents needed to
              register.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-700 font-bold text-lg">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Fill your profile
            </h3>
            <p className="text-gray-500">
             Tell us your age, income, state and occupation. Takes less than 2 minutes.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-700 font-bold text-lg">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get your schemes
            </h3>
            <p className="text-gray-500">
              Instantly see every goverment scheme you qualify for with full details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
