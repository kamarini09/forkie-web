"use client";

import type { RecipeFormState } from "@/types/recipe";

export function RecipeBasicsSection({ form, setField }: { form: RecipeFormState; setField: <K extends keyof RecipeFormState>(key: K, value: RecipeFormState[K]) => void }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <label>
        Title *
        <input value={form.title} onChange={(e) => setField("title", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6 }} />
      </label>

      <label>
        Description
        <textarea value={form.description} onChange={(e) => setField("description", e.target.value)} style={{ width: "100%", padding: 10, marginTop: 6, minHeight: 90 }} />
      </label>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <label>
          Servings
          <input type="number" value={form.servings ?? ""} onChange={(e) => setField("servings", e.target.value === "" ? undefined : Number(e.target.value))} style={{ padding: 10, marginLeft: 8, width: 120 }} min={1} />
        </label>

        <label>
          Prep (min)
          <input type="number" value={form.prepMinutes ?? ""} onChange={(e) => setField("prepMinutes", e.target.value === "" ? undefined : Number(e.target.value))} style={{ padding: 10, marginLeft: 8, width: 120 }} min={0} />
        </label>

        <label>
          Cook (min)
          <input type="number" value={form.cookMinutes ?? ""} onChange={(e) => setField("cookMinutes", e.target.value === "" ? undefined : Number(e.target.value))} style={{ padding: 10, marginLeft: 8, width: 120 }} min={0} />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={form.isPublic} onChange={(e) => setField("isPublic", e.target.checked)} />
          Public
        </label>
      </div>
    </div>
  );
}
