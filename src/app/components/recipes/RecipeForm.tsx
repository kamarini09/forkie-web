"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type { RecipeFormState } from "@/types/recipe";
import { UNIT_OPTIONS } from "@/lib/units";

const emptyState: RecipeFormState = {
  title: "",
  description: "",
  isPublic: true,
  servings: undefined,
  prepMinutes: undefined,
  cookMinutes: undefined,
  ingredients: [{ name: "", quantity: undefined, unit: undefined, note: "" }],
  steps: [{ text: "" }],
};

export function RecipeForm() {
  const { getToken } = useAuth();
  const [form, setForm] = useState<RecipeFormState>(emptyState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const update = <K extends keyof RecipeFormState>(key: K, value: RecipeFormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const updateIngredient = (idx: number, patch: Partial<RecipeFormState["ingredients"][number]>) => {
    setForm((p) => ({
      ...p,
      ingredients: p.ingredients.map((ing, i) => (i === idx ? { ...ing, ...patch } : ing)),
    }));
  };

  const updateStep = (idx: number, text: string) => {
    setForm((p) => ({
      ...p,
      steps: p.steps.map((s, i) => (i === idx ? { text } : s)),
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

  const addStep = () => setForm((p) => ({ ...p, steps: [...p.steps, { text: "" }] }));

  const removeStep = (idx: number) =>
    setForm((p) => ({
      ...p,
      steps: p.steps.filter((_, i) => i !== idx),
    }));

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!apiUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");
      const token = await getToken();
      if (!token) throw new Error("Not authenticated (no Clerk token)");

      const payload = {
        title: form.title.trim(),
        description: form.description.trim() ? form.description.trim() : undefined,
        isPublic: form.isPublic,
        servings: form.servings ?? undefined,
        prepMinutes: form.prepMinutes ?? undefined,
        cookMinutes: form.cookMinutes ?? undefined,
        content: {
          ingredients: form.ingredients
            .filter((i) => i.name.trim().length > 0)
            .map((i) => ({
              name: i.name.trim(),
              quantity: i.quantity ?? undefined,
              unit: i.unit || undefined,
              note: i.note?.trim() || undefined,
            })),
          steps: form.steps.filter((s) => s.text.trim().length > 0).map((s, idx) => ({ order: idx + 1, text: s.text.trim() })),
        },
      };

      const res = await fetch(`${apiUrl}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message ? JSON.stringify(data.message) : `HTTP ${res.status}`);
      }

      alert(`Recipe created! id=${data.id}`);
      setForm(emptyState);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Create recipe</h1>

      {/* Basic */}
      <div style={{ display: "grid", gap: 12 }}>
        <label>
          Title *
          <input value={form.title} onChange={(e) => update("title", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
        </label>

        <label>
          Description
          <textarea value={form.description} onChange={(e) => update("description", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6, minHeight: 90 }} />
        </label>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label>
            Servings
            <input type="number" value={form.servings ?? ""} onChange={(e) => update("servings", e.target.value === "" ? undefined : Number(e.target.value))} style={{ padding: 10, marginLeft: 8, width: 120 }} min={1} />
          </label>

          <label>
            Prep (min)
            <input type="number" value={form.prepMinutes ?? ""} onChange={(e) => update("prepMinutes", e.target.value === "" ? undefined : Number(e.target.value))} style={{ padding: 10, marginLeft: 8, width: 120 }} min={0} />
          </label>

          <label>
            Cook (min)
            <input type="number" value={form.cookMinutes ?? ""} onChange={(e) => update("cookMinutes", e.target.value === "" ? undefined : Number(e.target.value))} style={{ padding: 10, marginLeft: 8, width: 120 }} min={0} />
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={form.isPublic} onChange={(e) => update("isPublic", e.target.checked)} />
            Public
          </label>
        </div>
      </div>

      {/* Ingredients */}
      <h2 style={{ fontSize: 22, marginTop: 28 }}>Ingredients</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {form.ingredients.map((ing, idx) => (
          <div key={idx} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr auto", gap: 8 }}>
            <input placeholder="name *" value={ing.name} onChange={(e) => updateIngredient(idx, { name: e.target.value })} style={{ padding: 10 }} />

            <input placeholder="qty" type="number" value={ing.quantity ?? ""} onChange={(e) => updateIngredient(idx, { quantity: e.target.value === "" ? undefined : Number(e.target.value) })} style={{ padding: 10 }} min={0} />

            {/* ✅ Unit dropdown */}
            <select value={ing.unit ?? ""} onChange={(e) => updateIngredient(idx, { unit: e.target.value === "" ? undefined : e.target.value })} style={{ padding: 10 }}>
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

      {/* Steps */}
      <h2 style={{ fontSize: 22, marginTop: 28 }}>Steps</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {form.steps.map((s, idx) => (
          <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
            <textarea placeholder={`Step ${idx + 1} *`} value={s.text} onChange={(e) => updateStep(idx, e.target.value)} style={{ width: "100%", padding: 10, minHeight: 70 }} />
            <button type="button" onClick={() => removeStep(idx)} disabled={form.steps.length === 1} style={{ padding: "0 10px" }} title="Remove">
              ✕
            </button>
          </div>
        ))}

        <button type="button" onClick={addStep} style={{ padding: 10 }}>
          + Add step
        </button>
      </div>

      {error && <pre style={{ marginTop: 16, whiteSpace: "pre-wrap", color: "crimson" }}>Error: {error}</pre>}

      <button type="button" onClick={onSubmit} disabled={loading} style={{ marginTop: 18, padding: 12, width: "100%", fontSize: 18 }}>
        {loading ? "Submitting..." : "Submit recipe"}
      </button>
    </div>
  );
}
