export const CITIES = [
  "Tiranë",
  "Durrës",
  "Vlorë",
  "Shkodër",
  "Elbasan",
  "Korçë",
  "Fier",
  "Berat",
  "Lushnjë",
  "Pogradec",
] as const;

export type City = (typeof CITIES)[number];
