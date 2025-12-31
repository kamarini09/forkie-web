"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export function FavoriteButton({ recipeId, initialIsFavorited = false }: { recipeId: string; initialIsFavorited?: boolean }) {
  const { isSignedIn, getToken } = useAuth();
  const [isFav, setIsFav] = useState<boolean>(initialIsFavorited);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = async () => {
    setError(null);

    if (!isSignedIn) {
      setError("Sign in to add favorites.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError("Missing NEXT_PUBLIC_API_URL");
      return;
    }

    const prev = isFav;
    const next = !prev;
    setIsFav(next);
    setLoading(true);

    try {
      const token = await getToken();
      if (!token) throw new Error("No Clerk token.");

      const method = next ? "POST" : "DELETE";

      const res = await fetch(`${apiUrl}/recipes/${recipeId}/favorite`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setIsFav(prev);
        throw new Error(data?.message ? JSON.stringify(data.message) : `HTTP ${res.status}`);
      }

      // backend returns { ok: true, isFavorited: boolean }
      if (typeof data?.isFavorited === "boolean") setIsFav(data.isFavorited);
    } catch (e: any) {
      setIsFav(prev);
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 8 }}>
      <button
        type="button"
        onClick={toggleFavorite}
        disabled={loading}
        aria-pressed={isFav}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(31,42,68,0.35)",
          background: "transparent",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          opacity: loading ? 0.7 : 1,
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>{isFav ? "♥" : "♡"}</span>
        {loading ? "Saving..." : isFav ? "Favorited" : "Favorite"}
      </button>

      {error && <div style={{ color: "crimson", fontSize: 12 }}>{error}</div>}
    </div>
  );
}
