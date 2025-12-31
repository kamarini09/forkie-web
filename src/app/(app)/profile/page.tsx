import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { RecipeSummary } from "@/types/recipe";
import { RecipeGrid } from "@/app/components/recipes/RecipeGrid";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

type FavoriteItem = {
  favoritedAt: string;
  recipe: RecipeSummary;
};

export default async function Page() {
  const { getToken } = await auth();
  const token = await getToken();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let myRecipes: RecipeSummary[] = [];
  let myFavorites: FavoriteItem[] = [];

  if (token && apiUrl) {
    try {
      // Fetch user's own recipes
      const recipesRes = await fetch(`${apiUrl}/recipes/me/recipes`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (recipesRes.ok) {
        myRecipes = await recipesRes.json();
      }

      // Fetch user's favorites
      const favoritesRes = await fetch(`${apiUrl}/me/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (favoritesRes.ok) {
        myFavorites = await favoritesRes.json();
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  return (
    <>
      <div className="page-head">
        <h1 className="h1">Profile</h1>
        <Link href="/recipes/create" style={{ textDecoration: "none" }}>
          <Button variant="primary">Create recipe</Button>
        </Link>
      </div>

      <SignedOut>
        <p style={{ color: "var(--text-secondary)" }}>Please sign in to view your profile.</p>
      </SignedOut>

      <SignedIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {/* My Recipes Section */}
          <section>
            <h2 style={{ marginBottom: 24, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>My Recipes</h2>
            <RecipeGrid recipes={myRecipes} />
          </section>

          {/* Favorites Section */}
          <section>
            <h2 style={{ marginBottom: 24, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>Favorite Recipes</h2>
            <RecipeGrid recipes={myFavorites.map((f) => f.recipe)} />
          </section>
        </div>
      </SignedIn>
    </>
  );
}
