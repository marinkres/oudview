import { supabase } from "../lib/supabase";
import { perfumes } from "../lib/data/perfumes";

async function migratePerfumes() {
  for (const perfume of perfumes) {
    const { error } = await supabase.from("fragrances").insert({
      id: perfume.id,
      name: perfume.name,
      brand: perfume.brand,
      description: perfume.description || "",
      top_notes: perfume.topNotes,
      heart_notes: perfume.heartNotes,
      base_notes: perfume.baseNotes,
      concentration: perfume.concentration,
      longevity: perfume.longevity,
      sillage: perfume.sillage,
      price_value: perfume.priceValue,
      gender: perfume.gender,
      year: perfume.year,
    });

    if (error) {
      console.error(`Error inserting ${perfume.name}:`, error);
    } else {
      console.log(`Successfully inserted ${perfume.name}`);
    }
  }
}

migratePerfumes();
