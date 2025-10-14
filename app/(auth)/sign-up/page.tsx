import { SignUpForm } from "@/features/auth/components/signup-form";
import { requireUnAuth } from "@/lib/auth-utils";

export default async function SignUpPage() {
   await requireUnAuth();

   return (
      <div>
         <SignUpForm />
      </div>
   );
}
