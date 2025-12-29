"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function RecipeActions({ recipeId }: { recipeId: string }) {
  const { getToken, isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forkRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!isSignedIn) throw new Error("You must be signed in to fork.");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

      const token = await getToken();
      if (!token) throw new Error("No Clerk token.");

      const res = await fetch(`${apiUrl}/recipes/${recipeId}/fork`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message ? JSON.stringify(data.message) : `HTTP ${res.status}`);
      }

      // backend returns the created recipe (should include id)
      router.push(`/recipes/${data.id}`);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <button
        type="button"
        onClick={forkRecipe}
        disabled={loading}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {loading ? "Forking..." : "Fork this recipe"}
      </button>

      {error && <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", color: "crimson" }}>{error}</pre>}
    </div>
  );
}
