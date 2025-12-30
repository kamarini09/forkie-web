import Link from "next/link";
import type { Recipe } from "@/types/recipe";

export function RecipeDetailsView({ recipe, actions }: { recipe: Recipe; actions?: React.ReactNode }) {
  const meta: string[] = [];
  if (recipe.servings != null) meta.push(`Servings: ${recipe.servings}`);
  if (recipe.prepMinutes != null) meta.push(`Prep: ${recipe.prepMinutes} min`);
  if (recipe.cookMinutes != null) meta.push(`Cook: ${recipe.cookMinutes} min`);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 34, margin: 0 }}>{recipe.title}</h1>

          <div style={{ marginTop: 8, opacity: 0.75 }}>
            {recipe.isPublic ? "Public" : "Private"}
            {meta.length ? ` • ${meta.join(" • ")}` : null}
          </div>

          {/* ✅ actions live here (Edit/Fork/Heart later) */}
          <div style={{ marginTop: 12 }}>{actions}</div>
        </div>
      </div>

      {recipe.forkedFrom && (
        <div style={{ marginTop: 12, fontSize: 14, opacity: 0.85 }}>
          Forked from{" "}
          <Link href={`/recipes/${recipe.forkedFrom.id}`} style={{ textDecoration: "underline" }}>
            {recipe.forkedFrom.title}
          </Link>
        </div>
      )}

      {recipe.description ? <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.5 }}>{recipe.description}</p> : null}

      <h2 style={{ marginTop: 28, fontSize: 22 }}>Ingredients</h2>
      {recipe.content.ingredients?.length ? (
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          {recipe.content.ingredients.map((ing, idx) => {
            const qty = ing.quantity != null ? `${ing.quantity}` : "";
            const unit = ing.unit ? ` ${ing.unit}` : "";
            const note = ing.note ? ` — ${ing.note}` : "";
            const prefix = qty ? `${qty}${unit} ` : "";

            return (
              <li key={idx}>
                {prefix}
                {ing.name}
                {note}
              </li>
            );
          })}
        </ul>
      ) : (
        <div style={{ opacity: 0.7 }}>No ingredients.</div>
      )}

      <h2 style={{ marginTop: 28, fontSize: 22 }}>Steps</h2>
      {recipe.content.steps?.length ? (
        <ol style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          {recipe.content.steps
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <li key={step.order} style={{ marginBottom: 8 }}>
                {step.text}
              </li>
            ))}
        </ol>
      ) : (
        <div style={{ opacity: 0.7 }}>No steps.</div>
      )}
    </div>
  );
}
