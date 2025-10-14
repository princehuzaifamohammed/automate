import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {
   await requireAuth();

   const data = await caller.getUsers();

   return <div className="">Protected page {JSON.stringify(data)}</div>;
}
