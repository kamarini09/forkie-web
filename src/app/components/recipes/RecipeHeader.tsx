import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import { Users, Clock, Flame, Lock, Globe } from "lucide-react";

interface RecipeHeaderProps {
  recipe: Recipe;
  actions?: React.ReactNode;
}

export function RecipeHeader({ recipe, actions }: RecipeHeaderProps) {
  const metaItems: { icon: React.ReactNode; text: string }[] = [];
  if (recipe.servings != null) metaItems.push({ icon: <Users size={14} strokeWidth={2} />, text: `${recipe.servings}` });
  if (recipe.prepMinutes != null) metaItems.push({ icon: <Clock size={14} strokeWidth={2} />, text: `${recipe.prepMinutes} min` });
  if (recipe.cookMinutes != null) metaItems.push({ icon: <Flame size={14} strokeWidth={2} />, text: `${recipe.cookMinutes} min` });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "flex-start",
          paddingBottom: 24,
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 className="h1" style={{ marginBottom: 12, fontSize: 48 }}>
            {recipe.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span className={`badge ${recipe.isPublic ? "badge-public" : "badge-private"}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {recipe.isPublic ? <Globe size={10} strokeWidth={2} /> : <Lock size={10} strokeWidth={2} />}
              {recipe.isPublic ? "Public" : "Private"}
            </span>
            {metaItems.map((item, i) => (
              <span key={i} className="pill" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {item.icon} {item.text}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>{actions}</div>
        </div>
      </div>

      {recipe.forkedFrom && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "rgba(45, 80, 22, 0.05)",
            border: "1px solid rgba(45, 80, 22, 0.2)",
            borderRadius: 12,
            fontSize: 14,
            color: "var(--text-secondary)",
          }}
        >
          Forked from{" "}
          <Link href={`/recipes/${recipe.forkedFrom.id}`} style={{ color: "var(--accent-primary)", textDecoration: "underline", fontWeight: 500 }}>
            {recipe.forkedFrom.title}
          </Link>
        </div>
      )}

      {recipe.description ? <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.6, color: "var(--text-secondary)" }}>{recipe.description}</p> : null}
    </>
  );
}
