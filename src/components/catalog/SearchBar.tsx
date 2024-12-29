import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { perfumes } from "@/lib/data/perfumes";
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
  // Get unique brands
  const brands = Array.from(new Set(perfumes.map((p) => p.brand)));

  // Get unique notes
  const allNotes = new Set<string>();
  perfumes.forEach((p) => {
    [...p.topNotes, ...p.heartNotes, ...p.baseNotes].forEach((note) => {
      allNotes.add(note);
    });
  });
  const notes = Array.from(allNotes);

  // Get unique concentrations
  const concentrations = Array.from(
    new Set(perfumes.map((p) => p.concentration)),
  );

  return (
    <div className="w-full h-20 bg-background border-b flex items-center px-6 sticky top-0 z-10">
      <div className="max-w-7xl w-full mx-auto flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search fragrances..."
            className="pl-10 w-full"
            onChange={(e) => onSearch(e.target.value)}
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
                <Select
                  onValueChange={(value) => onFilterChange({ brand: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Select
                  onValueChange={(value) =>
                    onFilterChange({ concentration: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select concentration" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Select
                  onValueChange={(value) => onFilterChange({ notes: [value] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notes" />
                  </SelectTrigger>
                  <SelectContent>
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

export default SearchBar;
