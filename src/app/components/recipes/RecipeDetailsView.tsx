import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import { FavoriteButton } from "./FavoriteButton";
import { Users, Clock, Flame, Lock, Globe } from "lucide-react";

export function RecipeDetailsView({ recipe, actions }: { recipe: Recipe; actions?: React.ReactNode }) {
  const metaItems: { icon: React.ReactNode; text: string }[] = [];
  if (recipe.servings != null) metaItems.push({ icon: <Users size={14} strokeWidth={2} />, text: `${recipe.servings}` });
  if (recipe.prepMinutes != null) metaItems.push({ icon: <Clock size={14} strokeWidth={2} />, text: `${recipe.prepMinutes} min` });
  if (recipe.cookMinutes != null) metaItems.push({ icon: <Flame size={14} strokeWidth={2} />, text: `${recipe.cookMinutes} min` });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
          <h1 className="h1" style={{ marginBottom: 12 }}>
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

      <h2 className="section-title">Ingredients</h2>
      {recipe.content.ingredients?.length ? (
        <ul className="list">
          {recipe.content.ingredients.map((ing, idx) => {
            const qty = ing.quantity != null ? `${ing.quantity}` : "";
            const unit = ing.unit ? ` ${ing.unit}` : "";
            const note = ing.note ? ` — ${ing.note}` : "";
            const prefix = qty ? `${qty}${unit} ` : "";

            return (
              <li key={idx}>
                <strong>{prefix}</strong>
                {ing.name}
                <span style={{ color: "var(--text-secondary)" }}>{note}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div style={{ color: "var(--text-muted)" }}>No ingredients.</div>
      )}

      <h2 className="section-title">Steps</h2>
      {recipe.content.steps?.length ? (
        <ol className="list">
          {recipe.content.steps
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <li key={step.order}>{step.text}</li>
            ))}
        </ol>
      ) : (
        <div style={{ color: "var(--text-muted)" }}>No steps.</div>
      )}
    </div>
  );
}
