"use client";

import type { RecipeFormState } from "@/types/recipe";
import { UNIT_OPTIONS } from "@/lib/units";

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
    <>
      <h2 style={{ fontSize: 22, marginTop: 28 }}>Ingredients</h2>

      <div style={{ display: "grid", gap: 10 }}>
        {form.ingredients.map((ing, idx) => (
          <div key={idx} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr auto", gap: 8 }}>
            <input placeholder="name *" value={ing.name} onChange={(e) => updateIngredient(idx, { name: e.target.value })} style={{ padding: 10 }} />

            <input placeholder="qty" type="number" value={ing.quantity ?? ""} onChange={(e) => updateIngredient(idx, { quantity: e.target.value === "" ? undefined : Number(e.target.value) })} style={{ padding: 10 }} min={0} />

            <select value={(ing.unit as any) ?? ""} onChange={(e) => updateIngredient(idx, { unit: e.target.value === "" ? undefined : (e.target.value as any) })} style={{ padding: 10 }}>
              <option value="">unit</option>
              {UNIT_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>

            <input placeholder="note" value={ing.note ?? ""} onChange={(e) => updateIngredient(idx, { note: e.target.value })} style={{ padding: 10 }} />

            <button type="button" onClick={() => removeIngredient(idx)} disabled={form.ingredients.length === 1} style={{ padding: "0 10px" }} title="Remove">
              ✕
            </button>
          </div>
        ))}

        <button type="button" onClick={addIngredient} style={{ padding: 10 }}>
          + Add ingredient
        </button>
      </div>
    </>
  );
}
