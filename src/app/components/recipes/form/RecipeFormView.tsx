"use client";

import type { RecipeFormState } from "@/types/recipe";
import { RecipeBasicsSection } from "./RecipeBasicsSection";
import { RecipeIngredientsSection } from "./RecipeIngredientsSection";
import { RecipeStepsSection } from "./RecipeStepsSection";

export function RecipeFormView({ mode, form, setField, setForm, loading, error, onSubmit }: { mode: "create" | "edit"; form: RecipeFormState; setField: <K extends keyof RecipeFormState>(key: K, value: RecipeFormState[K]) => void; setForm: React.Dispatch<React.SetStateAction<RecipeFormState>>; loading: boolean; error: string | null; onSubmit: () => void }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>{mode === "edit" ? "Edit recipe" : "Create recipe"}</h1>

      <RecipeBasicsSection form={form} setField={setField} />

      <RecipeIngredientsSection form={form} setForm={setForm} />

      <RecipeStepsSection form={form} setForm={setForm} />

      {error && <pre style={{ marginTop: 16, whiteSpace: "pre-wrap", color: "crimson" }}>Error: {error}</pre>}

      <button type="button" onClick={onSubmit} disabled={loading} style={{ marginTop: 18, padding: 12, width: "100%", fontSize: 18 }}>
        {loading ? "Submitting..." : mode === "edit" ? "Save changes" : "Create recipe"}
      </button>
    </div>
  );
}
