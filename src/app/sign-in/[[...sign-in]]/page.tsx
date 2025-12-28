import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <SignIn afterSignInUrl="/recipes" afterSignUpUrl="/recipes" />
      </div>
    </div>
  );
}
