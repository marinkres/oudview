import React from "react";
import { useQuery } from "@tanstack/react-query";
import PerfumeCard from "./PerfumeCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Database } from "@/types/supabase";

type Perfume = Database["public"]["Tables"]["fragrances"]["Row"];

interface PerfumeGridProps {
  searchTerm?: string;
  filters?: {
    notes?: string[];
    brand?: string;
    concentration?: string;
  };
}

const PerfumeGrid = ({ searchTerm = "", filters = {} }: PerfumeGridProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3;

  const { data: perfumes, isLoading } = useQuery<Perfume[]>({
    queryKey: ["perfumes", searchTerm, filters],
    queryFn: async () => {
      let query = supabase
        .from("fragrances")
        .select()
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(
          `name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`,
        );
      }

      if (filters.brand) {
        query = query.eq("brand", filters.brand);
      }

      if (filters.concentration) {
        query = query.eq("concentration", filters.concentration);
      }

      if (filters.notes && filters.notes.length > 0) {
        // Search in all note arrays
        query = query.or(
          filters.notes
            .map(
              (note) =>
                `top_notes.cs.{${note}},heart_notes.cs.{${note}},base_notes.cs.{${note}}`,
            )
            .join(","),
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground py-12">Loading...</div>
    );
  }

  if (!perfumes || perfumes.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No fragrances found matching your search criteria.
      </div>
    );
  }

  const totalPages = Math.ceil(perfumes.length / itemsPerPage);
  const currentPerfumes = perfumes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-8">
        {currentPerfumes.map((perfume) => (
          <div key={perfume.id} className="flex justify-center">
            <PerfumeCard
              id={perfume.id}
              name={perfume.name}
              brand={perfume.brand}
              topNotes={perfume.top_notes}
              heartNotes={perfume.heart_notes}
              baseNotes={perfume.base_notes}
              concentration={perfume.concentration}
              longevity={perfume.longevity}
              sillage={perfume.sillage}
              priceValue={perfume.price_value}
              gender={perfume.gender}
              year={perfume.year}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PerfumeGrid;
