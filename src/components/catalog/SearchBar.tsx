import React from "react";
import { cleanText } from "@/lib/utils";
import { Search, Filter, Droplets, Wind, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
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

const noteCategories = {
  Citrus: ["Bergamot", "Lemon", "Orange", "Grapefruit"],
  Floral: ["Rose", "Jasmine", "Lavender", "Violet"],
  Woody: ["Sandalwood", "Cedar", "Oud", "Vetiver"],
  Oriental: ["Vanilla", "Amber", "Musk", "Incense"],
  Fresh: ["Mint", "Marine", "Green Tea", "Cucumber"],
};

const categoryColors = {
  Citrus: "bg-yellow-50 hover:bg-yellow-100",
  Floral: "bg-pink-50 hover:bg-pink-100",
  Woody: "bg-amber-50 hover:bg-amber-100",
  Oriental: "bg-purple-50 hover:bg-purple-100",
  Fresh: "bg-green-50 hover:bg-green-100",
};

const SearchBar = ({
  onSearch = () => {},
  onFilterChange = () => {},
}: SearchBarProps) => {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null,
  );

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

  const brands = React.useMemo(() => {
    if (!fragrances) return [];
    const uniqueBrands = new Set<string>();
    fragrances.forEach((f) => {
      if (f.brand) uniqueBrands.add(cleanText(f.brand));
    });
    return Array.from(uniqueBrands).sort();
  }, [fragrances]);

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
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-white/80 backdrop-blur-sm border-b flex flex-col items-center px-6 sticky top-0 z-10 shadow-sm"
    >
      <div className="max-w-7xl w-full mx-auto flex items-center gap-4 h-20">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search fragrances..."
            className="pl-10 w-full bg-white/50 backdrop-blur-sm transition-all focus:bg-white"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[340px] p-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  Fragrance Families
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(categoryColors).map(([category, bgColor]) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === category ? null : category,
                        )
                      }
                      className={`${bgColor} p-3 rounded-lg text-sm font-medium transition-colors
                        ${activeCategory === category ? "ring-2 ring-black/5" : ""}`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  Concentration
                </label>
                <Select onValueChange={handleConcentrationChange}>
                  <SelectTrigger className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all">
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
                <label className="text-sm font-medium flex items-center gap-2">
                  <Wind className="h-4 w-4 text-emerald-500" />
                  Notes
                </label>
                <Select onValueChange={handleNotesChange}>
                  <SelectTrigger className="bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all">
                    <SelectValue placeholder="Select notes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notes</SelectItem>
                    <AnimatePresence>
                      {(activeCategory
                        ? noteCategories[activeCategory]
                        : notes
                      ).map((note) => (
                        <motion.div
                          key={note}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          <SelectItem value={note}>{note}</SelectItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </motion.div>
  );
};

export default React.memo(SearchBar);
