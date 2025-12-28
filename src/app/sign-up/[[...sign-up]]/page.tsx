import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <SignUp afterSignInUrl="/recipes" afterSignUpUrl="/recipes" />
      </div>
    </div>
  );
}
