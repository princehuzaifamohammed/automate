import { Logo } from "@/components/logo";
import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
   return (
      <div className="bg-muted w-full flex flex-col min-h-svh items-center justify-center gap-6 p-6 md:p-10">
         <div className="flex w-full max-w-sm text-center flex-col gap-6">
            <div className="w-full flex justify-center">
               <Logo />
            </div>
            {children}
         </div>
      </div>
   );
};

export default AuthLayout;
