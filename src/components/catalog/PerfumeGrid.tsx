import React from "react";
import PerfumeCard from "./PerfumeCard";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Perfume,
  featuredPerfume,
  perfumes as defaultPerfumes,
} from "@/lib/data/perfumes";

interface PerfumeGridProps {
  perfumes?: Perfume[];
}

const FragranceOfTheDay = () => {
  return (
    <div className="w-full bg-black/5 rounded-xl p-8 mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-primary fill-primary" />
          <h2 className="text-xl font-medium">Fragrance of the Day</h2>
        </div>
        {/* Add the curated text */}
        <p className="text-xs text-muted-foreground ml-7 -mt-2">
          Curated by Haris Omerovic
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-light">{featuredPerfume.name}</h3>
              <p className="text-xl text-muted-foreground mt-2">
                {featuredPerfume.brand}
              </p>
            </div>
            <p className="text-lg text-muted-foreground">
              {featuredPerfume.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {[...featuredPerfume.topNotes, ...featuredPerfume.heartNotes, ...featuredPerfume.baseNotes].map(
                (note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-background rounded-full text-sm"
                  >
                    {note}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PerfumeCard {...featuredPerfume} />
          </div>
        </div>
      </div>
    </div>
  );
};



const PerfumeGrid = ({ perfumes = defaultPerfumes }: PerfumeGridProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(perfumes.length / itemsPerPage);

  const currentPerfumes = perfumes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full min-h-[902px] bg-background px-8 py-12">
      <FragranceOfTheDay />

      <div className="max-w-7xl mx-auto">
        {perfumes.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No fragrances found matching your search criteria.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-8">
              {currentPerfumes.map((perfume) => (
                <div key={perfume.id} className="flex justify-center">
                  <PerfumeCard {...perfume} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
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
          </>
        )}
      </div>
    </div>
  );
};

export default PerfumeGrid;
