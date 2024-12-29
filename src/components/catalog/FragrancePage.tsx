import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Droplets, Wind, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import Footer from "./Footer";

const FragrancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, fetch fragrance data based on id
  const fragrance = {
    name: "Midnight Rose",
    brand: "Luxury Scents",
    description: "A sophisticated blend of floral and oriental notes",
    topNotes: ["Bergamot", "Pink Pepper", "Raspberry"],
    heartNotes: ["Rose", "Peony", "Jasmine"],
    baseNotes: ["Vanilla", "Musk", "Patchouli"],
    concentration: "EDP",
    longevity: 7,
    sillage: 6,
    priceValue: 4,
    gender: "Feminine",
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
            className="px-3 py-1.5 bg-primary/5 rounded-full text-sm hover:bg-primary/10 transition-colors"
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

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-light tracking-tight">
                  {fragrance.name}
                </h1>
                <p className="text-xl text-muted-foreground mt-2">
                  {fragrance.brand}
                </p>
              </div>
              <span className="text-sm font-medium px-4 py-2 bg-primary/5 rounded-full">
                {fragrance.gender}
              </span>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {fragrance.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {renderNoteSection("Top Notes", fragrance.topNotes)}
            {renderNoteSection("Heart Notes", fragrance.heartNotes)}
            {renderNoteSection("Base Notes", fragrance.baseNotes)}
          </div>

          <div className="space-y-6 pt-6 border-t">
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
              "Price Value",
              fragrance.priceValue,
              5,
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FragrancePage;
