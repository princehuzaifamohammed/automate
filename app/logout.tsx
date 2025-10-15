"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const Logout = () => {
   return <Button onClick={async () => await authClient.signOut()}>Logout</Button>;
};
