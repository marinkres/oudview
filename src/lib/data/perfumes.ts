export interface Perfume {
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
  description?: string;
}

export const perfumes: Perfume[] = [
  {
    id: "1",
    name: "Midnight Rose",
    brand: "Luxury Scents",
    description:
      "A sophisticated blend of floral and oriental notes, centered around a deep, mysterious rose accord.",
    topNotes: ["Bergamot", "Pink Pepper", "Raspberry"],
    heartNotes: ["Rose", "Peony", "Jasmine"],
    baseNotes: ["Vanilla", "Musk", "Patchouli"],
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
    description:
      "A fresh aquatic scent that captures the essence of a coastal morning.",
    topNotes: ["Sea Salt", "Citrus", "Marine Notes"],
    heartNotes: ["Lavender", "Rosemary", "Sage"],
    baseNotes: ["Amber", "Cedar", "Musk"],
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
    description:
      "A rich and opulent fragrance built around precious oud wood and exotic spices.",
    topNotes: ["Saffron", "Rose", "Leather"],
    heartNotes: ["Oud", "Amber", "Vanilla"],
    baseNotes: ["Sandalwood", "Patchouli", "Musk"],
    concentration: "Parfum",
    longevity: 9,
    sillage: 8,
    priceValue: 5,
    gender: "Masculine",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759",
  },
  {
    id: "4",
    name: "Green Citrus",
    brand: "Fresh Fragrances",
    description:
      "A bright and energizing blend of citrus fruits and aromatic herbs.",
    topNotes: ["Lemon", "Lime", "Bergamot"],
    heartNotes: ["Basil", "Mint", "Green Tea"],
    baseNotes: ["Vetiver", "Cedar", "White Musk"],
    concentration: "EDT",
    longevity: 5,
    sillage: 4,
    priceValue: 2,
    gender: "Unisex",
    imageUrl: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc",
  },
  {
    id: "5",
    name: "Royal Oud",
    brand: "Oriental Perfumes",
    description:
      "A masterful blend of precious woods, featuring the legendary Oud wood complemented by fresh spices and aromatic cedar.",
    topNotes: ["Pink Pepper", "Lemon", "Cardamom"],
    heartNotes: ["Galbanum", "Cedar", "Frankincense"],
    baseNotes: ["Oud", "Sandalwood", "Musk"],
    concentration: "Parfum",
    longevity: 9,
    sillage: 8,
    priceValue: 5,
    gender: "Unisex",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759",
  },
];

export const featuredPerfume = perfumes[4]; // Royal Oud
