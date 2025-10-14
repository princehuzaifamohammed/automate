"use client";

import { SignUpFormValues, signUpSchema } from "@/schemas/auth";
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
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/links";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export const SignUpForm = () => {
   const router = useRouter();

   const form = useForm<SignUpFormValues>({
      resolver: zodResolver(signUpSchema),
      defaultValues: { email: "", password: "", confirmPassword: "" },
   });

   const submitForm = async (values: SignUpFormValues) => {
      await authClient.signUp.email(
         {
            name: values.email,
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
               <CardTitle>Get Started 👋</CardTitle>
               <CardDescription>Create your account to get started</CardDescription>
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
                           <FormField
                              control={form.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
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
                              {isPending ? <Spinner color="" /> : "SignUp"}
                           </Button>
                        </div>
                        <div className="text-sm text-center">
                           already have an account?{" "}
                           <Link
                              href={LOGIN_PAGE}
                              className="underline underline-offset-4"
                           >
                              Login
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
