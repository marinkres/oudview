// src/catalog/FragranceOfTheDay.tsx
import React from "react";
import PerfumeCard from "./PerfumeCard";
import { Star } from "lucide-react";
import { featuredPerfume } from "@/lib/data/perfumes"; // Assuming you have this data

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

export default FragranceOfTheDay;
