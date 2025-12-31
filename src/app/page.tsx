import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export default function Page() {
  return (
    <div
      style={{
        background: "var(--accent-primary)",
        minHeight: "100vh",
        margin: "-26px -26px -26px -26px",
        padding: "80px 26px 80px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h1 className="h1" style={{ marginBottom: 24, fontSize: 56, color: "white" }}>
          Forkie
        </h1>

        <p style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.6, marginBottom: 40 }}>Your personal recipe collection. Create, organize, and share your favorite recipes with the world.</p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
          <Link href="/recipes" style={{ textDecoration: "none" }}>
            <Button variant="secondary" style={{ padding: "14px 32px", fontSize: 16, background: "white", color: "var(--accent-primary)", border: "2px solid white" }}>
              Explore Recipes
            </Button>
          </Link>
          <Link href="/sign-up" style={{ textDecoration: "none" }}>
            <Button variant="secondary" style={{ padding: "14px 32px", fontSize: 16, background: "transparent", color: "white", border: "2px solid white" }}>
              Get Started
            </Button>
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32, textAlign: "left" }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 12 }}>Create & Organize</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: 15, lineHeight: 1.6 }}>Build your personal recipe collection with an intuitive editor. Add ingredients, steps, and cooking details.</p>
          </div>

          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 12 }}>Share & Discover</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: 15, lineHeight: 1.6 }}>Make recipes public to share with others, or keep them private. Browse and fork recipes from the community.</p>
          </div>

          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 12 }}>Save Favorites</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: 15, lineHeight: 1.6 }}>Bookmark recipes you love for quick access. Build your collection of go-to dishes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
