import React from "react";
import Header from "./catalog/Header";
import Footer from "./catalog/Footer";
import SearchBar from "./catalog/SearchBar";
import PerfumeGrid from "./catalog/PerfumeGrid";
import FragranceOfTheDay from "./catalog/FragranceOfTheDay";
import AIRecommendationSection from "./catalog/AIRecommendationSection";
import { perfumes } from "@/lib/data/perfumes";

const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filters, setFilters] = React.useState({
    notes: [] as string[],
    brand: "",
    concentration: "",
  });

  const filteredPerfumes = React.useMemo(() => {
    return perfumes.filter((perfume) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          perfume.name.toLowerCase().includes(searchLower) ||
          perfume.brand.toLowerCase().includes(searchLower) ||
          perfume.description?.toLowerCase().includes(searchLower) ||
          [...perfume.topNotes, ...perfume.heartNotes, ...perfume.baseNotes].some(
            (note) => note.toLowerCase().includes(searchLower)
          );
        if (!matchesSearch) return false;
      }

      if (filters.brand && perfume.brand !== filters.brand) {
        return false;
      }

      if (filters.concentration && perfume.concentration !== filters.concentration) {
        return false;
      }

      if (filters.notes.length > 0) {
        const allNotes = [
          ...perfume.topNotes,
          ...perfume.heartNotes,
          ...perfume.baseNotes,
        ];
        const hasMatchingNote = filters.notes.some((note) =>
          allNotes.some((perfumeNote) =>
            perfumeNote.toLowerCase().includes(note.toLowerCase())
          )
        );
        if (!hasMatchingNote) return false;
      }

      return true;
    });
  }, [searchTerm, filters]);

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
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 mt-12">
          <AIRecommendationSection />
          <FragranceOfTheDay />
        </div>
        <div className="text-center max-w-7xl mx-auto gap-8 mb-12">
        <h2>Fragrances</h2>
        </div>
       
        {/* Perfume Grid */}
        <div className="max-w-7xl mx-auto gap-8 mb-12 mt-12">
        <PerfumeGrid perfumes={filteredPerfumes} />
        </div>
        </main>
      <Footer />
    </div>
  );
};

export default Home;
