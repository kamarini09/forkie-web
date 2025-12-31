"use client";

import type { RecipeFormState } from "@/types/recipe";
import { FileText, Users, Clock, Flame, Globe, Lock } from "lucide-react";

export function RecipeBasicsSection({ form, setField }: { form: RecipeFormState; setField: <K extends keyof RecipeFormState>(key: K, value: RecipeFormState[K]) => void }) {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
          <FileText size={20} strokeWidth={2} /> Basic Information
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>Start with the essential details about your recipe</p>
      </div>

      <div className="field">
        <label className="label">Recipe Title *</label>
        <input className="input" value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="e.g., Classic Chocolate Chip Cookies" />
      </div>

      <div className="field">
        <label className="label">Description</label>
        <textarea className="textarea" value={form.description} onChange={(e) => setField("description", e.target.value)} placeholder="Brief description of your recipe..." />
      </div>

      <div className="row" style={{ gap: 20 }}>
        <div className="field" style={{ flex: 1, minWidth: 140 }}>
          <label className="label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Users size={14} strokeWidth={2} /> Servings
          </label>
          <input className="input" type="number" value={form.servings ?? ""} onChange={(e) => setField("servings", e.target.value === "" ? undefined : Number(e.target.value))} placeholder="4" min={1} />
        </div>

        <div className="field" style={{ flex: 1, minWidth: 140 }}>
          <label className="label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={14} strokeWidth={2} /> Prep Time (min)
          </label>
          <input className="input" type="number" value={form.prepMinutes ?? ""} onChange={(e) => setField("prepMinutes", e.target.value === "" ? undefined : Number(e.target.value))} placeholder="15" min={0} />
        </div>

        <div className="field" style={{ flex: 1, minWidth: 140 }}>
          <label className="label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Flame size={14} strokeWidth={2} /> Cook Time (min)
          </label>
          <input className="input" type="number" value={form.cookMinutes ?? ""} onChange={(e) => setField("cookMinutes", e.target.value === "" ? undefined : Number(e.target.value))} placeholder="30" min={0} />
        </div>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 16,
          background: form.isPublic ? "rgba(45, 80, 22, 0.05)" : "var(--bg-primary)",
          border: form.isPublic ? "2px solid var(--accent-primary)" : "2px solid var(--border-light)",
          borderRadius: 12,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <input type="checkbox" checked={form.isPublic} onChange={(e) => setField("isPublic", e.target.checked)} style={{ width: 20, height: 20, cursor: "pointer", accentColor: "var(--accent-primary)" }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
            <Lock size={16} strokeWidth={2} />
            Make this recipe {form.isPublic ? "public" : "private"}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>{form.isPublic ? "Other users will be able to view and fork this recipe" : "Only you can view this recipe"}</div>
        </div>
      </label>
    </div>
  );
}
