import type { RecipeSummary } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";

export function RecipeGrid({ recipes }: { recipes: RecipeSummary[] }) {
  if (!recipes.length) {
    return <div style={{ padding: 32, opacity: 0.6, color: "var(--text-secondary)" }}>No recipes yet.</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 24,
      }}
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
