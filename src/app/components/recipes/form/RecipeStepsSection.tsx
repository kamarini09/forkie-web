"use client";

import type { RecipeFormState } from "@/types/recipe";

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
    <>
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
    </>
  );
}
