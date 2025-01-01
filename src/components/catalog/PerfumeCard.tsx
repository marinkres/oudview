import React from "react";
import { cleanText } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Droplets, Wind, Coins, Calendar } from "lucide-react";
import BottleDesign from "./BottleDesign";

interface PerfumeCardProps {
  id?: string;
  name?: string;
  brand?: string;
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
  concentration?: string;
  longevity?: number;
  sillage?: number;
  priceValue?: number;
  gender?: "Masculine" | "Feminine" | "Unisex";
  imageUrl?: string;
  year?: number;
  instanceId?: string;
}

const getFragranceCategory = (notes: string[]) => {
  const noteCategories = {
    Citrus: ["Bergamot", "Lemon", "Orange", "Grapefruit"],
    Floral: ["Rose", "Jasmine", "Lavender", "Violet"],
    Woody: ["Sandalwood", "Cedar", "Oud", "Vetiver"],
    Oriental: ["Vanilla", "Amber", "Musk", "Incense"],
    Fresh: ["Mint", "Marine", "Green Tea", "Cucumber"],
  };

  for (const [category, categoryNotes] of Object.entries(noteCategories)) {
    if (notes.some((note) => categoryNotes.includes(note))) {
      return category;
    }
  }
  return "Fresh";
};

const categoryGradients = {
  Citrus: "from-yellow-50 to-orange-50",
  Floral: "from-pink-50 to-rose-50",
  Woody: "from-amber-50 to-brown-50",
  Oriental: "from-purple-50 to-indigo-50",
  Fresh: "from-green-50 to-emerald-50",
};

const PerfumeCard = ({
  id = "1",
  name = "Elegant Evening",
  brand = "Luxe Parfums",
  topNotes = ["Bergamot", "Lemon"],
  heartNotes = ["Rose", "Jasmine"],
  baseNotes = ["Vanilla", "Musk"],
  longevity = 8,
  sillage = 7,
  priceValue = 4,
  gender = "Unisex",
  year = 2020,
  instanceId = Math.random().toString(36).substring(7),
}: PerfumeCardProps) => {
  const navigate = useNavigate();
  const allNotes = [...topNotes, ...heartNotes, ...baseNotes];
  const category = getFragranceCategory(allNotes);
  const gradient = categoryGradients[category];

  const renderMetric = React.useCallback(
    (icon: React.ReactNode, value: number, max: number = 10) => (
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex gap-0.5">
          {Array.from({ length: max }).map((_, i) => (
            <div
              key={`${instanceId}-${id}-metric-${i}`}
              className={`w-1 h-3 rounded-sm transition-colors ${i < value ? "bg-primary/30" : "bg-primary/5"}`}
            />
          ))}
        </div>
      </div>
    ),
    [id, instanceId],
  );

  const displayNotes = React.useMemo(() => allNotes.slice(0, 6), [allNotes]);

  return (
    <div
      onClick={() => navigate(`/fragrance/${id}`)}
      className="group w-[320px] relative cursor-pointer transform transition-all duration-200 hover:-translate-y-1"
    >
      <div
        className={`bg-gradient-to-br ${gradient} rounded-lg p-6 transition-all duration-500 shadow-sm hover:shadow-xl`}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm">
            {gender}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {year}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-light tracking-tight">
              {cleanText(name)}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {cleanText(brand)}
            </p>
          </div>

          <div className="relative h-24 flex items-end justify-center">
            <div className="absolute inset-0 flex justify-center transition-all duration-200 transform group-hover:scale-105">
              <BottleDesign id={id} className="h-full text-primary/20" />
            </div>
            {displayNotes.map((_, i) => (
              <div
                key={`${instanceId}-${id}-note-${i}`}
                className="w-1 h-12 bg-primary/20 group-hover:bg-primary/40 transition-all duration-500"
                style={{
                  transform: `scaleY(${1 - i * 0.1}) rotate(${i * 5}deg)`,
                  transformOrigin: "bottom",
                }}
              />
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-primary/10">
            {renderMetric(
              <Droplets className="w-4 h-4 text-primary/50" />,
              longevity,
            )}
            {renderMetric(
              <Wind className="w-4 h-4 text-primary/50" />,
              sillage,
            )}
            {renderMetric(
              <Coins className="w-4 h-4 text-primary/50" />,
              priceValue,
              5,
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-white/50 rounded-lg -z-10 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
    </div>
  );
};

export default React.memo(PerfumeCard);
