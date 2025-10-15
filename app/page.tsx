import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { Logout } from "./logout";

export default async function Home() {
   await requireAuth();

   const data = await caller.getUsers();

   return (
      <div className="p-6">
         <Logo />
         <Button>Register</Button>
         <Input />
         <Logout />
      </div>
   );
}
