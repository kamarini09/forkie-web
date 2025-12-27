import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SyncUser } from "./components/auth/SyncUser";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <SyncUser />
        <UserButton afterSignOutUrl="/" />
        <p>Signed in ✅</p>
      </SignedIn>
    </main>
  );
}
