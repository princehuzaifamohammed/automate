import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/links";

export const requireAuth = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session) redirect(LOGIN_PAGE);

   return session;
};

export const requireUnAuth = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (session) redirect(HOME_PAGE);
};
