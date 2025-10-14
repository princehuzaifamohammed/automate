import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";

export default async function Home() {
   const queryClient = getQueryClient();

   void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

   return (
      <div className="">
         <HydrationBoundary state={dehydrate(queryClient)}>
            <Client />
         </HydrationBoundary>
      </div>
   );
}
