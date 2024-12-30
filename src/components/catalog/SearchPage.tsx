import React from "react";
import SearchBar from "./SearchBar";
import PerfumeGrid from "./PerfumeGrid";
import Header from "./Header";
import Footer from "./Footer";

const SearchPage = () => {
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
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-light tracking-tight mb-8">
            Search Fragrances
          </h1>
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
          <div className="mt-8">
            <PerfumeGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
