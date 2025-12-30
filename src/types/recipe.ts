// import type { Unit } from "@/lib/units";

// export type Ingredient = {
//   name: string;
//   quantity?: number;
//   unit?: Unit;
//   note?: string;
// };

// export type Step = {
//   order: number;
//   text: string;
// };

// export type RecipeContent = {
//   ingredients: Ingredient[];
//   steps: Step[];
// };

// export type Recipe = {
//   id: string;
//   userId: string;
//   ownerClerkId: string;
//   title: string;
//   description?: string | null;
//   isPublic: boolean;
//   servings?: number | null;
//   prepMinutes?: number | null;
//   cookMinutes?: number | null;
//   content: RecipeContent;
//   createdAt: string; // API returns ISO string
//   updatedAt: string;
//   forkedFrom?: { id: string; title: string } | null;
// };

export type Recipe = {
  id: string;
  title: string;
  description?: string | null;
  isPublic: boolean;

  servings?: number | null;
  prepMinutes?: number | null;
  cookMinutes?: number | null;

  content: {
    ingredients: Array<{
      name: string;
      quantity?: number;
      unit?: string;
      note?: string;
    }>;
    steps: Array<{
      order: number;
      text: string;
    }>;
  };

  createdAt: string;
  updatedAt: string;

  forkedFrom?: { id: string; title: string } | null;

  // ✅ used only for ownership checks in frontend
  ownerClerkId?: string | null;
};

export type RecipeFormState = {
  title: string;
  description: string;
  isPublic: boolean;
  servings?: number;
  prepMinutes?: number;
  cookMinutes?: number;
  // ingredients: Ingredient[];
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
};
