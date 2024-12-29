import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Droplets,
  Wind,
  Coins,
  Calendar,
  Beaker,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import Footer from "./Footer";
import { perfumes, noteColors } from "@/lib/data/perfumes";
import BottleDesign from "./BottleDesign";

const FragrancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fragrance = perfumes.find((p) => p.id === id) || {
    name: "Fragrance Not Found",
    brand: "Unknown",
    description: "This fragrance could not be found.",
    topNotes: [],
    heartNotes: [],
    baseNotes: [],
    concentration: "N/A",
    longevity: 0,
    sillage: 0,
    priceValue: 0,
    gender: "Unisex",
    year: 0,
  };

  const renderMetric = (
    icon: React.ReactNode,
    label: string,
    value: number,
    max: number = 10,
  ) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-2 rounded-sm transition-colors ${i < value ? "bg-primary" : "bg-primary/10"}`}
          />
        ))}
      </div>
    </div>
  );

  const renderNoteSection = (title: string, notes: string[]) => (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {notes.map((note, i) => (
          <span
            key={i}
            className={`px-3 py-1.5 rounded-full text-sm text-gray-700 transition-colors ${noteColors[note] || "bg-gray-100"}`}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
          <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="space-y-8">
            {/* Header Section with Bottle Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="col-span-2 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-light tracking-tight">
                      {fragrance.name}
                    </h1>
                    <p className="text-xl text-muted-foreground mt-2">
                      {fragrance.brand}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-medium px-4 py-2 bg-primary/5 rounded-full">
                      {fragrance.gender}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Released in {fragrance.year}
                    </div>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {fragrance.description}
                </p>
              </div>

              {/* Bottle Design */}
              <div className="flex justify-center items-start pt-4">
                <div className="relative group">
                  <BottleDesign
                    id={fragrance.id}
                    className="w-32 h-48 text-primary/70 group-hover:text-primary transition-colors duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/5 -z-10 rounded-lg transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-primary/70" />
                <div>
                  <div className="text-sm font-medium">
                    {fragrance.concentration}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Concentration
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary/70" />
                <div>
                  <div className="text-sm font-medium">{fragrance.gender}</div>
                  <div className="text-xs text-muted-foreground">Gender</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary/70" />
                <div>
                  <div className="text-sm font-medium">{fragrance.year}</div>
                  <div className="text-xs text-muted-foreground">
                    Release Year
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary/70" />
                <div>
                  <div className="text-sm font-medium">
                    {"$".repeat(fragrance.priceValue)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Price Range
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Pyramid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderNoteSection("Top Notes", fragrance.topNotes)}
              {renderNoteSection("Heart Notes", fragrance.heartNotes)}
              {renderNoteSection("Base Notes", fragrance.baseNotes)}
            </div>

            {/* Performance Metrics */}
            <div className="space-y-6 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Performance</h3>
              {renderMetric(
                <Droplets className="h-5 w-5" />,
                "Longevity",
                fragrance.longevity,
              )}
              {renderMetric(
                <Wind className="h-5 w-5" />,
                "Sillage",
                fragrance.sillage,
              )}
              {renderMetric(
                <Coins className="h-5 w-5" />,
                "Value for Money",
                fragrance.priceValue,
                5,
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FragrancePage;
