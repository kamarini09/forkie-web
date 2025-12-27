import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        <p>Signed in ✅</p>
      </SignedIn>
    </main>
  );
}
