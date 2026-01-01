"use client";

import type { Recipe } from "@/types/recipe";
import { RecipeHeader } from "./RecipeHeader";
import { IngredientsChecklist } from "./IngredientsChecklist";
import { StepsChecklist } from "./StepsChecklist";

export function RecipeDetailsView({ recipe, actions }: { recipe: Recipe; actions?: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <RecipeHeader recipe={recipe} actions={actions} />

      {/* Ingredients & Steps Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 40 }}>
        <IngredientsChecklist ingredients={recipe.content.ingredients} />
        <StepsChecklist steps={recipe.content.steps} />
      </div>
    </div>
  );
}
