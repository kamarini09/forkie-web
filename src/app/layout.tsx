import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/layout/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        // No baseTheme => stays LIGHT by default
        variables: {
          colorPrimary: "#111827", // buttons/accents
          colorBackground: "#ffffff", // card backgrounds
          colorText: "#111827",
          colorTextSecondary: "#6b7280",
          colorInputBackground: "#ffffff",
          colorInputText: "#111827",
          borderRadius: "14px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
        },
        // optional: fine-tune specific parts
        elements: {
          card: "cl-card",
          headerTitle: "cl-title",
          formButtonPrimary: "cl-primaryBtn",
          socialButtonsBlockButton: "cl-socialBtn",
          formFieldInput: "cl-input",
        },
      }}
    >
      <html lang="en">
        <body>
          <Navbar />
          <main className="container">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
