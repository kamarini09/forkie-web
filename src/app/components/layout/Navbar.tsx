"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} className={`nav-link ${active ? "active" : ""}`}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="nav-left">
          <Link href="/" className="brand">
            Forkie
          </Link>

          <nav className="nav-links">
            <SignedIn>
              <NavLink href="/recipes">Recipes</NavLink>
              <NavLink href="/profile">Profile</NavLink>
            </SignedIn>

            <NavLink href="/about">About</NavLink>
          </nav>
        </div>

        <div className="nav-right">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn" type="button">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
