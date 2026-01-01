"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/Button";
import { Heart } from "lucide-react";

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

      const res = await fetch(`${apiUrl}/me/favorites/${recipeId}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setIsFav(prev);
        throw new Error(data?.message ? JSON.stringify(data.message) : `HTTP ${res.status}`);
      }

      // Success - keep the optimistic update
    } catch (e: any) {
      setIsFav(prev);
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 8 }}>
      <Button
        onClick={toggleFavorite}
        disabled={loading}
        style={{
          border: isFav ? "2px solid var(--accent-primary)" : "1px solid var(--border-medium)",
          background: isFav ? "rgba(45, 80, 22, 0.1)" : "var(--bg-secondary)",
          color: isFav ? "var(--accent-primary)" : "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Heart size={16} strokeWidth={2} fill={isFav ? "currentColor" : "none"} />
        {loading ? "Saving..." : isFav ? "Favorited" : "Favorite"}
      </Button>

      {error && <div style={{ color: "#ef4444", fontSize: 12 }}>{error}</div>}
    </div>
  );
}
