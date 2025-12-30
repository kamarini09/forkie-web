"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RecipeActions({ recipeId, ownerClerkId }: { recipeId: string; ownerClerkId: string }) {
  const { getToken, isSignedIn, userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOwner = !!userId && userId === ownerClerkId;

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

      // ✅ Best UX: go straight to edit the fork
      router.push(`/recipes/${data.id}/edit`);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      {isOwner ? (
        <Link
          href={`/recipes/${recipeId}/edit`}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Edit
        </Link>
      ) : (
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
      )}

      {error && <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", color: "crimson" }}>{error}</pre>}
    </div>
  );
}
