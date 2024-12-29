import React from "react";
import Header from "./catalog/Header";
import Footer from "./catalog/Footer";
import SearchBar from "./catalog/SearchBar";
import PerfumeGrid from "./catalog/PerfumeGrid";

const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filters, setFilters] = React.useState({
    notes: [],
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
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
        <PerfumeGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
