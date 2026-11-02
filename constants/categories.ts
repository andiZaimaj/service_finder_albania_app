export type CategoryKey = "electrician" | "plumber" | "cleaner" | "mechanic" | "painter";

export interface Category {
  key: CategoryKey;
  labelEn: string;
  labelSq: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { key: "electrician", labelEn: "Electrician", labelSq: "Elektricist", icon: "zap" },
  { key: "plumber", labelEn: "Plumber", labelSq: "Hidraulik", icon: "droplet" },
  { key: "cleaner", labelEn: "Cleaner", labelSq: "Pastrues", icon: "sparkles" },
  { key: "mechanic", labelEn: "Mechanic", labelSq: "Mekanik", icon: "wrench" },
  { key: "painter", labelEn: "Painter", labelSq: "Piktor", icon: "paintbrush" },
];
