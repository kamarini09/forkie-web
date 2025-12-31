"use client";

import type { RecipeFormState } from "@/types/recipe";
import { RecipeBasicsSection } from "./RecipeBasicsSection";
import { RecipeIngredientsSection } from "./RecipeIngredientsSection";
import { RecipeStepsSection } from "./RecipeStepsSection";
import { Button } from "@/app/components/ui/Button";
import { AlertTriangle, Save, Sparkles } from "lucide-react";

export function RecipeFormView({ mode, form, setField, setForm, loading, error, onSubmit }: { mode: "create" | "edit"; form: RecipeFormState; setField: <K extends keyof RecipeFormState>(key: K, value: RecipeFormState[K]) => void; setForm: React.Dispatch<React.SetStateAction<RecipeFormState>>; loading: boolean; error: string | null; onSubmit: () => void }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>Fill in the details below to {mode === "edit" ? "update your" : "create a new"} recipe.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <section
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: 32,
          }}
        >
          <RecipeBasicsSection form={form} setField={setField} />
        </section>

        <section
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: 32,
          }}
        >
          <RecipeIngredientsSection form={form} setForm={setForm} />
        </section>

        <section
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: 32,
          }}
        >
          <RecipeStepsSection form={form} setForm={setForm} />
        </section>
      </div>

      {error && (
        <div
          style={{
            marginTop: 32,
            padding: 20,
            background: "rgba(239, 68, 68, 0.1)",
            border: "2px solid var(--accent-danger)",
            borderRadius: 12,
            color: "var(--accent-danger)",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 15 }}>
            <AlertTriangle size={16} strokeWidth={2} /> Error
          </strong>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{error}</pre>
        </div>
      )}

      <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
        <Button onClick={onSubmit} disabled={loading} variant="primary" style={{ padding: "14px 40px", fontSize: 16, minWidth: 200, display: "flex", alignItems: "center", gap: 8 }}>
          {loading ? (
            "Saving..."
          ) : mode === "edit" ? (
            <>
              <Save size={18} strokeWidth={2} /> Save
            </>
          ) : (
            <>
              <Sparkles size={18} strokeWidth={2} /> Create
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
