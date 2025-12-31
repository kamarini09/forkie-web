"use client";

import { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  style?: CSSProperties;
  className?: string;
}

export function Button({ children, onClick, disabled = false, type = "button", variant = "secondary", style = {}, className = "" }: ButtonProps) {
  const baseStyle: CSSProperties = {
    padding: "10px 20px",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 15,
    transition: "all 0.2s ease",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    opacity: disabled ? 0.6 : 1,
    border: "none",
    ...style,
  };

  let variantStyle: CSSProperties = {};

  switch (variant) {
    case "primary":
      variantStyle = {
        background: "var(--accent-primary)",
        color: "white",
        border: "2px solid var(--accent-primary)",
        boxShadow: "0 1px 2px 0 rgba(45, 42, 36, 0.05)",
      };
      break;
    case "danger":
      variantStyle = {
        background: "var(--accent-danger)",
        color: "white",
        border: "2px solid var(--accent-danger)",
        boxShadow: "0 1px 2px 0 rgba(45, 42, 36, 0.05)",
      };
      break;
    case "secondary":
    default:
      variantStyle = {
        background: "var(--bg-secondary)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-medium)",
        boxShadow: "0 1px 2px 0 rgba(45, 42, 36, 0.05)",
      };
      break;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`btn ${className}`} style={{ ...baseStyle, ...variantStyle }}>
      {children}
    </button>
  );
}
