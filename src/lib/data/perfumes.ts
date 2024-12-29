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
  description?: string;
  year?: number;
}

// Note color mapping based on scent characteristics
export const noteColors: Record<string, string> = {
  // Citrus & Fresh
  Bergamot: "bg-orange-100",
  Lemon: "bg-yellow-100",
  Grapefruit: "bg-red-50",
  Orange: "bg-orange-100",
  Lime: "bg-lime-100",
  Mint: "bg-emerald-50",
  Apple: "bg-green-50",
  Pear: "bg-lime-50",
  Melon: "bg-emerald-50",

  // Floral
  Rose: "bg-rose-100",
  Jasmine: "bg-yellow-50",
  Violet: "bg-purple-100",
  Iris: "bg-indigo-100",
  "Orange Blossom": "bg-orange-50",
  Magnolia: "bg-pink-50",
  Orchid: "bg-fuchsia-100",
  "White Rose": "bg-rose-50",
  Bellflower: "bg-blue-50",
  "Ylang-Ylang": "bg-yellow-100",

  // Spicy & Woody
  Cardamom: "bg-amber-100",
  Ginger: "bg-yellow-100",
  Nutmeg: "bg-amber-100",
  Cedar: "bg-amber-50",
  Sandalwood: "bg-amber-100",
  Vetiver: "bg-emerald-100",
  "Oud Wood": "bg-amber-200",
  Rosewood: "bg-rose-100",
  "Chinese Pepper": "bg-red-100",
  "Pink Pepper": "bg-red-50",
  Papyrus: "bg-stone-100",
  Cedarwood: "bg-amber-50",
  Birch: "bg-stone-100",
  "Oak Moss": "bg-emerald-100",
  "Lotus Wood": "bg-stone-50",

  // Sweet & Gourmand
  Vanilla: "bg-yellow-50",
  Praline: "bg-amber-100",
  "Tonka Bean": "bg-amber-100",
  "Dark Chocolate": "bg-amber-200",

  // Musky & Animalic
  Musk: "bg-stone-100",
  Ambergris: "bg-amber-100",
  Leather: "bg-stone-200",

  // Fruity
  "Black Currant": "bg-purple-100",
  Blackberry: "bg-purple-100",
  Pineapple: "bg-yellow-100",

  // Other
  Amber: "bg-amber-100",
  Incense: "bg-stone-100",
  Patchouli: "bg-emerald-100",
  "Black Truffle": "bg-stone-200",
  "Iso E Super": "bg-gray-100",
  Bamboo: "bg-green-100",
  "Spicy Notes": "bg-red-100",
  Wood: "bg-amber-100",
};

// This is a small sample of popular fragrances
// In a real app, this would come from an API
export const perfumes: Perfume[] = [
  {
    id: "1",
    name: "Bleu de Chanel",
    brand: "Chanel",
    description:
      "A woody aromatic fragrance for the modern man who demands excellence.",
    topNotes: ["Grapefruit", "Lemon", "Mint", "Pink Pepper"],
    heartNotes: ["Ginger", "Nutmeg", "Jasmine", "Iso E Super"],
    baseNotes: ["Incense", "Vetiver", "Cedar", "Sandalwood"],
    concentration: "EDP",
    longevity: 8,
    sillage: 7,
    priceValue: 4,
    gender: "Masculine",
    year: 2010,
  },
  {
    id: "2",
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    description:
      "A refreshing citrus aromatic that captures the spirit of the Mediterranean summer.",
    topNotes: ["Sicilian Lemon", "Apple", "Cedar", "Bellflower"],
    heartNotes: ["Bamboo", "Jasmine", "White Rose"],
    baseNotes: ["Cedar", "Musk", "Amber"],
    concentration: "EDT",
    longevity: 6,
    sillage: 5,
    priceValue: 3,
    gender: "Feminine",
    year: 2001,
  },
  {
    id: "3",
    name: "Black Orchid",
    brand: "Tom Ford",
    description: "A luxurious and sensual fragrance with a rich, dark heart.",
    topNotes: ["Black Truffle", "Ylang-Ylang", "Bergamot", "Black Currant"],
    heartNotes: ["Orchid", "Spicy Notes", "Lotus Wood"],
    baseNotes: ["Patchouli", "Sandalwood", "Dark Chocolate", "Incense"],
    concentration: "EDP",
    longevity: 9,
    sillage: 8,
    priceValue: 5,
    gender: "Unisex",
    year: 2006,
  },
  {
    id: "4",
    name: "Aventus",
    brand: "Creed",
    description: "A sophisticated blend for the confident modern man.",
    topNotes: ["Pineapple", "Bergamot", "Black Currant", "Apple"],
    heartNotes: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"],
    baseNotes: ["Musk", "Oak Moss", "Ambergris", "Vanilla"],
    concentration: "EDP",
    longevity: 9,
    sillage: 8,
    priceValue: 5,
    gender: "Masculine",
    year: 2010,
  },
  {
    id: "5",
    name: "La Vie Est Belle",
    brand: "Lancôme",
    description:
      "A sweet life captured in a modern interpretation of joy and elegance.",
    topNotes: ["Black Currant", "Pear"],
    heartNotes: ["Iris", "Jasmine", "Orange Blossom"],
    baseNotes: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"],
    concentration: "EDP",
    longevity: 8,
    sillage: 7,
    priceValue: 4,
    gender: "Feminine",
    year: 2012,
  },
  {
    id: "6",
    name: "Santal 33",
    brand: "Le Labo",
    description:
      "A unisex fragrance that captures the spirit of the American West.",
    topNotes: ["Cardamom", "Iris", "Violet"],
    heartNotes: ["Sandalwood", "Papyrus", "Cedarwood"],
    baseNotes: ["Leather", "Amber", "Musk"],
    concentration: "EDP",
    longevity: 8,
    sillage: 6,
    priceValue: 5,
    gender: "Unisex",
    year: 2011,
  },
  {
    id: "7",
    name: "J'adore",
    brand: "Dior",
    description: "A modern, glamorous fragrance that has become a classic.",
    topNotes: ["Pear", "Melon", "Magnolia"],
    heartNotes: ["Rose", "Violet", "Orchid"],
    baseNotes: ["Musk", "Blackberry", "Wood"],
    concentration: "EDP",
    longevity: 7,
    sillage: 6,
    priceValue: 4,
    gender: "Feminine",
    year: 1999,
  },
  {
    id: "8",
    name: "Oud Wood",
    brand: "Tom Ford",
    description: "A sophisticated and rare take on a precious ingredient.",
    topNotes: ["Rosewood", "Cardamom", "Chinese Pepper"],
    heartNotes: ["Oud Wood", "Sandalwood", "Vetiver"],
    baseNotes: ["Tonka Bean", "Amber", "Vanilla"],
    concentration: "EDP",
    longevity: 8,
    sillage: 7,
    priceValue: 5,
    gender: "Unisex",
    year: 2007,
  },
];

export const featuredPerfume = perfumes[2]; // Black Orchid
