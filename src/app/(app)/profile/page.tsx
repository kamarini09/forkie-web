import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <h1>Profile</h1>

      <SignedOut>
        <p>Please sign in to view your profile.</p>
      </SignedOut>

      <SignedIn>
        <p>Profile content will go here.</p>
      </SignedIn>
    </>
  );
}
