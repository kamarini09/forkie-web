import Link from "next/link";
import type { RecipeSummary } from "@/types/recipe";
import { RecipeGrid } from "@/app/components/recipes/RecipeGrid";

export default async function RecipesPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return <div>Missing NEXT_PUBLIC_API_URL</div>;

  const res = await fetch(`${apiUrl}/recipes`, { cache: "no-store" });

  if (!res.ok) {
    return <div>Failed to load recipes (HTTP {res.status})</div>;
  }

  const recipes: RecipeSummary[] = await res.json();

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="h1">Recipes</h1>
          <div className="kicker">Explore public recipes and fork them into your own.</div>
        </div>

        <Link href="/recipes/create" className="btn btn-primary">
          + Create recipe
        </Link>
      </div>

      <RecipeGrid recipes={recipes} />
    </div>
  );
}
