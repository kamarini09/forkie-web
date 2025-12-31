import { RecipeDetailsView } from "@/app/components/recipes/RecipeDetailsView";
import { RecipeActions } from "@/app/components/recipes/RecipeActions";
import type { Recipe } from "@/types/recipe";

type Props = { params: Promise<{ id: string }> };

export default async function RecipePage({ params }: Props) {
  const { id } = await params;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return <div style={{ padding: 24 }}>Missing NEXT_PUBLIC_API_URL</div>;

  const res = await fetch(`${apiUrl}/recipes/${id}`, { cache: "no-store" });

  if (res.status === 404) return <div style={{ padding: 24 }}>Recipe not found.</div>;
  if (!res.ok) return <div style={{ padding: 24 }}>Failed to load recipe (HTTP {res.status})</div>;

  const recipe: Recipe = await res.json();

  const actions = <RecipeActions recipeId={recipe.id} ownerClerkId={recipe.ownerClerkId ?? null} initialIsFavorited={recipe.isFavorited ?? false} />;

  return <RecipeDetailsView recipe={recipe} actions={actions} />;
}
