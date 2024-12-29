import React from "react";
import PerfumeCard from "./PerfumeCard";
import { Button } from "@/components/ui/button";
import { perfumes as defaultPerfumes, Perfume } from "@/lib/data/perfumes";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PerfumeGridProps {
  perfumes?: Perfume[];
}

const PerfumeGrid = ({ perfumes = defaultPerfumes }: PerfumeGridProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(perfumes.length / itemsPerPage);

  const currentPerfumes = perfumes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
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
  );
};

export default PerfumeGrid;
