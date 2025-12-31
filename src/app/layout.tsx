import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/layout/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#2d5016",
          colorBackground: "#faf8f3",
          colorText: "#2d2a24",
          colorTextSecondary: "#6b6760",
          colorInputBackground: "#faf8f3",
          colorInputText: "#2d2a24",
          borderRadius: "12px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        elements: {
          card: "shadow-lg border border-gray-200",
          headerTitle: "text-2xl font-bold",
          formButtonPrimary: "shadow-md",
          socialButtonsBlockButton: "hover:bg-gray-50",
          formFieldInput: "focus:ring-green-800",
          userButtonAvatarBox: "border-2 border-green-800",
          userButtonPopoverCard: "border border-gray-200",
          userButtonPopoverActionButton: "hover:bg-green-50",
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
