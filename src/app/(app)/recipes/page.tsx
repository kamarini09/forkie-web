import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import type { RecipeSummary } from "@/types/recipe";
import { RecipeGrid } from "@/app/components/recipes/RecipeGrid";
import { Button } from "@/app/components/ui/Button";

export default async function RecipesPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>Missing NEXT_PUBLIC_API_URL</div>;

  const { getToken } = await auth();
  const token = await getToken();

  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${apiUrl}/recipes`, {
    cache: "no-store",
    headers,
  });

  if (!res.ok) {
    return <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>Failed to load recipes (HTTP {res.status})</div>;
  }

  const recipes: RecipeSummary[] = await res.json();

  return (
    <div>
      <div className="page-head">
        <div>
          <h1 className="h1">Recipes</h1>
          <div className="kicker">Explore public recipes and fork them into your own.</div>
        </div>

        <Link href="/recipes/create" style={{ textDecoration: "none" }}>
          <Button variant="primary">Create recipe</Button>
        </Link>
      </div>

      <RecipeGrid recipes={recipes} />
    </div>
  );
}
