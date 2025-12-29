export const UNIT_OPTIONS = ["gr", "kg", "ml", "l", "tsp", "tbsp", "cup", "pcs", "pinch", "clove", "slice"] as const;

export type Unit = (typeof UNIT_OPTIONS)[number];
