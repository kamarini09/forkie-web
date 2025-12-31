"use client";

import type { RecipeFormState } from "@/types/recipe";
import { UNIT_OPTIONS } from "@/lib/units";
import { Button } from "@/app/components/ui/Button";
import { ShoppingBasket, Plus, X } from "lucide-react";

export function RecipeIngredientsSection({ form, setForm }: { form: RecipeFormState; setForm: React.Dispatch<React.SetStateAction<RecipeFormState>> }) {
  const updateIngredient = (idx: number, patch: Partial<RecipeFormState["ingredients"][number]>) => {
    setForm((p) => ({
      ...p,
      ingredients: p.ingredients.map((ing, i) => (i === idx ? { ...ing, ...patch } : ing)),
    }));
  };

  const addIngredient = () =>
    setForm((p) => ({
      ...p,
      ingredients: [...p.ingredients, { name: "", quantity: undefined, unit: undefined, note: "" }],
    }));

  const removeIngredient = (idx: number) =>
    setForm((p) => ({
      ...p,
      ingredients: p.ingredients.filter((_, i) => i !== idx),
    }));

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
          <ShoppingBasket size={20} strokeWidth={2} /> Ingredients
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>List all the ingredients needed for this recipe</p>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {form.ingredients.map((ing, idx) => (
          <div
            key={idx}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 2fr auto",
              gap: 12,
              alignItems: "start",
            }}
          >
            <input className="input" placeholder="Ingredient name *" value={ing.name} onChange={(e) => updateIngredient(idx, { name: e.target.value })} />

            <input className="input" placeholder="Quantity" type="number" value={ing.quantity ?? ""} onChange={(e) => updateIngredient(idx, { quantity: e.target.value === "" ? undefined : Number(e.target.value) })} min={0} step="0.01" />

            <select className="select" value={(ing.unit as any) ?? ""} onChange={(e) => updateIngredient(idx, { unit: e.target.value === "" ? undefined : (e.target.value as any) })}>
              <option value="">Unit</option>
              {UNIT_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>

            <input className="input" placeholder="Note (optional)" value={ing.note ?? ""} onChange={(e) => updateIngredient(idx, { note: e.target.value })} />

            <Button onClick={() => removeIngredient(idx)} disabled={form.ingredients.length === 1} style={{ padding: "12px", minWidth: 44, opacity: form.ingredients.length === 1 ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={16} strokeWidth={2} />
            </Button>
          </div>
        ))}

        <Button onClick={addIngredient} style={{ padding: "12px 20px", width: "fit-content", display: "flex", alignItems: "center", gap: 8 }}>
          <Plus size={16} strokeWidth={2} /> Add ingredient
        </Button>
      </div>
    </div>
  );
}
