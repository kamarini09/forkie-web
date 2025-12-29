import Link from "next/link";

export default function RecipesPage() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Recipes</h1>

        <Link
          href="/recipes/create"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            textDecoration: "none",
          }}
        >
          + Create recipe
        </Link>
      </div>

      {/* your recipes list here */}
    </div>
  );
}
