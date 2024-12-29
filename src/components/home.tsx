import React from "react";
import Header from "./catalog/Header";
import Footer from "./catalog/Footer";
import SearchBar from "./catalog/SearchBar";
import PerfumeGrid from "./catalog/PerfumeGrid";
import { perfumes, Perfume } from "@/lib/data/perfumes";

const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filters, setFilters] = React.useState({
    notes: [] as string[],
    brand: "",
    concentration: "",
  });

  const filteredPerfumes = React.useMemo(() => {
    return perfumes.filter((perfume) => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          perfume.name.toLowerCase().includes(searchLower) ||
          perfume.brand.toLowerCase().includes(searchLower) ||
          perfume.description?.toLowerCase().includes(searchLower) ||
          [
            ...perfume.topNotes,
            ...perfume.heartNotes,
            ...perfume.baseNotes,
          ].some((note) => note.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;
      }

      // Brand filter
      if (filters.brand && perfume.brand !== filters.brand) {
        return false;
      }

      // Concentration filter
      if (
        filters.concentration &&
        perfume.concentration !== filters.concentration
      ) {
        return false;
      }

      // Notes filter
      if (filters.notes.length > 0) {
        const allNotes = [
          ...perfume.topNotes,
          ...perfume.heartNotes,
          ...perfume.baseNotes,
        ];
        const hasMatchingNote = filters.notes.some((note) =>
          allNotes.some((perfumeNote) =>
            perfumeNote.toLowerCase().includes(note.toLowerCase()),
          ),
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
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
        <PerfumeGrid perfumes={filteredPerfumes} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
