import { RecipeGrid } from "@/app/components/recipes/RecipeGrid";
import type { RecipeSummary } from "@/types/recipe";

export default async function RecipesPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return <div style={{ padding: 24 }}>Missing NEXT_PUBLIC_API_URL</div>;
  }

  const res = await fetch(`${apiUrl}/recipes`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div style={{ padding: 24 }}>Failed to load recipes (HTTP {res.status})</div>;
  }

  const recipes: RecipeSummary[] = await res.json();

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Recipes</h1>
      <RecipeGrid recipes={recipes} />
    </div>
  );
}
