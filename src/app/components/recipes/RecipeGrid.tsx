import type { RecipeSummary } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";

type Props = {
  recipes: RecipeSummary[];
};

export function RecipeGrid({ recipes }: Props) {
  if (!recipes.length) {
    return <div style={{ padding: 24, opacity: 0.7 }}>No recipes yet.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
      }}
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
