import Link from "next/link";
import type { RecipeSummary } from "@/types/recipe";

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="card">
      <div className="card-top">
        <h3 className="card-title">{recipe.title}</h3>
        <span className={`badge ${recipe.isPublic ? "badge-public" : "badge-private"}`}>{recipe.isPublic ? "Public" : "Private"}</span>
      </div>

      <p className="card-desc">{recipe.description ? recipe.description : "No description yet."}</p>

      <div className="meta">
        {recipe.servings != null && <span className="pill">Servings: {recipe.servings}</span>}
        {recipe.prepMinutes != null && <span className="pill">Prep: {recipe.prepMinutes} min</span>}
        {recipe.cookMinutes != null && <span className="pill">Cook: {recipe.cookMinutes} min</span>}
      </div>

      {recipe.forkedFrom && (
        <div className="forkline">
          Forked from <span>{recipe.forkedFrom.title}</span>
        </div>
      )}
    </Link>
  );
}
