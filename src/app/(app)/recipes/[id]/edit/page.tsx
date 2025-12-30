import type { Recipe, RecipeFormState } from "@/types/recipe";
import { auth } from "@clerk/nextjs/server";
import { RecipeForm } from "@/app/components/recipes/RecipeForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return <div style={{ padding: 24 }}>Missing NEXT_PUBLIC_API_URL</div>;

  const { userId, getToken } = await auth();
  if (!userId) return <div style={{ padding: 24 }}>You must be signed in.</div>;

  const token = await getToken();

  const res = await fetch(`${apiUrl}/recipes/${id}`, {
    cache: "no-store",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (res.status === 404) return <div style={{ padding: 24 }}>Recipe not found.</div>;
  if (!res.ok) return <div style={{ padding: 24 }}>Failed to load recipe (HTTP {res.status})</div>;

  const recipe: Recipe = await res.json();

  // ✅ Correct ownership check (Clerk id vs Clerk id)
  if (recipe.ownerClerkId !== userId) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 22, marginBottom: 10 }}>Not allowed</h1>
        <div style={{ opacity: 0.8 }}>You can only edit recipes you own.</div>
      </div>
    );
  }

  const initialValues: RecipeFormState = {
    title: recipe.title ?? "",
    description: recipe.description ?? "",
    isPublic: recipe.isPublic ?? true,
    servings: recipe.servings ?? undefined,
    prepMinutes: recipe.prepMinutes ?? undefined,
    cookMinutes: recipe.cookMinutes ?? undefined,
    ingredients: recipe.content?.ingredients?.length
      ? recipe.content.ingredients.map((i) => ({
          name: i.name ?? "",
          quantity: i.quantity ?? undefined,
          unit: i.unit ?? undefined,
          note: i.note ?? "",
        }))
      : [{ name: "", quantity: undefined, unit: undefined, note: "" }],
    steps: recipe.content?.steps?.length
      ? recipe.content.steps
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((s) => ({ text: s.text ?? "" }))
      : [{ text: "" }],
  };

  return <RecipeForm mode="edit" recipeId={recipe.id} initialValues={initialValues} />;
}
