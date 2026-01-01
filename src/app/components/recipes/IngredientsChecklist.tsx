"use client";

import { useState } from "react";
import type { Recipe } from "@/types/recipe";
import { ShoppingBasket } from "lucide-react";

interface IngredientsChecklistProps {
  ingredients: Recipe["content"]["ingredients"];
}

export function IngredientsChecklist({ ingredients }: IngredientsChecklistProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  const toggleIngredient = (idx: number) => {
    const newSet = new Set(checkedIngredients);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setCheckedIngredients(newSet);
  };

  return (
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
      {ingredients?.length ? (
        <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
          {ingredients.map((ing, idx) => {
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
  );
}
