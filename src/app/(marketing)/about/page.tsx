export default function Page() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1 className="h1" style={{ marginBottom: 32 }}>
        About Forkie
      </h1>

      <div style={{ fontSize: 16, color: "var(--text-primary)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p>Forkie was built around a simple idea: recipes evolve. Most people don&apos;t follow a recipe exactly — they adjust it for taste, dietary needs, available ingredients, or just because they learned a better way. But on most recipe platforms, those changes end up as private notes or disconnected copies, and the connection to the original recipe gets lost.</p>

        <p>Forkie makes that process more natural by introducing forking for recipes. When you fork a recipe, you create your own variation that you can edit and publish — while still keeping a clear &quot;forked from&quot; link to the original recipe and creator. This keeps credit visible and makes it easier to share improvements in a transparent way.</p>

        <h2 className="section-title" style={{ marginTop: 32 }}>
          What you can do
        </h2>

        <ul style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <li>Create and publish your own recipes</li>
          <li>Fork recipes from other users and make your own version</li>
          <li>Keep a link back to the original recipe for attribution</li>
          <li>Save favorite recipes and build your personal collection</li>
        </ul>

        <h2 className="section-title" style={{ marginTop: 32 }}>
          Why &quot;forking&quot;?
        </h2>

        <p>Forking is inspired by how collaboration works in software, but here it&apos;s used in a simple way: it&apos;s just a clean way to say &quot;I made my own version of this recipe.&quot;</p>

        <p style={{ marginTop: 32, fontStyle: "italic", fontSize: 18, color: "var(--accent-primary)" }}>Whether you tweak one ingredient or rewrite the whole recipe, Forkie is built for variations.</p>
      </div>
    </div>
  );
}
