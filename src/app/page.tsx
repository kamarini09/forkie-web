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
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        {/* Hero */}
        <h1 className="h1" style={{ marginBottom: 24, fontSize: "clamp(36px, 8vw, 56px)", color: "white", lineHeight: 1.2 }}>
          Fork recipes. Make them yours.
        </h1>

        <p style={{ fontSize: 20, color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.6, marginBottom: 40, maxWidth: 700, margin: "0 auto 40px" }}>Forkie is a recipe platform where you can save a recipe, change it to match your taste, and publish your own version — while still keeping a link to the original.</p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
          <Link href="/recipes" style={{ textDecoration: "none" }}>
            <Button variant="secondary" style={{ padding: "14px 32px", fontSize: 16, background: "white", color: "var(--accent-primary)", border: "2px solid white" }}>
              Explore recipes
            </Button>
          </Link>
          <Link href="/recipes/new" style={{ textDecoration: "none" }}>
            <Button variant="secondary" style={{ padding: "14px 32px", fontSize: 16, background: "transparent", color: "white", border: "2px solid white" }}>
              Create a recipe
            </Button>
          </Link>
          <Link href="/sign-in" style={{ textDecoration: "none" }}>
            <Button variant="secondary" style={{ padding: "14px 32px", fontSize: 16, background: "transparent", color: "white", border: "2px solid white" }}>
              Sign in to fork
            </Button>
          </Link>
        </div>

        {/* Key Benefits */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32, textAlign: "left", marginBottom: 80 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 12 }}>Fork with credit</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: 15, lineHeight: 1.6 }}>Create your own variation while keeping &quot;forked from&quot; visible.</p>
          </div>

          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 12 }}>Cook your way</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: 15, lineHeight: 1.6 }}>Swap ingredients, adjust portions, and rewrite steps — without losing the original.</p>
          </div>

          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 12 }}>Build a personal collection</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: 15, lineHeight: 1.6 }}>Save favorites, publish your recipes, and keep track of what you&apos;ve made.</p>
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: "white", marginBottom: 32 }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, textAlign: "center" }}>
            <div>
              <div style={{ fontSize: 40, fontWeight: 700, color: "rgba(255, 255, 255, 0.3)", marginBottom: 8 }}>1</div>
              <p style={{ color: "white", fontSize: 16, lineHeight: 1.5 }}>Find a recipe you like.</p>
            </div>
            <div>
              <div style={{ fontSize: 40, fontWeight: 700, color: "rgba(255, 255, 255, 0.3)", marginBottom: 8 }}>2</div>
              <p style={{ color: "white", fontSize: 16, lineHeight: 1.5 }}>Fork it to create your own copy.</p>
            </div>
            <div>
              <div style={{ fontSize: 40, fontWeight: 700, color: "rgba(255, 255, 255, 0.3)", marginBottom: 8 }}>3</div>
              <p style={{ color: "white", fontSize: 16, lineHeight: 1.5 }}>Edit and publish your variation.</p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 16, color: "rgba(255, 255, 255, 0.7)", fontStyle: "italic", marginTop: 40 }}>Made for people who never cook a recipe exactly the same way twice.</p>
      </div>
    </div>
  );
}
