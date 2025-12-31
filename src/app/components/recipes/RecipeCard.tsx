import Link from "next/link";
import type { RecipeSummary } from "@/types/recipe";
import { Users, Clock, Flame, Lock } from "lucide-react";

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="card">
      <div className="card-top">
        <h3 className="card-title">{recipe.title}</h3>
        {!recipe.isPublic && (
          <span className="badge badge-private" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Lock size={10} strokeWidth={2} /> Private
          </span>
        )}
      </div>

      <p className="card-desc">{recipe.description ? recipe.description : "No description yet."}</p>

      <div className="meta">
        {recipe.servings != null && (
          <span className="pill" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Users size={14} strokeWidth={2} /> {recipe.servings}
          </span>
        )}
        {recipe.prepMinutes != null && (
          <span className="pill" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={14} strokeWidth={2} /> {recipe.prepMinutes} min
          </span>
        )}
        {recipe.cookMinutes != null && (
          <span className="pill" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Flame size={14} strokeWidth={2} /> {recipe.cookMinutes} min
          </span>
        )}
      </div>

      {recipe.forkedFrom && (
        <div className="forkline">
          Forked from <span>{recipe.forkedFrom.title}</span>
        </div>
      )}
    </Link>
  );
}
