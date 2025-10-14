"use client";

import { LoginFormValues, loginSchema } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { HOME_PAGE, SIGN_UP_PAGE } from "@/constants/links";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export const LoginForm = () => {
   const router = useRouter();

   const form = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "" },
   });

   const submitForm = async (values: LoginFormValues) => {
      await authClient.signIn.email(
         {
            email: values.email,
            password: values.password,
            callbackURL: HOME_PAGE,
         },
         {
            onSuccess: () => router.push(HOME_PAGE),
            onError(context) {
               toast.error(context.error.message);
            },
         }
      );
   };

   const isPending = form.formState.isSubmitting;

   return (
      <div className="flex flex-col gap-6">
         <Card>
            <CardHeader className="text-center">
               <CardTitle>Welcome back 👋</CardTitle>
               <CardDescription>Login to continue</CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(submitForm)}>
                     <div className="grid gap-6">
                        <div className="flex flex-col gap-4">
                           <Button
                              // variant={"outline"}
                              className="w-full"
                              type="button"
                              disabled={isPending}
                           >
                              <FaGithub /> Continue with GitHub
                           </Button>
                           <Button
                              variant={"outline"}
                              className="w-full"
                              type="button"
                              disabled={isPending}
                           >
                              <FcGoogle /> Continue with Google
                           </Button>
                        </div>
                        <div className="grid gap-6">
                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input
                                          type="email"
                                          placeholder="john.doe@email.com"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                       <Input
                                          type="password"
                                          placeholder="**********"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <Button type="submit" className="w-full" disabled={isPending}>
                              {isPending ? <Spinner /> : "Login"}
                           </Button>
                        </div>
                        <div className="text-sm text-center">
                           Don't have an account?{" "}
                           <Link
                              href={SIGN_UP_PAGE}
                              className="underline underline-offset-4"
                           >
                              Sign up
                           </Link>
                        </div>
                     </div>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   );
};
