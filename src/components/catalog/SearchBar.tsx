import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  notes?: string[];
  brand?: string;
  concentration?: string;
}

const SearchBar = ({
  onSearch = () => {},
  onFilterChange = () => {},
}: SearchBarProps) => {
  // Fetch all fragrances to get unique values
  const { data: fragrances } = useQuery({
    queryKey: ["fragrances-metadata"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fragrances")
        .select("brand, top_notes, heart_notes, base_notes, concentration");

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Get unique brands
  const brands = React.useMemo(() => {
    if (!fragrances) return [];
    const uniqueBrands = new Set<string>();
    fragrances.forEach((f) => {
      if (f.brand) uniqueBrands.add(f.brand);
    });
    return Array.from(uniqueBrands).sort();
  }, [fragrances]);

  // Get unique notes
  const notes = React.useMemo(() => {
    if (!fragrances) return [];
    const allNotes = new Set<string>();
    fragrances.forEach((f) => {
      [
        ...(f.top_notes || []),
        ...(f.heart_notes || []),
        ...(f.base_notes || []),
      ].forEach((note) => {
        if (note) allNotes.add(note);
      });
    });
    return Array.from(allNotes).sort();
  }, [fragrances]);

  // Get unique concentrations
  const concentrations = React.useMemo(() => {
    if (!fragrances) return [];
    const uniqueConcentrations = new Set<string>();
    fragrances.forEach((f) => {
      if (f.concentration) uniqueConcentrations.add(f.concentration);
    });
    return Array.from(uniqueConcentrations).sort();
  }, [fragrances]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 300);

  const handleBrandChange = React.useCallback(
    (value: string) => {
      onFilterChange({ brand: value === "all" ? "" : value });
    },
    [onFilterChange],
  );

  const handleConcentrationChange = React.useCallback(
    (value: string) => {
      onFilterChange({ concentration: value === "all" ? "" : value });
    },
    [onFilterChange],
  );

  const handleNotesChange = React.useCallback(
    (value: string) => {
      onFilterChange({ notes: value === "all" ? [] : [value] });
    },
    [onFilterChange],
  );

  return (
    <div className="w-full h-20 bg-background border-b flex items-center px-6 sticky top-0 z-10">
      <div className="max-w-7xl w-full mx-auto flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search fragrances..."
            className="pl-10 w-full"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <Select onValueChange={handleBrandChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Concentration</label>
                <Select onValueChange={handleConcentrationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select concentration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Concentrations</SelectItem>
                    {concentrations.map((concentration) => (
                      <SelectItem key={concentration} value={concentration}>
                        {concentration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Select onValueChange={handleNotesChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notes</SelectItem>
                    {notes.map((note) => (
                      <SelectItem key={note} value={note}>
                        {note}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
