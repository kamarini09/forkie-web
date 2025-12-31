"use client";

import type { RecipeFormState } from "@/types/recipe";
import { Button } from "@/app/components/ui/Button";
import { ChefHat, Plus, X } from "lucide-react";

export function RecipeStepsSection({ form, setForm }: { form: RecipeFormState; setForm: React.Dispatch<React.SetStateAction<RecipeFormState>> }) {
  const updateStep = (idx: number, text: string) => {
    setForm((p) => ({
      ...p,
      steps: p.steps.map((s, i) => (i === idx ? { text } : s)),
    }));
  };

  const addStep = () => setForm((p) => ({ ...p, steps: [...p.steps, { text: "" }] }));

  const removeStep = (idx: number) =>
    setForm((p) => ({
      ...p,
      steps: p.steps.filter((_, i) => i !== idx),
    }));

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
          <ChefHat size={20} strokeWidth={2} /> Instructions
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>Break down the recipe into clear, step-by-step instructions</p>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {form.steps.map((s, idx) => (
          <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div
              style={{
                minWidth: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--accent-primary)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: 14,
                flexShrink: 0,
                marginTop: 12,
              }}
            >
              {idx + 1}
            </div>

            <textarea className="textarea" placeholder={`Describe step ${idx + 1}...`} value={s.text} onChange={(e) => updateStep(idx, e.target.value)} style={{ flex: 1, minHeight: 100 }} />

            <Button onClick={() => removeStep(idx)} disabled={form.steps.length === 1} style={{ padding: "12px", minWidth: 44, marginTop: 12, opacity: form.steps.length === 1 ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={16} strokeWidth={2} />
            </Button>
          </div>
        ))}

        <Button onClick={addStep} style={{ padding: "12px 20px", width: "fit-content", display: "flex", alignItems: "center", gap: 8 }}>
          <Plus size={16} strokeWidth={2} /> Add step
        </Button>
      </div>
    </div>
  );
}
