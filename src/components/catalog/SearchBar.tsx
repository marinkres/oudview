import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const defaultFilters: SearchFilters = {
    notes: [],
    brand: "",
    concentration: "",
  };

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
                  onValueChange={(value) =>
                    onFilterChange({ ...defaultFilters, brand: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxe">Luxe Parfums</SelectItem>
                    <SelectItem value="elegant">Elegant Scents</SelectItem>
                    <SelectItem value="nature">Nature's Essence</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Concentration</label>
                <Select
                  onValueChange={(value) =>
                    onFilterChange({ ...defaultFilters, concentration: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select concentration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edp">Eau de Parfum (EDP)</SelectItem>
                    <SelectItem value="edt">Eau de Toilette (EDT)</SelectItem>
                    <SelectItem value="edc">Eau de Cologne (EDC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Select
                  onValueChange={(value) =>
                    onFilterChange({ ...defaultFilters, notes: [value] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="floral">Floral</SelectItem>
                    <SelectItem value="woody">Woody</SelectItem>
                    <SelectItem value="oriental">Oriental</SelectItem>
                    <SelectItem value="fresh">Fresh</SelectItem>
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
