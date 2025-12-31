export default function Page() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1 className="h1" style={{ marginBottom: 32 }}>
        About Forkie
      </h1>

      <div style={{ fontSize: 16, color: "var(--text-primary)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 24 }}>
        <p>Forkie is a modern recipe management platform designed for home cooks, food enthusiasts, and anyone who loves to create in the kitchen.</p>

        <p>Whether you're organizing family recipes, experimenting with new dishes, or sharing your culinary creations with the world, Forkie provides a clean, intuitive space to store and manage your recipes.</p>

        <h2 className="section-title" style={{ marginTop: 32 }}>
          Features
        </h2>

        <ul style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <li>
            <strong>Recipe Editor:</strong> Create detailed recipes with ingredients, instructions, prep time, and serving sizes.
          </li>
          <li>
            <strong>Public & Private Recipes:</strong> Choose to share your recipes publicly or keep them private for personal use.
          </li>
          <li>
            <strong>Fork Recipes:</strong> Found a recipe you love? Fork it to your collection and make it your own.
          </li>
          <li>
            <strong>Favorites:</strong> Bookmark recipes for quick access to your go-to dishes.
          </li>
          <li>
            <strong>Modern Design:</strong> Clean, distraction-free interface focused on your recipes.
          </li>
        </ul>

        <h2 className="section-title" style={{ marginTop: 32 }}>
          Our Mission
        </h2>

        <p>We believe that cooking is both an art and a science, and that great recipes deserve a great home. Forkie aims to make recipe management simple, beautiful, and collaborative.</p>

        <p style={{ marginTop: 32, padding: 20, background: "rgba(45, 80, 22, 0.05)", border: "2px solid var(--accent-primary)", borderRadius: 12 }}>
          <strong>Ready to get started?</strong>{" "}
          <a href="/sign-in" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>
            Sign in
          </a>{" "}
          and start building your recipe collection today.
        </p>
      </div>
    </div>
  );
}
