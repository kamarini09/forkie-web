import type { Unit } from "@/lib/units";

export type Ingredient = {
  name: string;
  quantity?: number;
  unit?: Unit; // still fine even if backend stores string
  note?: string;
};

export type Step = {
  order: number;
  text: string;
};

export type RecipeContent = {
  ingredients: Ingredient[];
  steps: Step[];
};

export type Recipe = {
  id: string;

  // comes from backend now (DB uuid)
  userId?: string;

  // ✅ important for frontend owner checks (Clerk id)
  ownerClerkId?: string | null;

  title: string;
  description?: string | null;
  isPublic: boolean;
  servings?: number | null;
  prepMinutes?: number | null;
  cookMinutes?: number | null;
  content: RecipeContent;
  isFavorited?: boolean;

  createdAt: string;
  updatedAt: string;

  forkedFrom?: { id: string; title: string } | null;
};

export type RecipeFormState = {
  title: string;
  description: string;
  isPublic: boolean;
  servings?: number;
  prepMinutes?: number;
  cookMinutes?: number;
  ingredients: Ingredient[];
  steps: { text: string }[];
};

export type RecipeSummary = {
  id: string;
  title: string;
  description?: string | null;
  isPublic: boolean;
  servings?: number | null;
  prepMinutes?: number | null;
  cookMinutes?: number | null;
  createdAt: string;
  updatedAt: string;
  forkedFrom?: { id: string; title: string } | null;

  // optional if you want to show edit/fork buttons in grids later
  ownerClerkId?: string | null;
};
