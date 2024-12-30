import React, { useState, useEffect } from "react";
import PerfumeCard from "./PerfumeCard";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

const FragranceOfTheDay = () => {
  const [featuredPerfume, setFeaturedPerfume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomPerfume = async () => {
      const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      const storedDate = localStorage.getItem("fragranceOfTheDayDate");
      const storedFragranceId = localStorage.getItem("fragranceOfTheDayId");

      if (storedDate === today && storedFragranceId) {
        // If fragrance already exists for today, use it
        const { data, error } = await supabase
          .from("fragrances")
          .select()
          .eq("id", storedFragranceId)
          .single();

        if (data) {
          setFeaturedPerfume(data);
          setLoading(false);
        } else {
          setError("Failed to load fragrance for today.");
          setLoading(false);
        }
      } else {
        // Fetch a new fragrance if not stored for today
        try {
          const { data, error } = await supabase.rpc("get_random_fragrance");

          if (error) {
            throw error;
          }

          if (data && data.length > 0) {
            const newFragrance = data[0];
            setFeaturedPerfume(newFragrance);

            // Store the new fragrance and today's date in localStorage
            localStorage.setItem("fragranceOfTheDayDate", today);
            localStorage.setItem("fragranceOfTheDayId", newFragrance.id);
          } else {
            setError("No fragrances found.");
          }
        } catch (err) {
          setError("Failed to load a random fragrance.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRandomPerfume();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-12">Loading...</div>
    );
  }

  if (error || !featuredPerfume) {
    return (
      <div className="text-center text-muted-foreground py-12">
        {error || "No fragrance available."}
      </div>
    );
  }

  return (
    <div className="w-full bg-black/5 rounded-xl p-8 mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-primary fill-primary" />
          <h2 className="text-xl font-medium">Fragrance of the Day</h2>
        </div>
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
              {[...(featuredPerfume.top_notes || []), ...(featuredPerfume.heart_notes || []), ...(featuredPerfume.base_notes || [])].map(
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
