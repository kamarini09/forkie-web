import Link from "next/link";

export function FormPageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <Link href="/recipes" style={{ textDecoration: "none", opacity: 0.8 }}>
          ← Back
        </Link>
      </div>

      <h1 style={{ fontSize: 32, marginBottom: 16 }}>{title}</h1>
      {children}
    </div>
  );
}
