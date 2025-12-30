"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { RecipeFormState } from "@/types/recipe";
import { UNIT_OPTIONS } from "@/lib/units";
import { RecipeFormView } from "./RecipeFormView";

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

export function RecipeForm({ mode = "create", recipeId, initialValues }: { mode?: "create" | "edit"; recipeId?: string; initialValues?: RecipeFormState }) {
  const { getToken } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<RecipeFormState>(initialValues ?? emptyState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const setField = <K extends keyof RecipeFormState>(key: K, value: RecipeFormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const normalizeUnit = (u: any) => {
    if (!u) return undefined;
    const lower = String(u).toLowerCase();
    return (UNIT_OPTIONS as readonly string[]).includes(lower) ? lower : undefined;
  };

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
              unit: normalizeUnit(i.unit),
              note: i.note?.trim() || undefined,
            })),
          steps: form.steps.filter((s) => s.text.trim().length > 0).map((s, idx) => ({ order: idx + 1, text: s.text.trim() })),
        },
      };

      const isEdit = mode === "edit";
      if (isEdit && !recipeId) throw new Error("Missing recipeId for edit mode");

      const url = isEdit ? `${apiUrl}/recipes/${recipeId}` : `${apiUrl}/recipes`;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
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

      const targetId = isEdit ? recipeId : data?.id;
      if (targetId) router.push(`/recipes/${targetId}`);
      if (!isEdit) setForm(emptyState);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return <RecipeFormView mode={mode} form={form} setField={setField} setForm={setForm} loading={loading} error={error} onSubmit={onSubmit} />;
}
