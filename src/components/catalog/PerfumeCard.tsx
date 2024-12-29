import React from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Wind, Coins } from "lucide-react";

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
}

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
}: PerfumeCardProps) => {
  const navigate = useNavigate();

  const renderMetric = (
    icon: React.ReactNode,
    value: number,
    max: number = 10,
  ) => (
    <div className="flex items-center gap-2">
      {icon}
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded-sm ${i < value ? "bg-primary/30" : "bg-primary/5"}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      onClick={() => navigate(`/fragrance/${id}`)}
      className="group w-[320px] relative cursor-pointer"
    >
      {/* Main card with hover effect */}
      <div className="bg-card rounded-lg p-6 transition-all duration-500 group-hover:shadow-lg group-hover:translate-x-1 group-hover:-translate-y-1">
        {/* Gender indicator */}
        <div className="absolute top-3 right-3 text-xs text-muted-foreground">
          {gender}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-light tracking-tight">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{brand}</p>
          </div>

          {/* Notes visualization */}
          <div className="flex gap-2">
            {[...topNotes, ...heartNotes, ...baseNotes]
              .slice(0, 6)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-12 bg-primary/20 group-hover:bg-primary/40 transition-all duration-500"
                  style={{
                    transform: `scaleY(${1 - i * 0.1}) rotate(${i * 5}deg)`,
                    transformOrigin: "bottom",
                  }}
                />
              ))}
          </div>

          <div className="space-y-2 pt-2 border-t">
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

      {/* Background decoration */}
      <div className="absolute inset-0 bg-primary/5 rounded-lg -z-10 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
    </div>
  );
};

export default PerfumeCard;
