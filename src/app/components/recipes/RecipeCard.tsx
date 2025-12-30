import Link from "next/link";
import type { RecipeSummary } from "@/types/recipe";

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      style={{
        display: "block",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 16,
        textDecoration: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h3 style={{ fontSize: 18, margin: 0, lineHeight: 1.2 }}>{recipe.title}</h3>
        <span style={{ fontSize: 12, opacity: 0.7, whiteSpace: "nowrap" }}>{recipe.isPublic ? "Public" : "Private"}</span>
      </div>

      {recipe.description ? <p style={{ marginTop: 10, marginBottom: 12, opacity: 0.85 }}>{recipe.description}</p> : <p style={{ marginTop: 10, marginBottom: 12, opacity: 0.5 }}>No description</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, fontSize: 12, opacity: 0.8 }}>
        {recipe.servings != null && <span>Servings: {recipe.servings}</span>}
        {recipe.prepMinutes != null && <span>Prep: {recipe.prepMinutes} min</span>}
        {recipe.cookMinutes != null && <span>Cook: {recipe.cookMinutes} min</span>}
      </div>

      {recipe.forkedFrom && (
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.85 }}>
          Forked from <span style={{ textDecoration: "underline" }}>{recipe.forkedFrom.title}</span>
        </div>
      )}
    </Link>
  );
}
