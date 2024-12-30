import React from "react";
import { Star } from "lucide-react";

const AIRecommendationSection = () => {
  return (
    <div className="w-full bg-gray-100 rounded-xl p-8 shadow-sm mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-gray-800 fill-gray-800" />
          <h2 className="text-xl font-medium text-gray-800">AI-Powered Recommendations</h2>
        </div>
        <p className="text-xs text-gray-600 ml-7 -mt-2">
          Curated based on your preferences
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-6">
          {/* Left Side: Text and Call-to-Action */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-light text-gray-800">Discover Your Next Favorite Fragrance</h3>
              <p className="text-lg text-gray-600 mt-2">
                Our AI-powered engine has analyzed your preferences to suggest a personalized collection of scents just for you.
                Whether you love florals, musks, or citrusy vibes, let us help you explore!
              </p>
            </div>
            <div>
              <button className="py-3 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                Coming soon!
              </button>
            </div>
          </div>

          {/* Right Side: SVG Art */}
          <div className="flex justify-center lg:justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              className="w-64 h-64 text-gray-300"
              fill="none"
            >
              {/* Circular design resembling perfume bottle */}
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="2" />
              <circle cx="200" cy="200" r="140" fill="url(#gradient)" />

              {/* Gradient */}
              <defs>
                <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f5f5f5" />
                  <stop offset="100%" stopColor="#d4d4d4" />
                </linearGradient>
              </defs>

              {/* Inner bottle design */}
              <rect x="160" y="100" width="80" height="150" rx="20" ry="20" fill="white" />
              <rect x="170" y="110" width="60" height="130" rx="15" ry="15" fill="currentColor" />

              {/* Perfume spray-like effect */}
              <path
                d="M200 80 L200 50 M190 80 L190 50 M210 80 L210 50"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="w-full border-t border-dashed border-gray-300 mt-6" />

        {/* Additional Feature Highlights */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-800">Top Picks</h4>
            <p className="text-sm text-gray-600">
              Hand-selected fragrances tailored to your unique preferences.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-800">Trend Analysis</h4>
            <p className="text-sm text-gray-600">
              Discover what’s trending globally based on AI insights.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-800">Mood Matching</h4>
            <p className="text-sm text-gray-600">
              Get recommendations based on your mood and occasion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationSection;
