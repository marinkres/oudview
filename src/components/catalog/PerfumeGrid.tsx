import React from "react";
import PerfumeCard from "./PerfumeCard";
import { Star } from "lucide-react";

interface PerfumeGridProps {
  perfumes?: Array<{
    id: string;
    name: string;
    brand: string;
    topNotes: string[];
    heartNotes: string[];
    baseNotes: string[];
    concentration: string;
    longevity: number;
    sillage: number;
    priceValue: number;
    gender: "Masculine" | "Feminine" | "Unisex";
    imageUrl: string;
  }>;
}

const FragranceOfTheDay = () => {
  const fragrance = {
    id: "featured",
    name: "Royal Oud",
    brand: "Creed",
    topNotes: ["Pink Pepper", "Lemon"],
    heartNotes: ["Galbanum", "Cedar"],
    baseNotes: ["Oud", "Sandalwood"],
    concentration: "EDP",
    longevity: 9,
    sillage: 8,
    priceValue: 5,
    gender: "Unisex",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759",
  };

  return (
    <div className="w-full bg-black/5 rounded-xl p-8 mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Star className="h-5 w-5 text-primary fill-primary" />
          <h2 className="text-xl font-medium">Fragrance of the Day</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-light">{fragrance.name}</h3>
              <p className="text-xl text-muted-foreground mt-2">
                {fragrance.brand}
              </p>
            </div>
            <p className="text-lg text-muted-foreground">
              A masterful blend of precious woods, featuring the legendary Oud
              wood complemented by fresh spices and aromatic cedar.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                ...fragrance.topNotes,
                ...fragrance.heartNotes,
                ...fragrance.baseNotes,
              ].map((note, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-background rounded-full text-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PerfumeCard {...fragrance} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PerfumeGrid = ({
  perfumes = [
    {
      id: "1",
      name: "Midnight Rose",
      brand: "Luxury Scents",
      topNotes: ["Bergamot", "Pink Pepper"],
      heartNotes: ["Rose", "Peony"],
      baseNotes: ["Vanilla", "Musk"],
      concentration: "EDP",
      longevity: 7,
      sillage: 6,
      priceValue: 3,
      gender: "Feminine",
      imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
    },
    {
      id: "2",
      name: "Ocean Breeze",
      brand: "Fresh Fragrances",
      topNotes: ["Sea Salt", "Citrus"],
      heartNotes: ["Lavender", "Sage"],
      baseNotes: ["Amber", "Musk"],
      concentration: "EDT",
      longevity: 6,
      sillage: 5,
      priceValue: 2,
      gender: "Unisex",
      imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601",
    },
    {
      id: "3",
      name: "Velvet Oud",
      brand: "Oriental Perfumes",
      topNotes: ["Saffron", "Leather"],
      heartNotes: ["Oud", "Amber"],
      baseNotes: ["Sandalwood", "Musk"],
      concentration: "Parfum",
      longevity: 9,
      sillage: 8,
      priceValue: 5,
      gender: "Masculine",
      imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759",
    },
  ],
}: PerfumeGridProps) => {
  return (
    <div className="w-full min-h-[902px] bg-background px-8 py-12">
      <FragranceOfTheDay />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {perfumes.map((perfume) => (
            <div key={perfume.id} className="flex justify-center">
              <PerfumeCard {...perfume} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfumeGrid;
