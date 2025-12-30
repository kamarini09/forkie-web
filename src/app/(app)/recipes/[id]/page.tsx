import { RecipeDetailsView } from "@/app/components/recipes/RecipeDetails";
import type { Recipe } from "@/types/recipe";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecipePage({ params }: Props) {
  const { id } = await params; // ✅ Next 15

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return <div style={{ padding: 24 }}>Missing NEXT_PUBLIC_API_URL</div>;

  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(`${apiUrl}/recipes/${id}`, {
    cache: "no-store",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (res.status === 404) return <div style={{ padding: 24 }}>Recipe not found.</div>;
  if (!res.ok) return <div style={{ padding: 24 }}>Failed to load recipe (HTTP {res.status})</div>;

  const recipe: Recipe = await res.json();
  return <RecipeDetailsView recipe={recipe} />;
}
