export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      fragrances: {
        Row: {
          id: string;
          name: string;
          brand: string;
          description: string;
          top_notes: string[];
          heart_notes: string[];
          base_notes: string[];
          concentration: string;
          longevity: number;
          sillage: number;
          price_value: number;
          gender: "Masculine" | "Feminine" | "Unisex";
          year: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand: string;
          description: string;
          top_notes: string[];
          heart_notes: string[];
          base_notes: string[];
          concentration: string;
          longevity: number;
          sillage: number;
          price_value: number;
          gender: "Masculine" | "Feminine" | "Unisex";
          year: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          brand?: string;
          description?: string;
          top_notes?: string[];
          heart_notes?: string[];
          base_notes?: string[];
          concentration?: string;
          longevity?: number;
          sillage?: number;
          price_value?: number;
          gender?: "Masculine" | "Feminine" | "Unisex";
          year?: number;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          avatar_url: string;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string;
          avatar_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          avatar_url?: string;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          fragrance_id: string;
          rating: number;
          comment: string;
          longevity: number;
          sillage: number;
          value_for_money: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          fragrance_id: string;
          rating: number;
          comment: string;
          longevity: number;
          sillage: number;
          value_for_money: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          fragrance_id?: string;
          rating?: number;
          comment?: string;
          longevity?: number;
          sillage?: number;
          value_for_money?: number;
          created_at?: string;
        };
      };
    };
  };
}
