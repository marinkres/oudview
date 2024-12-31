import React from "react";
import Header from "./catalog/Header";
import Footer from "./catalog/Footer";
import SearchBar from "./catalog/SearchBar";
import PerfumeGrid from "./catalog/PerfumeGrid";
import FragranceOfTheDay from "./catalog/FragranceOfTheDay";
import AIRecommendationSection from "./catalog/AIRecommendationSection";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filters, setFilters] = React.useState({
    notes: [] as string[],
    brand: "",
    concentration: "",
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: {
    notes?: string[];
    brand?: string;
    concentration?: string;
  }) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative bg-white text-gray-800 py-16 text-center">
          <div className="relative z-10 p-6 max-w-2xl mx-auto">
          <blockquote className="text-center text-xl italic text-gray-500 max-w-xl mb-4">
              "Perfume is the art that makes memory speak." - Francis Kurkdjian
            </blockquote>
            <p className="text-lg mb-6">Discover the best scents curated by our experts.</p>

            <Link
  to="/search"
  className="py-3 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
>
  Search Fragrances
</Link>

          </div>
        </div>

        {/* Fragrance of the Day and AI Recommendations */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FragranceOfTheDay />
          <AIRecommendationSection />
        </div>
        <div className="text-center max-w-7xl mx-auto gap-8 mb-12">
          <h2>Fragrances</h2>
        </div>

        {/* Perfume Grid */}
        <div className="max-w-7xl mx-auto gap-8 mb-12 mt-12">
          <PerfumeGrid searchTerm={searchTerm} filters={filters} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
