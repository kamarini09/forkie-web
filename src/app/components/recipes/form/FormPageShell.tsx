import { BackButton } from "@/app/components/ui/BackButton";

export function FormPageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <BackButton href="/recipes" />

      <h1 className="h1" style={{ textAlign: "center", marginBottom: 32 }}>
        {title}
      </h1>
      {children}
    </div>
  );
}
