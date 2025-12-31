import { RecipeDetailsView } from "@/app/components/recipes/RecipeDetailsView";
import { RecipeActions } from "@/app/components/recipes/RecipeActions";
import type { Recipe } from "@/types/recipe";
import { BackButton } from "@/app/components/ui/BackButton";

type Props = { params: Promise<{ id: string }> };

export default async function RecipePage({ params }: Props) {
  const { id } = await params;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>Missing NEXT_PUBLIC_API_URL</div>;

  const res = await fetch(`${apiUrl}/recipes/${id}`, { cache: "no-store" });

  if (res.status === 404) return <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>Recipe not found.</div>;
  if (!res.ok) return <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>Failed to load recipe (HTTP {res.status})</div>;

  const recipe: Recipe = await res.json();

  const actions = <RecipeActions recipeId={recipe.id} ownerClerkId={recipe.ownerClerkId ?? null} initialIsFavorited={recipe.isFavorited ?? false} />;

  return (
    <>
      <BackButton href="/recipes" />
      <RecipeDetailsView recipe={recipe} actions={actions} />
    </>
  );
}
