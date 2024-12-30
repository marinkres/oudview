import React from "react";
import Header from "./catalog/Header";
import Footer from "./catalog/Footer";
import SearchBar from "./catalog/SearchBar";
import PerfumeGrid from "./catalog/PerfumeGrid";
import FragranceOfTheDay from "./catalog/FragranceOfTheDay";
import AIRecommendationSection from "./catalog/AIRecommendationSection";

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
        {/* Fragrance of the Day and AI Recommendations */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-0 mt-8">
          <AIRecommendationSection />
          <FragranceOfTheDay />
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
