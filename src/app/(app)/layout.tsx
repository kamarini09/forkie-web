import { SignedIn } from "@clerk/nextjs";
import { SyncUser } from "../components/auth/SyncUser";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <SyncUser />
      </SignedIn>
      {children}
    </>
  );
}
