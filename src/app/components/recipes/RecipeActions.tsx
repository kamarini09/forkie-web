"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FavoriteButton } from "./FavoriteButton";
import { Button } from "@/app/components/ui/Button";

export function RecipeActions({ recipeId, ownerClerkId, initialIsFavorited = false }: { recipeId: string; ownerClerkId: string | null; initialIsFavorited?: boolean }) {
  const { getToken, isSignedIn, userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOwner = useMemo(() => {
    if (!userId) return false;
    if (!ownerClerkId) return false;
    return userId === ownerClerkId;
  }, [userId, ownerClerkId]);

  const forkRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!isSignedIn) throw new Error("You must be signed in to fork.");
      if (isOwner) throw new Error("You can’t fork your own recipe.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

      const token = await getToken();
      if (!token) throw new Error("No Clerk token.");

      const res = await fetch(`${apiUrl}/recipes/${recipeId}/fork`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message ? JSON.stringify(data.message) : `HTTP ${res.status}`);
      }

      // go edit the fork immediately
      router.push(`/recipes/${data.id}/edit`);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      {/* ✅ Favorites: works for ANY recipe, including your own */}
      <FavoriteButton recipeId={recipeId} initialIsFavorited={initialIsFavorited} />

      {isOwner ? (
        <Link href={`/recipes/${recipeId}/edit`} style={{ textDecoration: "none" }}>
          <Button style={{ width: "100%" }}>Edit</Button>
        </Link>
      ) : (
        <Button onClick={forkRecipe} disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
          {loading ? "Forking..." : "Fork"}
        </Button>
      )}

      {error && <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", color: "#ef4444", fontSize: 14 }}>{error}</pre>}
    </div>
  );
}
