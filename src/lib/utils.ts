import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanText(text: string): string {
  if (!text) return "";

  // First, split by common separators and take the first part
  let cleaned = text.split(/[/\u0600-\u06FF]/).filter(Boolean)[0];
  if (!cleaned) return "";

  // Remove any text that appears twice (like "Al Haramain Al Haramain")
  const words = cleaned.split(" ");
  const uniqueWords = words.filter((word, index) => {
    const nextWord = words[index + 1];
    return !nextWord || word.toLowerCase() !== nextWord.toLowerCase();
  });
  cleaned = uniqueWords.join(" ");

  // Remove any remaining non-Latin characters
  cleaned = cleaned.replace(/[^\x00-\x7F\s]/g, "").trim();

  // Remove multiple spaces
  cleaned = cleaned.replace(/\s+/g, " ");

  // Remove any trailing/leading spaces or dashes
  cleaned = cleaned.replace(/^[-\s]+|[-\s]+$/g, "");

  return cleaned || text;
}
