"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({ href, label = "← Back" }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <Link
      href={href || "#"}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        color: "var(--text-secondary)",
        textDecoration: "none",
        fontSize: 15,
        fontWeight: 500,
        transition: "color 0.2s ease",
        marginBottom: 16,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      {label}
    </Link>
  );
}
