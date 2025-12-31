"use client";

import { useState } from "react";
import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import { FavoriteButton } from "./FavoriteButton";
import { Users, Clock, Flame, Lock, Globe, ShoppingBasket, ChefHat } from "lucide-react";

export function RecipeDetailsView({ recipe, actions }: { recipe: Recipe; actions?: React.ReactNode }) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleIngredient = (idx: number) => {
    const newSet = new Set(checkedIngredients);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setCheckedIngredients(newSet);
  };

  const toggleStep = (idx: number) => {
    const newSet = new Set(checkedSteps);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setCheckedSteps(newSet);
  };
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

      {/* Ingredients & Steps Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 40 }}>
        {/* Ingredients Card */}
        <div
          style={{
            background: "var(--bg-secondary)",
            border: "2px solid var(--accent-primary)",
            borderRadius: 0,
            padding: 32,
          }}
        >
          <h2 className="section-title" style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <ShoppingBasket size={22} strokeWidth={2} /> Ingredients
          </h2>
          {recipe.content.ingredients?.length ? (
            <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
              {recipe.content.ingredients.map((ing, idx) => {
                const isChecked = checkedIngredients.has(idx);
                const qty = ing.quantity != null ? `${ing.quantity}` : "";
                const unit = ing.unit ? ` ${ing.unit}` : "";
                const note = ing.note ? ` — ${ing.note}` : "";
                const prefix = qty ? `${qty}${unit} ` : "";

                return (
                  <label
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: 12,
                      background: isChecked ? "rgba(45, 80, 22, 0.05)" : "var(--bg-primary)",
                      border: isChecked ? "1px solid var(--accent-primary)" : "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleIngredient(idx)}
                      style={{
                        width: 18,
                        height: 18,
                        cursor: "pointer",
                        accentColor: "var(--accent-primary)",
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ textDecoration: isChecked ? "line-through" : "none", opacity: isChecked ? 0.6 : 1 }}>
                      <strong>{prefix}</strong>
                      {ing.name}
                      <span style={{ color: "var(--text-secondary)" }}>{note}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          ) : (
            <div style={{ color: "var(--text-muted)", marginTop: 16, textAlign: "center", padding: "20px 0" }}>
              <ShoppingBasket size={32} strokeWidth={1.5} style={{ opacity: 0.3, marginBottom: 8 }} />
              <div>No ingredients yet</div>
            </div>
          )}
        </div>

        {/* Steps Card */}
        <div
          style={{
            background: "var(--bg-secondary)",
            border: "2px solid var(--accent-primary)",
            borderRadius: 0,
            padding: 32,
          }}
        >
          <h2 className="section-title" style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <ChefHat size={22} strokeWidth={2} /> Instructions
          </h2>
          {recipe.content.steps?.length ? (
            <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
              {recipe.content.steps
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((step, idx) => {
                  const isChecked = checkedSteps.has(idx);

                  return (
                    <div
                      key={step.order}
                      onClick={() => toggleStep(idx)}
                      style={{
                        display: "flex",
                        gap: 16,
                        padding: 16,
                        background: isChecked ? "rgba(45, 80, 22, 0.05)" : "var(--bg-primary)",
                        border: isChecked ? "1px solid var(--accent-primary)" : "1px solid var(--border-light)",
                        borderRadius: "var(--radius-md)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: isChecked ? "var(--accent-primary)" : "var(--border-medium)",
                          color: isChecked ? "white" : "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 600,
                          fontSize: 14,
                          flexShrink: 0,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {idx + 1}
                      </div>
                      <span
                        style={{
                          flex: 1,
                          lineHeight: 1.6,
                          textDecoration: isChecked ? "line-through" : "none",
                          opacity: isChecked ? 0.6 : 1,
                        }}
                      >
                        {step.text}
                      </span>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div style={{ color: "var(--text-muted)", marginTop: 16, textAlign: "center", padding: "20px 0" }}>
              <ChefHat size={32} strokeWidth={1.5} style={{ opacity: 0.3, marginBottom: 8 }} />
              <div>No instructions yet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
