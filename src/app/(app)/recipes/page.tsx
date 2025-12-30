import Link from "next/link";
import type { RecipeSummary } from "@/types/recipe";
import { RecipeGrid } from "@/app/components/recipes/RecipeGrid";

export default async function RecipesPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return <div style={{ padding: 24 }}>Missing NEXT_PUBLIC_API_URL</div>;

  const res = await fetch(`${apiUrl}/recipes`, { cache: "no-store" });

  if (!res.ok) {
    return <div style={{ padding: 24 }}>Failed to load recipes (HTTP {res.status})</div>;
  }

  const recipes: RecipeSummary[] = await res.json();

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ fontSize: 28, margin: 0 }}>Recipes</h1>

        <Link
          href="/recipes/create"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          + Create recipe
        </Link>
      </div>

      <RecipeGrid recipes={recipes} />
    </div>
  );
}
