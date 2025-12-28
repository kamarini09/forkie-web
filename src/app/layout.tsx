import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/layout/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main className="container">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
