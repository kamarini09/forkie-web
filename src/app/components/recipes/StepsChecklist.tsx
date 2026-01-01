"use client";

import { useState } from "react";
import type { Recipe } from "@/types/recipe";
import { ChefHat } from "lucide-react";

interface StepsChecklistProps {
  steps: Recipe["content"]["steps"];
}

export function StepsChecklist({ steps }: StepsChecklistProps) {
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (idx: number) => {
    const newSet = new Set(checkedSteps);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setCheckedSteps(newSet);
  };

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "2px solid var(--accent-primary)",
        borderRadius: 0,
        padding: 32,
      }}
    >
      <h2 className="section-title" style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
        <ChefHat size={22} strokeWidth={2} /> Instructions
      </h2>
      {steps?.length ? (
        <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
          {steps
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((step, idx) => {
              const isChecked = checkedSteps.has(idx);

              return (
                <div
                  key={step.order}
                  onClick={() => toggleStep(idx)}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: 16,
                    background: isChecked ? "rgba(45, 80, 22, 0.05)" : "var(--bg-primary)",
                    border: isChecked ? "1px solid var(--accent-primary)" : "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      minWidth: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isChecked ? "var(--accent-primary)" : "var(--border-medium)",
                      color: isChecked ? "white" : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 600,
                      fontSize: 14,
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span
                    style={{
                      flex: 1,
                      lineHeight: 1.6,
                      textDecoration: isChecked ? "line-through" : "none",
                      opacity: isChecked ? 0.6 : 1,
                    }}
                  >
                    {step.text}
                  </span>
                </div>
              );
            })}
        </div>
      ) : (
        <div style={{ color: "var(--text-muted)", marginTop: 16, textAlign: "center", padding: "20px 0" }}>
          <ChefHat size={32} strokeWidth={1.5} style={{ opacity: 0.3, marginBottom: 8 }} />
          <div>No instructions yet</div>
        </div>
      )}
    </div>
  );
}
